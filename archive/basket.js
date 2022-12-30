/**
 * Created by autoc on 04/10/2017.
 */
var Basket = function(){
	var _this = this;
	this.shared = new Shared(this);
	this.socket = this.shared.setupSocket()
		.then(function(result){
			_this.socket = result.socket;
			_this.socket.on('connect',function(){
				_this.socket.emit('guid',{guid:result.user.user.userId,client:"basket-checkout"});
			});
			_this.setupSocket();
		});
};
Basket.prototype = {
	setupSocket:function(){
		var _this = this;
		this.socket.on('reloadBasket',function(){
			console.log('reloading-basket')
			setTimeout(function(){_this.socket.emit('getBasket');},1000);
		});
		this.socket.on('getBaskets',function(baskets){
			_this.displayBasket(baskets)
		});
		this.socket.on('checkout',function(url){
			window.location.href = url.checkoutUrl;
		});
		_this.socket.emit('getBaskets');
	},
	productTemplate:document.querySelector('#productDisplay'),
	basketTemplate:document.querySelector('#basketDisplay'),
	displayBasket:function(baskets){
		var _this = this;
		var basket_names = Object.keys(baskets);
		var basket_total = 0;
		var main_container = document.getElementById('main-container');
		var menu_container = document.getElementById('basket-menu-container');
		main_container.innerHTML = menu_container.innerHTML = "";
		basket_names.forEach(function(key){
			var basket = baskets[key];
			var basketTemplate = document.importNode(_this.basketTemplate.content, true);
			basket.products.forEach(function(product){
				var productTemplate = document.importNode(_this.productTemplate.content, true);
				if(product.images.length){
					var image = new Image();
					image.src=product.images[0].large;
					image.style.width = '100%';
					image.style.marginBottom = '5px';
					image.style.borderRadius = '5px';
					productTemplate.querySelector('.image-container').appendChild(image);
				}
				productTemplate.querySelector('.description-container').innerText = product.title;
				productTemplate.querySelector('.quantity-container').innerText = product.quantity.toString();
				productTemplate.querySelector('.price-container').innerText = (product.price_numeric*product.quantity).toFixed(2);
				basketTemplate.querySelector('.basket-container').appendChild(productTemplate);
				basket_total+=product.price_numeric*product.quantity;
			});
			main_container.appendChild(basketTemplate);
			baskets[key].container = document.getElementById('main-container').lastElementChild;
			var menuImage = new Image();
			switch(key){
				case "AmazonUS":
					menuImage.src = '/assets/images/vendor-logos/amazon.png';
					break;
			}
			menuImage.style.width="100px";
			menuImage.addEventListener('click',function(){
				basket_names.forEach(function(name){
					if(baskets[name].container)baskets[name].container.style.display = "none";
				});
				baskets[key].container.style.display = "block";
			});
			menuImage.className="menu-image";
			menu_container.appendChild(menuImage);
			baskets[key].container.style.display = "none";
		});
		var basketTotal = document.getElementById("basket-total");
		basketTotal.innerHTML = (basket_total).toFixed(2);
		if(basket_names.length){
			baskets[basket_names[0]].container.style.display = "block";
		}else{
			document.getElementById('main-container').innerHTML="<h4>Nothing here yet...</h4>"
		}
		console.log(baskets);
	}
};
var basket = new Basket();
function clearBasket(vendor){
	basket.socket.emit('clearBasket',{vendor:vendor});
}
function checkoutBasket(vendor){
	basket.socket.emit('checkoutBasket',{vendor:vendor});
}