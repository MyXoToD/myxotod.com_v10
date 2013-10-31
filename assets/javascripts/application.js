$(document).ready(function() {
  // Calculate width of right column
  if ($(window).width() > 1668) {
    var width = $(window).width() - 500;
    $('.right-col').css("width", width + "px");
  }
  $(window).resize(function() {
    $if ($(window).width() > 1668) {
      var width = $(window).width() - 500;
      alert(width);
      $('.right-col').css("width", width + "px");
    }
  });
});