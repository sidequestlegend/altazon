/**
 * Created by autoc on 07/10/2017.
 */
const AmazonAPI = require('../amazon-product-api');
const EventEmitter = require('events').EventEmitter;
const Amazon = function(type){
	this.type = type;
	this.settings = {
		"UK":{
			awsId: "AKIAJGYLCGZRVYER2ZRA",
			awsSecret: "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",
			awsTag: "vrshop0e-20"
		},
		"US":{
			awsId: "AKIAJGYLCGZRVYER2ZRA",
			awsSecret: "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",
			awsTag: "vrshop0e-20"
		},
		"AU":{
			awsId: "AKIAJ5IQUDW5YW3OH4GQ",
			awsSecret: "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",
			awsTag: "vrshop0a-20"
		}
	};
	this.api = AmazonAPI.createClient({
		awsId: this.settings[type||"US"].awsId,
		awsSecret: this.settings[type||"US"].awsSecret,
		awsTag: this.settings[type||"US"].awsTag
	});
};
Amazon.prototype = {};
Amazon.prototype.parseResults = function(results,cacheKey,sockets,options){
	let now = new Date().getTime();
	let parsed = results.map((d,i)=>{
        let price = '', price_numeric = 0;
        if(d.Offers&&d.Offers[0].Offer&&d.Offers[0].Offer[0].OfferListing){
        	let offer = d.Offers[0].Offer[0].OfferListing[0];
        	if(offer.SalePrice&&offer.SalePrice[0].FormattedPrice){
                price = offer.SalePrice[0].FormattedPrice[0];
                if(offer.SalePrice[0].Amount){
                    price_numeric = offer.SalePrice[0].Amount[0];
				}
			}else if(offer.Price&&offer.Price[0].FormattedPrice){
                price = offer.Price[0].FormattedPrice[0];
                if(offer.Price[0].Amount){
                    price_numeric = offer.Price[0].Amount[0];
                }
			}
		}
		if(price === 'Too low to display')price='';
		let item_link = d.ItemLinks[0].ItemLink.filter(d=>d.Description[0]==='');
		let product = {
			title:d.ItemAttributes[0].Title?d.ItemAttributes[0].Title[0]:'',
			sku:d.Offers&&d.Offers[0].Offer&&d.Offers[0].Offer[0].OfferListing[0].OfferListingId?'offerid::'+d.Offers[0].Offer[0].OfferListing[0].OfferListingId[0]:d.ItemAttributes&&d.ItemAttributes[0].ASIN?'asin::'+d.ItemAttributes[0].ASIN[0]:'',
			url:item_link.length?item_link[0].URL[0]:d.Offers&&d.Offers[0].MoreOffersUrl?d.Offers[0].MoreOffersUrl[0]:d.DetailPageURL[0],
			description:this.parseDescription(d),
			extra_description:this.parseExtraDescription(d),
			price_numeric:price_numeric,
			price:price,
			full:d,
			images:d.ImageSets&&d.ImageSets.length?d.ImageSets[0].ImageSet.map((e)=>{
				return {
					large:e.LargeImage[0].URL[0],
					medium:e.MediumImage[0].URL[0]
				}
			}):[],
			index:i
		};
		if(d.LargeImage||d.MediumImage){
            product.images.unshift({
                large:d.LargeImage?d.LargeImage[0].URL[0]:d.MediumImage[0].URL[0],
                medium:d.MediumImage?d.MediumImage[0].URL[0]:d.LargeImage[0].URL[0]
			});
		}
		return product;
	});
	this.searchCache[cacheKey] = {time: now, results: parsed, type:"Amazon"+this.type, search: options};
	if(sockets["shop-floor"]){
		return (options.should_broadcast?sockets["shop-floor"].broadcast.emit("results-broadcast",this.searchCache[cacheKey]):sockets["shop-floor"].emit("results",this.searchCache[cacheKey]));
	}
};
Amazon.prototype.parseDescription = function(d){
	return d.ItemAttributes[0].Feature?d.ItemAttributes[0].Feature.join('\n'):d.ItemAttributes[0].Brand?
		d.ItemAttributes[0].Brand[0]:d.ItemAttributes[0].Studio?
			d.ItemAttributes[0].Studio[0]:d.ItemAttributes[0].Creator?d.ItemAttributes[0].Creator[0]:'';
};

Amazon.prototype.parseExtraDescription = function(d){
	return '';
};
Amazon.prototype.search = function(options,sockets){
	let now = new Date().getTime();
	let cacheKey = options.categories[0].join(',')+options.categories[1].join(',')+"-"+options.terms+"-"+options.page;
	this.searchCache[cacheKey]||options.page>5?
		Promise.resolve()
			.then(()=>{
				if(sockets["shop-floor"]&&!(options.page>5)){
					return (options.should_broadcast?sockets["shop-floor"].broadcast.emit("results-broadcast",this.searchCache[cacheKey]):sockets["shop-floor"].emit("results",this.searchCache[cacheKey]));
				}
			}):(
			this.api.itemSearch({
				searchIndex: options.categories[0].join(','),
				keywords: options.terms,
                browseNode:options.categories[1].join(','),
				responseGroup: 'OfferFull,Medium,Reviews,VariationMatrix',
                //Condition:'New',
                MerchantId : 'All',
        		itemPage:options.page
			})
			.then(results=>{
				this.parseResults(results,cacheKey,sockets,options);
			}))
		.then(()=>{
			Object.keys(this.searchCache).forEach(key => {
				if (now - this.searchCache[key].time > 1000 * 60 * 60) {
					delete this.searchCache[key];
				}
			});
		})
		.catch((err)=>{
			console.log(err);
			if(sockets["shop-floor"]){
				return (options.should_broadcast?sockets["shop-floor"].broadcast.emit('searchError-broadcast', {error: err, type:"Amazon"+this.type}):sockets["shop-floor"].emit('searchError', {error: err, type:"Amazon"+this.type}));
			}
		});
};
Amazon.prototype.open = function(options,sockets){
    this.api.itemLookup({
        itemId: options.ASIN,
        responseGroup: 'Reviews,Variations,VariationImages,Large',
    })
		.then(results=>{
            sockets["add_to_basket"].emit("open-product",results)
		})
		.catch(function(error){
            sockets["main_menu"].emit("open-product",error)
			console.log(JSON.stringify(error));
		});
};
Amazon.prototype.checkout = function(items,sockets){
	var _this = this;
	let basket = {};
	items.forEach(function(item,i){
		if(item.sku.split('::')[0]==='offerid'){
            basket['Item.'+i+'.OfferListingId'] = item.sku.split('::')[1];
		}else{
            basket['Item.'+i+'.ASIN'] = item.sku.split('::')[1];
		}
		basket['Item.'+i+'.Quantity'] = item.quantity;
	});
	return this.api.cartCreate(basket)
		.then((results)=>{
			if(results&&results.length&&results[0].CartId&&results[0].HMAC&&sockets["shop-floor"]){
				return sockets["shop-floor"].emit('checkout', {checkoutUrl: results[0].PurchaseURL[0], type:"Amazon"+_this.type});
			}
		}).catch((err)=>{
			console.log(err);
			if(sockets["shop-floor"]){
				return sockets["shop-floor"].emit('checkoutError', {error: err, type:"Amazon"+_this.type});
			}
		});
};
Amazon.prototype.detail = function(options){

	// commands:[ {
	// 	name: 'itemLookup',
	// 	settings: {
	// 		itemId: ''
	// 	}
	// }],
};
Amazon.prototype.searchCache = {}
module.exports = Amazon;