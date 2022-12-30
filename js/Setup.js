/**
 * Created by autoc on 07/10/2017.
 */
var Setup = function(context){
    this.context = context;
    //this.layout = this.context.layouts.centerIsland();
};
Setup.prototype = {
    setupSocket:function(){
        var _this = this;
        return this.context.shared
            .setupSocket()
            .then(function(result){
                _this.context.socket = result.socket;
                _this.context.user = result.user;
                _this.context.socket.on('connect',function(){
                    _this.context.socket.emit('guid',{guid:result.user.user.userId,client:"shop-floor"});
                });
                _this.context.socket.on('close-menu',function(){
                    if(_this.basket_menu)_this.basket_menu.close();
                    (altspace.open?altspace.open('http://'+window.location.host, "_experience", {
                        icon: window.location.origin + "/assets/images/icon.png",
                        hidden: true
                    }):Promise.resolve({}))
                        .then(function(menu){
                            _this.basket_menu = menu;
                        });
                });
            });
    },
    setupScene:function(){

    },
    setupAltspace:function(){
        var _this = this;
        if(altspace){
            this.context.simulation = new altspace.utilities.Simulation();
            //this.context.maxAnisotropy = this.context.simulation.renderer.getMaxAnisotropy?this.context.simulation.renderer.getMaxAnisotropy()/4:1;
            if(altspace.inClient){
                // this.context.simulation.scene.userData = { altspace: { collider: { enabled: false } } };
                (altspace.getSpace?altspace.getSpace():Promise.resolve({}))
                    .then(function(space_info){
                        _this.space_info = space_info;
                    });
                (altspace.getUser?altspace.getUser():Promise.resolve({}))
                    .then(function(user_info){
                        _this.user_info = user_info;
                        _this.altspace_ready = true;
                        altspace.open('http://'+window.location.host, "_experience", {//('altspace://account.altvr.com/api/spaces/after-party-at-marche', "_experience", {
                            icon: window.location.origin + "/assets/images/icon.png",
                            hidden: true
                        })
                            .then(function(menu){
                                _this.basket_menu = menu;
                            });
                    });
                (altspace.getEnclosure?altspace.getEnclosure():Promise.resolve({}))
                    .then(function (enclosure) {
                        (enclosure.requestFullspace?enclosure.requestFullspace():Promise.resolve({}))
                            .then(function(){
                                _this.context.simulation.scene.scale.set(enclosure.pixelsPerMeter,enclosure.pixelsPerMeter,enclosure.pixelsPerMeter);
                                //_this.context.simulation.scene.position.set(0,0,0);
                            });
                    });

            }else{
                // _this.context.simulation.scene.position.set(0,-5,0);
            }
            var tweenBehavior = function(){};
            tweenBehavior.prototype.update = function(){
                TWEEN.update();
                if(_this.context.season&&_this.context.season.update){
                    _this.context.season.update();
                }
                (altspace.getThreeJSTrackingSkeleton?altspace.getThreeJSTrackingSkeleton():Promise.resolve({children:[]}))
                    .then(function(skeletonInfo){
                        var head = skeletonInfo.children.filter(function(d){
                            return d.location==="CenterHead0";
                        });
                        if(head.length){
                            _this.context.updatePlayerPosition(head[0].position,head[0].rotation);
                        }
                    });
            };
            _this.context.simulation.scene.addBehaviors(new tweenBehavior());
        }
    },
    setupLoadingBox:function(){
        var _this = this;
        this.context.loading = new THREE.Object3D();
        this.context.loading.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-cockpit-parent'));
        this.context.loading.scale.set(-1,1,1);
        this.context.reload_button = new THREE.Mesh(new THREE.PlaneGeometry(0.1,0.1),new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('/assets/images/ic_refresh_white_48dp.png')}));
        this.context.reload_button.position.set(0.45,0.41,-1.99);
        this.context.loading_text = new THREE.Object3D();
        this.context.loading_text.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-text',{text: 'loading...'}));
        this.context.loading_text.scale.set(0.05,0.05,0.05);
        this.context.loading_text.rotation.set(0,Math.PI,0);
        this.context.loading_text.position.set(0,0.41,-0.4);
        this.context.loading.position.set(0,0.5,0);
        // this.context.loading_reload = new THREE.Mesh(new THREE.PlaneGeometry(0.05,0.05),new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('/assets/images/ic_refresh_white_48dp.png')}));
        // this.context.loading_reload.userData = { altspace: { collider: { enabled: true } } };
        // this.context.loading_reload.position.set(-0.3,0.41,-0.4);
        // this.context.loading_reload.rotation.set(0,Math.PI,0);
        // this.context.loading_reload.addEventListener('cursorup',function(){
        //     _this.context.search(_this.context.settings.lastSearch.page);
        // });
        //this.context.loading.add(this.context.loading_reload);
        this.context.loading.add(this.context.loading_text);
        this.context.loading.add(this.context.reload_button);
        this.context.loading.position.set(0,0,0);
        this.context.loading.scale.set(0.001,0.001,0.001);
        this.context.simulation.scene.add( this.context.loading );
    },
    setupEntryColliders:function(){
        var tl = this.context.entryCollider.clone();
        tl.position.set(-4,-1.5,-6);
        var bl = this.context.entryCollider.clone();
        bl.position.set(4,-1.5,-6);
        var tr = this.context.entryCollider.clone();
        tr.position.set(-4,-1.5,6);
        var br = this.context.entryCollider.clone();
        br.material.color = new THREE.Color('#FFFF00');
        br.position.set(4,-1.5,6);
        this.context.entryColliderParent.add(tl);
        this.context.entryColliderParent.add(bl);
        this.context.entryColliderParent.add(tr);
        this.context.entryColliderParent.add(br);
        //this.context.simulation.scene.add(this.context.entryColliderParent);
    },
    setupDetailDisplay:function(){
        var _this = this;
        this.context.detail_container = new THREE.Group();


        this.context.detail_add_this = new THREE.Group();
        this.context.detail_add_this.scale.set(0.4,0.4,0.4);
        var add_this_back = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.26, 0.03),new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('/assets/images/green_texture.png')}));
        this.context.detail_add_this.add(add_this_back);
        var add_this_text = new THREE.Object3D();
        add_this_text.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-text',{text: "Add This",fontSize:'1'}));
        add_this_text.position.set(0,0,0.02);
        this.context.detail_add_this.add(add_this_text);
        this.context.detail_add_this.rotation.set(-Math.PI*0.1,0,0);
        this.context.detail_add_this.position.set(0.25,1.22,0.20);
        this.context.detail_options = new THREE.Group();
        this.context.detail_options.scale.set(0.4,0.4,0.4);
        var options_back = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.26, 0.03),new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('/assets/images/green_texture.png')}));
        this.context.detail_options.add(options_back);
        var options_text = new THREE.Object3D();
        options_text.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-text',{text: "Options",fontSize:'1'}));
        options_text.position.set(0,0,0.02);
        this.context.detail_options.add(options_text);
        this.context.detail_options.rotation.set(-Math.PI*0.1,0,0);
        this.context.detail_options.position.set(-0.02,1.22,0.20);


        this.context.detail_buy_now = new THREE.Group();
        this.context.detail_buy_now.scale.set(0.4,0.4,0.4);
        var buy_now_back = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.26, 0.03),new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('/assets/images/green_texture.png')}));
        this.context.detail_buy_now.add(buy_now_back);
        var buy_now_text = new THREE.Object3D();
        buy_now_text.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-text',{text: "Buy Now",fontSize:'1'}));
        buy_now_text.position.set(0,0,0.02);
        this.context.detail_buy_now.add(buy_now_text);
        this.context.detail_buy_now.rotation.set(-Math.PI*0.4,0,0);
        this.context.detail_buy_now.position.set(-0.20,1.72,0.30);

        this.context.detail_add_to_basket = new THREE.Group();
        var add_to_basket_back = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.26, 0.03),new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('/assets/images/green_texture.png')}));
        this.context.detail_add_to_basket.add(add_to_basket_back);
        this.context.detail_add_to_basket.scale.set(0.4,0.4,0.4);
        this.context.detail_add_to_basket.position.set(0.13,1.72,0.30);
        var add_to_basket_text = new THREE.Object3D();
        add_to_basket_text.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-text',{text: "Add To Basket",fontSize:'1'}));
        add_to_basket_text.position.set(0,0,0.02);
        this.context.detail_add_to_basket.add(add_to_basket_text);
        this.context.detail_add_to_basket.rotation.set(-Math.PI*0.4,0,0);
        this.context.detail_add_to_basket.addEventListener('cursorup',function(){
            if(_this.context.current_product){
                if(_this.context.current_product.full.ParentASIN){
                    new TWEEN.Tween(_this.context.detail_add_this.position).to({x:_this.context.detail_add_this.position.x,y:1.84,z:_this.context.detail_add_this.position.z}, 250)
                        .easing(TWEEN.Easing.Exponential.Out).start();
                    new TWEEN.Tween(_this.context.detail_options.position).to({x:_this.context.detail_options.position.x,y:1.84,z:_this.context.detail_options.position.z}, 250)
                        .easing(TWEEN.Easing.Exponential.Out).start();
                }else{
                    _this.context.socket.emit('addToBasket',{product:_this.context.current_product,vendor:_this.context.settings.lastSearch.vendor});
                    new TWEEN.Tween(_this.context.detail_add_to_basket.scale).to({x:0.001,y:0.001,z:0.001}, 250)
                        .easing(TWEEN.Easing.Exponential.Out).
                    onComplete(function(){
                        new TWEEN.Tween(_this.context.detail_add_to_basket.scale).to({x:0.4,y:0.4,z:0.4}, 250)
                            .easing(TWEEN.Easing.Exponential.Out).start();
                    }).start();
                }
            }
        });
        _this.context.detail_add_this.addEventListener('cursorup',function() {
            if (_this.context.current_product) {
                _this.context.socket.emit('addToBasket',{product:_this.context.current_product,vendor:_this.context.settings.lastSearch.vendor});
                new TWEEN.Tween(_this.context.detail_add_this.position).to({x:_this.context.detail_add_this.position.x,y:1.24,z:_this.context.detail_add_this.position.z}, 250)
                    .easing(TWEEN.Easing.Exponential.Out).start();
                new TWEEN.Tween(_this.context.detail_options.position).to({x:_this.context.detail_options.position.x,y:1.24,z:_this.context.detail_options.position.z}, 250)
                    .easing(TWEEN.Easing.Exponential.Out).start();
            }
        });

        _this.context.detail_options.addEventListener('cursorup',function() {
            if (_this.context.current_product) {
                _this.context.socket.emit('set-product',{product:_this.context.current_product});
                new TWEEN.Tween(_this.context.detail_add_this.position).to({x:_this.context.detail_add_this.position.x,y:1.24,z:_this.context.detail_add_this.position.z}, 250)
                    .easing(TWEEN.Easing.Exponential.Out).start();
                new TWEEN.Tween(_this.context.detail_options.position).to({x:_this.context.detail_options.position.x,y:1.24,z:_this.context.detail_options.position.z}, 250)
                    .easing(TWEEN.Easing.Exponential.Out).start();
            }
        });

        this.context.detail_buy_now.addEventListener('cursorup',function(){
            if(_this.context.current_product){
                altspace.open(_this.context.current_product.url);
            }
        });
        this.context.detail_text = new THREE.Object3D();
        this.context.detail_text.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-text',{text: "this is the text",fontSize:'1',horizontalAlign:'left',verticalAlign:'center',width:2.5}));
        this.context.detail_text.position.set(0,1.76,0.05);
        this.context.detail_text.scale.set(0.3,0.3,1);
        this.context.detail_text.rotation.set(-Math.PI*0.3,0,0);

        this.context.detail_container.add(this.context.detail_add_this);
        this.context.detail_container.add(this.context.detail_options);
        this.context.detail_container.add(this.context.detail_buy_now);
        this.context.detail_container.add(this.context.detail_add_to_basket);
        this.context.detail_container.add(this.context.detail_text);
        this.context.detail_container.position.set(0,-2,0);
        this.context.simulation.scene.add(this.context.detail_container);
    },
    setupDisplays:function(){
        var _this = this;
        this.context.outter_container = new THREE.Group();
        this.context.outter_container.position.y = -10;
        this.context.layout_container = new THREE.Group();
        this.context.product_container = new THREE.Group();
        this.context.shop_details = new THREE.Object3D();
        this.context.shop_details.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-text',{text: "..",fontSize:'6',horizontalAlign:'left'}));
        this.context.shop_details.position.set(-4.5,2.5,-3.9);
        this.context.shop_details.scale.set(0.2,0.2,0.2);

        var back_text = new THREE.Mesh(new THREE.PlaneGeometry(0.5,0.5),new THREE.MeshBasicMaterial({transparent:true,map:new THREE.TextureLoader().load('/assets/images/ic_keyboard_arrow_left_white_48dp.png')}));
        back_text.position.set(-3.8,2.5,-3.9);
        back_text.addEventListener('cursorup',function(){
            if(_this.context.settings.lastSearch.page>1){
                _this.context.settings.lastSearch.page--;
                _this.context.search(_this.context.settings.lastSearch.page);
            }
        });
        this.context.layout_container.add(back_text);
        var forward_text = new THREE.Mesh(new THREE.PlaneGeometry(0.5,0.5),new THREE.MeshBasicMaterial({transparent:true,map:new THREE.TextureLoader().load('/assets/images/ic_arrow_forward_white_48dp.png')}));
        forward_text.position.set(-3.2,2.5,-3.9);
        forward_text.addEventListener('cursorup',function(){
            if(_this.context.settings.lastSearch.page<5) {
                _this.context.settings.lastSearch.page++;
                _this.context.search(_this.context.settings.lastSearch.page);
            }
        });
        this.context.layout_container.add(forward_text)
        this.context.layout_container.add(this.context.shop_details)
        this.context.outter_container.add(this.context.product_container);
        this.context.outter_container.add(this.context.layout_container);
        this.context.simulation.scene.add(this.context.outter_container);
    },
    setupAframe:function(){
        var __this = this;

    }
};