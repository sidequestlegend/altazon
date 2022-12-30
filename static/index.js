var Main = function(){
    var _this = this;
    this.menu();
    this.shared = new Shared(this);
    this.menu();
    this.can_search = false;
    this.setupSocket()
        .then(function(result){
            _this.socket.emit('get-position');
            _this.socket.emit('get-vendor');
            _this.socket.on('get-position',function(position) {
                _this.position = position;
                _this.updateMapPosition();
            });
            _this.socket.on('set-vendor',function(vendor){
                console.log('set-vendor',vendor);
                _this.vendor = vendor;
                if(vendor){
                    _this.can_search = true;
                    _this.showSearch(true);
                }else{
                    _this.can_search = false;
                    _this.showSearch(false);
                }
            });
            _this.socket.on('getBaskets',function(baskets){
                _this.displayBasket(baskets)
            });
            _this.socket.on('reloadBasket',function(){
                console.log('reloading-basket')
                setTimeout(function(){_this.socket.emit('getBasket');},750);
            });
        });
};
Main.prototype = {
    displayBasket:function(baskets){
        var _this = this;
        this.current_baskets = baskets;
        $('#basketLines').html('');
        if(baskets.AmazonUS){
            var total = 0;
            baskets.AmazonUS.products.forEach(function(product){
                var container = $('<tr>');
                if(product.price_numeric)total+=product.price_numeric;
                container.append('<td><img src="'+product.images[0].medium+'"/></td>');
                container.append('<td>'+product.title+'</td>');
                container.append('<td>'+product.quantity+'<br><i class="material-icons removeItem">delete_forever</i></td>');
                container.append('<td>'+product.price+'</td>');
                $('#basketLines').append(container);
            });
            $('#totalPrice').html("$"+((total/100).toFixed(2)))
        }
        if(!baskets.AmazonUS||!baskets.AmazonUS.products.length){
            $("#basketEmpty").css('display','block');
        }
        $('#clearButton').click(function(){
            _this.socket.emit('clearBasket',{vendor:"AmazonUS"});
        });
        $('.checkoutButton').click(function(){
            _this.socket.emit('checkoutBasket',{vendor:"AmazonUS"});
        });

        $('.removeItem').each(function(i){
            $(this).click(function(){
                console.log('click');
                _this.socket.emit('editBasket',{vendor:"AmazonUS",index:i});
            });
        });
    },
    setupSocket:function() {
        var _this = this;
        return this.shared
            .setupSocket()
            .then(function (result) {
                _this.socket = result.socket;
                _this.user = result.user;
                _this.socket.on('connect', function () {
                    _this.socket.emit('guid', {guid: result.user.user.userId, client: "main_menu"});
                });
            });
    },
    menu:function(){
        var _this = this;
        $(document).ready(function(){
            $('.carousel').carousel({padding:60});
            $('.menu-item').click(function(){
                $('.menu-item').each(function(){
                    var ele = $(this).find('a');
                    ele.removeClass('btn').removeClass(ele.data('color')).removeClass('waves-light').addClass('waves'+ele.data('color')).addClass('btn-flat');
                });
                var ele = $(this).find('a');
                ele.removeClass('waves'+ele.data('color')).removeClass('btn-flat').addClass('btn').addClass(ele.data('color')).addClass('waves-light');
                switch($(this).data('menu-item')){
                    case 'name_street':
                        _this.name_streets();
                        break;
                    case 'feedback':
                        _this.feedback();
                        break;
                    case 'map':
                        _this.map();
                        break;
                    case 'search':
                        _this.search();
                        break;
                    case 'shopping_cart':
                        _this.basket();
                        break;
                }
            });
            $('#searchButton').trigger('click');
        });
    },
    name_streets:function(){
        $('.main-container').load('/html/google_form.html')
    },
    feedback:function(){
        $('.main-container').load('/html/feedback_form.html')
    },
    map:function(){
        $('.main-container').load('/html/map.html')
    },
    showSearch:function(show){
        $('#searchTitle').html(show?'Search this store':'Enter a store to search...');
        $('#searchTerm').attr('disabled',!show);
        show?$('#theSearchButton').removeClass('disabled'):$('#theSearchButton').addClass('disabled');

    },
    search:function(){
        var _this = this;
        $('.main-container').load('/html/search.html',function(){
            var search = function(){
                if(_this.vendor){
                    _this.socket.emit("search-page",{
                        terms: $('#searchTerm').val()||_this.vendor.vendor.defaultSearch||"",
                        categories:_this.vendor.vendor.vendorCategories,
                        vendor:_this.vendor.vendor.vendorName,
                        page: 1
                    });
                    _this.socket.emit('close-menu');
                }
            };
            $('#theSearchButton').click(function(){
                search();
            });
            $('#searchTerm').keyup(function(e){
                e.preventDefault();
                if (e.keyCode === 13) {
                    search()
                }
            });
        });
    },
    basket:function(){
        var _this = this;
        $('.main-container').load('/html/basket.html',function(){
            _this.socket.emit('getBaskets');
        });
    },
    updateMapPosition:function(){

    }
};
var main = new Main();