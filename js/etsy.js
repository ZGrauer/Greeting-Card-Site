var shopInfo; // Etsy shop info from API
var shopCards; // Etsy card object array from API

var api_key = 'cm40xs23fd5y3d2k3ic5qtdl'; // Enter Etsy Dev API Key here!!!


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
                    // Create shop object
                    shopInfo = new etsyShop(data);
                    // If there's an announcement, then display as Bootstrap alert
                    if (shopInfo.announcement.length > 0) {
                        $('#shop-alert').append(shopInfo.announcement.replace(/\n/g, "<br />")).show();
                    }
                    // If the store has policy info, add a nav item to display function
                    if (shopInfo.policyPayment || shopInfo.policyWelcome || shopInfo.policyShipping || shopInfo.policyRefunds) {
                        $policyLink = $('<a></a>').attr('href', '#').text('Policy').attr('onclick', 'displayPolicyPage()');
                        $navPolicyItem = $('<li></li>').addClass('nav-item nav-link').append($policyLink).insertAfter('#shopDropdown');
                    }
                } else if (data.type == 'Listing') {
                    // Build array of card objects.  Add cards to page
                    shopCards = buildCards(data);
                    addCards2Page(shopCards);
                } else if (data.type == 'User') {
                    // Add Etsy store review count
                    $('.store-intro').append($('<span></span>').html('<b>Etsy Reviews: </b>'), $('<span></span>').addClass('badge').text(data.results[0].feedback_info.count));

                    // Add Etsy store feeback 100%, displayed as 5-star rating
                    var $starDivTop = $('<div></div>').addClass('star-ratings-css-top').css('width', data.results[0].feedback_info.score + '%').append($('<span></span>').text('★'), $('<span></span>').text('★'), $('<span></span>').text('★'), $('<span></span>').text('★'), $('<span></span>').text('★'));
                    var $starDivBottom = $('<div></div>').addClass('star-ratings-css-bottom').append($('<span></span>').text('★'), $('<span></span>').text('★'), $('<span></span>').text('★'), $('<span></span>').text('★'), $('<span></span>').text('★'));
                    var $starDiv = $('<div></div>').addClass('star-ratings-css').append($starDivTop, $starDivBottom);
                    $('.store-intro').append($starDiv);
                }

            } else {
                alert(data.error);
            }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            alert('ERROR! Unable to get shop data.\n' + textStatus + '\n' + errorThrown);
        });

}



/**
 * @description Replaces
 */
function displayPolicyPage() {
    $('#card-grid').html('');
    $('#card-grid').append($('<h2>Store Policies</h2>'));
    $('#card-grid').append($('<hr/>'));
    if (shopInfo.policyWelcome !== null) {
        $('#card-grid').append($('<p>' + shopInfo.policyWelcome.replace(/\n/g, "<br />") + '</p>'));
    }
    if (shopInfo.policyShipping !== null) {
        $('#card-grid').append($('<h3>Shipping Policy</h3>'));
        $('#card-grid').append($('<p>' + shopInfo.policyShipping.replace(/\n/g, "<br />") + '</p>'));
    }
    if (shopInfo.policyPayment !== null) {
        $('#card-grid').append($('<h3>Payment Policy</h3>'));
        $('#card-grid').append($('<p>' + shopInfo.policyPayment.replace(/\n/g, "<br />") + '</p>'));
    }
    if (shopInfo.policyRefunds !== null) {
        $('#card-grid').append($('<h3>Refund Policy</h3>'));
        $('#card-grid').append($('<p>' + shopInfo.policyRefunds.replace(/\n/g, "<br />") + '</p>'));
    }
    if (shopInfo.policyAdditional !== null) {
        $('#card-grid').append($('<h3>Additional</h3>'));
        $('#card-grid').append($('<p>' + shopInfo.policyAdditional.replace(/\n/g, "<br />") + '</p>'));
    }
}


/**
 * @description Creates instances of etsyListing objects based on API JSON and adds them to array shopCards.
 * @param  {Array.<Object>} shopListings array of objects.  This is the JSON of Etsy listings returned from API AJAX
 * @returns {Array.<etsyListing>} Array of etsyListing objects representing cards in the store
 */
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



/**
 * @description Adds card objects as jQuery elements to the #card-grid div on the Shop page.
 * @param  {Array.<etsyListing>} cards Array of etsyListing objects representing cards in the store
 */
function addCards2Page(cards) {
    if (cards.length > 0) {
        var i = 0;
        var row = 0;
        $('#card-grid').html('');
        $('#card-grid').append($('<h2>Shop</h2>')).append('<hr/>');
        for (var card in cards) {
            if (cards.hasOwnProperty(card)) {

                if (i === 0) {
                    var $div = $('<div></div>').addClass('row').attr('id', 'card-grid-row-' + row);
                    $('#card-grid').append($div);
                }

                var $imgSpan = $('<span></span>').addClass('img-span').append($('<a></a>').attr('href', cards[card].url).attr('target', '_blank').addClass('card-name').text('Details'));
                var $img = $('<div></div>').addClass('image-div').css('background', 'url(' + cards[card].imgUrls.url_570xN.replace('_570xN', '_300x300') + ') 50% 50% no-repeat').data('location', cards[card].url).attr('onclick', 'window.open($(this).data("location"), "_blank")').css('cursor', 'pointer');

                var $imgDiv = $('<div></div>').addClass('thumb').append($img);
                var $title = $('<h3></h3>').html(cards[card].title).addClass('text-center');
                var $price = $('<h4></h4>').html('$' + cards[card].price).addClass('text-center card-price');
                var $desc = $('<p>' + cards[card].description.replace(/\n/g, "<br />") + '</p>').addClass('card-desc');
                var $link = $('<a></a>').attr('href', cards[card].url).attr('target', '_blank').addClass('card-name');
                $title = $link.append($title);

                var $caption = $('<div></div>').addClass('caption').append($title, $price);
                var $thumbnailDiv = $('<div></div>').addClass('thumbnail').append($imgDiv, $caption);

                var $column = $('<div></div>').addClass('' + cards[card].shopSectionId).addClass('col-md-4 card').append($thumbnailDiv);

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
    this.shopId = shopData.results[0].shop_id;
    this.shopName = shopData.results[0].shop_name;
    this.title = shopData.results[0].title;
    this.announcement = shopData.results[0].announcement;
    this.url = shopData.results[0].url;
    this.imgUrl = shopData.results[0].image_url_760x100;
    this.iconUrl = shopData.results[0].icon_url_fullxfull;
    this.activeListings = shopData.results[0].listing_active_count;
    this.saleMessage = shopData.results[0].sale_message;
    this.policyWelcome = shopData.results[0].policy_welcome;
    this.policyPayment = shopData.results[0].policy_payment;
    this.policyShipping = shopData.results[0].policy_shipping;
    this.policyRefunds = shopData.results[0].policy_refunds;
    this.policyAdditional = shopData.results[0].policy_additional;
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
    self.shopSectionId = listingData.shop_section_id;
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
