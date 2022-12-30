/**
 * Created by autoc on 09/10/2017.
 */
const Ebay = function(){
	this.api = null;
};
Ebay.prototype = require('events').EventEmitter;
Ebay.prototype.search = function(terms,categories,extra_options){

};
Ebay.prototype.get_basket = function(items){

};
module.exports = Ebay;