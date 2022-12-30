var LoadModels = function(context){
    this.context = context;
    this.gltf_loader = new THREE.GLTFLoader();
};

LoadModels.prototype = {
    loadGLTFModel:function(url){
        var _this = this;
        return new Promise(function(resolve,reject){
            _this.gltf_loader.load(
                url,
                function ( object ) {
                    console.log('Loaded:',object);
                    var traverse = function(children){

                        children.forEach(function(child){
                            if(child.material&&child.material.type === "MeshStandardMaterial"){
                                child.material.type = "MeshBasicMaterial";
                            }
                            if(child.children&&child.children.length)traverse(child.children);
                        });
                    };
                    traverse(object.scene.children);
                    resolve(object);
                },
                function( xhr ) {
                    //console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                },
                function(error){
                    reject(error);
                });
        });
    },
    loadJSONModel:function(path,image,repeatx,repeaty){
        return new Promise(function(resolve,reject){
            var oReq = new XMLHttpRequest();
            oReq.addEventListener("load", function(){
                try {
                    var texture = new THREE.TextureLoader().load(image);
                    texture.repeat.set(repeatx||1,repeaty||1);
                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;
                    resolve(new THREE.Mesh(
                        new THREE.JSONLoader().parse(JSON.parse(this.responseText)).geometry,
                        new THREE.MeshBasicMaterial({map:texture,transparent:true})));
                }catch(e){
                    reject(e);
                }
            });
            oReq.open("GET", path);
            oReq.send();
        });
    },
    loadAllModels:function(){
        var _this = this;
        return Promise.all([
            // this.loadJSONModel('/assets/models/shop_floors/shop_floors0.json','/assets/images/floor.jpg',20,20),
            // this.loadJSONModel('/assets/models/shop_floors/shop_floors1.json','/assets/images/floor.jpg',20,20),
            // this.loadJSONModel('/assets/models/shop_floors/shop_floors2.json','/assets/images/floor.jpg',20,20),
            // this.loadJSONModel('/assets/models/shop_floors/shop_floors3.json','/assets/images/floor.jpg',20,20),
            //this.loadJSONModel('/assets/models/sign_backs.json','/assets/images/confectionary.png',10,1),
            // this.loadJSONModel('/assets/models/shops.json','/assets/images/display_texture.png'),
            // this.loadJSONModel('/assets/models/roads/roads_1.json','/assets/images/pavement.jpg',5,12.5),
            // this.loadJSONModel('/assets/models/roads/roads_2.json','/assets/images/pavement.jpg',7.5,100),
            // this.loadJSONModel('/assets/models/roads/roads_3.json','/assets/images/pavement.jpg',5,50),
            // this.loadJSONModel('/assets/models/roads/roads_4.json','/assets/images/pavement.jpg',2.5,50),
            // this.loadJSONModel('/assets/models/roads/road_curve.json','/assets/images/pavement.jpg',50,50),
            // this.loadJSONModel('/assets/models/roads/road_curve2.json','/assets/images/pavement.jpg',4,4),
            // this.loadJSONModel('/assets/models/roads/road_curve3.json','/assets/images/pavement.jpg',20,20)
        ]).then(function(objects){
            var obj = new THREE.Object3D();
            objects.forEach(function(object,i){
                if(i>2&&i<8)object.position.y = 0.47;
                if(i>0&&i<3)object.position.y = 0.65;
                _this.context.simulation.scene.add(object);
                //
                if(i===9){

                    // var exporter = new THREE.OBJExporter();
                    // var result = exporter.parse( object );
                    // console.log(result)
                }
                if(i>9){
                    obj.add(object);
                }
            });
            //
        });
    }
};
