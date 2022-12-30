/**
 * Created by autoc on 07/10/2017.
 */
var Display = function(type,context){
	this.type = type;
	this.context = context;
	this.setup();
};
Display.prototype = {
	is_open:false,
	is_detail_open:false,
	templates:{
		productDisplayBox:document.querySelector('#productDisplayBox'),
		productDisplayBanner:document.querySelector('#productDisplayBanner'),
		productDisplaySuspended:document.querySelector('#productDisplaySuspended'),
		productDisplayCurved:document.querySelector('#productDisplayCurved')
	},
	setProduct:function(product){
		var _this = this;
		this.product = product;
		// this.title = product.title;
		// this.description = product.description;
		// this.sku = product.sku;
		// this.extra_description = product.extra_description;
		// this.price = product.price;
		// this.url = product.url;
		// this.images = product.images;
		this.setProductImages();
		this.element.object3D.addEventListener("cursorup",function(){
			_this.context.hideAllDetail();
			if(!_this.is_detail_open)_this.toggleDetail();
		});
	},
	toggleDetail:function(){
		var updateFunction;
		var detail_y = 1.003;
		switch(this.type) {
			case this.context.__.box:
				updateFunction = this.toggleBox.bind(this);
				this.element.querySelector(".box-post").object3D.position.y = this.is_detail_open?-0.75:0.1;
				break;
			case this.context.__.suspended:
				updateFunction = this.toggleSuspended.bind(this);
				detail_y = 0.755;
				break;
			case this.context.__.curved:
				updateFunction = this.toggleCurved.bind(this);
				detail_y = 0.755;
				break;
			case this.context.__.banner:
				updateFunction = this.toggleBanner.bind(this);
				detail_y = 0.53;
				break;
		}
		if(updateFunction){
			var _this = this;
			this.is_detail_open = !this.is_detail_open;
			var position = {z:this.is_detail_open?0:1};
			if(this.detail_tween)this.detail_tween.stop();
			this.detail_tween = new TWEEN.Tween(position).to({z:this.is_detail_open?1:0}, 350).onUpdate(function(){updateFunction(position)}).onComplete(function(){
				delete _this.detail_tween;
			}).easing(TWEEN.Easing.Circular.InOut).start()
		}
		this.setProductImages();
		this.context.setProduct(this.product);
		if(this.is_detail_open){
			document.querySelector("#horizontalTitle").setAttribute("n-text","text:"+this.product.title);
			document.querySelector("#horizontalPrice").setAttribute("n-text","text:"+this.product.price);
			document.querySelector("#horizontalDescriptionTop").setAttribute("position",this.element.object3D.position.x+" "+detail_y+" "+this.element.object3D.position.z);
			document.querySelector("#verticalDescriptionTop").setAttribute("position",this.element.object3D.position.x+" 1.5 "+this.element.object3D.position.z);
			document.querySelector("#horizontalBack").setAttribute("rotation","0 0 "+(this.element.object3D.rotation.y*180/Math.PI));
		}else{
			document.querySelector("#horizontalDescriptionTop").setAttribute("position","0 -1 0");
			document.querySelector("#verticalDescriptionTop").setAttribute("position","0 -1 0");
		}
	},
	toggleCurved:function(position){
		this.element.querySelector(".curved-display").object3D.position.z = (position.z/10)-0.32;
		this.element.querySelector(".left-post").object3D.position.y =
			this.element.querySelector(".right-post").object3D.position.y = 0.5-(position.z*0.6);
	},
	toggleSuspended:function(position){
		this.element.querySelector(".suspended-display").object3D.position.z = position.z/10;
		this.element.querySelector(".left-post").object3D.position.y =
			this.element.querySelector(".right-post").object3D.position.y = 0.5-(position.z*0.6);
	},
	toggleBanner:function(position){
		this.element.querySelector(".tall-display").object3D.position.z = position.z/10;
		this.element.querySelector(".small-top-display").object3D.position.z = position.z/10;
		this.element.querySelector(".small-bottom-display").object3D.position.z = position.z/10;

	},
	toggleBox:function(position){
		this.element.querySelector(".box-display").object3D.position.z = position.z/10;
	},
	setProductImages:function(){
		var _this = this;
		switch(this.type){
			case this.context.__.box:
				if(this.product.images&&this.product.images.length)this.context.setDisplayImage(this.is_detail_open?this.product.images[0].large:this.product.images[0].medium,this.element.querySelector(".box-display"),false);
				break;
			case this.context.__.suspended:
				if(this.product.images&&this.product.images.length)this.context.setDisplayImage(this.is_detail_open?this.product.images[0].large:this.product.images[0].medium,this.element.querySelector(".suspended-display"),false);
				break;
			case this.context.__.curved:
				if(this.product.images&&this.product.images.length)this.context.setDisplayImage(this.is_detail_open?this.product.images[0].large:this.product.images[0].medium,this.element.querySelector(".curved-display"),true);
				break;
			case this.context.__.banner:
				var tallDisplay = this.element.querySelector(".tall-display"),
					topDisplay = this.element.querySelector(".small-top-display"),
					bottomDisplay = this.element.querySelector(".small-bottom-display");
				if(this.product.images&&this.product.images.length) {
					this.context.setDisplayImage(this.product.images[0].large, tallDisplay, false)
						.then(function (size) {
							var original_scale = {
								x: tallDisplay.dataset.original_scale.split(' ')[0],
								y: tallDisplay.dataset.original_scale.split(' ')[1]
							};
							tallDisplay.setAttribute('position',
								(_this.product.images.length===1?0:(0.3 - ((size.width - original_scale.x) / 2)))
								+ ' ' +
								tallDisplay.dataset.original_position.split(' ')[1]
								+ ' ' +
								tallDisplay.dataset.original_position.split(' ')[2]
							);
						});
				}else{
					this.context.setDisplayImage('/assets/images/display_texture.png',tallDisplay,false,true)
						.then(function(){
							tallDisplay.setAttribute('position',tallDisplay.dataset.original_position);
						});
				}
				if(this.product.images&&this.product.images.length>1) {
					this.context.setDisplayImage(this.is_detail_open?this.product.images[1].large:this.product.images[1].medium,topDisplay,false)
						.then(function(size){
							var original_scale = {x:topDisplay.dataset.original_scale.split(' ')[0],y:topDisplay.dataset.original_scale.split(' ')[1]};
							topDisplay.setAttribute('position',
								(-0.6-((size.width-original_scale.x) / 2))
								+' '+
								(parseFloat(topDisplay.dataset.original_position.split(' ')[1])+((size.height-original_scale.y)/2))
								+' '+
								topDisplay.dataset.original_position.split(' ')[2]
							);
						});
				}else{
					this.context.setDisplayImage('/assets/images/display_texture.png',topDisplay,false,true)
						.then(function(){
							topDisplay.setAttribute('position',topDisplay.dataset.original_position);
						});
				}
				if(this.product.images&&this.product.images.length>2) {
					this.context.setDisplayImage(this.is_detail_open?this.product.images[2].large:this.product.images[2].medium,bottomDisplay,false)
						.then(function(size){
							var original_scale = {x:bottomDisplay.dataset.original_scale.split(' ')[0],y:bottomDisplay.dataset.original_scale.split(' ')[1]};
							bottomDisplay.setAttribute('position',
								(-0.6-((size.width-original_scale.x) / 2))
								+' '+
								(parseFloat(bottomDisplay.dataset.original_position.split(' ')[1])-((size.height-original_scale.y)/2))
								+' '+
								bottomDisplay.dataset.original_position.split(' ')[2]
							);
						});
				}else{
					this.context.setDisplayImage('/assets/images/display_texture.png',bottomDisplay,false,true)
						.then(function(){
							bottomDisplay.setAttribute('position',bottomDisplay.dataset.original_position);
						});
				}
				break;
		}
	},
	resetProductImages:function(){
		this.product.images = [
			{medium: '/assets/images/display_texture.png'},
			{medium: '/assets/images/display_texture.png'},
			{medium: '/assets/images/display_texture.png'}
		];
		this.setProductImages();
	},
	setup:function(){
		switch(this.type){
			case this.context.__.box:
				this.element = document.importNode(this.templates.productDisplayBox.content, true);
				var display = this.element.querySelector(".box-display");
				display.dataset.original_scale = display.getAttribute('scale');
				break;
			case this.context.__.banner:
				this.element = document.importNode(this.templates.productDisplayBanner.content, true);
				var display = this.element.querySelector(".tall-display");
				display.dataset.original_scale = display.getAttribute('scale');
				display.dataset.original_position = display.getAttribute('position');
				var display2 = this.element.querySelector(".small-top-display");
				display2.dataset.original_scale = display2.getAttribute('scale');
				display2.dataset.original_position = display2.getAttribute('position');
				var display3 = this.element.querySelector(".small-bottom-display");
				display3.dataset.original_scale = display3.getAttribute('scale');
				display3.dataset.original_position = display3.getAttribute('position');
				break;
			case this.context.__.suspended:
				this.element = document.importNode(this.templates.productDisplaySuspended.content, true);
				var display = this.element.querySelector(".suspended-display");
				display.dataset.original_scale = display.getAttribute('scale');
				break;
			case this.context.__.curved:
				this.element = document.importNode(this.templates.productDisplayCurved.content, true);
				var display = this.element.querySelector(".curved-display");
				display.dataset.original_scale = display.getAttribute('scale');
				break;
		}
	},
	setPositionRotation:function(positionAndRotation){
		this.element.setAttribute('position',positionAndRotation.positionX+' -2 '+positionAndRotation.positionZ);
		this.element.setAttribute('rotation','0 '+positionAndRotation.rotationY+' 0');
	},
	toggle:function(should_open){
		var _this = this;
		if(_this.is_open===should_open)return Promise.resolve();
		_this.is_open = should_open;
		return new Promise(function(resolve){
			var position = {y:should_open?-2:0.5};
			if(_this.tween)_this.tween.stop();
			_this.tween = new TWEEN.Tween(position).to({y:should_open?0.5:-2}, 750).delay(750*Math.random()).onUpdate(function(){
				_this.element.object3D.position.y = position.y;
			}).onComplete(function(){
				//_this.resetProductImages();
				delete _this.tween;
				resolve();
			}).easing(TWEEN.Easing.Circular.InOut).start();
		});
	}
}