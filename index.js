const express = require('express');
const http = require('http');
const https = require('https');
const io = require('socket.io');
const fs = require('fs');
const Basket = require('./Basket');
const Layouts = require('./Layouts');
const Config = require('./config');
const easyrtc = require("easyrtc");

let WebServer = function(){
    this.server = this.setupServer('/static/',Config.current_environment==='production'?8443:8080);
    this.setupSocket();
    this.setupVendors();
    this.setupBaloonRide();
    this.layouts = new Layouts();
};

var obj = {};
obj.the_prototype = {
    name:"something"
};


WebServer.prototype = {
    socketPool:{
        // websockets grouped by client.
    },
    setupServer:function(directory,port){
        let serverObject={};
        serverObject.app=express();
        if(Config.current_environment==='production'){
            // serverObject.server = https.createServer({
            //     key: fs.readFileSync(Config.environments[Config.current_environment].ssl.key).toString(),
            //     cert: fs.readFileSync(Config.environments[Config.current_environment].ssl.cert).toString()
            // }, serverObject.app);
            serverObject.server = http.createServer(serverObject.app);
        }else{
            serverObject.server = http.createServer(serverObject.app);
        }
        serverObject.socket=io(serverObject.server);
        serverObject.app.use(express.static(__dirname + directory));
        serverObject.app.get('/', (req,res)=> {
            res.sendFile(__dirname + directory +'/index.html');
        });
        serverObject.server.listen(port);
        return serverObject;
    },
    setupVendors:function() {
        this.vendors = require('./Vendors');
    },
    setupBaloonRide:function(){
        setInterval(d=>{
            // var time = new Date().getTime();
            // var coeff = 1000 * 60 * 5;
            // var current_time = time - Math.floor(time / coeff) * coeff;
            this.server.socket.to("shop-floor").emit('time-sync',new Date().getTime());
        },2000);

    },
    setupSocket:function(){
        this.server.socket.on('connection', (socket)=>{
            socket.on('guid',options=>{
                socket.guid = options.guid;
                if(!this.socketPool[socket.guid]){
                    this.socketPool[socket.guid] = {baskets:{},position:{x:0,roty:0,z:0}};
                }
                this.socketPool[socket.guid][options.client] = socket;
                socket.join(options.client);
            });
            socket.on('get-vendors',()=>{
                if(socket.guid&&this.socketPool[socket.guid])
                    socket.emit('get-vendors',Object.keys(this.vendors).map(d=>{
                        return {type:d,data:this.vendors[d].data}
                    }));
            });
            socket.on('set-position',position=>{
                if(socket.guid&&this.socketPool[socket.guid]){
                    this.socketPool[socket.guid].position = position;
                    if(this.socketPool[socket.guid]["map"]){
                        this.socketPool[socket.guid]["map"].emit('get-position',this.socketPool[socket.guid].position);
                    }
                }
            });
            socket.on('test-countdown',()=>{
                this.server.socket.sockets.emit('test-countdown');
            });
            socket.on('get-position',position=>{
                if(socket.guid&&this.socketPool[socket.guid])
                    socket.emit('get-position',this.socketPool[socket.guid].position);
            });
            socket.on('get-layout',options=>{
                if(socket.guid&&this.socketPool[socket.guid]&&this.layouts[options.layout])
                    socket.emit('get-layout',this.layouts[options.layout]());
            });
            socket.on('get-vendor',()=>{
                if(socket.guid&&this.socketPool[socket.guid]&&this.socketPool[socket.guid]["main_menu"]){
                    this.socketPool[socket.guid]["main_menu"].emit('set-vendor',this.socketPool[socket.guid].vendor);
                }
            });
            socket.on('open-product',(options)=>{
                if(socket.guid&&this.socketPool[socket.guid]&&this.vendors[options.vendor])
                    this.vendors[options.vendor].api.open(options,this.socketPool[socket.guid]);
            });
            socket.on('set-vendor',options=>{
                if(socket.guid&&this.socketPool[socket.guid]){
                    if(options.vendor){
                        this.socketPool[socket.guid].vendor = options.vendor;
                    }else{
                        delete this.socketPool[socket.guid].vendor;
                    }
                    if(this.socketPool[socket.guid]["main_menu"]){
                        this.socketPool[socket.guid]["main_menu"].emit('set-vendor',this.socketPool[socket.guid].vendor);
                    }
                }
            });
            socket.on('get-product',()=>{
                if(socket.guid&&this.socketPool[socket.guid]&&this.socketPool[socket.guid].product){
                    socket.emit('set-product',this.socketPool[socket.guid].product);
                }else{
                    socket.emit('set-product',false);
                }
            });
            socket.on('close-menu',()=>{
                if(socket.guid&&this.socketPool[socket.guid]){
                    if(this.socketPool[socket.guid]["shop-floor"]){
                        this.socketPool[socket.guid]["shop-floor"].emit('close-menu');
                    }
                }
            });
            socket.on('set-product',options=>{
                if(socket.guid&&this.socketPool[socket.guid]){
                    this.socketPool[socket.guid].product = options.product;
                    socket.emit('set-product');
                    if(this.socketPool[socket.guid]["add_to_basket"]){
                        this.socketPool[socket.guid]["add_to_basket"].emit('set-product',this.socketPool[socket.guid].product);
                    }
                }
            });
            socket.on('search',options=>{
                if(socket.guid&&this.socketPool[socket.guid]&&this.vendors[options.vendor])
                    this.vendors[options.vendor].api.search(options,this.socketPool[socket.guid]);
            });
            socket.on('search-page',options=>{
                if(socket.guid&&this.socketPool[socket.guid]["shop-floor"]){
                    this.socketPool[socket.guid]["shop-floor"].emit('search-page',options);
                }
            });
            socket.on('addToBasket',options=>{
                if(this.socketPool[socket.guid]&&this.vendors[options.vendor]){
                    if(!this.socketPool[socket.guid].baskets[options.vendor]) {
                        this.socketPool[socket.guid].baskets[options.vendor] = new Basket();
                    }
                    this.socketPool[socket.guid].baskets[options.vendor].add(options.product);
                    if(socket.guid&&this.socketPool[socket.guid]["main_menu"]){
                        this.socketPool[socket.guid]["main_menu"].emit('getBaskets',this.socketPool[socket.guid].baskets);
                    }
                    socket.emit('getBaskets',this.socketPool[socket.guid].baskets);
                }
            });
            socket.on('getBaskets',()=>{
                if(this.socketPool[socket.guid]){
                    socket.emit('getBaskets',this.socketPool[socket.guid].baskets);
                }
            });
            socket.on('setQuantity',options=>{
                if(this.socketPool[socket.guid]&&this.socketPool[socket.guid].baskets[options.vendor]){
                    this.socketPool[socket.guid].baskets[options.vendor].setQuantity(options.index,options.quantity);
                    if(socket.guid&&this.socketPool[socket.guid]["main_menu"]){
                        this.socketPool[socket.guid]["main_menu"].emit('getBaskets',this.socketPool[socket.guid].baskets);
                    }
                    if(socket.guid&&this.socketPool[socket.guid]["shop-floor"]){
                        this.socketPool[socket.guid]["shop-floor"].emit('getBaskets', this.socketPool[socket.guid].baskets);
                    }
                }
            });
            socket.on('editBasket',options=>{
                if(this.socketPool[socket.guid]&&this.socketPool[socket.guid].baskets[options.vendor]){
                    var products = this.socketPool[socket.guid].baskets[options.vendor].products;
                    if(options.index&&products.length-1>options.index){
                        this.socketPool[socket.guid].baskets[options.vendor].products = products.splice(options.index,1)
                    }
                    if(socket.guid&&this.socketPool[socket.guid]["main_menu"]) {
                        this.socketPool[socket.guid]["main_menu"].emit('getBaskets', this.socketPool[socket.guid].baskets);
                    }
                    if(socket.guid&&this.socketPool[socket.guid]["shop-floor"]){
                        this.socketPool[socket.guid]["shop-floor"].emit('getBaskets', Object.keys(this.socketPool[socket.guid].baskets));
                    }
                }
            });
            socket.on('clearBasket',options=>{
                if(this.socketPool[socket.guid]&&this.socketPool[socket.guid].baskets[options.vendor]){
                    delete this.socketPool[socket.guid].baskets[options.vendor];
                    if(socket.guid&&this.socketPool[socket.guid]["main_menu"]) {
                        this.socketPool[socket.guid]["main_menu"].emit('getBaskets', this.socketPool[socket.guid].baskets);
                    }
                    if(socket.guid&&this.socketPool[socket.guid]["shop-floor"]){
                        this.socketPool[socket.guid]["shop-floor"].emit('getBaskets', Object.keys(this.socketPool[socket.guid].baskets));
                    }
                }
            });
            socket.on('checkoutBasket',options=>{
                console.log(options);
                if(this.socketPool[socket.guid]&&this.socketPool[socket.guid].baskets[options.vendor]&&this.socketPool[socket.guid].baskets[options.vendor].products.length){
                    this.vendors[options.vendor].api.checkout(this.socketPool[socket.guid].baskets[options.vendor].products,this.socketPool[socket.guid]);
                }
            });
        });
    }
};
new WebServer();
