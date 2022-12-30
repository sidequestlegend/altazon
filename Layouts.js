/**
 * Created by autoc on 26/10/2017.
 */
let Layouts = function(){

};
Layouts.prototype = {
	altspaceMarket:function(){
		return {
			extras:[
				{type:"street-sign",settings:{x:95.5,y:4.5,signs:
					{north:'Bartok Basin',
					east:'Cape Clam',
					west:'Elizabeth Avenue',
					south:'Bartok Basin'},
				}},
				{type:"street-sign",settings:{x:55.5,y:4.5,signs:
                    {north:'Bobby Boulevard',
                        east:'Elizabeth Avenue',
                        west:'Elizabeth Avenue',
                        south:'Bobby Boulevard'},
                }},
				{type:"street-sign",settings:{x:25.5,y:4.5,signs:
                    {north:'Francois Forecourt',
                        east:'Elizabeth Avenue',
                        west:'Elizabeth Avenue',
                        south:'Francois Forecourt'},
                }},
				{type:"street-sign",settings:{x:4.5,y:4.5,signs:
                    {north:'Morris Mile',
                        east:'Elizabeth Avenue',
                        west:'Elizabeth Avenue',
                        south:'Morris Mile'},
                }},
				{type:"street-sign",settings:{x:-25.5,y:4.5,signs:
                    {north:'Martin\'s Meadow',
                        east:'Elizabeth Avenue',
                        west:'Elizabeth Avenue',
                        south:'Martin\'s Meadow'},
                }},
				{type:"street-sign",settings:{x:-25.5,y:-65.5,signs:
                    {north:'Martin\'s Meadow',
                        east:'Rockabella Ridge',
                        west:'Silvers Tip',
                        south:'Martin\'s Meadow'},
                }},
				{type:"street-sign",settings:{x:-61,y:4.5,signs:
                    {north:'Chazen Plaza',
                        south:'Sloan Speedway',
                        east:'Elizabeth Avenue'},
                }},
				{type:"street-sign",settings:{x:-56.5,y:-24.5,signs:
                    {north:'Sloan Speedway',
                        south:'Sloan Speedway',
                        west:'Chazen Plaza'},
                }},
				{type:"street-sign",settings:{x:4.5,y:120.5,signs:
                    {north:'Morris Mile',
                        east:'Strike Valley',
                        west:'Strike Valley'},
                }},
				{type:"street-sign",settings:{x:4.5,y:35.5,signs:
                    {north:'Morris Mile',
                        east:'Missus Mews',
                        west:'Missus Mews',
                        south:'Morris Mile'},
                }},
				{type:"street-sign",settings:{x:4.5,y:-65.5,signs:
                    {north:'Morris Mile',
                        east:'Rockabella Ridge',
                        west:'Rockabella Ridge',
                        south:'Morris Mile'},
                }},
				{type:"street-sign",settings:{x:4.5,y:-150.5,signs:
                    {south:'Morris Mile',
                        east:'Schmiddy Summit',
                        west:'Schmiddy Summit'},
                }},
			],
			outlets:[//http://docs.aws.amazon.com/AWSECommerceService/latest/DG/localevalues.html
				{type:"four",position:{x:-15, y:-90},rotation:{y:180},ground:"normal",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['Electronics'],['172541']]},//headphones
                    {defaultSearch:"speaker bar",vendorName:"AmazonUS",vendorCategories:[['Electronics'],['667846011']]},// home audio
                    {vendorName:"AmazonUS",vendorCategories:[['KindleStore'],['133141011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['Electronics'],['524136']]}//security
                ]},
				{type:"four",position:{x:30, y:-87},rotation:{y:45},ground:"normal",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['Beauty'],['11055981']]},
                    {defaultSearch:"snacks",vendorName:"AmazonUS",vendorCategories:[['Grocery'],['16322721']]},
                    {vendorName:"AmazonUS",vendorCategories:[['Fashion'],['7141124011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['KindleStore'],['133141011']]}
                ]},
				{type:"four",position:{x:-15, y:-50},rotation:{y:180},ground:"normal",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['Electronics'],['1077068']]},
                    {vendorName:"AmazonUS",vendorCategories:[['Electronics'],['541966']]},//computers
                    {vendorName:"AmazonUS",vendorCategories:[['Electronics'],['172574']]},//office elec
                    {vendorName:"AmazonUS",vendorCategories:[['Electronics'],['172623']]}//portable audio
                ]},
				{type:"four",position:{x:15, y:-50},rotation:{y:180},ground:"normal",vendors:[
                    {defaultSearch:"fresh",vendorName:"AmazonUS",vendorCategories:[['Grocery'],['6506977011']]},//produce
                    {defaultSearch:"baked goods",vendorName:"AmazonUS",vendorCategories:[['Pantry'],[]]},//bakery
                    {vendorName:"AmazonUS",vendorCategories:[['Electronics'],['1266092011']]},//tv video
                    {vendorName:"AmazonUS",vendorCategories:[['Electronics'],['10048700011']]}//wearable
                ]},
				{type:"four",position:{x:40, y:-50},rotation:{y:180},ground:"normal",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['Toys'],['166118011']]},//dolls
                    {vendorName:"AmazonUS",vendorCategories:[['Toys'],['165993011']]},//action figures
                    {defaultSearch:"fresh",vendorName:"AmazonUS",vendorCategories:[['Grocery'],['371460011']]},//dairy
                    {defaultSearch:"fresh",vendorName:"AmazonUS",vendorCategories:[['Grocery'],['371469011']]}//meat/seafood
                ]},
				{type:"four",position:{x:85, y:-50},rotation:{y:180},ground:"normal",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['Appliances'],['2619526011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['ArtsAndCrafts'],['2617942011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['Toys'],['166242011']]},//Trading Card Games
                    {defaultSearch:"arcade",vendorName:"AmazonUS",vendorCategories:[['Toys'],['166249011']]}//Game Room
                ]},
				{type:"four",position:{x:110, y:-50},rotation:{y:180},ground:"normal",vendors:[
                    {defaultSearch:'jet ski',vendorName:"AmazonUS",vendorCategories:[['All'],[]]},
                    {defaultSearch:'beach inflatable',vendorName:"AmazonUS",vendorCategories:[['All'],[]]},
                    {defaultSearch:'cooking baking',vendorName:"AmazonUS",vendorCategories:[['Pantry'],[]]},
                    {vendorName:"AmazonUS",vendorCategories:[['OfficeProducts'],['1084128']]}
                ]},
				{type:"four",position:{x:95, y:-87},rotation:{y:135},ground:"normal",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['Beauty'],['11055981']]},
                    {vendorName:"AmazonUS",vendorCategories:[['Beauty'],['11055981']]},
                    {vendorName:"AmazonUS",vendorCategories:[['Fashion'],['7141124011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['OfficeProducts'],['1084128']]}
                ]},
				{type:"four",position:{x:15, y:-20},rotation:{y:180},ground:"normal",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['Grocery'],['979861011']]},//home brew
                    {defaultSearch:"tea coffee",vendorName:"AmazonUS",vendorCategories:[['Pantry'],['16521305011']]},//coffee tea
                    {defaultSearch:'casio',vendorName:"AmazonUS",vendorCategories:[['Watches'],['378516011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['Electronics'],['2102313011']]}// amazon devices
                ]},
				{type:"four",position:{x:40, y:-20},rotation:{y:180},ground:"normal",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['Toys'],['166239011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['Toys'],['166225011']]},//Toys & Games/Games/Board Games
                    {defaultSearch:'pasta',vendorName:"AmazonUS",vendorCategories:[['Pantry'],[]]},//Pasta & Noodles
                    {defaultSearch:'herbs',vendorName:"AmazonUS",vendorCategories:[['Grocery'],['16310281']]}//Herbs, Spices & Seasonings
                ]},
				{type:"four",position:{x:85, y:-20},rotation:{y:180},ground:"normal",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['Software'],['409488']]},
                    {vendorName:"AmazonUS",vendorCategories:[['MobileApps'],['2350150011']]},
                    {defaultSearch:'gadget',vendorName:"AmazonUS",vendorCategories:[['Toys'],['166027011']]},//novelty & gag
                    {defaultSearch:'balloons',vendorName:"AmazonUS",vendorCategories:[['Toys'],['1266203011']]}// party supplies
                ]},//10
				{type:"four",position:{x:110, y:-20},rotation:{y:180},ground:"normal",vendors:[
                    {defaultSearch:'surf wax',vendorName:"AmazonUS",vendorCategories:[['All'],[]]},
                    {defaultSearch:'fishing',vendorName:"AmazonUS",vendorCategories:[['All'],[]]},
                    {vendorName:"AmazonUS",vendorCategories:[['Beauty'],['11060451']]},
                    {vendorName:"AmazonUS",vendorCategories:[['Books'],['599858']]}
                ]},
				{type:"four",position:{x:-15, y:-20},rotation:{y:180},ground:"normal",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['Electronics'],['14775004011']]},// vr devices
                    {vendorName:"AmazonUS",vendorCategories:[['Electronics'],['2407748011']]},//CARRIER CELL PHONES
                    {defaultSearch:'Outdoor',vendorName:"AmazonUS",vendorCategories:[['All'],[]]},//Outdoor Recreation
                    {vendorName:"AmazonUS",vendorCategories:[['SportingGoods'],['10971181011']]}//Sports & Fitness
                ]},
				{type:"four",position:{x:-15, y:20},rotation:{y:180},ground:"normal",vendors:[
                    {defaultSearch:'living',vendorName:"AmazonUS",vendorCategories:[['HomeGarden'],['1063306']]},
                    {vendorName:"AmazonUS",vendorCategories:[['Books'],['1000']]},
                    {vendorName:"AmazonUS",vendorCategories:[['Toys'],['166057011']]},//arts and crafts
                    {defaultSearch:'collectibles',vendorName:"AmazonUS",vendorCategories:[['SportingGoods'],['3386071']]},// Sports fan shop
                ]},
				{type:"four",position:{x:15, y:20},rotation:{y:180},ground:"normal",vendors:[
                    {defaultSearch:'jelly',vendorName:"AmazonUS",vendorCategories:[['Pantry'],[]]},//Jams
                    {defaultSearch:'candy',vendorName:"AmazonUS",vendorCategories:[['Pantry'],['']]},//sweats
                    {vendorName:"AmazonUS",vendorCategories:[['PetSupplies'],['2619534011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['MusicalInstruments'],['11965861']]},
                ]},//.56
				{type:"four",position:{x:40, y:20},rotation:{y:180},ground:"normal",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['Music'],['301668']]},
                    {vendorName:"AmazonUS",vendorCategories:[['Movies'],['2901953011']]},
                    {defaultSearch:'breakfast',vendorName:"AmazonUS",vendorCategories:[['Pantry'],[]]},// breakfast foods
                    {defaultSearch:'food',vendorName:"AmazonUS",vendorCategories:[['Pantry'],[]]},// cooking & baking//{defaultSearch:"ring",vendorName:"AmazonUS",vendorCategories:[['Fashion'],['9539894011','7941204011','9539904011']]},//wedding
                ]},
				{type:"four",position:{x:85, y:20},rotation:{y:180},ground:"normal",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['Handmade'],['11260433011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['GiftCards'],['2864120011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['VideoGames'],['468642']]},
                    {vendorName:"AmazonUS",vendorCategories:[['Books'],['2402172011']]}
                ]},
				{type:"four",position:{x:110, y:20},rotation:{y:180},ground:"normal",vendors:[
                    {defaultSearch:'sailing',vendorName:"AmazonUS",vendorCategories:[['All'],[]]},
                    {defaultSearch:'snorkling',vendorName:"AmazonUS",vendorCategories:[['All'],[]]},
                    {vendorName:"AmazonUS",vendorCategories:[['Automotive'],['15690151']]},
                    {vendorName:"AmazonUS",vendorCategories:[['Collectibles'],['4991426011']]}
                ]},
				{type:"four",position:{x:30, y:57},rotation:{y:135},ground:"normal",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['Beauty'],['11055981']]},
                    {vendorName:"AmazonUS",vendorCategories:[['Books'],['1000']]},
                    {vendorName:"AmazonUS",vendorCategories:[['Fashion'],['7141124011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['KindleStore'],['133141011']]}
                ]},
				{type:"four",position:{x:95, y:57},rotation:{y:45},ground:"normal",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['SportingGoods'],['14760814011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['Books'],['1000']]},
                    {vendorName:"AmazonUS",vendorCategories:[['Fashion'],['7141124011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['KindleStore'],['133141011']]}
                ]},
				{type:"four",position:{x:-15, y:60},rotation:{y:180},ground:"normal",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['Electronics'],['172435']]},//Camera Shop
                    {vendorName:"AmazonUS",vendorCategories:[['Electronics'],['172463']]},//Cables/Computer
                    {vendorName:"AmazonUS",vendorCategories:[['Toys'],['166269011']]},//learning & ed
                    {vendorName:"AmazonUS",vendorCategories:[['Toys'],['276729011']]}//hobbies
                ]},//20


				{type:"two",position:{x:0, y:-178},rotation:{y:270},ground:"long",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['HomeAndBusinessServices'],['11525224011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['HomeAndBusinessServices'],['10192825011']]},
                ]},
				{type:"two",position:{x:-32.5, y:-178},rotation:{y:270},ground:"long",vendors:[
                    {defaultSearch:"kitchen bathroom",vendorName:"AmazonUS",vendorCategories:[['Kitchen'],[]]},
                    {defaultSearch:"smart appliances",vendorName:"AmazonUS",vendorCategories:[['All'],[]]},

                ]},
				{type:"two",position:{x:-65, y:-178},rotation:{y:270},ground:"long",vendors:[
                    {defaultSearch:"home improvement",vendorName:"AmazonUS",vendorCategories:[['Tools'],[]]},
                    {defaultSearch:"tools",vendorName:"AmazonUS",vendorCategories:[['Tools'],['511228']]},
                ]},

				{type:"four",position:this.circlePointPosition(30,53.275,{x:-135,y:-23.5}),rotation:{y:30},ground:"slim",vendors:[
                    {defaultSearch:"clothes",vendorName:"AmazonUS",vendorCategories:[['FashionGirls'],['7147442011']]},
                    {defaultSearch:"clothes",vendorName:"AmazonUS",vendorCategories:[['FashionBoys'],['7147443011']]},
                    {defaultSearch:"gown",vendorName:"AmazonUS",vendorCategories:[['FashionWomen'],['7147440011']]},
                    {defaultSearch:"trousers",vendorName:"AmazonUS",vendorCategories:[['FashionMen'],['7147441011']]},
                ]},
				{type:"four",position:this.circlePointPosition(60,53.275,{x:-135,y:-23.5}),rotation:{y:60},ground:"slim",vendors:[
                    {defaultSearch:"clothes",vendorName:"AmazonUS",vendorCategories:[['FashionBaby'],['7147444011']]},
                    {defaultSearch:"top",vendorName:"AmazonUS",vendorCategories:[['Fashion'],['3455821','3456051']]},
                    {vendorName:"AmazonUS",vendorCategories:[['ArtsAndCrafts'],['2617942011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['ArtsAndCrafts'],['2617942011']]}
                ]},
				{type:"four",position:this.circlePointPosition(90,53.275,{x:-135,y:-23.5}),rotation:{y:90},ground:"slim",vendors:[
                    {defaultSearch:"shoes",vendorName:"AmazonUS",vendorCategories:[['Fashion'],['679337011']]},
                    {defaultSearch:"handbags",vendorName:"AmazonUS",vendorCategories:[['Fashion'],['15743631']]},
                    {vendorName:"AmazonUS",vendorCategories:[['ArtsAndCrafts'],['2617942011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['ArtsAndCrafts'],['2617942011']]}
                ]},
				{type:"four",position:this.circlePointPosition(120,53.275,{x:-135,y:-23.5}),rotation:{y:120},ground:"slim",vendors:[
                    {defaultSearch:"jewelery",vendorName:"AmazonUS",vendorCategories:[['Fashion'],['2516784011']]},
                    {defaultSearch:"watch",vendorName:"AmazonUS",vendorCategories:[['Fashion'],['6358543011','6358539011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['ArtsAndCrafts'],['2617942011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['ArtsAndCrafts'],['2617942011']]}
                ]},
				{type:"four",position:this.circlePointPosition(150,53.275,{x:-135,y:-23.5}),rotation:{y:150},ground:"slim",vendors:[
                    {defaultSearch:"accessories",vendorName:"AmazonUS",vendorCategories:[['Fashion'],['2474936011','2474937011']]},
                    {defaultSearch:"perfume",vendorName:"AmazonUS",vendorCategories:[['Beauty'],['11056761','11056931']]},//fragrance
                    {vendorName:"AmazonUS",vendorCategories:[['ArtsAndCrafts'],['2617942011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['ArtsAndCrafts'],['2617942011']]}
                ]},
				{type:"four",position:this.circlePointPosition(180,53.275,{x:-135,y:-23.5}),rotation:{y:180},ground:"slim",vendors:[
                    {defaultSearch:"gown",vendorName:"AmazonUS",vendorCategories:[['Fashion'],['7581677011']]},//plus size
				    {defaultSearch:"briefcases",vendorName:"AmazonUS",vendorCategories:[['Fashion'],['9479199011']]},//luggage
                    {vendorName:"AmazonUS",vendorCategories:[['ArtsAndCrafts'],['2617942011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['ArtsAndCrafts'],['2617942011']]}
                ]},
				{type:"four",position:this.circlePointPosition(210,53.275,{x:-135,y:-23.5}),rotation:{y:210},ground:"slim",vendors:[
                    {defaultSearch:"hi-vis",vendorName:"AmazonUS",vendorCategories:[['Fashion'],['7586144011']]},
                    {defaultSearch:"",vendorName:"AmazonUS",vendorCategories:[['Fashion'],['7581675011']]},//maternity
                    {vendorName:"AmazonUS",vendorCategories:[['ArtsAndCrafts'],['2617942011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['ArtsAndCrafts'],['2617942011']]}
                ]},
				{type:"four",position:this.circlePointPosition(240,53.275,{x:-135,y:-23.5}),rotation:{y:240},ground:"slim",vendors:[
                    {defaultSearch:"",vendorName:"AmazonUS",vendorCategories:[['Fashion'],['7586165011','7147445011']]},//novelty and costume
                    {defaultSearch:"gel",vendorName:"AmazonUS",vendorCategories:[['Beauty'],['11059311','11062291']]},//nail care & art
                    {vendorName:"AmazonUS",vendorCategories:[['ArtsAndCrafts'],['2617942011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['ArtsAndCrafts'],['2617942011']]}
                ]},//30
				{type:"four",position:this.circlePointPosition(270,53.275,{x:-135,y:-23.5}),rotation:{y:270},ground:"slim",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['Beauty'],['11058281']]},
                    {defaultSearch:"color",vendorName:"AmazonUS",vendorCategories:[['Beauty'],['11057241']]},//hair care
                    {defaultSearch:"safety",vendorName:"AmazonUS",vendorCategories:[['LawnAndGarden'],[]]},
                    {vendorName:"AmazonUS",vendorCategories:[['LawnAndGarden'],['3043471']]}//sNOW rEMOVAL
                ]},
				{type:"four",position:this.circlePointPosition(300,53.275,{x:-135,y:-23.5}),rotation:{y:300},ground:"slim",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['Fashion'],['1048188']]},//women's jeans
                    {vendorName:"AmazonUS",vendorCategories:[['Fashion'],['2474945011']]},//women's hats
                    {vendorName:"AmazonUS",vendorCategories:[['LawnAndGarden'],['1272941011']]},//Pools, Hot Tubs & Supplies
                    {vendorName:"AmazonUS",vendorCategories:[['LawnAndGarden'],['553760']]},//Outdoor Cooking
                ]},
				{type:"four",position:this.circlePointPosition(330,53.275,{x:-135,y:-23.5}),rotation:{y:330},ground:"slim",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['Fashion'],['7072324011']]},//scarves
                    {vendorName:"AmazonUS",vendorCategories:[['Fashion'],['15697821011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['LawnAndGarden'],['3610851']]},//Gardening
                    {vendorName:"AmazonUS",vendorCategories:[['LawnAndGarden'],['553788']]},//Outdoor Décor
                ]},


				{type:"two",position:this.circlePointPosition(270,53.275,{x:33,y:-125}),rotation:{y:270},ground:"slim",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['HomeAndBusinessServices'],['10192827011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['HomeAndBusinessServices'],['10192830011']]},
                ]},
				{type:"two",position:this.circlePointPosition(300,53.275,{x:33,y:-125}),rotation:{y:300},ground:"slim",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['HomeAndBusinessServices'],['10192831011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['HomeAndBusinessServices'],['10192821011']]},
                ]},
				{type:"two",position:this.circlePointPosition(330,53.275,{x:33,y:-125}),rotation:{y:330},ground:"slim",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['HomeAndBusinessServices'],['10192825011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['HomeAndBusinessServices'],['10192838011']]},
                ]},
				{type:"two",position:this.circlePointPosition(0,53.275,{x:33,y:-125}),rotation:{y:0},ground:"slim",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['HomeAndBusinessServices'],['10192836011']]},
                    {vendorName:"AmazonUS",vendorCategories:[['HomeAndBusinessServices'],['10943282011']]},
                ]},

				{type:"two",position:this.circlePointPosition(180,53.275,{x:-97.5,y:-125}),rotation:{y:180},ground:"slim",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['Tools'],['3754161']]},//Bathroom
                    {defaultSearch:"tools",vendorName:"AmazonUS",vendorCategories:[['Tools'],['511228']]},//Hardware
                ]},
				{type:"two",position:this.circlePointPosition(210,53.275,{x:-97.5,y:-125}),rotation:{y:210},ground:"slim",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['Tools'],['516188']]},//HEATING
                    {vendorName:"AmazonUS",vendorCategories:[['Tools'],['553898']]},//lAWN AND gARBDEN
                ]},
				{type:"two",position:this.circlePointPosition(240,53.275,{x:-97.5,y:-125}),rotation:{y:240},ground:"slim",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['Tools'],['228899']]},//painting supplies
                    {vendorName:"AmazonUS",vendorCategories:[['Tools'],['3180231']]},//home security
                ]},//40
				{type:"two",position:this.circlePointPosition(270,53.275,{x:-97.5,y:-125}),rotation:{y:270},ground:"slim",vendors:[
                    {vendorName:"AmazonUS",vendorCategories:[['Tools'],['552262']]},//power tools
                    {vendorName:"AmazonUS",vendorCategories:[['Tools'],['551238']]},//hand tools
                ]},
			]
		}
	},
	pointOnCircle:function(degrees,radius,is_x){
		return is_x?Math.cos(degrees*(Math.PI / 180))*radius:Math.sin(degrees*(Math.PI / 180))*radius;
	},
	circlePointPosition:function(degrees,radius,offset){
		return {
			x:this.pointOnCircle(degrees,radius,true)+offset.x, y:this.pointOnCircle(degrees,radius,false)+offset.y,
		};
	}
};
module.exports = Layouts;

