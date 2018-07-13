// ==UserScript==
// @name        t.co privacy script
// @namespace   https://tco.bot.nu
// @include     https://twitter.com/*
// @version     1.0
// @grant       none
// ==/UserScript==

var tcobot = "https://tco.bot.nu"

function opentco(event) {
  console.log("fuck");
  event.stopPropagation();
  var url = this.parentElement.attributes['data-card-url'].textContent;
  url = url.replace("https://t.co", tcobot);
  window.open(url, '_blank');
  return false;
}

var mut = new MutationObserver(function(mutations) {
  // replace text links with good links
  var links = document.body.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    if (link.href && link.href.includes("://t.co/")) {
      link.href = link.href.replace("https://t.co", tcobot);
    }
  };
  
  // obscure iframe links with good links
  var cards = document.body.getElementsByClassName("js-macaw-cards-iframe-container");
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    if (card.children.length != 1 || card.children[0].tagName != "IFRAME") {
      continue;
    }
    
    var modal = document.createElement('a');
    modal.style.display = "block";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.position = "absolute";
    modal.style.left = 0;
    modal.style.top = 0;
    modal.style.zIndex = 1;
    
    var url = card.attributes['data-card-url'].textContent
    url = url.replace("https://t.co", tcobot);
    modal.setAttribute("href", url);
    
    card.style.position = "relative";
    card.appendChild(modal);
  };
});

var config = { 
  childList: true,
  subtree: true
};

mut.observe(document.body, config);
