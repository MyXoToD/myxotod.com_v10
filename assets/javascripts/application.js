$(document).ready(function() {
  april.fool();

  // Scroll Top Button
  $(window).scroll(function() {
    if ($(window).scrollTop() > 150) {
      $(".to-top").fadeIn("slow");
    } else {
      $(".to-top").fadeOut("slow");
    }
  });
  $(document).on("click", ".to-top", function() {
    $("body, html").animate({
      scrollTop: "0px"
    });
  });

  // Calculate avatar Height
  $('.avatar').css('height', $('.avatar').width() + 'px');
  $(window).resize(function() {
    $('.avatar').css('height', $('.avatar').width() + 'px');
    $('.phrases h1, .about').css("z-index", 1); // Font-Size Update Fix
  });

  // Mobile Navigation
  var navOpen = false;
  var navSpeed = 200;
  $(document).on("click", ".toggle-mobile-nav", function() {
    if (navOpen) {
      // Close
      $(".mobile-nav").animate({
        left: "-80%"
      }, navSpeed);
      $(".page").animate({
        left: "0%",
        right: "0%"
      }, navSpeed).css("position", "absolute");
      $(this).removeClass("entypo-cancel");
      $(this).addClass("entypo-menu");
      $(this).animate({
        left: "-=80%"
      }, navSpeed);
      navOpen = false;
    } else {
      // Open
      $(".mobile-nav").animate({
        left: "0%"
      }, navSpeed);
      $(".page").animate({
        left: "80%",
        right: "-80%"
      }, navSpeed).css("position", "fixed");
      $(this).removeClass("entypo-menu");
      $(this).addClass("entypo-cancel");
      $(this).animate({
        left: "+=80%"
      }, navSpeed);
      navOpen = true;
    }
  });

  // Init Phrases + Start Loop
  $('.phrases').html("<h1>" + Phrases[0] + "</h1>");
  var intervalPhrases = setInterval("initPhrases()", 3500);

  // Stop and start phrases animation on mouseover/leave
  $(document).on("mouseover", ".phrases", function() {
    clearInterval(intervalPhrases);
  });
  $(document).on("mouseleave", ".phrases", function() {
    intervalPhrases = setInterval("initPhrases()", 3500);
  });

  // Lab articles
  $(document).on("click", ".lab article header", function(event) {
    event.preventDefault();
    $(this).toggleClass("open");
    if ($(this).hasClass("entypo-plus-circled")) {
      $(this).removeClass("entypo-plus-circled");
      $(this).addClass("entypo-minus-circled");
    } else {
      $(this).removeClass("entypo-minus-circled");
      $(this).addClass("entypo-plus-circled");
    }
    $(this).next("main").slideToggle();
  });

  // Calculating age
  getAge();
  getHappyDay();
});

function getHappyDay() {
  d = new Date();
  weekdays = new Array(7);
  weekdays[0] = "Sunday";
  weekdays[1] = "Monday";
  weekdays[2] = "Tuesday";
  weekdays[3] = "Wednesday";
  weekdays[4] = "Thursday";
  weekdays[5] = "Friday";
  weekdays[6] = "Saturday";
  $("footer .day").html(weekdays[d.getDay()]);
}

function getAge() {
  var birthday = new Date("02 22, 1993");
  var today = new Date();
  var age = Math.floor((today - birthday) / 1000 / 60 / 60 / 24 / 365);
  $(".age").html(age);
}

// List of all phrases
var Phrases = new Array(
  "I go by the<br />name <a href='/about/'>Max</a>",
  "I go to work<br />at <a href='http://www.opoloo.com' target='_blank'>Opoloo</a>",
  "I push to master<br />on <a href='http://www.github.com/MyXoToD' target='_blank'>Github</a>",
  "I code stuff<br />on <a href='http://www.codepen.io/MyXoToD' target='_blank'>CodePen</a>",
  "I post tweets<br />on <a href='http://www.twitter.com/MyXoToD' target='_blank'>Twitter</a>",
  //"I write stories<br />on <a href='https://medium.com/@MyXoToD' target='_blank'>Medium</a>",
  "I listen to music<br />on <a href='http://open.spotify.com/user/1145610126' target='_blank'>Spotify</a>"
);

// Phases settings
var currentPhrase = 0;
var direction = "left";
var countPhrases = Phrases.length - 1;
var phrasesSpeed = 500;

// Animate phrases
function initPhrases() {
  var box = $('.phrases');
  currentPhrase++;
  if (currentPhrase > countPhrases) {
    currentPhrase = 0;
  }
  var next = $("<h1>" + Phrases[currentPhrase] + "</h1>");
  switch (direction) {
    case "left":
      next.css("margin-left", "-100%");
      next.css("opacity", "0");
      box.prepend(next);

      $('.phrases h1:last-of-type').animate({
        marginLeft: "100%",
        opacity: "0"
      }, phrasesSpeed, function() {
        $(this).remove();
      });
      $('.phrases h1:first-of-type').animate({
        marginLeft: "0",
        opacity: "1"
      }, phrasesSpeed);

      direction = "right";
    break;
    case "right":
      next.css("margin-left", "100%");
      next.css("opacity", "0");
      box.append(next);

      $('.phrases h1:first-of-type').animate({
        marginLeft: "-100%",
        opacity: "0"
      }, phrasesSpeed, function() {
        $(this).remove();
      });
      $('.phrases h1:last-of-type').animate({
        marginLeft: "0",
        opacity: "1"
      }, phrasesSpeed);

      direction = "left";
    break;
  }
}

april = {
  fool: function() {
    d = new Date();
    month = d.getUTCMonth() + 1;
    day = d.getUTCDate();
    if (month == 4 && day == 1) {
      if (window.location.href != "http://harlemify.com/?url=myxotod.com") {
        window.location.href = "http://harlemify.com/?url=myxotod.com";
      }
    }
  }
};