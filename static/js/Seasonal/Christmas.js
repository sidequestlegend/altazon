var Christmas = function(context){
    this.context = context;
    this.context.scene.mode = 'snow';
    this.snow_men();
    this.trees();
};
Christmas.prototype = {
    snow_men:function(){
        var _this = this;
        return Promise.all([
            this.context.scene.loadJSONModel('/assets/models/seasons/christmas/snow_man_body.json','/assets/images/snow_texture.png'),
            this.context.scene.loadJSONModel('/assets/models/seasons/christmas/snow_man_coal.json','/assets/images/snow_texture.png','#0f0f1d'),
            this.context.scene.loadJSONModel('/assets/models/seasons/christmas/snow_man_arms.json','/assets/images/wood_texture.png'),
            this.context.scene.loadJSONModel('/assets/models/seasons/christmas/snow_man_hat_nose.json','/assets/images/snow_texture.png','#ff5f1d'),
        ]).then(function(objects){
            objects.forEach(function(object){
                object.traverse(function(mesh){
                    mesh.userData = { altspace: { collider: { enabled: false } } };
                });
                _this.context.simulation.scene.add(object);
            });
        })
    },
    trees:function(){
        var _this = this;
        return Promise.all([
            this.context.scene.loadJSONModel('/assets/models/seasons/christmas/trees.json','/assets/images/green_texture_snow.png'),
            this.context.scene.loadJSONModel('/assets/models/seasons/christmas/tree_trunks.json','/assets/images/wood_texture.png'),
            this.context.scene.loadJSONModel('/assets/models/seasons/christmas/tree_boubles.json','/assets/images/snow_texture.png','#d50000'),
            this.context.scene.loadJSONModel('/assets/models/seasons/christmas/tree_tinsel.json','/assets/images/snow_texture.png','#673ab7'),
        ]).then(function(objects){
            objects.forEach(function(object){
                _this.context.simulation.scene.add(object);
            });
        })
    },
}