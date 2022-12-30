var Scene = function(context){
    this.context = context;
    this.obj_loader = new THREE.OBJLoader();
    this.layouts = new Layouts(this);
};
Scene.prototype = {
    balloon:function(){
        var _this = this;
        return this.loadObjMtl('/assets/models/','balloon.obj','/assets/models/','balloon.mtl')
            .then(function(object){
                object.children.forEach(function(child){
                    child.material.side = THREE.DoubleSide;
                    //child.material.type = "MeshBasicMaterial";
                });
                object.position.set(20,-1,90);
                object.scale.set(10,10,10);
                var flames = new THREE.Object3D();
                flames.position.set(-0.085,0.6,0.1);
                flames.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-object',{res: 'effects/fire'}));
                object.add(flames);
                object.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-mesh-collider',{type: 'environment', convex: false}));
                _this.ballonObject = object;
                _this.context.simulation.scene.add( object );
            })
    },
    loadProductLayout:function(layoutPositions,products){
        var _this = this;
        (this.display_setup?_this.resetDisplays():this.setDisplayBox())
            .then(function(){
                _this.context.outter_container.position.set( _this.context.products_offset.px,1.15, _this.context.products_offset.pz);
                _this.context.outter_container.rotation.set(0, _this.context.products_offset.ry, 0);
                var display_list_one = _this.display_pool.filter(function(d){return d.type==='one'});
                var display_list_two = _this.display_pool.filter(function(d){return d.type==='two'});
                var display_list_three = _this.display_pool.filter(function(d){return d.type==='three'});
                layoutPositions.forEach(function(layoutPosition){
                    var display;
                    switch(layoutPosition.s){
                        case 1:
                            display = display_list_one.shift();
                            break;
                        case 2:
                            display = display_list_two.shift();
                            break;
                        case 3:
                            display = display_list_three.shift();
                            break;
                    }
                    display.is_open = true;
                    display.object.position.set(layoutPosition.px,-2,layoutPosition.py);
                    display.object.rotation.y = layoutPosition.ry;
                    new TWEEN.Tween(display.object.position).to({x:layoutPosition.px,y:0,z:layoutPosition.py}, 750)
                        .easing(TWEEN.Easing.Exponential.Out).start();
                });

                //if(_this.context.vendor)_this.context.shop_details.getBehaviorByType('n-text').data.text = 'Shop #: '+(_this.context.vendor.index+1)+'\nVendor: '+_this.context.vendor.vendor.vendorName+'\nCategory: '+_this.context.vendor.vendor.vendorCategories[0][0];
                if(_this.context.vendor)_this.context.shop_details.getBehaviorByType('n-text').data.text = 'Shop #: '+(_this.context.vendor.index+1)+'\nPage: '+_this.context.settings.lastSearch.page;
                var subPositions = layoutPositions
                    .reduce(function(a,b){
                        return a.concat(b.subPositions);
                    },[]);
                products.forEach(function(product,i){
                    var layout_item = _this.context.product_container.children[i];
                    var display = layout_item.children[0];
                    var price = layout_item.children[layout_item.children.length-1];
                    //console.log(subPositions[i].px,-2,subPositions[i].py);
                    layout_item.position.set(subPositions[i].px,-2,subPositions[i].py)
                    layout_item.rotation.set(0,subPositions[i].ry,0);
                    layout_item.__product = product;
                    price.getBehaviorByType('n-text').data.text = product.price;
                    var twn = new TWEEN.Tween(layout_item.position).to({x:subPositions[i].px,y:0,z:subPositions[i].py}, 350)
                        .easing(TWEEN.Easing.Exponential.Out);
                    if(product.images[0]&&product.images[0].medium){
                        _this.setDisplayImage(display,product.images[0].medium,false).then(function(){
                            twn.start();
                        });
                    }
                });
            });
    },
    setDisplayDetail:function(layout_item){
        var vector = new THREE.Vector3();
        this.context.product_container.updateMatrixWorld();
        vector.setFromMatrixPosition( layout_item.matrixWorld );
        this.context.detail_container.position.set(vector.x,0,vector.z);
        this.context.detail_container.rotation.set(
            0,
            this.context.vendor.position.ry+layout_item.rotation.y-(Math.PI/2)/*+(this.context.vendor.index%4===2||this.context.vendor.index%4===3?Math.PI:0)*/,
            0
        );
        console.log(this.context.vendor);
        this.context.detail_container.scale.set(0,0,0);
        new TWEEN.Tween(this.context.detail_container.scale).to({x:1,y:1,z:1}, 250)
            .easing(TWEEN.Easing.Exponential.Out).start();
        var desc = layout_item.__product.title/*+"\n\n"+layout_item.__product.description*/;
        if(desc.length>400){
            desc = desc.substr(0,400)+' ...';
        }
        this.context.detail_text.getBehaviorByType('n-text').data.text = desc;
        if(!layout_item.__product.price){
            this.context.detail_add_this.position.y = -10;
        }else{
            this.context.detail_add_this.position.y = 0;
        }
        this.context.detail_text.scale.set(0,0,0);
        new TWEEN.Tween(this.context.detail_text.scale).to({x:0.3,y:0.3,z:1}, 250)
            .easing(TWEEN.Easing.Exponential.Out).start();
    },
    setDisplayImage:function(object,image,is_large){
        return new Promise(function(resolve){
            var img = new Image();
            img.onload = function(){
                var ratio = img.width/img.height;
                var original_scale = {x:is_large?1.5:1,y:is_large?1.5:1}
                var x_scale = (ratio>1?original_scale.x:ratio*original_scale.y);
                var y_scale = (ratio>1?(1/ratio)*original_scale.x:original_scale.y);
                new TWEEN.Tween(object.scale).to({x:x_scale,y:y_scale,z:1}, 250)
                    .easing(TWEEN.Easing.Exponential.Out).onComplete(function(){
                    object.material.map = new THREE.TextureLoader().load(image);
                    resolve({width:x_scale,height:y_scale});
                }).start();
            };
            img.src = image;
        });
    },
    movieScreen:function(){
        var _this = this;
        setTimeout(function(){
            var object = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5),Object.assign(new THREE.MeshBasicMaterial({ color: 0xccdd33 }), { visible: false }))
            object.position.x = -70;
            object.position.z = 90;
            object.position.y = 6.5;
            object.rotation.y = Math.PI*0.75;
            object.scale.set(15,15,3);

            _this.context.simulation.scene.add( object );
            object.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-layout-browser', { url: 'https://video-jukebox.firebaseapp.com/?hud=true&initialPlaylist=PLWN1djuBEKCnEDqRgvMKKs8qnmiIOck2L', isEnclosure: true  }));//
        },3000);
    },
    // three60Player:function(){
    //     var group = new THREE.Group();
    //
    //     var object = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1),Object.assign(new THREE.MeshBasicMaterial({ color: 0xccdd33 }), { visible: false }))
    //     object.position.x = 4;
    //     object.position.z = -0.8;
    //     // object.position.y = 5.3;
    //     group.position.x = -381;
    //     group.position.z = -190;
    //     group.position.y = 105.5;
    //     group.rotation.y = Math.PI*0.75;
    //     group.rotation.x=-Math.PI*0.03;
    //     object.rotation.y = -Math.PI*0.435;
    //     object.scale.set(10,10,10);
    //     group.add(object);
    //
    //     var platform = new THREE.Mesh(new THREE.BoxGeometry(15, 0.3,2),new THREE.MeshBasicMaterial({side:THREE.DoubleSide,color:'#2f2f2f',map:new THREE.TextureLoader().load('/assets/images/display_texture.png')}))
    //     platform.position.x=-10;
    //     platform.position.z=2;
    //     platform.position.y=-2.4;
    //     platform.rotation.y = Math.PI*0.065;
    //     //platform.rotation.z=Math.PI*0.045;
    //     platform.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-mesh-collider',{type: 'environment', convex: false}));
    //
    //     group.add(platform);
    //
    //     var outter_middle = new THREE.Mesh(new THREE.SphereGeometry(10.5, 16,12,0,Math.PI*2),new THREE.MeshBasicMaterial({side:THREE.DoubleSide,/*color:'#0f0f0f',*/map:new THREE.TextureLoader().load('/assets/images/rainbow.jpg')}))
    //     outter_middle.rotation.y = Math.PI;
    //     outter_middle.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-mesh-collider',{type: 'environment', convex: false}));
    //
    //     var numbers = [160, 161,192, 193];
    //     numbers.forEach(function(i){
    //         delete outter_middle.geometry.faces[i];
    //     });
    //     outter_middle.geometry.faces = outter_middle.geometry.faces.filter(function(face){return face;});
    //
    //     group.add(outter_middle);
    //
    //     var mesh = new THREE.Object3D();
    //     mesh.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-text',{text: "360 Video Dome"}));
    //     mesh.position.y = 4;
    //     mesh.position.x = -9.5;
    //     mesh.position.z = 2;
    //     mesh.rotation.y = -Math.PI*0.42;
    //     //mesh.scale.set(0.7,0.7,0.7);
    //     group.add(mesh);
    //
    //     object.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-layout-browser', { url: 'https://video-jukebox.firebaseapp.com/?allow360=true&only360=true&radius=10', isEnclosure: true  }));//&initialPlaylist=PLOcJP07dA4EKKtKXn36V6_OKHA_FQJzWU
    //     this.context.simulation.scene.add( group );
    // },
    mountains:function(){
        var _this = this;
        return this.load_obj('/assets/models/mountains.obj')
            .then(function(object){
                var texture;
                switch(_this.mode){
                    case "snow":
                        texture = '/assets/models/mountains-snow.jpg';
                        break;
                    default:
                        texture = '/assets/models/mountains.jpg';
                        break;
                }
                object.children[0].material = new THREE.MeshBasicMaterial({ map:new THREE.TextureLoader().load(texture)})
                object.position.y-=2.6;
                object.position.z-=95;
                object.position.x-=74.5;
                object.addBehaviors(
                    new altspaceutil.behaviors.NativeComponent('n-mesh-collider',{type: 'environment', convex: false}),
                    new altspaceutil.behaviors.NativeComponent('n-sound',{src: '/assets/background.wav', /*res: 'ui/error',*/autoplay: true,loop: 'true',volume:0.001,on: 'click',minDistance: 100})
                    );
                _this.context.simulation.scene.add( object );


            });
    },
    statue:function(){
        var _this = this;
        return this.load_obj('/assets/models/Statue12.obj')
            .then(function(object){
                var texture = new THREE.TextureLoader().load('/assets/images/pavement2.jpg');
                texture.repeat.set(5,5);
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                object.children[0].material = new THREE.MeshBasicMaterial({map:texture});
                object.position.set(-129.6,0.3,-23.5);
                object.rotation.set(0,Math.PI/2,0);
                object.scale.set(6,6,6);
                object.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-mesh-collider',{type: 'environment', convex: false}));
                _this.context.simulation.scene.add( object );

                //
                // var fireworks = new THREE.Object3D();
                // fireworks.position.set(-129.6,20,-23.5);
                // fireworks.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-object',{res: 'effects/fireworks'}));
                //
                //
                // _this.context.simulation.scene.add( fireworks );
            });
    },
    roads:function(){
        var _this = this;
        return this.load_obj('/assets/models/road.obj')
            .then(function(object){

                var image;
                switch(_this.mode){
                    case "snow":
                        image = '/assets/models/pavement_mixed.jpg';
                        break;
                    default:
                        image = '/assets/models/pavement.jpg';
                        break;
                }
                var texture = new THREE.TextureLoader().load(image);
                texture.anisotropy = _this.context.maxAnisotropy;
                texture.repeat.set(3,3);
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                object.children[0].material = new THREE.MeshBasicMaterial({map:texture})

                object.position.y=0.65;
                object.scale.y=0.5;
                // object.position.z-=75;
                // object.position.x-=50;
                object.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-mesh-collider',{type: 'environment', convex: false}));
                _this.context.simulation.scene.add( object );
            });
    },
    trees:function(){
        var _this = this;
        var texture;
        switch(_this.mode){
            case "snow":
                texture = '/assets/images/green_texture_snow_top.png';
                break;
            default:
                texture = '/assets/images/green_texture.png';
                break;
        }
        return Promise.all([
            this.loadJSONModel('/assets/models/town_canopy.json',texture),
            this.loadJSONModel('/assets/models/town_trunks.json','/assets/images/wood_texture.png')
        ])
            .then(function(objects){
                objects.forEach(function(object,i){
                    if(i===0)object.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-mesh-collider',{type: 'environment', convex: false}));
                    object.position.set(0,0.70,0)
                    _this.context.simulation.scene.add(object);
                });
            });

    },
    street_signs:function(){
        var _this = this;
        return Promise.all([
            this.loadJSONModel('/assets/models/lamp_post_lights.json','/assets/images/display_texture.png'),
            this.loadJSONModel('/assets/models/lamp_post_poles.json','/assets/images/display_texture.png')
        ])
            .then(function(objects){
                objects.forEach(function(object,oi){
                    object.position.set(0,0.65,0);
                    if(oi===1){
                        object.material.color = new THREE.Color('#5f5f5f');
                    }else{
                        object.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-mesh-collider',{type: 'environment', convex: false}));
                    }
                    _this.context.simulation.scene.add(object);
                });
            });
    },
    shop_carpet:function(){
        var _this = this;
        return Promise.all([
            this.loadJSONModel('/assets/models/carpet_one.json','/assets/images/display_texture_darker.png','#1f77b4',2,2),
            this.loadJSONModel('/assets/models/carpet_two.json','/assets/images/display_texture_darker.png','#ff7f0e',2,2),
            this.loadJSONModel('/assets/models/carpet_three.json','/assets/images/display_texture_darker.png','#9467bd',2,2),
            this.loadJSONModel('/assets/models/carpet_four.json','/assets/images/display_texture_darker.png','#d62728',2,2),
        ])
            .then(function(objects){
                objects.forEach(function(object){
                    object.position.set(0,0.17,0);
                    object.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-mesh-collider',{type: 'environment', convex: false}));

                    _this.context.simulation.scene.add(object);

                });
            });
    },
    altazon_banner:function(){
        var geometry = new THREE.RingGeometry( 23, 20, 30, 1, 0, Math.PI);
        var texture = new THREE.TextureLoader().load('/assets/images/rainbow.jpg');
        texture.repeat.set( 1, 4 );

        texture.wrapS = THREE.MirroredRepeatWrapping;
        texture.wrapT = THREE.MirroredRepeatWrapping;
        var material = new THREE.MeshBasicMaterial({color:0xffffff,map:texture,side:THREE.DoubleSide});
        var torus = new THREE.Mesh( geometry, material );
        torus.position.z = -32.5;
        torus.position.y = 0;
        torus.scale.y = 1.5;

        this.context.simulation.scene.add( torus );
        var texture;
        switch(this.mode){
            case "snow":
                texture = new THREE.TextureLoader().load('/assets/images/logo-snow.png');
                break;
            default:
                texture = new THREE.TextureLoader().load('/assets/images/logo.png');
                break;
        }
        var logo = new THREE.Mesh( new THREE.PlaneGeometry(13,9), new THREE.MeshBasicMaterial({alphaTest: 0.5,transparent:true,map:texture,side:THREE.DoubleSide}) );
        logo.position.z = -32.5;
        logo.position.y = 15;
        //logo.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-billboard'));
        this.context.simulation.scene.add( logo );


        var spotlight1 = this.spot_light(2000,Math.PI*0.2);
        spotlight1.position.set(10,1,-35.5);
        this.context.simulation.scene.add( spotlight1 );


        var spotlight2 = this.spot_light(3000,Math.PI*0.22);
        spotlight2.position.set(-10,1,-37.5);
        spotlight2.rotation.set(0,Math.PI,0);
        this.context.simulation.scene.add( spotlight2 );

        // var fireworks = new THREE.Object3D();
        // fireworks.position.set(0,14,-34);
        // fireworks.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-object',{res: 'effects/fireworks'}));
        // this.context.simulation.scene.add( fireworks );
    },
    shop_signs:function(){
        var _this = this;
        return this.loadJSONModel('/assets/models/sign_fronts.json','/assets/images/vendor-logos/logos.jpg').then(function(object){
            //object.material = new THREE.MeshBasicMaterial({color:'#efefef'});
            _this.context.simulation.scene.add(object);
        });
    },
    spot_light:function(start_delay,angle){
        var container = new THREE.Group();
        var inner_container = new THREE.Group();
        var base = new THREE.Mesh(new THREE.BoxGeometry( 0.1, 0.6, 0.7),new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('/assets/images/display_texture.png')}));
        var fixture = new THREE.Mesh(new THREE.CylinderGeometry( 0.3, 0.3, 0.6, 12 ),new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('/assets/images/display_texture.png')}));
        var beam = new THREE.Mesh(new THREE.CylinderGeometry( 60, 0.3, 1000, 12 ),new THREE.MeshBasicMaterial({color:'#fff',transparent:true,opacity:0.4}));
        inner_container.position.set(0,0.3,0);
        beam.position.set(0,500.3,0);
        inner_container.add(fixture);
        inner_container.add(beam);
        container.add(inner_container);
        container.add(base);
        var rotate_animation = function(to_start){
            setTimeout(function(){
                var pos = {x:0,y:0,z:to_start?angle:0}
                new TWEEN.Tween(pos).to({x:0,y:0,z:to_start?0:angle}, 2700)
                    .onUpdate(function(){
                        inner_container.rotation.set(pos.x,pos.y,pos.z);
                    })
                    .onComplete(function(){
                        setTimeout(function(){
                            rotate_animation(!to_start);
                        },3300)
                    })
                    .start();
            },start_delay)
        };
        rotate_animation(false);
        return container;
    },
    shops:function(){
        var _this = this;
        return Promise.all([
            this.loadJSONModel('/assets/models/shops.json','/assets/images/display_texture.png','#ccc'),
            this.loadJSONModel('/assets/models/sign_backs.json','/assets/images/confectionary.png','#fff',20,1),
        ])
            .then(function(objects){
                objects.forEach(function(object){
                    object.position.set(0,0.17,0);
                    object.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-mesh-collider',{type: 'environment', convex: false}));
                    _this.context.simulation.scene.add(object);
                });
            });
    },
    setDisplayBox:function(){
        var _this = this;
        return Promise.all([
            this.loadJSONModel('/assets/models/display-box.json','/assets/images/display_texture.png'),
            this.loadJSONModel('/assets/models/display-box-two.json','/assets/images/display_texture.png'),
            this.loadJSONModel('/assets/models/display-box-three.json','/assets/images/display_texture.png'),
        ])
            .then(function(objects){
                _this.display_box = objects[0];
                _this.display_box_two = objects[1];
                _this.display_box_three = objects[2];
                _this.display_pool = [];
                Array.apply(null, {length: 10}).map(Number.call, Number)
                    .forEach(function(i){
                        _this.display_pool.push({type:'one',object:_this.display_box.clone(),is_open:false});
                        var group = new THREE.Group();
                        group.position.set(0,-2,0);
                        var display_mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.8,0.8),new THREE.MeshBasicMaterial({}));
                        display_mesh.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-billboard', {}, { useCollider: true }));
                        display_mesh.position.set(0,1,0);
                        display_mesh.rotation.set(0,-Math.PI/2,0);
                        group.add(display_mesh);
                        var details_mesh = new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({color:'#8f8f8f',map:new THREE.TextureLoader().load('/assets/images/display_texture.png')}));
                        details_mesh.position.set(0,0.505,0);
                        details_mesh.rotation.set(-Math.PI/2,0,0);
                        group.add(details_mesh);

                        var price_mesh = new THREE.Object3D();
                        price_mesh.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-text',{text: '0.00',fontSize:1}));
                        price_mesh.position.set(-0.25,0.53,0);
                        price_mesh.rotation.set(-Math.PI/2,-Math.PI*0.2,-Math.PI*0.5);
                        group.add(price_mesh);

                        group.addEventListener('cursorup',function(){
                            _this.context.product_container.children.forEach(function(child){
                                if(child.__is_open){
                                    child.dispatchEvent(new Event('reset_selected'));
                                }
                            });
                            if(group.__product){
                                _this.context.current_product = group.__product;
                                _this.setDisplayDetail(group);
                                _this.setDisplayImage(display_mesh,group.__product.images[0].large,true)
                            }
                            new TWEEN.Tween(price_mesh.position).to({x:-0.42,y:0.53,z:0}, 750)
                                .easing(TWEEN.Easing.Exponential.Out).start();


                            new TWEEN.Tween(display_mesh.position).to({x:0.35,y:1.3,z:0}, 750)
                                .easing(TWEEN.Easing.Exponential.Out).start();
                            group.__is_open = true;
                        });
                        group.addEventListener('reset_selected',function(){
                            if(group.__product)_this.setDisplayDetail(group);
                            new TWEEN.Tween(price_mesh.position).to({x:-0.25,y:0.53,z:0}, 350)
                                .easing(TWEEN.Easing.Exponential.Out).start();

                            new TWEEN.Tween(display_mesh.position).to({x:0,y:1,z:0}, 750)
                                .easing(TWEEN.Easing.Exponential.Out).start();
                            delete _this.context.current_product;
                            if(group.__product){
                                _this.setDisplayImage(display_mesh,group.__product.images[0].medium,false)
                            }
                            group.__is_open = false;

                            new TWEEN.Tween(_this.context.detail_options.position).to({x:_this.context.detail_options.position.x,y:-2,z:_this.context.detail_options.position.z}, 250)
                                .easing(TWEEN.Easing.Exponential.Out).start();
                            new TWEEN.Tween(_this.context.detail_add_this.position).to({x:_this.context.detail_add_this.position.x,y:-2,z:_this.context.detail_add_this.position.z}, 250)
                                .easing(TWEEN.Easing.Exponential.Out).start();
                        });
                        _this.context.product_container.add( group );
                    });
                for(var i = 0; i<5;i++){
                    _this.display_pool.push({type:'two',object:_this.display_box_two.clone(),is_open:false})
                }
                for(var i = 0; i<3;i++){
                    _this.display_pool.push({type:'three',object:_this.display_box_three.clone(),is_open:false})
                }
                _this.resetDisplays().then(function(){
                    _this.display_pool.forEach(function(display){
                        _this.context.layout_container.add(display.object);

                    });
                    _this.display_setup = true;
                });


            });
    },
    resetDisplays:function(){
        this.context.product_container.children.forEach(function(child){
            if(child.__is_open){
                child.dispatchEvent(new Event('reset_selected'));
            }
        });

        new TWEEN.Tween(this.context.detail_container.position).to({x:this.context.detail_container.position.x,y:-2,z:this.context.detail_container.position.z}, 250)
            .easing(TWEEN.Easing.Exponential.Out).start();

        return Promise.all((this.display_pool||[]).map(function(display){
            return new Promise(function(resolve){
                if(display.is_open){
                    display.is_open = false;
                    new TWEEN.Tween(display.object.position).to({x:display.object.position.x,y:-2,z:display.object.position.z}, 350)
                        .easing(TWEEN.Easing.Exponential.In)
                        .onComplete(resolve)
                        .start();

                }else{
                    display.object.position.set(0,-2,0);
                    display.object.rotation.y = 0;
                    resolve();
                }
            })
        })
            .concat(this.context.product_container.children.map(function(layout_item){
                return new Promise(function(resolve){
                    new TWEEN.Tween(layout_item.position).to({x:layout_item.position.x,y:-2,z:layout_item.position.z}, 350)
                        .easing(TWEEN.Easing.Exponential.In)
                        .onComplete(resolve)
                        .start();
                })
            })));
        /*


                    _this.context.product_container.children
                    var display = layout_item.children[0];
                    var price = layout_item.children[layout_item.children.length-1];
                    if(product.images[0]&&product.images[0].medium)_this.setDisplayImage(display,product.images[0].medium,true)
                    //console.log(subPositions[i].px,-2,subPositions[i].py);
                    layout_item.position.set(subPositions[i].px,-2,subPositions[i].py)
                    layout_item.rotation.set(0,subPositions[i].ry,0);
                    layout_item.__product = product;
                    price.getBehaviorByType('n-text').data.text = product.price;
         */


    },
    loadJSONModel:function(path,image,color,repeatx,repeaty){
        var _this = this;
        return new Promise(function(resolve,reject){
            var oReq = new XMLHttpRequest();
            oReq.addEventListener("load", function(){
                try {
                    var texture = new THREE.TextureLoader().load(image);
                    texture.anisotropy = _this.context.maxAnisotropy;
                    texture.repeat.set(repeatx||1,repeaty||1);
                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;
                    var mat_settings = {map:texture};
                    if(color)mat_settings.color = color;
                    if(path.indexOf('sign')>-1||path.indexOf('display-box')>-1){
                        mat_settings.transparent = true;
                        mat_settings.side = THREE.DoubleSide;
                    }
                    var mesh = new THREE.Mesh(
                        new THREE.JSONLoader().parse(JSON.parse(this.responseText)).geometry,
                        new THREE.MeshBasicMaterial(mat_settings))
                        mesh.userData = { altspace: { collider: { enabled: false } } };
                    resolve(mesh);
                }catch(e){
                    reject(e);
                }
            });
            oReq.open("GET", path);
            oReq.send();
        });
    },
    load_obj:function(url){
        var _this = this;
        return new Promise(function(resolve){
            _this.obj_loader.load(url,
                function ( object ) {
                    object._url = url;
                    object.traverse(function(mesh){
                        mesh.userData = { altspace: { collider: { enabled: false } } };
                        if(mesh.material&&mesh.material.map){
                            mesh.material.map.anisotropy = _this.context.maxAnisotropy;
                        }
                    });
                    resolve(object);

                },
                function ( xhr ) {

                    // console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

                },
                function ( error ) {

                    console.log( 'An error happened with '+url );

                });
        });
    },
    loadObjMtl:function(obj_path,obj_file,mtl_path,mtl_file){
        return new Promise(function(resolve) {
            var mtlLoader = new THREE.MTLLoader();
            mtlLoader.setPath(mtl_path);
            mtlLoader.load(mtl_file, function (materials) {
                if(obj_file.indexOf('balloon')>-1){
                    var texture = new THREE.TextureLoader().load('/assets/models/weave.png')
                    texture.repeat.set(2,1);
                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;
                    materials.materials.basketMat = new THREE.MeshBasicMaterial({map:texture,color:'#985c15'})
                }
                var objLoader = new THREE.OBJLoader();
                objLoader.setPath(obj_path);
                objLoader.setMaterials(materials);
                objLoader.load(obj_file, function (object) {
                    object.traverse(function(mesh){
                        mesh.userData = { altspace: { collider: { enabled: false } } };
                    });
                    resolve(object);
                }, function(){}, function(){});
            });
        });
    },
    zerkker_lanes:function(){
        var _this = this;
        UltimateLoader.load('https://rawgit.com/Zerithax/zerithax.github.io/master/Bowling_Stuff/Exterior.gltf', function(obj)
        {
            var allowed = ['Arrow5','Arrow6','Arrow1','Arrow2','Arrow3','Arrow4','BezierCurve.005','Cube.004'];
            obj.children.filter(function(child){
                return allowed.indexOf(child.name)>-1;
            }).forEach(function(child){
                child.children[0].material = new THREE.MeshBasicMaterial({color:'#000000'})
            });
            // obj.rotation.set(0,-Math.PI/2,0);
            // obj.position.set(-35.1,0.645,32.53);
            obj.rotation.set(0,0,0);
            obj.position.set(0.1,0.645,135.12);
            obj.scale.set(1,1,0.98);
            var sign = new THREE.Mesh(new THREE.PlaneGeometry(6,1.5),new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('/assets/images/zerkker-logo.jpg')}));
            sign.position.set(0,5.5,-0.25);
            sign.rotation.set(0,Math.PI,0);
            obj.add(sign);
            obj.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-mesh-collider',{type: 'environment', convex: false}));
            _this.context.simulation.scene.add(obj);
        });
    },
    skybox:function(){
        var texture;
        switch(this.day_mode){
            case "night":
                texture = '/assets/images/equirectangular-dark.jpg';
                break;
            default:
                texture = '/assets/images/equirectangular.jpg';
                break;
        }

        var sky_and_sun = new THREE.Mesh(
            new THREE.SphereGeometry(800, 16, 16, 0, Math.PI*2, 0, (Math.PI/2)),
            new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load(texture)})
        );
        sky_and_sun.scale.set(-1,1,1);
        this.context.simulation.scene.add(sky_and_sun);
    },
    sea:function(){
        var sea = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 1),
            new THREE.MeshBasicMaterial({color:'#1a499d'})
        );
        sea.rotation.set(-Math.PI/2,0,0);
        sea.scale.set(10000,10000,1);
        sea.position.set(0,-4,0);
        this.context.simulation.scene.add(sea);
    }
};