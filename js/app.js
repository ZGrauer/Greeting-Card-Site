/**
 * @description Enables Bootstrap tooltips when hovering
 */
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    $('.carousel').carousel({
        interval: false
    });
});
