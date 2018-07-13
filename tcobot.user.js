// ==UserScript==
// @name        t.co privacy script
// @namespace   https://tco.bot.nu
// @include     https://twitter.com/*
// @include     https://t.co/*
// @version     1.0
// @grant       none
// ==/UserScript==

// Thanks to https://github.com/tony-o/t.co-bypass
// for the basic idea behind this script.

// If the script isn't replacing URLs for you,
// it's probably because of a Firefox bug.
// Discussion / workaround: https://github.com/violentmonkey/violentmonkey/issues/408

var tcobot = "https://tco.bot.nu"

var mut = new MutationObserver(function(mutations) {
  var links = document.body.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    if (link.getAttribute("class") !== null && link.getAttribute("class").indexOf("twitter-atreply") > -1) {
      continue;
    }

    if (link.href && link.href.indexOf("://t.co/") > -1) {
      link.href = link.href.replace("https://t.co", tcobot);
    }
  };
});

var config = { 
  childList: true,
  subtree: true
};

mut.observe(document.body, config);

