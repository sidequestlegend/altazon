var Main = function() {
    var _this = this;
    this.shared = new Shared(this);
    $('#productTitle').html('Loading Product Details...');
    this.setupSocket()
        .then(function(result){
            _this.socket.emit('get-product');
            $('#carousel').carousel();
            $('#openReviews').click(function(){
                if(_this.main_product){
                    $.featherlight({iframe: _this.main_product.full.CustomerReviews[0].IFrameURL[0], iframeMaxWidth: '100%', iframeWidth: 500,
                        iframeHeight: 500});
                    //$('.featherlight-inner').attr('height',400)
                }
            });
            _this.socket.on('set-product',function(product) {
                if(product){
                    _this.main_product = product;
                    $('#productTitle').html(product.title);
                    $('#carousel').html('');
                    $('#add_to_basket').html('<img src="/assets/images/loader-spinning.gif" style="width:250px;"/>');
                    $('#carousel').carousel('destroy');
                    $('#variationsContainer').html('<img src="/assets/images/loader-spinning.gif" style="width:250px;"/>');
                    _this.socket.emit('open-product', {ASIN: product.full.ParentASIN?product.full.ParentASIN[0]:product.full.ASIN[0],vendor:"AmazonUS"});
                    $('#product').css('display','block');
                    $('#done_info').css('display','none');
                }else{
                    $('#product').css('display','none');
                    $('#done_text').html('No product selected...');
                    $('#done_info').css('display','block');
                }
            });
            _this.socket.on('open-product',function(product){
                clearTimeout(_this.timout_timer);
                _this.product = product;
                $('#variationsContainer').html('');
                _this.initialise();
            });
            _this.socket.on('getBaskets',function(){
                $('#product').css('display','none');
                $('#done_text').html('Added to your basket!');
                $('#done_info').css('display','block');
            });
        });
};
Main.prototype = {
    initialise:function(){
        var _this = this;
        _this.selected_dimensions = _this.variation_dimensions = {}
        if(_this.product.length&&_this.product[0].Variations){
            _this.product[0].Variations[0].Item.forEach(function(variation){
                variation.VariationAttributes[0].VariationAttribute.forEach(function(attribute){
                    if(_this.variation_dimensions[attribute.Name[0]]&&_this.variation_dimensions[attribute.Name[0]].indexOf(attribute.Value[0])===-1){
                        _this.variation_dimensions[attribute.Name[0]].push(attribute.Value[0]);
                    }else if(!_this.variation_dimensions[attribute.Name[0]]){
                        _this.variation_dimensions[attribute.Name[0]] = [attribute.Value[0]];
                    }
                });
            });
            Object.keys(_this.variation_dimensions).forEach(function(key){
                var dimension = _this.variation_dimensions[key];
                var title = $('<h6>').html(key);
                $('#variationsContainer').append(title);
                var container = $('<div class="variation-row-container">');
                dimension.forEach(function(option,i){
                    var variation = $('<div class="variation-item btn waves-effect waves-light orange">').html(option);
                    container.append(variation)
                    variation.click(function(){
                        container.children().each(function(){
                            $(this).removeClass('green').addClass('orange');
                        });
                        $(this).removeClass('orange').addClass('green');
                        _this.selected_dimensions[key] = option;
                        _this.updatePreview();
                    });
                    if(i===0){
                        variation.trigger('click');
                    }
                });
                $('#variationsContainer').append(container);
            });
        }
    },
    setupSocket:function() {
        var _this = this;
        return this.shared
            .setupSocket()
            .then(function (result) {
                _this.socket = result.socket;
                _this.user = result.user;
                _this.socket.on('connect', function () {
                    _this.socket.emit('guid', {guid: result.user.user.userId, client: "add_to_basket"});
                });
            });
    },
    updatePreview:function(){
        var _this = this;
        $('#carousel').html('');
        $('#add_to_basket').html('');
        if(_this.product.length&&_this.product[0].Variations) {
            var variation = _this.product[0].Variations[0].Item.filter(function (variation) {
                var selected = Object.keys(_this.selected_dimensions).map(function(key){
                    return _this.selected_dimensions[key];
                });
                return variation.VariationAttributes[0].VariationAttribute.filter(function (attribute) {
                    return selected.indexOf(attribute.Value[0])>-1;
                }).length===selected.length;
            });
            if(variation.length){
                variation[0].ImageSets[0].ImageSet.forEach(function(image){
                    var largeImage = image.HiResImage?image.HiResImage[0].URL[0]:image.LargeImage?image.LargeImage[0].URL[0]:image.MediumImage[0].URL[0];
                    var image_button = $('<a class="carousel-item" href="'+largeImage+'" data-featherlight="image"><img src="'+image.MediumImage[0].URL[0]+'">');
                    $('#carousel').append(image_button)
                });
                $('#carousel').carousel('destroy');
                $('#carousel').carousel();
                var add_to_basket = $('<div class="btn waves-effect waves-light">Add To Basket</div>');
                var price = '', price_numeric = 0, avaibability, primeEligibility, superSaveerShippingElegibility,price_ele;
                if(variation[0].Offers&&variation[0].Offers[0].Offer&&variation[0].Offers[0].Offer[0].OfferListing){
                    var offer = variation[0].Offers[0].Offer[0].OfferListing[0];
                    if(offer.SalePrice&&offer.SalePrice[0].FormattedPrice){
                        price = offer.SalePrice[0].FormattedPrice[0];
                        price_ele = $('<div><h6 class="center strike-through">'+offer.Price[0].FormattedPrice[0]+'</h6><h5 class="center red-text">'+price+'</h5></div>');
                        if(offer.SalePrice[0].Amount){
                            price_numeric = offer.SalePrice[0].Amount[0];
                        }
                    }else if(offer.Price&&offer.Price[0].FormattedPrice){
                        price = offer.Price[0].FormattedPrice[0];
                        price_ele = $('<div><h5 class="center">'+price+'</h5></div>');
                        if(offer.Price[0].Amount){
                            price_numeric = offer.Price[0].Amount[0];
                        }
                    }
                    if(price === 'Too low to display')price='';
                    if(offer.Availability){
                        avaibability = offer.Availability[0]
                    }
                    if(offer.IsEligibleForPrime&&offer.IsEligibleForPrime[0]==="1"){
                        primeEligibility = true;
                    }
                    if(offer.IsEligibleForSuperSaverShipping&&offer.IsEligibleForSuperSaverShipping[0]==="1"){
                        superSaveerShippingElegibility = true;
                    }
                }
                add_to_basket.click(function(){
                    var product = _this.main_product;
                    product.price = price||'';
                    product.price_numeric = price||0;
                    product.sku = variation[0].Offers&&variation[0].Offers[0].Offer&&variation[0].Offers[0].Offer[0].OfferListing[0].OfferListingId?'offerid::'+variation[0].Offers[0].Offer[0].OfferListing[0].OfferListingId[0]:variation[0].ItemAttributes&&variation[0].ItemAttributes[0].ASIN?'asin::'+variation[0].ItemAttributes[0].ASIN[0]:'',
                        _this.socket.emit('addToBasket',{product:product,vendor:"AmazonUS"});
                });
                if(price){
                    if(price_ele)$('#add_to_basket').append(price_ele);
                    $('#add_to_basket').append(add_to_basket);
                    if(avaibability)$('#add_to_basket').append($('<h6 class="center">'+avaibability+'</h6>'));
                    if(primeEligibility)$('#add_to_basket').append($('<h6 class="center">Eligible for Amazon Prime</h6>'));
                    if(superSaveerShippingElegibility)$('#add_to_basket').append($('<h6 class="center">'+(primeEligibility?'and ':'Eligible for ')+'Super Saver Shipping</h6>'));
                }else{
                    // var add_to_basket = $('<div class="btn waves-effect waves-light disabled">Add To Basket</div>');
                    // var image = $('<a class="carousel-item" href="#"><img src="/assets/images/not-available.jpg">');
                    $('#add_to_basket').append($('<h5 class="center">That combination is not avaialble</h5>'));
                }
            }else{
                var add_to_basket = $('<div class="btn waves-effect waves-light disabled">Add To Basket</div>');
                var image = $('<a class="carousel-item" href="#"><img src="/assets/images/not-available.jpg">');
                $('#add_to_basket').append($('<h5 class="center">That combination is not avaialble</h5>'));
                $('#add_to_basket').append(add_to_basket);
                $('#carousel').append(image);
                $('#carousel').carousel('destroy');
                $('#carousel').carousel();
            }
        }
    }
};

new Main();