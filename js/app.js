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
