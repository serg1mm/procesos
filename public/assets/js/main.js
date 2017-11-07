NProgress.start();
/* LOAD ON START */
$(window).ready(function() {
   $('#menu-load').load('public/assets/dep/menu.html');
   $('#content-load').load('public/assets/dep/content.html');
   $('#footer-load').load('public/assets/dep/footer.html');
 });
/* WAITFORIMAGES */
$(document).waitForImages(function() {
    NProgress.done();
}, function(loaded, count, success) {
   $(this).addClass('loaded');
});
