/**
 * Created by autoc on 07/10/2017.
 */

var Layouts = function(context){
	this.context = context;
};
Layouts.prototype = {
	floor_plans:function(){
    	return {
            w:[
                {px:-4,py:2,ry:-Math.PI/2,s:2,subPositions:[
                    {px:-4,py:1.5,ry:Math.PI},
                    {px:-4,py:2.5,ry:Math.PI}
				]},
                {px:4,py:2,ry:Math.PI/2,s:2,subPositions:[
                    {px:4,py:1.5,ry:0},
                    {px:4,py:2.5,ry:0}
				]},
                {px:0,py:2,ry:Math.PI/2,s:2,subPositions:[
                    {px:0,py:1.5,ry:Math.PI/2},
                    {px:0,py:2.5,ry:Math.PI/2}
				]},
                {px:-2,py:-1,ry:0,s:2,subPositions:[
                    {px:-2.5,py:-1,ry:Math.PI/2},
                    {px:-1.5,py:-1,ry:Math.PI/2}
				]},
                {px:2,py:-1,ry:0,s:2,subPositions:[
                	{px:2.5,py:-1,ry:Math.PI/2},
					{px:1.5,py:-1,ry:Math.PI/2}
				]},
            ],
			e:[
                {px:-4,py:2,ry:-Math.PI/2,s:2,subPositions:[
                    {px:-4,py:1.5,ry:Math.PI},
                    {px:-4,py:2.5,ry:Math.PI}
                ]},
                {px:4,py:2,ry:Math.PI/2,s:2,subPositions:[
                    {px:4,py:1.5,ry:0},
                    {px:4,py:2.5,ry:0}
                ]},
                {px:0,py:3,ry:0,s:2,subPositions:[
                    {px:-0.5,py:3,ry:Math.PI/2},
                    {px:0.5,py:3,ry:Math.PI/2}
                ]},
                {px:0,py:-1.5,ry:0,s:2,subPositions:[
                    {px:-0.5,py:-1.5,ry:Math.PI/2},
                    {px:0.5,py:-1.5,ry:Math.PI/2}
                ]},
                {px:3,py:-1,ry:Math.PI*1.75,s:1,subPositions:[{px:3,py:-1,ry:Math.PI*0.25}]},
                {px:-3,py:-1,ry:Math.PI/4,s:1,subPositions:[{px:-3,py:-1,ry:Math.PI*0.75}]},

			],
            u:[
                {px:-3,py:2,ry:-Math.PI/2,s:3,subPositions:[
                    {px:3,py:3,ry:0},
                    {px:3,py:2,ry:0},
                    {px:3,py:1,ry:0}
                ]},
                {px:3,py:2,ry:Math.PI/2,s:3,subPositions:[
                    {px:-3,py:3,ry:Math.PI},
                    {px:-3,py:2,ry:Math.PI},
                    {px:-3,py:1,ry:Math.PI}
                ]},
                {px:-1,py:-1,ry:0,s:2,subPositions:[
                    {px:-1.5,py:-1,ry:Math.PI/2},
                    {px:-0.5,py:-1,ry:Math.PI/2}
                ]},
                {px:1,py:-1,ry:0,s:2,subPositions:[
                    {px:1.5,py:-1,ry:Math.PI/2},
                    {px:0.5,py:-1,ry:Math.PI/2}
                ]},
            ],
            c:[
                this.circlePointPosition(0,4,1,{x:0,y:2}),
                this.circlePointPosition(-20,4,1,{x:0,y:2}),
                this.circlePointPosition(-40,4,1,{x:0,y:2}),
                this.circlePointPosition(-60,4,1,{x:0,y:2}),
                this.circlePointPosition(-80,4,1,{x:0,y:2}),
                this.circlePointPosition(-100,4,1,{x:0,y:2}),
                this.circlePointPosition(-120,4,1,{x:0,y:2}),
                this.circlePointPosition(-140,4,1,{x:0,y:2}),
                this.circlePointPosition(-160,4,1,{x:0,y:2}),
                this.circlePointPosition(-180,4,1,{x:0,y:2}),
            ]
        };
	},
    pointOnCircle:function(degrees,radius,is_x){
        return is_x?Math.cos(degrees*(Math.PI / 180))*radius:Math.sin(degrees*(Math.PI / 180))*radius;
    },
    circlePointPosition:function(degrees,radius,size,offset){
        return {
            px:this.pointOnCircle(degrees,radius,true)+(offset?offset.x:0),
			ry:-degrees*(Math.PI / 180),
			py:this.pointOnCircle(degrees,radius,false)+(offset?offset.y:0),
			s:size,
			subPositions:[{
                px:this.pointOnCircle(degrees,radius,true)+(offset?offset.x:0),
                ry:(-degrees)*(Math.PI / 180),
                py:this.pointOnCircle(degrees,radius,false)+(offset?offset.y:0),
			}]
        };
    },
};
// Layouts.prototype = {
// 	offset:{
// 		position:{
// 			x:6.05,y:0,z:-10
// 			// x:0,
// 			// y:0,
// 			// z:-15,
// 		},
// 		rotation:{
// 			x:0,
// 			y:180,
// 			z:0,
// 		}
// 	},
// 	__:{
// 		box:"productDisplayBox",
// 		suspended:"productDisplaySuspended",
// 		banner:"productDisplayBanner",
// 		curved:"productDisplayCurved",
// 	},
// 	setProduct:function(product){
// 		this.product = product;
// 	},
// 	setDisplayImage:function(image,display,is_curved,is_reset){
// 		return new Promise(function(resolve){
// 			if(is_reset){
// 				display.setAttribute('scale',"0 0 0");
// 				display.setAttribute('material','shader:flat;side:double;transparent:true;');//side:double;repeat:-1 1;transparent:true;src:url(/assets/images/display_texture.png)
// 				return;
// 			}
// 			var img = new Image();
// 			display.setAttribute('material','shader:flat;side:double;transparent:true;src:url('+image+')');
// 			img.onload = function(){
// 				var ratio = img.width/img.height;
// 				var original_scale = {x:display.dataset.original_scale.split(' ')[0],y:display.dataset.original_scale.split(' ')[1]}
// 				var x_scale = (ratio>1?original_scale.x:ratio*original_scale.y);
// 				var y_scale = (ratio>1?(1/ratio)*original_scale.x:original_scale.y);
// 				display.setAttribute('scale',is_curved?x_scale+' '+y_scale+' 0.3':x_scale+' '+y_scale+' 1');
// 				resolve({width:x_scale,height:y_scale});
// 			};
// 			img.src = image;
// 		});
// 	},
// 	setupDisplays:function(){
// 		var _this = this;
// 		this.box = [];
// 		this.suspended = [];
// 		this.banner = [];
// 		this.curved = [];
// 		for(var i = 0; i< 14;i++){
// 			this.box.push(new Display(this.__.box,this));
// 			if(i<8){
// 				this.curved.push(new Display(this.__.curved,this));
// 			}
// 			if(i<6){
// 				this.suspended.push(new Display(this.__.suspended,this));
// 			}
// 			if(i<2){
// 				this.banner.push(new Display(this.__.banner,this));
// 			}
// 		}
// 		// AFRAME.registerComponent('display-container', {
// 		// 	schema: {default: ''},
// 		// 	init: function () {
// 		// 		_this.root_element = this.el;
// 		// 		_this.is_ready = true;
// 		// 		var byNow = function(){
// 		// 			if(_this.product){
// 		// 				_this.context.buyNow(_this.product.url);
// 		// 			}
// 		// 		};
// 		// 		var addBasket = function(){
// 		// 			if(_this.product){
// 		// 				_this.context.addBasket(_this.product,_this.vendor_type);
// 		// 			}
// 		// 		};
// 		// 		//document.querySelector("#AddBasket").object3D.addEventListener('cursordown',byNow);
// 		// 		document.querySelector("#AddBasketBack").object3D.addEventListener('cursordown',addBasket);
// 		// 		//document.querySelector("#buyNow").object3D.addEventListener('cursordown',addBasket);
// 		// 		document.querySelector("#buyNowBack").object3D.addEventListener('cursordown',byNow);
// 		// 	}
// 		// });
// 	},
// 	hideAllDetail:function(){
// 		[this.box,this.suspended,this.banner,this.curved].forEach(function(displays) {
// 			displays.forEach(function (display) {
// 				if(display.is_detail_open)display.toggleDetail();
// 			});
// 		});
// 	},
// 	hideAll:function(){
// 		[this.box,this.suspended,this.banner,this.curved].forEach(function(displays) {
// 			displays.forEach(function (display) {
// 				if(display.is_appended&&display.is_open)display.toggle(false);
// 			});
// 		});
// 		document.querySelector("#horizontalDescriptionTop").setAttribute("position","0 -1 0");
// 		document.querySelector("#verticalDescriptionTop").setAttribute("position","0 -1 0");
// 	},
// 	loadLayout:function(type){
// 		var _this = this;
// 		var displayLayouts = this.layouts()[type]();
// 		displayLayouts.forEach(function(layout,i){
// 			return layout.original_index = i;
// 		});
// 		this.current_layout = [
// 			displayLayouts.filter(function(d){return d.type === _this.__.box}),
// 			displayLayouts.filter(function(d){return d.type === _this.__.suspended}),
// 			displayLayouts.filter(function(d){return d.type === _this.__.banner}),
// 			displayLayouts.filter(function(d){return d.type === _this.__.curved})
// 		];
// 		return this.current_layout;
// 	},
// 	loadProducts:function(products){
// 		var _this = this;
// 		this.root_element.setAttribute('position',this.offset.position);
// 		this.root_element.setAttribute('rotation',this.offset.rotation);
// 		document.querySelector('#descriptionContainer').setAttribute('position',this.offset.position);
// 		document.querySelector('#descriptionContainer').setAttribute('rotation',this.offset.rotation);
// 		_this.current_layout.forEach(function(type){type.forEach(function(display){delete display.product})});
// 		products.forEach(function(product){
// 			var type_index=-1,display_index=-1;
// 			_this.current_layout.filter(function(type,ii){
// 				var check = type.filter(function(display,i){
// 					var check = display.original_index === product.index;
// 					if(check)display_index = i;
// 					return check;
// 				}).length;
// 				if(check)type_index = ii;
// 				return check;
// 			});
// 			if(type_index>-1&&display_index>-1){
// 				_this.current_layout[type_index][display_index].product = product;
// 			}
// 		});
// 		[this.box,this.suspended,this.banner,this.curved].forEach(function(displays,ii){
// 			displays.forEach(function(display,i){
// 				if(!display.is_appended){
// 					_this.root_element.appendChild(display.element);
// 					display.element = _this.root_element.lastElementChild;
// 					display.element.setAttribute('position','0 -2 0');
// 					display.is_appended=true;
// 				}
// 				if(_this.current_layout[ii][i]&&_this.current_layout[ii][i].product){
// 					display.setProduct(_this.current_layout[ii][i].product);
// 					display.setPositionRotation(_this.current_layout[ii][i]);
// 					display.toggle(true);
// 				}else{
// 					display.toggle(false);
// 				}
// 			});
// 		});
// 	},
// 	layouts:function(){
// 		var _this = this;
// 		return {
// 			frontBanner10:function(){
// 				var pointsOnCircle = [];
// 				var maxDegrees = 140;
// 				var degreesStep = 140*0.125;
// 				var degreesOffset = 28;
// 				var radius = 8;
// 				for(var i = 0;i<maxDegrees;i+=degreesStep){
// 					pointsOnCircle.push({x:_this.pointOnCircle(i+degreesOffset,radius,true),z:_this.pointOnCircle(i+degreesOffset,radius,false),rotY:maxDegrees-i-78});
// 				}
// 				return [
// 					{positionX:-4,positionZ:-3.5,rotationY:-70,type:_this.__.banner},
// 					{positionX:4,positionZ:-3.5,rotationY:70,type:_this.__.banner},
// 					{positionX:0.5,positionZ:0,rotationY:0,type:_this.__.suspended},
// 					{positionX:-0.5,positionZ:0,rotationY:0,type:_this.__.suspended},
// 					{positionX:-4,positionZ:-1.5,rotationY:-90,type:_this.__.box},
// 					{positionX:4,positionZ:-1.5,rotationY:90,type:_this.__.box},
// 					{positionX:-4,positionZ:-0.5,rotationY:-90,type:_this.__.box},
// 					{positionX:4,positionZ:-0.5,rotationY:90,type:_this.__.box},
// 					{positionX:-4,positionZ:0.5,rotationY:-90,type:_this.__.box},
// 					{positionX:4,positionZ:0.5,rotationY:90,type:_this.__.box},
// 				]
// 			},
// 			rearCurved10:function() {
// 				var pointsOnCircle = [];
// 				var maxDegrees = 140;
// 				var degreesStep = 140 * 0.125;
// 				var degreesOffset = 28;
// 				var radius = 8;
// 				for (var i = 0; i < maxDegrees; i += degreesStep) {
// 					pointsOnCircle.push({
// 						x: _this.pointOnCircle(i + degreesOffset, radius, true),
// 						z: _this.pointOnCircle(i + degreesOffset, radius, false),
// 						rotY: maxDegrees - i - 78
// 					});
// 				}
// 				return [
// 					{positionX:-1.5,positionZ:-3,rotationY:0,type:_this.__.suspended},
// 					{positionX:1.5,positionZ:-3,rotationY:0,type:_this.__.suspended},
// 					{positionX:pointsOnCircle[7].x,positionZ:pointsOnCircle[7].z-6,rotationY:pointsOnCircle[7].rotY,type:_this.__.curved},
// 					{positionX:pointsOnCircle[6].x,positionZ:pointsOnCircle[6].z-6,rotationY:pointsOnCircle[6].rotY,type:_this.__.curved},
// 					{positionX:pointsOnCircle[5].x,positionZ:pointsOnCircle[5].z-6,rotationY:pointsOnCircle[5].rotY,type:_this.__.curved},
// 					{positionX:pointsOnCircle[4].x,positionZ:pointsOnCircle[4].z-6,rotationY:pointsOnCircle[4].rotY,type:_this.__.curved},
// 					{positionX:pointsOnCircle[3].x,positionZ:pointsOnCircle[3].z-6,rotationY:pointsOnCircle[3].rotY,type:_this.__.curved},
// 					{positionX:pointsOnCircle[2].x,positionZ:pointsOnCircle[2].z-6,rotationY:pointsOnCircle[2].rotY,type:_this.__.curved},
// 					{positionX:pointsOnCircle[1].x,positionZ:pointsOnCircle[1].z-6,rotationY:pointsOnCircle[1].rotY,type:_this.__.curved},
// 					{positionX:pointsOnCircle[0].x,positionZ:pointsOnCircle[0].z-6,rotationY:pointsOnCircle[0].rotY,type:_this.__.curved},
// 				]
// 			}
// 		}
// 	},
// 	centerIsle:function(){
// 		return [
// 			{position:{x:30, y:5, z:-40},rotation:{x:0, y:70, z:0}, type:"vertical-banner"},
// 			{position:{x:30, y:5, z:-52},rotation:{x:0, y:70, z:0}, type:"vertical-banner"},
// 			{position:{x:-30, y:5, z:-40},rotation:{x:0, y:-90, z:0}, type:"light-box"},
// 			{position:{x:-30, y:5, z:-52},rotation:{x:0, y:-90, z:0}, type:"light-box"},
// 			{position:{x:-20, y:5, z:-11},rotation:{x:0, y:0, z:0}, type:"light-box"},
// 			{position:{x:20, y:5, z:-11},rotation:{x:0, y:0, z:0}, type:"light-box"},
// 			{position:{x:-31, y:5, z:-11},rotation:{x:0, y:0, z:0}, type:"light-box"},
// 			{position:{x:31, y:5, z:-11},rotation:{x:0, y:0, z:0}, type:"light-box"},
// 			{position:{x:-20, y:5, z:0},rotation:{x:0, y:-90, z:0}, type:"light-box"},
// 			{position:{x:-20, y:5, z:11},rotation:{x:0, y:-90, z:0}, type:"light-box"},
// 			{position:{x:-20, y:5, z:22},rotation:{x:0, y:-90, z:0}, type:"light-box"},
// 			{position:{x:20, y:5, z:0},rotation:{x:0, y:90, z:0}, type:"light-box"},
// 			{position:{x:20, y:5, z:11},rotation:{x:0, y:90, z:0}, type:"light-box"},
// 			{position:{x:20, y:5, z:22},rotation:{x:0, y:90, z:0}, type:"light-box"},
// 			{position:this.circlePointPosition((140*0.125)+28,60),rotation:{x:0, y:(140-(140*0.125))-78, z:0}, type:"light-box"},
// 			{position:this.circlePointPosition((140*.25)+28,60),rotation:{x:0, y:(140-(140*.25))-78, z:0}, type:"light-box"},
// 			{position:this.circlePointPosition((140*.375)+28,60),rotation:{x:0, y:(140-(140*.375))-78, z:0}, type:"light-box"},
// 			{position:this.circlePointPosition((140*.5)+28,60),rotation:{x:0, y:(140-(140*.5))-78, z:0}, type:"light-box"},
// 			{position:this.circlePointPosition((140*.625)+28,60),rotation:{x:0, y:(140-(140*.625))-78, z:0}, type:"light-box"},
// 			{position:this.circlePointPosition((140*.75)+28,60),rotation:{x:0, y:(140-(140*.75))-78, z:0}, type:"light-box"},
// 			{position:this.circlePointPosition((140*.875)+28,60),rotation:{x:0, y:(140-(140*.875))-78, z:0}, type:"light-box"},
// 			{position:this.circlePointPosition((140)+28,60),rotation:{x:0, y:(140-(140))-78, z:0}, type:"light-box"},
// 		]
// 	},
// 	centerIsland:function(){
// 		return [
// 			{position:{x:30, y:5, z:-40},rotation:{x:0, y:70, z:0}, type:"vertical-banner"},
// 			{position:{x:30, y:5, z:-52},rotation:{x:0, y:70, z:0}, type:"vertical-banner"},
// 			{position:{x:-30, y:5, z:-40},rotation:{x:0, y:-70, z:0}, type:"light-box"},
// 			{position:{x:-30, y:5, z:-52},rotation:{x:0, y:-70, z:0}, type:"light-box"},
// 			{position:{x:-35, y:5, z:-11},rotation:{x:0, y:-90, z:0}, type:"light-box"},
// 			{position:{x:35, y:5, z:-11},rotation:{x:0, y:90, z:0}, type:"light-box"},
// 			{position:{x:-6, y:5, z:11},rotation:{x:0, y:0, z:0}, type:"light-box"},
// 			{position:{x:6, y:5, z:11},rotation:{x:0, y:0, z:0}, type:"light-box"},
// 			{position:{x:-35, y:5, z:0},rotation:{x:0, y:-90, z:0}, type:"light-box"},
// 			{position:{x:-35, y:5, z:11},rotation:{x:0, y:-90, z:0}, type:"light-box"},
// 			{position:{x:-35, y:5, z:22},rotation:{x:0, y:-90, z:0}, type:"light-box"},
// 			{position:{x:35, y:5, z:0},rotation:{x:0, y:90, z:0}, type:"light-box"},
// 			{position:{x:35, y:5, z:11},rotation:{x:0, y:90, z:0}, type:"light-box"},
// 			{position:{x:35, y:5, z:22},rotation:{x:0, y:90, z:0}, type:"light-box"},
// 			{position:this.circlePointPosition((140*0.125)+28,60),rotation:{x:0, y:(140-(140*0.125))-78, z:0}, type:"light-box"},
// 			{position:this.circlePointPosition((140*.25)+28,60),rotation:{x:0, y:(140-(140*.25))-78, z:0}, type:"light-box"},
// 			{position:this.circlePointPosition((140*.375)+28,60),rotation:{x:0, y:(140-(140*.375))-78, z:0}, type:"light-box"},
// 			{position:this.circlePointPosition((140*.5)+28,60),rotation:{x:0, y:(140-(140*.5))-78, z:0}, type:"light-box"},
// 			{position:this.circlePointPosition((140*.625)+28,60),rotation:{x:0, y:(140-(140*.625))-78, z:0}, type:"light-box"},
// 			{position:this.circlePointPosition((140*.75)+28,60),rotation:{x:0, y:(140-(140*.75))-78, z:0}, type:"light-box"},
// 			{position:this.circlePointPosition((140*.875)+28,60),rotation:{x:0, y:(140-(140*.875))-78, z:0}, type:"light-box"},
// 			{position:this.circlePointPosition((140)+28,60),rotation:{x:0, y:(140-(140))-78, z:0}, type:"light-box"},
// 		]
// 	},
// 	pointOnCircle:function(degrees,radius,is_x){
// 		return is_x?Math.cos(degrees*(Math.PI / 180))*radius:Math.sin(degrees*(Math.PI / 180))*radius;
// 	},
// 	circlePointPosition:function(degrees,radius){
// 		return {
// 			x:this.pointOnCircle(degrees,radius,true), y:5, z:this.pointOnCircle(degrees,radius,false),
// 		};
// 	}
// };