/* --forest



 {type:"tree-trunk",settings:{x:-43,y:-31.7}},
 {type:"tree-trunk",settings:{x:-40.5,y:-30.2}},

 {type:"tree-trunk",settings:{x:-42,y:-29.1}},
 {type:"tree-trunk",settings:{x:-40.7,y:-28.5}},

 {type:"tree-trunk",settings:{x:-42.5,y:-27.9}},
 {type:"tree-trunk",settings:{x:-40.5,y:-27.3}},

 {type:"tree-trunk",settings:{x:-41.5,y:-25.9}},
 {type:"tree-trunk",settings:{x:-43,y:-24.6}},

 {type:"tree-trunk",settings:{x:-42.7,y:-23.9}},
 {type:"tree-trunk",settings:{x:-41,y:-22.8}},
 {type:"tree-trunk",settings:{x:-40,y:-21}},

 {type:"tree-trunk",settings:{x:-40.5,y:-21}},
 {type:"tree-trunk",settings:{x:-40.7,y:-16}},

 {type:"tree-trunk",settings:{x:-43.5,y:-17}},

 {type:"tree-trunk",settings:{x:-41.5,y:-14}},
 {type:"tree-trunk",settings:{x:-43,y:-12}},


 {type:"tree-trunk",settings:{x:-43,y:-7}},
 {type:"tree-trunk",settings:{x:-41,y:-5.5}},

 {type:"tree-trunk",settings:{x:-43.5,y:-4.5}},
 {type:"tree-trunk",settings:{x:-40.7,y:-3.9}},

 {type:"tree-trunk",settings:{x:-42.5,y:-2.7}},
 {type:"tree-trunk",settings:{x:-43.5,y:-2}},

 {type:"tree-trunk",settings:{x:-41.5,y:-1.8}},

 {type:"tree-trunk",settings:{x:-41,y:3.2}},

 {type:"tree-trunk",settings:{x:-41.5,y:3.8}},
 {type:"tree-trunk",settings:{x:-40.5,y:7.1}},

 {type:"tree-trunk",settings:{x:-43.5,y:7.9}},
 {type:"tree-trunk",settings:{x:-42,y:8.6}},
 {type:"tree-trunk",settings:{x:-40.5,y:10.7}},
 {type:"tree-trunk",settings:{x:-43,y:13.6}},

 {type:"tree-trunk",settings:{x:-41.5,y:16}},
 {type:"tree-trunk",settings:{x:-40,y:17.3}},





 {type:"tree-trunk",settings:{x:-43,y:18}},
 {type:"tree-trunk",settings:{x:-40.5,y:19.3}},

 {type:"tree-trunk",settings:{x:-43.5,y:19.9}},
 {type:"tree-trunk",settings:{x:-40.7,y:21.4}},
 {type:"tree-trunk",settings:{x:-41.5,y:24.1}},
 {type:"tree-trunk",settings:{x:-43,y:25.4}},

 {type:"tree-trunk",settings:{x:-42.7,y:26.1}},
 {type:"tree-trunk",settings:{x:-39.9,y:27.3}},

 {type:"tree-trunk",settings:{x:-41.5,y:27.9}},
 {type:"tree-trunk",settings:{x:-40,y:29.1}},



 {type:"tree-trunk",settings:{x:-43,y:-31.7}},

 {type:"tree-trunk",settings:{x:-43.5,y:-29.7}},
 {type:"tree-trunk",settings:{x:-40.7,y:-28.5}},

 {type:"tree-trunk",settings:{x:-42.5,y:-27.9}},
 {type:"tree-trunk",settings:{x:-43.5,y:-26.6}},


 {type:"tree-trunk",settings:{x:-42.7,y:-23.9}},

 {type:"tree-trunk",settings:{x:-41.5,y:-22.1}},

 {type:"tree-trunk",settings:{x:-43,y:-20}},

 {type:"tree-trunk",settings:{x:-41.5,y:-14}},

 {type:"tree-trunk",settings:{x:-42.7,y:-11}},

 {type:"tree-trunk",settings:{x:-41.5,y:-10}},

 {type:"tree-trunk",settings:{x:-40.5,y:-6}},

 {type:"tree-trunk",settings:{x:-43.5,y:-4.5}},

 {type:"tree-trunk",settings:{x:-43.5,y:-2}},

 {type:"tree-trunk",settings:{x:-43,y:0.7}},

 {type:"tree-trunk",settings:{x:-42.7,y:1.4}},

 {type:"tree-trunk",settings:{x:-41.5,y:3.8}},




 {type:"tree-trunk",settings:{x:-43,y:5.9}},

 {type:"tree-trunk",settings:{x:-40.7,y:9.2}},

 {type:"tree-trunk",settings:{x:-42.5,y:10}},

 {type:"tree-trunk",settings:{x:-41.5,y:12.1}},

 {type:"tree-trunk",settings:{x:-42.7,y:14.2}},

 {type:"tree-trunk",settings:{x:-41.5,y:16}},





 {type:"tree-trunk",settings:{x:-43,y:18}},

 {type:"tree-trunk",settings:{x:-40.7,y:21.4}},

 {type:"tree-trunk",settings:{x:-43.5,y:23.4}},

 {type:"tree-trunk",settings:{x:-43,y:25.4}},

 {type:"tree-trunk",settings:{x:-42.7,y:26.1}},

 {type:"tree-trunk",settings:{x:-41.5,y:27.9}},



 {type:"tree-trunk",settings:{x:-48,y:-31.7}},
 {type:"tree-trunk",settings:{x:-49.5,y:-30.2}},

 {type:"tree-trunk",settings:{x:-45.5,y:-29.7}},

 {type:"tree-trunk",settings:{x:-47.5,y:-27.9}},

 {type:"tree-trunk",settings:{x:-50.5,y:-25.9}},
 {type:"tree-trunk",settings:{x:-49,y:-25.2}},

 {type:"tree-trunk",settings:{x:-46.9,y:-22.8}},

 {type:"tree-trunk",settings:{x:-48.5,y:-22.1}},

 {type:"tree-trunk",settings:{x:-51,y:-20}},

 {type:"tree-trunk",settings:{x:-46.5,y:-19}},

 {type:"tree-trunk",settings:{x:-50.5,y:-15}},
 {type:"tree-trunk",settings:{x:-49,y:-12}},

 {type:"tree-trunk",settings:{x:-45.7,y:-11}},

 {type:"tree-trunk",settings:{x:-49.5,y:-10}},



 {type:"tree-trunk",settings:{x:-46,y:-7}},

 {type:"tree-trunk",settings:{x:-46.5,y:-4.5}},

 {type:"tree-trunk",settings:{x:-45.5,y:-2.7}},

 {type:"tree-trunk",settings:{x:-48.5,y:-1.8}},

 {type:"tree-trunk",settings:{x:-47.7,y:1.4}},
 {type:"tree-trunk",settings:{x:-48.7,y:2.3}},
 {type:"tree-trunk",settings:{x:-47,y:5.2}},




 {type:"tree-trunk",settings:{x:-50.5,y:7.1}},

 {type:"tree-trunk",settings:{x:-49.5,y:7.9}},

 {type:"tree-trunk",settings:{x:-48.7,y:14.2}},

 {type:"tree-trunk",settings:{x:-45.5,y:16}},





 {type:"tree-trunk",settings:{x:-49,y:18}},

 {type:"tree-trunk",settings:{x:-49.7,y:21.4}},

 {type:"tree-trunk",settings:{x:-48.5,y:22}},

 {type:"tree-trunk",settings:{x:-49.5,y:24.1}},

 {type:"tree-trunk",settings:{x:-50.7,y:26.1}},

 {type:"tree-trunk",settings:{x:-48.5,y:27.9}},



 //-----------------------------------------------------------------------------------------


 {type:"tree-trunk",settings:{x:-54,y:-31.7}},

 {type:"tree-trunk",settings:{x:-56,y:-29.1}},
 {type:"tree-trunk",settings:{x:-56.7,y:-28.5}},

 {type:"tree-trunk",settings:{x:-58.5,y:-27.9}},

 {type:"tree-trunk",settings:{x:-58.5,y:-25.9}},
 {type:"tree-trunk",settings:{x:-53.9,y:-22.8}},

 {type:"tree-trunk",settings:{x:-58,y:-21}},

 {type:"tree-trunk",settings:{x:-57,y:-20}},
 {type:"tree-trunk",settings:{x:-58,y:-19.5}},
 {type:"tree-trunk",settings:{x:-58,y:-18}},
 {type:"tree-trunk",settings:{x:-56.7,y:-16}},

 {type:"tree-trunk",settings:{x:-55.5,y:-15}},

 {type:"tree-trunk",settings:{x:-57.5,y:-14}},
 {type:"tree-trunk",settings:{x:-56,y:-16}},
 {type:"tree-trunk",settings:{x:-56,y:-8}},

 {type:"tree-trunk",settings:{x:-58.5,y:-6}},

 {type:"tree-trunk",settings:{x:-56.5,y:-4.5}},
 {type:"tree-trunk",settings:{x:-56.5,y:-1.5}},
 {type:"tree-trunk",settings:{x:-58.5,y:-2}},

 {type:"tree-trunk",settings:{x:-51.5,y:-1.8}},
 {type:"tree-trunk",settings:{x:-55.9,y:3.2}},

 {type:"tree-trunk",settings:{x:-58.5,y:3.8}},
 {type:"tree-trunk",settings:{x:-56.5,y:7.1}},

 {type:"tree-trunk",settings:{x:-54.5,y:7.9}},
 {type:"tree-trunk",settings:{x:-56.5,y:11.3}},


 {type:"tree-trunk",settings:{x:-57,y:16.7}},
 {type:"tree-trunk",settings:{x:-56,y:17.3}},
 {type:"tree-trunk",settings:{x:-59.5,y:19.3}},

 {type:"tree-trunk",settings:{x:-55,y:20.7}},
 {type:"tree-trunk",settings:{x:-58.7,y:21.4}},

 {type:"tree-trunk",settings:{x:-59.5,y:22}},
 {type:"tree-trunk",settings:{x:-58.5,y:23.4}},

 {type:"tree-trunk",settings:{x:-53,y:24.8}},

 {type:"tree-trunk",settings:{x:-57.7,y:26.1}},
 {type:"tree-trunk",settings:{x:-58.9,y:27.3}},

 {type:"tree-trunk",settings:{x:-57,y:29.1}},



 {type:"tree-trunk",settings:{x:-58,y:-31.7}},
 {type:"tree-trunk",settings:{x:-56.5,y:-30.2}},

 {type:"tree-trunk",settings:{x:-59,y:-29.1}},
 {type:"tree-trunk",settings:{x:-60.7,y:-28.5}},

 {type:"tree-trunk",settings:{x:-60.5,y:-27.3}},

 {type:"tree-trunk",settings:{x:-57.5,y:-25.9}},
 {type:"tree-trunk",settings:{x:-61,y:-24.6}},

 {type:"tree-trunk",settings:{x:-59.7,y:-23.9}},
 {type:"tree-trunk",settings:{x:-57.9,y:-22.8}},

 {type:"tree-trunk",settings:{x:-56,y:-21.5}},
 {type:"tree-trunk",settings:{x:-58,y:-21}},

 {type:"tree-trunk",settings:{x:-53,y:-20}},
 {type:"tree-trunk",settings:{x:-59.5,y:-21}},

 {type:"tree-trunk",settings:{x:-56.5,y:-14}},
 {type:"tree-trunk",settings:{x:-56,y:-12}},

 {type:"tree-trunk",settings:{x:-54.7,y:-11}},

 {type:"tree-trunk",settings:{x:-61.5,y:-10}},



 {type:"tree-trunk",settings:{x:-53,y:-7}},

 {type:"tree-trunk",settings:{x:-53.5,y:-4.5}},

 {type:"tree-trunk",settings:{x:-54.5,y:-2.7}},
 {type:"tree-trunk",settings:{x:-59.5,y:-2}},

 {type:"tree-trunk",settings:{x:-60,y:-1.8}},
 {type:"tree-trunk",settings:{x:-59,y:0.7}},

 {type:"tree-trunk",settings:{x:-60.7,y:1.4}},

 {type:"tree-trunk",settings:{x:-54.5,y:3.8}},




 {type:"tree-trunk",settings:{x:-56,y:5.9}},

 {type:"tree-trunk",settings:{x:-56.5,y:7.9}},
 {type:"tree-trunk",settings:{x:-59.5,y:11.3}},

 {type:"tree-trunk",settings:{x:-58.5,y:12.1}},
 {type:"tree-trunk",settings:{x:-59.9,y:15.4}},

 {type:"tree-trunk",settings:{x:-56.5,y:16}},


 {type:"tree-trunk",settings:{x:-53,y:18}},
 {type:"tree-trunk",settings:{x:-54.7,y:21.4}},

 {type:"tree-trunk",settings:{x:-59.5,y:22}},

 {type:"tree-trunk",settings:{x:-55.5,y:24.1}},

 {type:"tree-trunk",settings:{x:-58.7,y:26.1}},
 {type:"tree-trunk",settings:{x:-56.7,y:26.7}},
 {type:"tree-trunk",settings:{x:-54,y:28.4}},

 {type:"tree-trunk",settings:{x:-56,y:-31.7}},
 {type:"tree-trunk",settings:{x:-59,y:-29.1}},
 {type:"tree-trunk",settings:{x:-56.7,y:-28.5}},
 {type:"tree-trunk",settings:{x:-56.7,y:-23.9}},

 {type:"tree-trunk",settings:{x:-54.5,y:-22.1}},
 {type:"tree-trunk",settings:{x:-57,y:-21.5}},
 {type:"tree-trunk",settings:{x:-59.5,y:-21}},


 {type:"tree-trunk",settings:{x:-60.5,y:-15}},
 {type:"tree-trunk",settings:{x:-55.5,y:-14}},
 {type:"tree-trunk",settings:{x:-50.9,y:-9}},

 {type:"tree-trunk",settings:{x:-60,y:-8}},


 {type:"tree-trunk",settings:{x:-56.5,y:-4.5}},

 {type:"tree-trunk",settings:{x:-55.5,y:-2.7}},
 {type:"tree-trunk",settings:{x:-55,y:0.7}},

 {type:"tree-trunk",settings:{x:-57.7,y:1.4}},
 {type:"tree-trunk",settings:{x:-59.9,y:3.2}},

 {type:"tree-trunk",settings:{x:-57.5,y:3.8}},




 {type:"tree-trunk",settings:{x:-58,y:5.9}},
 {type:"tree-trunk",settings:{x:-57.7,y:9.2}},

 {type:"tree-trunk",settings:{x:-56.5,y:10}},

 {type:"tree-trunk",settings:{x:-60,y:12.9}},
 {type:"tree-trunk",settings:{x:-56.9,y:15.4}},

 {type:"tree-trunk",settings:{x:-58,y:18.7}},
 {type:"tree-trunk",settings:{x:-60.5,y:19.3}},

 {type:"tree-trunk",settings:{x:-59.7,y:21.4}},


 {type:"tree-trunk",settings:{x:-58.7,y:26.7}},
 {type:"tree-trunk",settings:{x:-56.9,y:27.3}},

 {type:"tree-trunk",settings:{x:-55.5,y:27.9}},
 {type:"tree-trunk",settings:{x:-59,y:28.4}},



 {type:"bush-detail",settings:{position:{x:-41,y:2.4,z:29},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-43,y:2.4,z:21},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-43,y:2.4,z:0},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-43,y:2.4,z:14},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-43,y:2.4,z:7},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-43,y:2.4,z:-7},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-43,y:2.4,z:-14},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-43,y:2.4,z:-21},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-41,y:2.4,z:-28},scale:{x:7,y:3,z:7}}},



 {type:"bush-detail",settings:{position:{x:-48,y:2.4,z:29},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-48,y:2.4,z:21},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-48,y:2.4,z:0},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-48,y:2.4,z:14},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-48,y:2.4,z:7},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-48,y:2.4,z:-7},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-48,y:2.4,z:-14},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-48,y:2.4,z:-21},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-48,y:2.4,z:-28},scale:{x:7,y:3,z:7}}},


 {type:"bush-detail",settings:{position:{x:-54,y:2.4,z:29},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-54,y:2.4,z:21},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-54,y:2.4,z:0},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-54,y:2.4,z:14},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-54,y:2.4,z:7},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-54,y:2.4,z:-7},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-54,y:2.4,z:-14},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-54,y:2.4,z:-21},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-54,y:2.4,z:-28},scale:{x:7,y:3,z:7}}},

 {type:"bush-detail",settings:{position:{x:-59,y:2.4,z:29},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-59,y:2.4,z:21},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-59,y:2.4,z:0},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-59,y:2.4,z:14},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-59,y:2.4,z:7},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-59,y:2.4,z:-7},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-59,y:2.4,z:-14},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-59,y:2.4,z:-21},scale:{x:7,y:3,z:7}}},
 {type:"bush-detail",settings:{position:{x:-59,y:2.4,z:-28},scale:{x:7,y:3,z:7}}},


{type:"tree-trunk",settings:{x:-43,y:-31.7}},
				{type:"tree-trunk",settings:{x:-40.5,y:-30.2}},
				//
				// {type:"tree-trunk",settings:{x:-42,y:-29.1}},
				// {type:"tree-trunk",settings:{x:-40.7,y:-28.5}},

				{type:"tree-trunk",settings:{x:-42.5,y:-27.9}},
				{type:"tree-trunk",settings:{x:-40.5,y:-27.3}},
				//
				// {type:"tree-trunk",settings:{x:-41.5,y:-25.9}},
				// {type:"tree-trunk",settings:{x:-43,y:-24.6}},

				{type:"tree-trunk",settings:{x:-42.7,y:-23.9}},
				//{type:"tree-trunk",settings:{x:-41,y:-22.8}},
				{type:"tree-trunk",settings:{x:-40,y:-21}},

				{type:"tree-trunk",settings:{x:-40.5,y:-21}},
				{type:"tree-trunk",settings:{x:-40.7,y:-16}},

				{type:"tree-trunk",settings:{x:-43.5,y:-17}},
				//
				// {type:"tree-trunk",settings:{x:-41.5,y:-14}},
				// {type:"tree-trunk",settings:{x:-43,y:-12}},


				{type:"tree-trunk",settings:{x:-43,y:-7}},
				{type:"tree-trunk",settings:{x:-41,y:-5.5}},

				{type:"tree-trunk",settings:{x:-43.5,y:-4.5}},
				{type:"tree-trunk",settings:{x:-40.7,y:-3.9}},

				// {type:"tree-trunk",settings:{x:-42.5,y:-2.7}},
				// {type:"tree-trunk",settings:{x:-43.5,y:-2}},
				//
				// {type:"tree-trunk",settings:{x:-41.5,y:-1.8}},

				{type:"tree-trunk",settings:{x:-41,y:3.2}},

				{type:"tree-trunk",settings:{x:-41.5,y:3.8}},
				{type:"tree-trunk",settings:{x:-40.5,y:7.1}},

				{type:"tree-trunk",settings:{x:-43.5,y:7.9}},
				{type:"tree-trunk",settings:{x:-42,y:8.6}},
				// {type:"tree-trunk",settings:{x:-40.5,y:10.7}},
				// {type:"tree-trunk",settings:{x:-43,y:13.6}},

				{type:"tree-trunk",settings:{x:-41.5,y:16}},
				{type:"tree-trunk",settings:{x:-40,y:17.3}},





				{type:"tree-trunk",settings:{x:-43,y:18}},
				{type:"tree-trunk",settings:{x:-40.5,y:19.3}},
				//
				// {type:"tree-trunk",settings:{x:-43.5,y:19.9}},
				// {type:"tree-trunk",settings:{x:-40.7,y:21.4}},
				{type:"tree-trunk",settings:{x:-41.5,y:24.1}},
				{type:"tree-trunk",settings:{x:-43,y:25.4}},

				{type:"tree-trunk",settings:{x:-42.7,y:26.1}},
				{type:"tree-trunk",settings:{x:-39.9,y:27.3}},

				{type:"tree-trunk",settings:{x:-41.5,y:27.9}},
				{type:"tree-trunk",settings:{x:-40,y:29.1}},



				{type:"tree-trunk",settings:{x:-43,y:-31.7}},

				{type:"tree-trunk",settings:{x:-43.5,y:-29.7}},
				// {type:"tree-trunk",settings:{x:-40.7,y:-28.5}},
				//
				// {type:"tree-trunk",settings:{x:-42.5,y:-27.9}},
				{type:"tree-trunk",settings:{x:-43.5,y:-26.6}},


				// {type:"tree-trunk",settings:{x:-42.7,y:-23.9}},
				//
				// {type:"tree-trunk",settings:{x:-41.5,y:-22.1}},

				{type:"tree-trunk",settings:{x:-43,y:-20}},

				{type:"tree-trunk",settings:{x:-41.5,y:-14}},
				//
				// {type:"tree-trunk",settings:{x:-42.7,y:-11}},
				//
				// {type:"tree-trunk",settings:{x:-41.5,y:-10}},

				{type:"tree-trunk",settings:{x:-40.5,y:-6}},

				{type:"tree-trunk",settings:{x:-43.5,y:-4.5}},

				{type:"tree-trunk",settings:{x:-43.5,y:-2}},

				{type:"tree-trunk",settings:{x:-43,y:0.7}},
				//
				// {type:"tree-trunk",settings:{x:-42.7,y:1.4}},
				//
				// {type:"tree-trunk",settings:{x:-41.5,y:3.8}},




				{type:"tree-trunk",settings:{x:-43,y:5.9}},
				//
				// {type:"tree-trunk",settings:{x:-40.7,y:9.2}},
				//
				// {type:"tree-trunk",settings:{x:-42.5,y:10}},

				{type:"tree-trunk",settings:{x:-41.5,y:12.1}},
				//
				// {type:"tree-trunk",settings:{x:-42.7,y:14.2}},
				//
				// {type:"tree-trunk",settings:{x:-41.5,y:16}},





				{type:"tree-trunk",settings:{x:-43,y:18}},

				{type:"tree-trunk",settings:{x:-40.7,y:21.4}},

				{type:"tree-trunk",settings:{x:-43.5,y:23.4}},

				{type:"tree-trunk",settings:{x:-43,y:25.4}},
				//
				// {type:"tree-trunk",settings:{x:-42.7,y:26.1}},
				//
				// {type:"tree-trunk",settings:{x:-41.5,y:27.9}},



				{type:"tree-trunk",settings:{x:-48,y:-31.7}},
				{type:"tree-trunk",settings:{x:-49.5,y:-30.2}},

				{type:"tree-trunk",settings:{x:-45.5,y:-29.7}},

				{type:"tree-trunk",settings:{x:-47.5,y:-27.9}},

				{type:"tree-trunk",settings:{x:-50.5,y:-25.9}},
				// {type:"tree-trunk",settings:{x:-49,y:-25.2}},
				//
				// {type:"tree-trunk",settings:{x:-46.9,y:-22.8}},

				{type:"tree-trunk",settings:{x:-48.5,y:-22.1}},

				{type:"tree-trunk",settings:{x:-51,y:-20}},

				{type:"tree-trunk",settings:{x:-46.5,y:-19}},
				//
				// {type:"tree-trunk",settings:{x:-50.5,y:-15}},
				// {type:"tree-trunk",settings:{x:-49,y:-12}},

				{type:"tree-trunk",settings:{x:-45.7,y:-11}},

				{type:"tree-trunk",settings:{x:-49.5,y:-10}},



				{type:"tree-trunk",settings:{x:-46,y:-7}},

				{type:"tree-trunk",settings:{x:-46.5,y:-4.5}},
				//
				// {type:"tree-trunk",settings:{x:-45.5,y:-2.7}},
				//
				// {type:"tree-trunk",settings:{x:-48.5,y:-1.8}},

				{type:"tree-trunk",settings:{x:-47.7,y:1.4}},
				{type:"tree-trunk",settings:{x:-48.7,y:2.3}},
				{type:"tree-trunk",settings:{x:-47,y:5.2}},




				{type:"tree-trunk",settings:{x:-50.5,y:7.1}},
				//
				// {type:"tree-trunk",settings:{x:-49.5,y:7.9}},
				//
				// {type:"tree-trunk",settings:{x:-48.7,y:14.2}},

				{type:"tree-trunk",settings:{x:-45.5,y:16}},





				{type:"tree-trunk",settings:{x:-49,y:18}},

				{type:"tree-trunk",settings:{x:-49.7,y:21.4}},

				{type:"tree-trunk",settings:{x:-48.5,y:22}},

				{type:"tree-trunk",settings:{x:-49.5,y:24.1}},

				{type:"tree-trunk",settings:{x:-50.7,y:26.1}},

				{type:"tree-trunk",settings:{x:-48.5,y:27.9}},



				//-----------------------------------------------------------------------------------------


				{type:"tree-trunk",settings:{x:-54,y:-31.7}},
				//
				// {type:"tree-trunk",settings:{x:-56,y:-29.1}},
				// {type:"tree-trunk",settings:{x:-56.7,y:-28.5}},

				//{type:"tree-trunk",settings:{x:-58.5,y:-27.9}},

				// {type:"tree-trunk",settings:{x:-58.5,y:-25.9}},
				// {type:"tree-trunk",settings:{x:-53.9,y:-22.8}},

				{type:"tree-trunk",settings:{x:-58,y:-21}},

				// {type:"tree-trunk",settings:{x:-57,y:-20}},
				// {type:"tree-trunk",settings:{x:-58,y:-19.5}},
				{type:"tree-trunk",settings:{x:-58,y:-18}},
				// {type:"tree-trunk",settings:{x:-56.7,y:-16}},
				//
				// {type:"tree-trunk",settings:{x:-55.5,y:-15}},

				{type:"tree-trunk",settings:{x:-57.5,y:-14}},
				// {type:"tree-trunk",settings:{x:-56,y:-16}},
				// {type:"tree-trunk",settings:{x:-56,y:-8}},
				//
				// {type:"tree-trunk",settings:{x:-58.5,y:-6}},

				{type:"tree-trunk",settings:{x:-56.5,y:-4.5}},
				{type:"tree-trunk",settings:{x:-56.5,y:-1.5}},
				{type:"tree-trunk",settings:{x:-58.5,y:-2}},
				//
				// {type:"tree-trunk",settings:{x:-51.5,y:-1.8}},
				// {type:"tree-trunk",settings:{x:-55.9,y:3.2}},

				{type:"tree-trunk",settings:{x:-58.5,y:3.8}},
				{type:"tree-trunk",settings:{x:-56.5,y:7.1}},
				//
				// {type:"tree-trunk",settings:{x:-54.5,y:7.9}},
				// {type:"tree-trunk",settings:{x:-56.5,y:11.3}},


				{type:"tree-trunk",settings:{x:-57,y:16.7}},
				{type:"tree-trunk",settings:{x:-56,y:17.3}},
				{type:"tree-trunk",settings:{x:-59.5,y:19.3}},
				//
				// {type:"tree-trunk",settings:{x:-55,y:20.7}},
				// {type:"tree-trunk",settings:{x:-58.7,y:21.4}},

				{type:"tree-trunk",settings:{x:-59.5,y:22}},
				{type:"tree-trunk",settings:{x:-58.5,y:23.4}},
				//
				// {type:"tree-trunk",settings:{x:-53,y:24.8}},
				//
				// {type:"tree-trunk",settings:{x:-57.7,y:26.1}},
				// {type:"tree-trunk",settings:{x:-58.9,y:27.3}},

				{type:"tree-trunk",settings:{x:-57,y:29.1}},



				{type:"tree-trunk",settings:{x:-58,y:-31.7}},
				{type:"tree-trunk",settings:{x:-56.5,y:-30.2}},
				//
				// {type:"tree-trunk",settings:{x:-59,y:-29.1}},
				// {type:"tree-trunk",settings:{x:-60.7,y:-28.5}},

				//{type:"tree-trunk",settings:{x:-60.5,y:-27.3}},

				//{type:"tree-trunk",settings:{x:-57.5,y:-25.9}},
				{type:"tree-trunk",settings:{x:-61,y:-24.6}},

				{type:"tree-trunk",settings:{x:-59.7,y:-23.9}},
				{type:"tree-trunk",settings:{x:-57.9,y:-22.8}},

				{type:"tree-trunk",settings:{x:-56,y:-21.5}},
				{type:"tree-trunk",settings:{x:-58,y:-21}},

				// {type:"tree-trunk",settings:{x:-53,y:-20}},
				// {type:"tree-trunk",settings:{x:-59.5,y:-21}},
				//
				// {type:"tree-trunk",settings:{x:-56.5,y:-14}},
				// {type:"tree-trunk",settings:{x:-56,y:-12}},

				{type:"tree-trunk",settings:{x:-54.7,y:-11}},

				{type:"tree-trunk",settings:{x:-61.5,y:-10}},



				{type:"tree-trunk",settings:{x:-53,y:-7}},

				{type:"tree-trunk",settings:{x:-53.5,y:-4.5}},

				// {type:"tree-trunk",settings:{x:-54.5,y:-2.7}},
				// {type:"tree-trunk",settings:{x:-59.5,y:-2}},
				//
				// {type:"tree-trunk",settings:{x:-60,y:-1.8}},
				// {type:"tree-trunk",settings:{x:-59,y:0.7}},

				{type:"tree-trunk",settings:{x:-60.7,y:1.4}},

				{type:"tree-trunk",settings:{x:-54.5,y:3.8}},




				{type:"tree-trunk",settings:{x:-56,y:5.9}},

				{type:"tree-trunk",settings:{x:-56.5,y:7.9}},
				{type:"tree-trunk",settings:{x:-59.5,y:11.3}},
				//
				// {type:"tree-trunk",settings:{x:-58.5,y:12.1}},
				// {type:"tree-trunk",settings:{x:-59.9,y:15.4}},

				{type:"tree-trunk",settings:{x:-56.5,y:16}},


				{type:"tree-trunk",settings:{x:-53,y:18}},
				// {type:"tree-trunk",settings:{x:-54.7,y:21.4}},
				//
				// {type:"tree-trunk",settings:{x:-59.5,y:22}},
				//
				// {type:"tree-trunk",settings:{x:-55.5,y:24.1}},

				// {type:"tree-trunk",settings:{x:-58.7,y:26.1}},
				// {type:"tree-trunk",settings:{x:-56.7,y:26.7}},
				{type:"tree-trunk",settings:{x:-54,y:28.4}},

				// {type:"tree-trunk",settings:{x:-56,y:-31.7}},
				// {type:"tree-trunk",settings:{x:-59,y:-29.1}},
				// {type:"tree-trunk",settings:{x:-56.7,y:-28.5}},
				{type:"tree-trunk",settings:{x:-56.7,y:-23.9}},

				{type:"tree-trunk",settings:{x:-54.5,y:-22.1}},
				{type:"tree-trunk",settings:{x:-57,y:-21.5}},
				{type:"tree-trunk",settings:{x:-59.5,y:-21}},

				//
				// {type:"tree-trunk",settings:{x:-60.5,y:-15}},
				// {type:"tree-trunk",settings:{x:-55.5,y:-14}},
				{type:"tree-trunk",settings:{x:-50.9,y:-9}},

				{type:"tree-trunk",settings:{x:-60,y:-8}},


				{type:"tree-trunk",settings:{x:-56.5,y:-4.5}},
				//
				// {type:"tree-trunk",settings:{x:-55.5,y:-2.7}},
				// {type:"tree-trunk",settings:{x:-55,y:0.7}},

				{type:"tree-trunk",settings:{x:-57.7,y:1.4}},
				{type:"tree-trunk",settings:{x:-59.9,y:3.2}},

				{type:"tree-trunk",settings:{x:-57.5,y:3.8}},




				{type:"tree-trunk",settings:{x:-58,y:5.9}},
				{type:"tree-trunk",settings:{x:-57.7,y:9.2}},

				{type:"tree-trunk",settings:{x:-56.5,y:10}},

				// {type:"tree-trunk",settings:{x:-60,y:12.9}},
				// {type:"tree-trunk",settings:{x:-56.9,y:15.4}},

				{type:"tree-trunk",settings:{x:-58,y:18.7}},
				{type:"tree-trunk",settings:{x:-60.5,y:19.3}},

				{type:"tree-trunk",settings:{x:-59.7,y:21.4}},

				//
				// {type:"tree-trunk",settings:{x:-58.7,y:26.7}},
				// {type:"tree-trunk",settings:{x:-56.9,y:27.3}},

				{type:"tree-trunk",settings:{x:-55.5,y:27.9}},
				{type:"tree-trunk",settings:{x:-59,y:28.4}},

				{type:"bush-detail",settings:{position:{x:-42,y:2.4,z:-10},scale:{x:10,y:4,z:22}}},
				{type:"bush-detail",settings:{position:{x:-42,y:2.4,z:10},scale:{x:10,y:4,z:22}}},

				{type:"bush-detail",settings:{position:{x:-55,y:2.4,z:-10},scale:{x:10,y:4,z:22}}},
				{type:"bush-detail",settings:{position:{x:-55,y:2.4,z:10},scale:{x:10,y:4,z:22}}},


				{type:"bush-detail",settings:{position:{x:-41,y:2.4,z:29},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-43,y:2.4,z:21},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-43,y:2.4,z:0},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-43,y:2.4,z:14},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-43,y:2.4,z:7},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-43,y:2.4,z:-7},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-43,y:2.4,z:-14},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-43,y:2.4,z:-21},scale:{x:7,y:3,z:7}}},
				{type:"bush-detail",settings:{position:{x:-41,y:2.4,z:-28},scale:{x:7,y:3,z:7}}},



				{type:"bush-detail",settings:{position:{x:-48,y:2.4,z:29},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-48,y:2.4,z:21},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-48,y:2.4,z:0},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-48,y:2.4,z:14},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-48,y:2.4,z:7},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-48,y:2.4,z:-7},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-48,y:2.4,z:-14},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-48,y:2.4,z:-21},scale:{x:7,y:3,z:7}}},
				{type:"bush-detail",settings:{position:{x:-48,y:2.4,z:-28},scale:{x:7,y:3,z:7}}},


				{type:"bush-detail",settings:{position:{x:-54,y:2.4,z:29},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-54,y:2.4,z:21},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-54,y:2.4,z:0},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-54,y:2.4,z:14},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-54,y:2.4,z:7},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-54,y:2.4,z:-7},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-54,y:2.4,z:-14},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-54,y:2.4,z:-21},scale:{x:7,y:3,z:7}}},
				{type:"bush-detail",settings:{position:{x:-54,y:2.4,z:-28},scale:{x:7,y:3,z:7}}},

				{type:"bush-detail",settings:{position:{x:-59,y:2.4,z:29},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-59,y:2.4,z:21},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-59,y:2.4,z:0},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-59,y:2.4,z:14},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-59,y:2.4,z:7},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-59,y:2.4,z:-7},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-59,y:2.4,z:-14},scale:{x:7,y:3,z:7}}},
				// {type:"bush-detail",settings:{position:{x:-59,y:2.4,z:-21},scale:{x:7,y:3,z:7}}},
				{type:"bush-detail",settings:{position:{x:-59,y:2.4,z:-28},scale:{x:7,y:3,z:7}}},





				//


				{type:"tree",settings:this.circlePointPosition(45,60,{x:-135,y:-23.5})},
				{type:"tree",settings:this.circlePointPosition(75,60,{x:-135,y:-23.5})},
				{type:"tree",settings:this.circlePointPosition(105,60,{x:-135,y:-23.5})},
				{type:"tree",settings:this.circlePointPosition(135,60,{x:-135,y:-23.5})},
				{type:"tree",settings:this.circlePointPosition(165,60,{x:-135,y:-23.5})},
				{type:"tree",settings:this.circlePointPosition(195,60,{x:-135,y:-23.5})},
				{type:"tree",settings:this.circlePointPosition(225,60,{x:-135,y:-23.5})},
				{type:"tree",settings:this.circlePointPosition(255,60,{x:-135,y:-23.5})},
				{type:"tree",settings:this.circlePointPosition(285,60,{x:-135,y:-23.5})},
				{type:"tree",settings:this.circlePointPosition(315,60,{x:-135,y:-23.5})},
				// {type:"tree",settings:{x:-67.5,y:-5}},
				// {type:"tree",settings:{x:-67.5,y:5}},
				//
				// {type:"tree",settings:{x:-52.5,y:-5}},
				// {type:"tree",settings:{x:-52.5,y:5}},
				//
				// {type:"tree",settings:{x:-37.5,y:-5}},
				// {type:"tree",settings:{x:-37.5,y:5}},
				//
				// {type:"tree",settings:{x:-22.5,y:-105}},
				// {type:"tree",settings:{x:-22.5,y:-75}},
				// {type:"tree",settings:{x:-22.5,y:-65}},
				// {type:"tree",settings:{x:-22.5,y:-35}},
				// {type:"tree",settings:{x:-22.5,y:-5}},
				// {type:"tree",settings:{x:-22.5,y:5}},
				// {type:"tree",settings:{x:-22.5,y:35}},
				// {type:"tree",settings:{x:-22.5,y:45}},
				// {type:"tree",settings:{x:-22.5,y:75}},

				{type:"tree",settings:{x:-15,y:-105}},
				{type:"tree",settings:{x:-15,y:-75}},
				{type:"tree",settings:{x:-15,y:-65}},
				{type:"tree",settings:{x:-15,y:-35}},
				{type:"tree",settings:{x:-15,y:-5}},
				{type:"tree",settings:{x:-15,y:5}},
				{type:"tree",settings:{x:-15,y:35}},
				{type:"tree",settings:{x:-15,y:45}},
				{type:"tree",settings:{x:-15,y:75}},


				{type:"tree",settings:{x:15,y:-65}},
				{type:"tree",settings:{x:15,y:-35}},
				{type:"tree",settings:{x:15,y:-5}},
				{type:"tree",settings:{x:15,y:5}},
				{type:"tree",settings:{x:15,y:35}},
				// {type:"tree",settings:{x:7.5,y:45}},
				// {type:"tree",settings:{x:7.5,y:75}},
				// {type:"tree",settings:{x:22.5,y:-65}},
				// {type:"tree",settings:{x:22.5,y:-35}},
				// {type:"tree",settings:{x:22.5,y:-5}},
				// {type:"tree",settings:{x:22.5,y:5}},
				// {type:"tree",settings:{x:22.5,y:35}},

				{type:"tree",settings:{x:40,y:-65}},
				{type:"tree",settings:{x:40,y:-35}},
				{type:"tree",settings:{x:40,y:-5}},
				{type:"tree",settings:{x:40,y:5}},
				{type:"tree",settings:{x:40,y:35}},

				//
				// {type:"tree",settings:{x:47.5,y:-65}},
				// {type:"tree",settings:{x:47.5,y:-35}},
				// {type:"tree",settings:{x:47.5,y:-5}},
				// {type:"tree",settings:{x:47.5,y:5}},
				// {type:"tree",settings:{x:47.5,y:35}},



				{type:"tree",settings:{x:85,y:-65}},
				{type:"tree",settings:{x:85,y:-35}},
				{type:"tree",settings:{x:85,y:-5}},
				{type:"tree",settings:{x:85,y:5}},
				{type:"tree",settings:{x:85,y:35}},


				// {type:"tree",settings:{x:92.5,y:-65}},
				// {type:"tree",settings:{x:92.5,y:-35}},
				// {type:"tree",settings:{x:92.5,y:-5}},
				// {type:"tree",settings:{x:92.5,y:5}},
				// {type:"tree",settings:{x:92.5,y:35}},



				{type:"tree",settings:{x:110,y:-65}},
				{type:"tree",settings:{x:110,y:-35}},
				{type:"tree",settings:{x:110,y:-5}},
				{type:"tree",settings:{x:110,y:5}},
				{type:"tree",settings:{x:110,y:35}},
				//
				// {type:"tree",settings:{x:117.5,y:-65}},
				// {type:"tree",settings:{x:117.5,y:-35}},
				// {type:"tree",settings:{x:117.5,y:-5}},
				// {type:"tree",settings:{x:117.5,y:5}},
				// {type:"tree",settings:{x:117.5,y:35}},


				{type:"tree",settings:{x:-81,y:-178}},
				{type:"tree",settings:{x:-48.75,y:-178}},
				{type:"tree",settings:{x:-16.25,y:-178}},
				{type:"tree",settings:{x:16.75,y:-178}},

				// {type:"tree",settings:{x:-81,y:-185.5}},
				// {type:"tree",settings:{x:-48.75,y:-185.5}},
				// {type:"tree",settings:{x:-16.25,y:-185.5}},
				// {type:"tree",settings:{x:16.75,y:-185.5}},


				//
				// {type:"tree",settings:{x:-81,y:140.8}},
				// {type:"tree",settings:{x:-48.75,y:140.8}},
				// {type:"tree",settings:{x:-16.25,y:140.8}},
				// {type:"tree",settings:{x:16.75,y:140.8}},

				// {type:"tree",settings:{x:-81,y:155.8}},
				// {type:"tree",settings:{x:-48.75,y:155.8}},
				// {type:"tree",settings:{x:-16.25,y:155.8}},
				// {type:"tree",settings:{x:16.75,y:155.8}},
				//
				//
				// {type:"tree",settings:{x:16.75,y:105.8}},



				// {type:"tree",settings:{x:0,y:95.8}},
				//
				// {type:"tree",settings:{x:5,y:85}},
				//
				// {type:"tree",settings:{x:47,y:75.8}},
				//
				// {type:"tree",settings:{x:0,y:-98.8}},
				//
				// {type:"tree",settings:{x:5,y:-80}},
				//
				// {type:"tree",settings:{x:47,y:-70.8}},






				// {type:"tree",settings:{x:22.5,y:45}},
				// {type:"tree",settings:{x:22.5,y:75}},





				// {type:"street-sign",settings:{x:0,y:0}},
				// {type:"grass",settings:{x:0,y:0}},


 */