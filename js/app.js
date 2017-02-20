/**
 * Enables Bootstrap tooltips when hovering
 */
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    $('.carousel').carousel({
        interval: false
    });
    // Get Etsy sop data for Expressions for Us
    getEstyData('https://openapi.etsy.com/v2/shops/12921536.js?api_key=' + api_key + '&callback=callback');
    // Get all Etsy cards in Expressions for us
    // Include main image, limit to 50 cards with no offset.
    getEstyData('https://openapi.etsy.com/v2/shops/12921536/listings/active.js?api_key=' + api_key + '&includes=MainImage&limit=50&offset=0&callback=callback');
});



/**
 * @description Filters all card objects in shopCards based on the shopSectionId.  Allows users to filter using the nav bar dropdown
 * @param  {String} String representing the Etsy shop section ID.  This is matched against all cards in the object array, shopCards.
 */
var setCards = (type) => {
    var filteredArray = shopCards.filter(function(card) {
        return type == card.shopSectionId;
    });

    if (filteredArray.length > 0) {
        addCards2Page(filteredArray);
    } else {
        addCards2Page(shopCards);
    }
};
