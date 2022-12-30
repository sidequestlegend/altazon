/**
 * Created by autoc on 07/10/2017.
 */

var Main = function(){
    var _this = this;
    this.shared = new Shared(this);
    this.setup = new Setup(this);
    this.scene = new Scene(this);
    this.setup.setupAltspace();
    this.scene.movieScreen();
    this.setup.setupLoadingBox();
    this.props = new Props();
    this.setup.setupAframe();
    this.scene.sea();
    if(altspace&&altspace.inClient)this.scene.zerkker_lanes();
    this.parseSettings();
    this.scene.skybox();
    this.scene.altazon_banner();
    Promise.all([
        _this.scene.mountains(),
        _this.scene.roads(),
        _this.scene.statue(),
        _this.scene.shops(),
        _this.scene.shop_carpet(),
        _this.scene.street_signs(),
        _this.scene.trees(),
        _this.scene.balloon(),
        _this.scene.shop_signs()
    ]).then(function(){
        // var nportal = new THREE.Object3D();
        // //nportal.position.x = _this.player_position.x+2000;
        // nportal.position.y = _this.player_position.y-500;
        // nportal.position.z = _this.player_position.z;
        // var spawnPoint = new THREE.Object3D();
        // spawnPoint.position.y = 500;
        // _this.simulation.scene.updateMatrixWorld();
        // _this.simulation.scene.add(nportal);
        // var behaviour = new altspaceutil.behaviors.NativeComponent('n-portal',{},{targetEntity:spawnPoint});
        // nportal.addBehaviors(
        //     behaviour
        // );
        _this.setup.setupSocket()
            .then(function(){
                _this.setup.setupDisplays();
                _this.setup.setupDetailDisplay();
                _this.setup.setupEntryColliders();
                _this.setupResponses();
            });
    })
        .catch(function(error){
            console.log(error);
        });
};
Main.prototype = {
    settings:{
        receiveBroadcast:false,
        lastSearch:{
            terms: 'Laptops',
            categories:['All'],
            vendor:'AmazonUS',
            page: 1
        }
    },
    entryColliderParent:new THREE.Mesh(new THREE.BoxGeometry(16,0.2,24), new THREE.MeshBasicMaterial({side:THREE.DoubleSide,transparent:true,opacity:0.00001, color: '#0000FF'})),
    entryCollider:new THREE.Mesh(new THREE.BoxGeometry(8,0.2,12), new THREE.MeshBasicMaterial({side:THREE.DoubleSide,transparent:true,opacity:0.1, color: '#00FF00'})),
    min_x:-355,
    checkout_open:false,
    clearScene:false,
    selectedItem:undefined,
    setupResponses:function(){
        var _this = this;
        var coeff = 1000 * 60 * 5;
        this.socket.on('time-sync',function(cur_time){
            _this.current_time_offset = cur_time-new Date().getTime();
            var current_time = cur_time - Math.floor(cur_time / coeff) * coeff;
            var start_position = {x:20,y:-1,z:90};
            var  position = {x:start_position.x,y:start_position.y,z:start_position.z,animation:"landing",current_time:current_time/1000};
            switch(true){
                case current_time<coeff*0.1:
                    position.animation = "idle";
                    position.percentage = ((coeff*0.1)/current_time);
                    break;
                case current_time<coeff*0.22:
                    position.percentage = ((current_time-(coeff*0.1))/(coeff*0.12));
                    position.animation = "take-off";
                    position.y = position.percentage*6-1;
                    break;
                case current_time<coeff*0.88:
                    position.percentage = ((current_time-(coeff*0.22))/(coeff*0.66));
                    var extra = 10*position.percentage;
                    if(position.percentage>0.5){
                        extra = 10-(10*position.percentage)
                    }
                    position.y = 6+extra-1;
                    position.animation = "circle";
                    break;
                default:
                    position.percentage = ((current_time-(coeff*0.88))/(coeff*0.12));
                    position.y = 6 - (position.percentage*6)-1;
                    position.animation = "landing";
                    break;
            }
            if(_this.scene.ballonObject){
                new TWEEN.Tween(_this.scene.ballonObject.position).to(position, 2000).start();
            }
        });
        this.socket.on('results',this.receiveSearchResult.bind(this));
        this.socket.on('results-broadcast',function(response){
            document.querySelector("#loadingText").setAttribute("scale","0 0 0");
            if(_this.settings.receiveBroadcast){
                _this.receiveSearchResult(response);
            }
        });

        this.socket.on('test-countdown',function(){
            console.log('click-back');
            var new_date = new Date();
            if(_this.season.new_year_offset)new_date.setUTCHours(new_date.getUTCHours()+Math.floor(_this.season.new_year_offset));
            _this.season.fall_time = Math.ceil(Math.floor(new_date.getTime()/1000)/60)*60;
        });
        this.socket.on('checkoutError',this.receiveCheckoutError.bind(this));
        this.socket.on('searchError',this.receiveSearchError.bind(this));
        this.socket.on('searchError-broadcast',function(response){
            if(_this.settings.receiveBroadcast){
                _this.receiveSearchError(response);
            }
        });
        this.socket.on('set-product',function(){
            altspace.open('http://'+window.location.host+"/add_to_basket.html");
        });
        this.socket.on('search-page',function(options){
            _this.search(options.page,'AmazonUS',options.categories,options.terms)
        });

        this.socket.on('checkout',function(url){
            altspace.open(url.checkoutUrl);
        });
        this.socket.on('getBaskets',function(){
            if(_this.detail_add_to_basket){
                setTimeout(function(){
                    if(_this.detail_add_to_basket_tween)_this.detail_add_to_basket_tween.stop();
                    _this.detail_add_to_basket_tween = new TWEEN.Tween(_this.detail_add_to_basket.scale).to({x:0.4,y:0.4,z:0.4}, 250)
                        .easing(TWEEN.Easing.Exponential.In).start();
                },100);
            }
        });
        //
        // var getUVs = function(rows,cols){
        //     var cells = [];
        //     var width = 1/cols;
        //     var height = 1/rows;
        //     for(var r = 0; r<rows;r++){
        //         for(var c = 0; c<cols;c++){
        //             cells.push({
        //                 br:{x:width*c,y:height*r+height},
        //                 tr:{x:width*c,y:height*r},
        //                 bl:{x:width*c+width,y:height*r+height},
        //                 tl:{x:width*c+width,y:height*r}
        //             });
        //         }
        //     }
        //     this.get = function(index){
        //         var cell = cells[index];
        //         return [
        //             [cell.tl,cell.bl,cell.tr],
        //             [cell.bl,cell.br,cell.tr],
        //         ]
        //     };
        // };
        //
        // var ggeo = new THREE.Geometry();
        // var uvs = new getUVs(15,10);
        this.socket.on('get-layout',function(layout){
            _this.shop_layout = layout.outlets;
            // var total_shops = 0;
            // layout.outlets.forEach(function(outlet,outleti) {
            //     // _this.scene.loadJSONModel(outlet.type === 'four'?'/assets/models/four_shop_sign.json':'/assets/models/two_shop_sign.json','/assets/images/vendor-logos/altazon-balloon.jpg')
            //     //     .then(function(object){
            //     //         object.position.set(outlet.position.x, 4, outlet.position.y);
            //     //         object.rotation.set(0, (90 - outlet.rotation.y) * Math.PI / 180, 0);
            //     //         _this.simulation.scene.add(object);
            //     //     })
            //
            //
            //
            //     if(outlet.vendors){
            //         var group = new THREE.Group();
            //
            //         group.position.set(outlet.position.x, 4, outlet.position.y);
            //         group.rotation.set(0, (90 - outlet.rotation.y) * Math.PI / 180, 0);
            //
            //         var texture = new THREE.TextureLoader().load('/assets/images/vendor-logos/altazon-balloon.jpg');
            //         var material = new THREE.MeshBasicMaterial({map:texture.clone()});
            //         var bl = uvs.get(total_shops);
            //         var br = uvs.get(total_shops+1);
            //         var geometry1 = new THREE.PlaneGeometry( 4, 1 );
            //         var geometry2 = new THREE.PlaneGeometry( 4, 1 );
            //         //console.log(geometry1.faceVertexUvs);
            //         //[[{"x":0,"y":0.5},{"x":0,"y":0},{"x":0.5,"y":0.5}],[{"x":0,"y":0},{"x":0.5,"y":0},{"x":0.5,"y":0.5}]]
            //         geometry1.faceVertexUvs[ 0 ][ 0 ][ 0 ].set( bl[0][0].x, bl[0][0].y );
            //         geometry1.faceVertexUvs[ 0 ][ 0 ][ 1 ].set( bl[0][1].x, bl[0][1].y );
            //         geometry1.faceVertexUvs[ 0 ][ 0 ][ 2 ].set( bl[0][2].x, bl[0][2].y );
            //
            //         geometry1.faceVertexUvs[ 0 ][ 1 ][ 0 ].set( bl[1][0].x, bl[1][0].y );
            //         geometry1.faceVertexUvs[ 0 ][ 1 ][ 1 ].set( bl[1][1].x, bl[1][1].y );
            //         geometry1.faceVertexUvs[ 0 ][ 1 ][ 2 ].set( bl[1][2].x, bl[1][2].y );
            //
            //         //[[{"x":0.5,"y":0.5},{"x":0.5,"y":0},{"x":1,"y":0.5}],[{"x":0.5,"y":0},{"x":1,"y":0},{"x":1,"y":0.5}]]
            //         geometry2.faceVertexUvs[ 0 ][ 0 ][ 0 ].set( br[0][0].x, br[0][0].y );
            //         geometry2.faceVertexUvs[ 0 ][ 0 ][ 1 ].set( br[0][1].x, br[0][1].y );
            //         geometry2.faceVertexUvs[ 0 ][ 0 ][ 2 ].set( br[0][2].x, br[0][2].y );
            //
            //         geometry2.faceVertexUvs[ 0 ][ 1 ][ 0 ].set( br[1][0].x, br[1][0].y );
            //         geometry2.faceVertexUvs[ 0 ][ 1 ][ 1 ].set( br[1][1].x, br[1][1].y );
            //         geometry2.faceVertexUvs[ 0 ][ 1 ][ 2 ].set( br[1][2].x, br[1][2].y );
            //
            //
            //         if(outlet.type === 'four'){
            //
            //             var geometry3 = new THREE.PlaneGeometry( 4, 1 );
            //             var geometry4 = new THREE.PlaneGeometry( 4, 1 );
            //             var tl = uvs.get(total_shops+2);
            //             var tr = uvs.get(total_shops+3);
            //         //[[{"x":0,"y":1},{"x":0,"y":0.5},{"x":0.5,"y":1}],[{"x":0,"y":0.5},{"x":0.5,"y":0.5},{"x":0.5,"y":1}]]
            //         geometry3.faceVertexUvs[ 0 ][ 0 ][ 0 ].set( tl[0][0].x, tl[0][0].y );
            //         geometry3.faceVertexUvs[ 0 ][ 0 ][ 1 ].set( tl[0][1].x, tl[0][1].y );
            //         geometry3.faceVertexUvs[ 0 ][ 0 ][ 2 ].set( tl[0][2].x, tl[0][2].y );
            //
            //         geometry3.faceVertexUvs[ 0 ][ 1 ][ 0 ].set( tl[1][0].x, tl[1][0].y );
            //         geometry3.faceVertexUvs[ 0 ][ 1 ][ 1 ].set( tl[1][1].x, tl[1][1].y );
            //         geometry3.faceVertexUvs[ 0 ][ 1 ][ 2 ].set( tl[1][2].x, tl[1][2].y );
            //
            //         //[[{"x":0.5,"y":1},{"x":0.5,"y":0.5},{"x":1,"y":1}],[{"x":0.5,"y":0.5},{"x":1,"y":0.5},{"x":1,"y":1}]]
            //         geometry4.faceVertexUvs[ 0 ][ 0 ][ 0 ].set( tr[0][0].x, tr[0][0].y );
            //         geometry4.faceVertexUvs[ 0 ][ 0 ][ 1 ].set( tr[0][1].x, tr[0][1].y );
            //         geometry4.faceVertexUvs[ 0 ][ 0 ][ 2 ].set( tr[0][2].x, tr[0][2].y );
            //
            //
            //         geometry4.faceVertexUvs[ 0 ][ 1 ][ 0 ].set( tr[1][0].x, tr[1][0].y );
            //         geometry4.faceVertexUvs[ 0 ][ 1 ][ 1 ].set( tr[1][1].x, tr[1][1].y );
            //         geometry4.faceVertexUvs[ 0 ][ 1 ][ 2 ].set( tr[1][2].x, tr[1][2].y );
            //
            //         }
            //         var geo = new THREE.Geometry();
            //         var mesh1 = new THREE.Mesh( geometry1, material );
            //         var mesh2 = new THREE.Mesh( geometry2, material );
            //         mesh1.position.set(6,0,-8.2);
            //         mesh1.rotation.set(0, Math.PI,Math.PI);
            //
            //         mesh1.updateMatrixWorld();
            //         mesh1.updateMatrix();
            //         mesh2.position.set(-6,0,-8.2);
            //         mesh2.rotation.set(0, Math.PI,Math.PI);
            //         mesh2.updateMatrixWorld();
            //         mesh2.updateMatrix();
            //         geo.merge(geometry1,mesh1.matrix);
            //         geo.merge(geometry2,mesh2.matrix);
            //         group.add(mesh1);
            //         group.add(mesh2);
            //
            //
            //
            //
            //         var mesh1 = new THREE.Mesh( geometry1.clone(), material );
            //         var mesh2 = new THREE.Mesh( geometry2.clone(), material );
            //         mesh1.position.set(0.1,-1,-4);
            //         mesh1.rotation.set(0, Math.PI/2,Math.PI);
            //
            //         mesh1.updateMatrixWorld();
            //         mesh1.updateMatrix();
            //         mesh2.position.set(-0.1,-1,-4);
            //         mesh2.rotation.set(0, -Math.PI/2,Math.PI);
            //         mesh2.updateMatrixWorld();
            //         mesh2.updateMatrix();
            //         geo.merge(geometry1,mesh1.matrix);
            //         geo.merge(geometry2,mesh2.matrix);
            //         group.add(mesh1);
            //         group.add(mesh2);
            //
            //
            //         if(outlet.type === "four"){
            //             var mesh3 = new THREE.Mesh( geometry3, material );
            //             var mesh4 = new THREE.Mesh( geometry4, material );
            //             mesh3.position.set(-6,0,8.2);
            //             mesh3.rotation.set(0, 0,Math.PI);
            //             mesh3.updateMatrixWorld();
            //             mesh3.updateMatrix();
            //             mesh4.position.set(6,0,8.2);
            //             mesh4.rotation.set(0, 0,Math.PI);
            //             mesh4.updateMatrixWorld();
            //             mesh4.updateMatrix();
            //             geo.merge(geometry3,mesh3.matrix);
            //             geo.merge(geometry4,mesh4.matrix);
            //             group.add(mesh3);
            //             group.add(mesh4);
            //
            //
            //
            //             var mesh3 = new THREE.Mesh( geometry3.clone(), material );
            //             var mesh4 = new THREE.Mesh( geometry4.clone(), material );
            //             mesh3.position.set(-0.1,-1,4);
            //             mesh3.rotation.set(0, -Math.PI/2,Math.PI);
            //             mesh3.updateMatrixWorld();
            //             mesh3.updateMatrix();
            //             mesh4.position.set(0.1,-1,4);
            //             mesh4.rotation.set(0, Math.PI/2,Math.PI);
            //             mesh4.updateMatrixWorld();
            //             mesh4.updateMatrix();
            //             geo.merge(geometry3,mesh3.matrix);
            //             geo.merge(geometry4,mesh4.matrix);
            //             group.add(mesh3);
            //             group.add(mesh4);
            //         }
            //         group.updateMatrixWorld();
            //         group.updateMatrix();
            //         ggeo.merge(geo,group.matrix)
            //         //if(outleti==35){
            //             //console.log(JSON.stringify(geo.toJSON().data));
            //         //}
            //
            //         //
            //         // outlet.vendors.forEach(function(vendor,vendi){
            //         //     var logo = new THREE.Mesh(new THREE.PlaneGeometry(4,1), new THREE.MeshBasicMaterial({transparent:true,map:texture.clone()}));
            //         //
            //         //     switch(vendi){
            //         //         case 0:
            //         //             logo.position.set(-6,0,-8.2);
            //         //             logo.rotation.set(0, Math.PI,0);
            //         //             break;
            //         //         case 1:
            //         //             logo.position.set(6,0,-8.2);
            //         //             logo.rotation.set(0, Math.PI,0);
            //         //             break;
            //         //         case 2:
            //         //             logo.position.set(-6,0,8.2);
            //         //             break;
            //         //         case 3:
            //         //             logo.position.set(6,0,8.2);
            //         //             break;
            //         //     }
            //         //     //logo.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-billboard'));
            //         //     group.add(logo);
            //         // });
            //         _this.simulation.scene.add(group);
            //     }
            //
            //     total_shops+=outlet.type === 'four'?4:2;
            //
            // });
            // console.log(JSON.stringify(ggeo.toJSON().data));
            // console.log(total_shops);





            var loader = new THREE.FontLoader();
            loader.load( 'assets/images/Aldo the Apache_Regular.json', function ( font ) {

                var load_text = function(string){
                    var mesh = new THREE.Object3D();
                    mesh.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-text',{text: string}));
                    mesh.scale.set(0.10,0.15,0.15);
                    return mesh;
                }
                _this.scene.loadJSONModel('/assets/models/lamp_post_signs.json','/assets/images/sign.png')
                    .then(function(object){
                        // object.material = new THREE.MeshBasicMaterial({side:THREE.DoubleSide,transparent:true, map:new THREE.TextureLoader().load('/assets/images/sign.png')})
                        _this.simulation.scene.add(object);
                    })
                layout.extras.forEach(function(extra){
                    switch(extra.type){
                        case "tree":


                            break;
                        case "street-sign":
                            var group = new THREE.Group();
                            if(extra.settings.signs.east){
                                var mesh = load_text(extra.settings.signs.east);
                                var reverse = load_text(extra.settings.signs.east);
                                mesh.position.set(0.7,2.6,0);
                                mesh.position.z+=0.005;
                                mesh.position.x-=0.08;
                                reverse.rotation.y = Math.PI;
                                reverse.position.set(0.7,2.6,0);
                                reverse.position.z-=0.005;
                                reverse.position.x-=0.08;
                                group.add(mesh);
                                group.add(reverse);
                            }
                            if(extra.settings.signs.west){
                                var mesh = load_text(extra.settings.signs.west);
                                var reverse = load_text(extra.settings.signs.west);
                                mesh.position.set(-0.7,2.6,0);
                                mesh.position.z+=0.005;
                                mesh.rotation.set(0,0,0);
                                mesh.position.x+=0.08;
                                reverse.rotation.y = Math.PI;
                                reverse.position.set(-0.7,2.6,0);
                                reverse.position.z-=0.005;
                                reverse.position.x+=0.08;
                                group.add(mesh);
                                group.add(reverse);
                            }

                            if(extra.settings.signs.north){
                                var mesh = load_text(extra.settings.signs.north);
                                var reverse = load_text(extra.settings.signs.north);
                                mesh.position.set(0,2.6,-0.7);
                                mesh.position.x+=0.005;
                                mesh.position.z+=0.08;
                                mesh.rotation.set(0,Math.PI*0.5,0);
                                reverse.rotation.y = Math.PI*1.5;
                                reverse.position.set(0,2.6,-0.7);
                                reverse.position.x-=0.005;
                                reverse.position.z+=0.08;
                                group.add(mesh);
                                group.add(reverse);
                            }

                            if(extra.settings.signs.south){
                                var mesh = load_text(extra.settings.signs.south);
                                var reverse = load_text(extra.settings.signs.south);
                                mesh.position.set(0,2.6,0.7);
                                mesh.position.x+=0.005;
                                mesh.position.z-=0.08;
                                mesh.rotation.set(0,Math.PI*0.5,0);
                                reverse.rotation.y = Math.PI*1.5;
                                reverse.position.set(0,2.6,0.7);
                                reverse.position.x-=0.005;
                                reverse.position.z-=0.08;
                                group.add(mesh);
                                group.add(reverse);
                            }
                            group.position.set(extra.settings.x,0.675,extra.settings.y);
                            group.updateMatrixWorld();
                            group.updateMatrix();
                            // geo.merge(geo2,group.matrix);
                            _this.simulation.scene.add(group);

                    }

                });
                //console.log(JSON.stringify(geo.toJSON().data));
            } );


        });
        setTimeout(function(){_this.socket.emit('get-layout',{layout:'altspaceMarket'});},100);
        this.socket.emit('get-vendors');
        this.socket.on('get-vendors',function(vendors){
            _this.vendors = vendors;
        });
    },
    tree:function(rotation,has_base){
        var _this = this;
        var geometry = _this.props.randomBlob(true);
        var mesh = new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color:0xffffff,map:new THREE.TextureLoader().load('/assets/images/green_texture.png')}));
        mesh.position.y = 2.7;
        mesh.scale.x = mesh.scale.y = mesh.scale.z = 2.2+0.8*Math.random();
        var geometry2 = _this.props.treeBase(rotation,has_base);
        var mesh2 = new THREE.Mesh(geometry2,new THREE.MeshBasicMaterial({color:0xffffff,map:new THREE.TextureLoader().load('/assets/images/wood_texture.png')}));
        return [mesh,mesh2];
    },
    receiveCheckoutError:function(error){
        switch(error.type){
            case "AmazonUS":
            case "AmazonUK":
            case "AmazonAU":

                break;
        }
    },
    setPositionTimer:undefined,
    lastPosition:new THREE.Vector3(0,0,0),
    savePosition:function(position,rotation){
        var _this = this;
        if((position.x!==this.lastPosition.x||position.z!==this.lastPosition.z||rotation.y!==this.lastPosition.roty)){
            clearTimeout(this.setPositionTimer);
            this.setPositionTimer = setTimeout(function(){
                if(_this.socket)_this.socket.emit('set-position',{x:position.x,z:position.z,roty:rotation.y});
            },500);
            this.lastPosition = {x:position.x,z:position.z,roty:rotation.y};
        }
    },
    insideShop:function(point, vs){
        var x = point[0], y = point[1];

        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i][0], yi = vs[i][1];
            var xj = vs[j][0], yj = vs[j][1];

            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    },
    updatePlayerPosition:function(position,rotation){
        var _this = this;
        _this.player_position = position;
        _this.player_rotation = rotation;
        _this.savePosition(position,rotation);
        if(this.shop_layout){
            var selected = this.shop_layout.map(function(d,i){d.o_i = i; return d;}).filter(function(d){
                return Math.abs(position.x-d.position.x)<15&&Math.abs(position.z-d.position.y)<15;
            }).filter(function(d){
                _this.entryColliderParent.position.set(d.position.x,1.5,d.position.y);
                _this.entryColliderParent.rotation.set(0,(-d.rotation.y)*(Math.PI/180),0);
                var bbox = new THREE.Box3().setFromObject(_this.entryColliderParent);
                return _this.insideShop([position.x,position.z],[
                    [bbox.min.x,bbox.min.z],
                    [bbox.min.x,bbox.max.z],
                    [bbox.max.x,bbox.max.z],
                    [bbox.max.x,bbox.min.z],
                ]);
            });
            if(selected.length){
                var d = selected[0];
                var out_position = {px:0,pz:0,ry:(90 - d.rotation.y) * Math.PI / 180};
                var bboxtl = new THREE.Box3().setFromObject(_this.entryColliderParent.children[0]);
                var bboxbl = new THREE.Box3().setFromObject(_this.entryColliderParent.children[1]);
                var bboxtr = new THREE.Box3().setFromObject(_this.entryColliderParent.children[2]);
                var bboxbr = new THREE.Box3().setFromObject(_this.entryColliderParent.children[3]);
                var vendor_index;
                if(_this.insideShop([position.x,position.z],[
                        [bboxtl.min.x,bboxtl.max.z],
                        [bboxtl.min.x,bboxtl.min.z],
                        [bboxtl.max.x,bboxtl.min.z],
                        [bboxtl.max.x,bboxtl.max.z],
                    ])){
                    var center = bboxtl.getCenter();
                    out_position.px = center.x;
                    out_position.pz = center.z;
                    out_position.ry+= Math.PI;
                    vendor_index = 0;
                }else if(_this.insideShop([position.x,position.z],[
                        [bboxbl.min.x,bboxbl.max.z],
                        [bboxbl.min.x,bboxbl.min.z],
                        [bboxbl.max.x,bboxbl.min.z],
                        [bboxbl.max.x,bboxbl.max.z],
                    ])){
                    var center = bboxbl.getCenter();
                    out_position.px = center.x;
                    out_position.pz = center.z;
                    vendor_index = 2;
                }else if(_this.insideShop([position.x,position.z],[
                        [bboxtr.min.x,bboxtr.max.z],
                        [bboxtr.min.x,bboxtr.min.z],
                        [bboxtr.max.x,bboxtr.min.z],
                        [bboxtr.max.x,bboxtr.max.z],
                    ])){
                    var center = bboxtr.getCenter();
                    out_position.px = center.x;
                    out_position.pz = center.z;
                    out_position.ry+= Math.PI;
                    vendor_index = 1;
                }else if(_this.insideShop([position.x,position.z],[
                        [bboxbr.min.x,bboxbr.max.z],
                        [bboxbr.min.x,bboxbr.min.z],
                        [bboxbr.max.x,bboxbr.min.z],
                        [bboxbr.max.x,bboxbr.max.z],
                    ])){
                    var center = bboxbr.getCenter();
                    out_position.px = center.x;
                    out_position.pz = center.z;
                    vendor_index = 3;
                }
                var vendor = d.vendors[vendor_index]
                this.setVendor(vendor?{
                    id:out_position.px.toString()+out_position.pz,
                    position:out_position,
                    vendor:vendor,
                    index:(d.o_i*4)+vendor_index
                }:null);
            }else{
                this.setVendor();
            }
        }
    },
    setVendor:function(vendor){
        if(!vendor&&this.vendor){
            this.scene.resetDisplays();
            this.socket.emit('set-vendor',{vendor:false});
            return delete this.vendor;
        }else if((vendor&&!this.vendor)||(vendor&&this.vendor&&this.vendor.index!==vendor.index)){
            this.vendor = vendor;
            this.socket.emit('set-vendor',{vendor:this.vendor});
            this.products_offset = {
                px:vendor.position.px,
                pz:vendor.position.pz,
                ry:vendor.position.ry
            };
            if([4,5,6,7,28,29,30,31,72,73,74,75,76,77,78,79,126,127,122,123,119,118,114,115,110,111,107,106,102,103].indexOf(this.vendor.index)===-1){
                this.search(1,this.vendor.vendor.vendorName,this.vendor.vendor.vendorCategories,this.vendor.vendor.defaultSearch||"");
            }
        }
    },
    receiveSearchError:function(error){
        console.log(error);
        var _this = this;
        this.toggleMessage(true,true);
        clearTimeout(_this.error_timer);
        _this.error_timer = setTimeout(function(){
            _this.toggleMessage(false,true);
        },2000);
    },
    receiveSearchResult:function(response) {
        this.toggleMessage(false,false);
        var layout;
        switch(response.search.page){
            case 1:
                layout = this.scene.layouts.floor_plans().c;
                break;
            case 2:
                layout = this.scene.layouts.floor_plans().e;
                break;
            case 3:
                layout = this.scene.layouts.floor_plans().u;
                break;
            case 4:
                layout = this.scene.layouts.floor_plans().e;//this.layouts.loadLayout('rearCurved10');
                break;
            case 5:
                layout = this.scene.layouts.floor_plans().c;
                break;
        }
        this.scene.loadProductLayout(layout,response.results);
        this.settings.lastSearch = response.search;
    },
    buyNow:function(url){
        var scale = {x:0,y:0,z:0};
        document.querySelector("#buyNow").setAttribute("scale", "0 0 0");
        this.basketButtonTween = new TWEEN.Tween(scale).to({x:0.2,y:0.08,z:0.1}, 250).onUpdate(function(){
            document.querySelector("#buyNowBack").object3D.scale.set(scale.x,scale.y,scale.z);
        }).easing(TWEEN.Easing.Circular.InOut).onComplete(function(){
            document.querySelector("#buyNowBack").setAttribute("scale", "0.2 0.08 0.1");
            document.querySelector("#buyNow").setAttribute("scale", "0.03 0.03 1");
        }).start();
        altspace.open(url);
    },
    addBasket:function(product,vendor){
        var scale = {x:0.26,y:0.08,z:0.1};
        this.socket.emit('addToBasket',{product:product,vendor:vendor});
        if(this.basketButtonTween)this.basketButtonTween.stop();
        document.querySelector("#AddBasket").setAttribute("scale", "0 0 0");
        this.basketButtonTween = new TWEEN.Tween(scale).to({x:0,y:0,z:0}, 250).onUpdate(function(){
            document.querySelector("#AddBasketBack").object3D.scale.set(scale.x,scale.y,scale.z);
        }).easing(TWEEN.Easing.Circular.InOut).onComplete(function(){
            document.querySelector("#AddBasketBack").setAttribute("scale", "0 0 0");
        }).start();
    },
    toggleMessage:function(should_show,is_error){
        var _this = this;
        this.loading_text.getBehaviorByType('n-text').data.text = (is_error?"no results...":"loading...");
        //this.loading_reload.position.z = is_error&&should_show?-0.4:0.4;
        var scale = should_show?{x:-1,y:1,z:1}:{x:0.001,y:0.001,z:0.001};
        // this.loading_text.getBehaviorByType('n-text').data.text = (is_error?"error. please retry...":"loading...");
        new TWEEN.Tween(this.loading.scale).to(scale, 750)
            .easing(TWEEN.Easing.Circular.InOut)
            .start();
        // this.loading.scale.set(scale[0],scale[1],scale[2]);
        // console.log(scale);
        // this.loading_text.scale.set(scale[0],scale[1],scale[2]);
        // this.reload_button.scale.set(scale[0],scale[1],scale[2]);
        // object3d.getBehaviorByType('n-text')
        // this.component.data.text
        //
        // document.querySelector("#loadingText").setAttribute("n-text","text:"+(is_error?"error. please retry...":"loading...")+";fontSize: 1.8; width: 12; verticalAlign: center;horizontalAlign: center;");
        // document.querySelector("#loadingText").setAttribute("scale",should_show?"1 1 1":"0 0 0");
        // document.querySelector("#loadingText").setAttribute("position",is_error?"-0.05 0.41 -2":"0 0.41 -2");
        //
    },
    search:function(page,vendor,categories,searchTerm){
        var _this = this;
        this.scene.resetDisplays();
        this.toggleMessage(true,false);
        this.settings.lastSearch = {
            terms: searchTerm||searchTerm===""?searchTerm:this.settings.lastSearch.terms,
            categories:categories||this.settings.lastSearch.categories,
            vendor:vendor||"AmazonUS",
            page: page
        };
        this.socket.emit('search',this.settings.lastSearch);
        return new Promise(function(resolve){
            _this._search_resolve = resolve;
        });
    },
    parseSettings:function(){
        var seasonMode = this.getParameterByName('season');
        switch(seasonMode){
            case "christ-mas":
                this.season = new Christmas(this);
                break;
            case "new-year":
                this.season = new NewYears(this)
                break;
        }
    },
    getParameterByName:function(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
};