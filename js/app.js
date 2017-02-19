var shopInfo;
/**
 * Enter Etsy Dev API Key here
 */
var api_key = 'cm40xs23fd5y3d2k3ic5qtdl';

/**
 * @description Enables Bootstrap tooltips when hovering
 */
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    $('.carousel').carousel({
        interval: false
    });
    getEstyData('https://openapi.etsy.com/v2/shops/12921536.js?api_key=' + api_key + '&callback=callback');
    getEstyData('https://openapi.etsy.com/v2/shops/12921536/listings/active.js?api_key=' + api_key + '&includes=MainImage&limit=50&offset=0&callback=callback');
});

var setCards = (type) => {
    $('.card').show();
    $('.card').not('.' + type).hide();
};



/**
 * @description Uses AJAX request to get Etsy shop data and all shop listings.
 * @param  {String} queryUrl Etsy API query URL to use. This should not include the API key or callback.
 * @returns Sets variables shopInfo & shopListings
 */
function getEstyData(queryUrl) {
    $.ajax({
            url: queryUrl,
            api_key: api_key,
            type: "GET",
            dataType: 'jsonp',
            jsonp: "callback",
        })
        .done(function(data) {
            //console.dir(data);
            if (data.ok) {
                if (data.type == 'Shop') {
                    shopInfo = new etsyShop(data);
                } else if (data.type == 'Listing') {
                    addCards2Page(buildCards(data));
                }

            } else {
                alert(data.error);
            }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            alert('ERROR! Unable to get shop data.\n' + textStatus + '\n' + errorThrown);
        });

}


function buildCards(shopListings) {
    var cards = [];
    for (var listing in shopListings.results) {
        if (shopListings.results.hasOwnProperty(listing)) {
            var currentCard = new etsyListing(shopListings.results[listing]);
            cards.push(currentCard);
        }
    }
    return cards;
}


function addCards2Page(cards) {
    $('#card-grid').empty();
    if (cards.length > 0) {
        var i = 0;
        var row = 0;
        for (var card in cards) {
            if (cards.hasOwnProperty(card)) {

                if (i === 0) {
                    var $div = $('<div></div>').addClass('row').attr('id', 'card-grid-row-' + row);
                    $('#card-grid').append($div);
                }


                var $imgSpan = $('<span></span>').addClass('img-span').append($('<a></a>').attr('href', cards[card].url).attr('target', '_blank').addClass('card-name').text('Details'));
                var $img = $('<div></div>').addClass('image-div').css('background', 'url(' + cards[card].imgUrls.url_570xN + ') 50% 50% no-repeat');

                var $imgDiv = $('<div></div>').addClass('thumb').append($img);
                var $title = $('<h3></h3>').html(cards[card].title).addClass('text-center');
                var $price = $('<h4></h4>').html('$' + cards[card].price).addClass('text-center card-price');
                var $desc = $('<p>' + cards[card].description.replace(/\n/g, "<br />") + '</p>').addClass('card-desc');
                var $link = $('<a></a>').attr('href', cards[card].url).attr('target', '_blank').addClass('card-name');
                $title = $link.append($title);

                var $column = $('<div></div>').addClass('' + cards[card].taxonomyPath[cards[card].taxonomyPath.length - 1].split(' ')[0].toLowerCase()).addClass('col-md-4 card').append($imgDiv, $title, $price);

                $div.append($column);
                i++;
                if (i === 3) {
                    i = 0;
                    row++;
                }
            }
        }
    }
}

function updateImgSrc(listingId, imgUrl) {
    $('#img-' + listingId).attr('src', imgUrl);
}


/**
 * @description Object describing the Etsy store. Populated by JSON from Etsy API
 * @param  {Object} shopData JSON from Etsy API. https://openapi.etsy.com/v2/shops/12921536.js
 * @returns {Object}
 */
function etsyShop(shopData) {
    this.shopId = shopData.results.shop_id;
    this.shopName = shopData.results.shop_name;
    this.title = shopData.results.title;
    this.announcement = shopData.results.announcement;
    this.url = shopData.results.url;
    this.imgUrl = shopData.results.image_url_760x100;
    this.iconUrl = shopData.results.icon_url_fullxfull;
    this.activeListings = shopData.results.listing_active_count;
    this.saleMessage = shopData.results.sale_message;
    this.policyWelcome = shopData.results.policy_welcome;
    this.policyPayment = shopData.results.policy_payment;
    this.policyShipping = shopData.results.policy_shipping;
    this.policyRefunds = shopData.results.policy_refunds;
    this.policyAdditional = shopData.results.policy_additional;
}


/**
 * @description Object describing an item in the Etsy store. Populated by JSON from Etsy API
 * @param  {Object} listingData JSON from Etsy API. https://openapi.etsy.com/v2/shops/12921536/listings/active.js
 * @returns {Object}
 */
function etsyListing(listingData) {
    var self = this;
    self.listingId = listingData.listing_id;
    self.categoryId = listingData.category_id;
    self.url = listingData.url;
    self.title = listingData.title;
    self.description = listingData.description;
    self.price = listingData.price;
    self.currencyCode = listingData.currency_code;
    self.quantity = listingData.quantity;
    self.tags = listingData.tags;
    self.categoryPath = listingData.category_path;
    self.taxonomyPath = listingData.taxonomy_path;
    self.views = listingData.views;
    self.numFavorers = listingData.num_favorers;
    self.whenMade = listingData.when_made;
    self.itemLength = listingData.item_length;
    self.itemHeight = listingData.item_height;
    self.itemWidth = listingData.item_width;
    self.imgUrls = listingData.MainImage;

}
