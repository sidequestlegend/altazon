/**
 * Created by autoc on 27/10/2017.
 */
var Props = function(){

};
Props.prototype = {
	randomBlob:function(is_large){
		var _this = this;
		var get_points = function(){
			var points = [
				new THREE.Vector3(-_this.rndPnt(0.3,0.2),0,-_this.rndPnt(0.3,0.1)),
				new THREE.Vector3(-_this.rndPnt(0.3,0.2),0,-_this.rndPnt(0.3,0.1)),
				new THREE.Vector3(_this.rndPnt(0.3,0.1),0,-_this.rndPnt(0.4,0.1)),
				new THREE.Vector3(_this.rndPnt(0.3,0.1),0,_this.rndPnt(0.2,0.1)),
				new THREE.Vector3(_this.rndPnt(0.3,0.1),0,_this.rndPnt(0.2,0.1)),
				new THREE.Vector3(-_this.rndPnt(0.3,0.1),0,_this.rndPnt(0.3,0.1)),

				new THREE.Vector3(-_this.rndPnt(0.45,0.2),_this.rndPnt(0.38,0.15),_this.rndPnt(0.45,0.3)),
				new THREE.Vector3(-_this.rndPnt(0.45,0.3),_this.rndPnt(0.35,0.1),-_this.rndPnt(0.45,0.3)),
				new THREE.Vector3(_this.rndPnt(0.45,0.3),_this.rndPnt(0.35,0.1),-_this.rndPnt(0.45,0.3)),
				new THREE.Vector3(_this.rndPnt(0.45,0.3),_this.rndPnt(0.35,0.1),_this.rndPnt(0.45,0.3)),
				new THREE.Vector3(_this.rndPnt(0.45,0.3),_this.rndPnt(0.35,0.1),_this.rndPnt(0.45,0.3)),
				new THREE.Vector3(-_this.rndPnt(0.45,0.3),_this.rndPnt(0.35,0.1),_this.rndPnt(0.45,0.3)),

				new THREE.Vector3(-_this.rndPnt(0.5,0.3),_this.rndPnt(0.75,0.3),-_this.rndPnt(0.5,0.3)),
				new THREE.Vector3(-_this.rndPnt(0.5,0.3),_this.rndPnt(0.75,0.3),-_this.rndPnt(0.5,0.3)),
				new THREE.Vector3(_this.rndPnt(0.5,0.3),_this.rndPnt(0.75,0.3),-_this.rndPnt(0.5,0.3)),
				new THREE.Vector3(_this.rndPnt(0.5,0.3),_this.rndPnt(0.75,0.3),_this.rndPnt(0.5,0.3)),
				new THREE.Vector3(_this.rndPnt(0.5,0.3),_this.rndPnt(0.75,0.3),_this.rndPnt(0.5,0.3)),
				new THREE.Vector3(-_this.rndPnt(0.5,0.3),_this.rndPnt(0.75,0.3),_this.rndPnt(0.5,0.3)),
			];

			if(is_large){
				points = points.concat([
					new THREE.Vector3(-_this.rndPnt(0.25,0.1),_this.rndPnt(1.15,0.3),-_this.rndPnt(0.35,0.1)),
					new THREE.Vector3(-_this.rndPnt(0.25,0.1),_this.rndPnt(1.15,0.3),-_this.rndPnt(0.35,0.1)),
					new THREE.Vector3(_this.rndPnt(0.25,0.1),_this.rndPnt(1.15,0.3),-_this.rndPnt(0.35,0.1)),
					new THREE.Vector3(_this.rndPnt(0.25,0.1),_this.rndPnt(1.15,0.3),_this.rndPnt(0.35,0.1)),
					new THREE.Vector3(_this.rndPnt(0.25,0.1),_this.rndPnt(1.15,0.3),_this.rndPnt(0.35,0.1)),
					new THREE.Vector3(-_this.rndPnt(0.25,0.1),_this.rndPnt(1.15,0.3),_this.rndPnt(0.35,0.1)),
				]);
			}
			return points;
		};

		return new THREE.ConvexGeometry(get_points().concat(get_points()));
	},
	treeRoot:function(){
		var points = [
			new THREE.Vector3(-0.17,0,-0.25),
			new THREE.Vector3(-0.17,0,0.25),
			new THREE.Vector3(-0.4*Math.random()-0.4,0,0),
			new THREE.Vector3(-0.17,0.2*Math.random()+0.9,0),
			];
		return new THREE.ConvexGeometry(points);
	},
	treeStump:function(){
		var points = [
			new THREE.Vector3(-0.1,0,-0.1),
			new THREE.Vector3(0,0,-0.47),
			new THREE.Vector3(0.1,0,-0.1),
			new THREE.Vector3(-0.39,0,0),
			new THREE.Vector3(-0.1,0,0.1),
			new THREE.Vector3(0,0,0.42),
			new THREE.Vector3(0.1,0,0.1),
			new THREE.Vector3(0.47,0,0),

			new THREE.Vector3(-0.2,0.4,-0.2),
			new THREE.Vector3(0,0.4,-0.3),
			new THREE.Vector3(0.2,0.4,-0.2),
			new THREE.Vector3(-0.3,0.4,0),
			new THREE.Vector3(-0.2,0.4,0.2),
			new THREE.Vector3(0,0.4,0.3),
			new THREE.Vector3(0.2,0.4,0.2),
			new THREE.Vector3(0.3,0.4,0),

			new THREE.Vector3(-0.2,0.6,-0.2),
			new THREE.Vector3(0,0.6,-0.3),
			new THREE.Vector3(0.2,0.6,-0.2),
			new THREE.Vector3(-0.3,0.6,0),
			new THREE.Vector3(-0.2,0.6,0.2),
			new THREE.Vector3(0,0.6,0.3),
			new THREE.Vector3(0.2,0.6,0.2),
			new THREE.Vector3(0.3,0.6,0),
		];
		return new THREE.ConvexGeometry(points);
	},
	treeBase:function(rotation,has_base){
		var root1 = this.treeRoot();
		var obj = new THREE.Mesh(root1,new THREE.MeshBasicMaterial());
		obj.rotation.set(0,Math.PI*1.7,0);
		obj.updateMatrixWorld();
		obj.updateMatrix();
		root1.merge(this.treeRoot(),obj.matrix);

		// var obj1 = new THREE.Mesh(this.treeRoot(),new THREE.MeshBasicMaterial());
		// obj1.rotation.set(0,Math.PI*1.3,0);
		// obj1.updateMatrixWorld();
		// obj1.updateMatrix();
		// root1.merge(obj1.geometry,obj1.matrix);


		var obj2 = new THREE.Mesh(this.treeRoot(),new THREE.MeshBasicMaterial());
		obj2.rotation.set(0,Math.PI*0.9,0);
		obj2.updateMatrixWorld();
		obj2.updateMatrix();
		root1.merge(obj2.geometry,obj2.matrix);

		//
		// var obj3 = new THREE.Mesh(this.treeRoot(),new THREE.MeshBasicMaterial());
		// obj3.rotation.set(0,Math.PI*0.55,0);
		// obj3.updateMatrixWorld();
		// obj3.updateMatrix();
		// root1.merge(obj3.geometry,obj3.matrix);

		root1.merge(this.treeRoot());
		if(!has_base){

			var obj3 = new THREE.Mesh(new THREE.PlaneGeometry(2,2),new THREE.MeshBasicMaterial());
			obj3.rotation.set(-Math.PI/2,0,-rotation);
			obj3.updateMatrixWorld();
			obj3.updateMatrix();


			var obj31 = new THREE.Mesh(new THREE.BoxGeometry(0.1,2,0.1),new THREE.MeshBasicMaterial());
			//obj31.rotation.set(-rotation,0,0);
			obj31.position.set(-0.95,0,0.05);
			obj3.add(obj31);
			obj31.updateMatrixWorld();
			obj31.updateMatrix();



			var obj32 = new THREE.Mesh(new THREE.BoxGeometry(0.1,2,0.1),new THREE.MeshBasicMaterial());
			//obj31.rotation.set(-rotation,0,0);
			obj32.position.set(0.95,0,0.05);
			obj3.add(obj32);
			obj32.updateMatrixWorld();
			obj32.updateMatrix();




			var obj33 = new THREE.Mesh(new THREE.BoxGeometry(0.1,1.8,0.1),new THREE.MeshBasicMaterial());
			obj33.rotation.set(0,0,Math.PI/2);
			obj33.position.set(0,-0.95,0.05);
			obj3.add(obj33);
			obj33.updateMatrixWorld();
			obj33.updateMatrix();




			var obj34 = new THREE.Mesh(new THREE.BoxGeometry(0.1,1.8,0.1),new THREE.MeshBasicMaterial());
			obj34.rotation.set(0,0,Math.PI/2);
			obj34.position.set(0,0.95,0.05);
			obj3.add(obj34);
			obj34.updateMatrixWorld();
			obj34.updateMatrix();

			//
			root1.merge(obj33.geometry,obj33.matrixWorld);
			root1.merge(obj34.geometry,obj34.matrixWorld);
			root1.merge(obj32.geometry,obj32.matrixWorld);
			root1.merge(obj31.geometry,obj31.matrixWorld);
		}








		var branchpoints = [

			new THREE.Vector3(-0.2,0,-0.2),
			new THREE.Vector3(0,0,-0.15),
			new THREE.Vector3(0.2,0,-0.2),
			new THREE.Vector3(-0.15,0,0),
			new THREE.Vector3(-0.1,0,0.1),
			new THREE.Vector3(0,0,0.15),
			new THREE.Vector3(0.2,0,0.2),
			new THREE.Vector3(0.15,0,0),

			new THREE.Vector3(-0.1,0.8,-0.1),
			new THREE.Vector3(0,0.8,-0.15),
			new THREE.Vector3(0.1,0.8,-0.1),
			new THREE.Vector3(-0.15,0.8,0),
			new THREE.Vector3(-0.1,0.8,0.1),
			new THREE.Vector3(0,0.8,0.15),
			new THREE.Vector3(0.1,0.8,0.1),
			new THREE.Vector3(0.15,0.8,0),
			];
		;


		var obj4 = new THREE.Mesh(new THREE.ConvexGeometry(branchpoints),new THREE.MeshBasicMaterial());
		obj4.rotation.set(Math.PI*0.2,0,0);
		obj4.position.set(0,2.3,0.05);
		obj4.updateMatrixWorld();
		root1.merge(obj4.geometry,obj4.matrix);




		var obj5 = new THREE.Mesh(new THREE.ConvexGeometry(branchpoints),new THREE.MeshBasicMaterial());
		obj5.rotation.set(Math.PI*-0.2,0,0);
		obj5.position.set(0,2.1,-0.05);
		obj5.updateMatrixWorld();
		root1.merge(obj5.geometry,obj5.matrix);

		var points = [

			new THREE.Vector3(-0.2,0,-0.2),
			new THREE.Vector3(0,0,-0.3),
			new THREE.Vector3(0.2,0,-0.2),
			new THREE.Vector3(-0.3,0,0),
			new THREE.Vector3(-0.2,0,0.2),
			new THREE.Vector3(0,0,0.3),
			new THREE.Vector3(0.2,0,0.2),
			new THREE.Vector3(0.3,0,0),

			new THREE.Vector3(-0.2,2.5,-0.2),
			new THREE.Vector3(0,2.5,-0.3),
			new THREE.Vector3(0.2,2.5,-0.2),
			new THREE.Vector3(-0.3,2.5,0),
			new THREE.Vector3(-0.2,2.5,0.2),
			new THREE.Vector3(0,2.5,0.3),
			new THREE.Vector3(0.2,2.5,0.2),
			 new THREE.Vector3(0.3,2.5,0),
			new THREE.Vector3(0,2.7,0),
		];
		var geometry = new THREE.ConvexGeometry(points);
		geometry.merge(root1);
		return geometry;
	},
	lampPost:function(){

	},
	mountain:function(){
		var ground = new THREE.Mesh(
			new THREE.PlaneGeometry(100, 50, 10, 10),
			new THREE.MeshNormalMaterial()
		);
		ground.rotation.x = -Math.PI/2;
		ground.geometry.vertices[4]
		for (var i=0; i<ground.geometry.vertices.length; i++) {
			vertex = ground.geometry.vertices[i];
			if (Math.abs(vertex.x) > 1500 || Math.abs(vertex.y) > 1500) {
				vertex.z = 500;
				if (vertex.y > 0 && vertex.y - 1500 <=  1000) vertex.y -= 1000;
				else if (vertex.y < 0 && vertex.y + 1500 >= -1000) vertex.y += 1000;
				if (vertex.x > 0 && vertex.x - 1500 <=  1000) vertex.x -= 1000;
				else if (vertex.x < 0 && vertex.x + 1500 >= -1000) vertex.x += 1000;
			}
		}
	},
	roadSquare:function(x,y,w,h,repeatX,repeatY){
		var geometry = new THREE.PlaneGeometry( w, h);
		var texture =new THREE.TextureLoader().load('/assets/images/pavement.jpg');
		texture.repeat.set(repeatX,repeatY);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		var material = new THREE.MeshBasicMaterial( {/* color: 0xffff00,*/ map:texture } );
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.y = -0.006;
		mesh.position.x = x;
		mesh.position.z = y;
		mesh.rotation.z = 0;
		mesh.rotation.x = -Math.PI/2;
		return mesh;
	},
	roadCurve:function(x,z,innerRadius,outterRadius,start, end, rotationY, repeat, is_full_circle){
		var geometry = new THREE.RingGeometry( innerRadius, outterRadius, is_full_circle?32:16, 1, start, end );
		var texture =new THREE.TextureLoader().load('/assets/images/pavement.jpg');
		texture.repeat.set(repeat,repeat);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		var material = new THREE.MeshBasicMaterial( {/* color: 0xffff00,*/ map:texture } );
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.y = -0.005;
		mesh.position.x = x||0;
		mesh.position.z = z||0;
		mesh.rotation.z = rotationY;
		mesh.rotation.x = -Math.PI/2;
		return mesh
	},
	rndPnt:function(range, offset){
		return offset+Math.random()*range;
	}
}