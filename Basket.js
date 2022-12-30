/**
 * Created by autoc on 06/10/2017.
 */
var Basket = function(){
	this.products = [];
	this.add = function(product){
		var existing_index = this.products.map(d=>d.sku).indexOf(product.sku);
		if(existing_index>-1){
			this.products[existing_index].quantity++;
		}else{
			product.quantity = 1;
			return this.products.push(product);
		}
	};
	this.remove = function(index){
		if(this.products[index])this.products.splice(index,1);
	};
	this.setQuantity = function(index,quantity){
		if(this.products[index])this.products.quantity = quantity;
	};
};
module.exports = Basket;