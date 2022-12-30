/**
 * Created by autoc on 22/10/2017.
 */
const Amazon = require('./vendors/Amazon');
var Vendors = {
	"AmazonUS":{
		api:new Amazon("US"),
	},
	"EbayUS":{
		api:undefined
	},
	"AmazonAU":{
		api:undefined
	},
	"EbayAU":{
		api:undefined
	},
};
module.exports = Vendors;