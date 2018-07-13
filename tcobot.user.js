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
  // first attempt to work around 
  // https://github.com/greasemonkey/greasemonkey/issues/2574
  var frames = document.body.getElementsByTagName("iframe");
  for (var i = 0; i < frames.length; i++) {
    var frame = frames[i];
    if (frame == null) {
      continue;
    }
    let embed = document.createElement('embed');
    for (var att, i = 0, atts = frame.attributes, n = atts.length; i < n; i++){
      att = atts[i];
      embed.setAttribute(att.nodeName,att.nodeValue);
    }
    frame.parentElement.replaceChild(embed, frame);
  }
    
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

