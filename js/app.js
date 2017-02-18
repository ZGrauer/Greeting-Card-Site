var shopInfo;

/**
 * @description Enables Bootstrap tooltips when hovering
 */
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    $('.carousel').carousel({
        interval: false
    });
    getEstyData('https://openapi.etsy.com/v2/shops/12921536.js');
    getEstyData('https://openapi.etsy.com/v2/shops/12921536/listings/active.js');
});

var setCards = (type) => {
    $('.card').show();
    $('.card').not('.' + type).hide();
};


/**
 * Enter Etsy Dev API Key here
 */
var api_key = 'cm40xs23fd5y3d2k3ic5qtdl';


/**
 * @description Uses AJAX request to get Etsy shop data and all shop listings.
 * @param  {String} queryUrl Etsy API query URL to use. This should not include the API key or callback.
 * @returns Sets variables shopInfo & shopListings
 */
function getEstyData(queryUrl) {
    queryUrl += '?api_key=' + api_key + '&callback=callback';
    $.ajax({
            url: queryUrl,
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
                    console.dir(buildCards(data));
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
            cards.push(new etsyListing(shopListings.results[listing]));
        }
    }
    return cards;
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
    this.listingId = listingData.listing_id;
    this.categoryId = listingData.category_id;
    this.url = listingData.url;
    this.title = listingData.title;
    this.description = listingData.description;
    this.price = listingData.price;
    this.currencyCode = listingData.currency_code;
    this.quantity = listingData.quantity;
    this.tags = listingData.tags;
    this.categoryPath = listingData.category_path;
    this.taxonomyPath = listingData.taxonomy_path;
    this.views = listingData.views;
    this.numFavorers = listingData.num_favorers;
    this.whenMade = listingData.when_made;
    this.itemLength = listingData.item_length;
    this.itemHeight = listingData.item_height;
    this.itemWidth = listingData.item_width;
}
