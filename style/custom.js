var windowLoc = $(location).attr('pathname');
var navBackground = $(".nav-background")
var ham = $(".nav-ham")
var hamLines = $(".nav-ham div")
var navLinks = $(".nav-link")
var mobileNav = $(".mobile-nav-bar")
var mobileNavLink = $(".mobile-nav-item a")
var podcastHeader = $(".podcast-header-text")
var podcastSections = $(".podcast-section-text")

$(ham).on("click", function () {
  if (!$(hamLines).hasClass("down")) {
    $(hamLines).addClass("down");
    $(mobileNav).addClass("down");
    $(navBackground).css("opacity", "0.97");
  } else {
    $(hamLines).removeClass("down");
    $(mobileNav).removeClass("down");
    $(navBackground).css("opacity", "0.9");
  }
});
switch (windowLoc) {
  case "/podcast.html":
  case "/podcast":
    $(document).on("scroll", function () {
      var windowBottom = $(document).scrollTop() + 0.8*$(window).height();
      $(podcastSections).each(function () {
        if ($(this).offset().top < windowBottom) {
          $(this).addClass("on");
        }
      });
    });
    break;
};
function back () {
  window.history.back();
};
