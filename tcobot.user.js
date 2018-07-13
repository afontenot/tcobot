// ==UserScript==
// @name        t.co privacy script
// @namespace   https://tco.bot.nu
// @include     https://twitter.com/*
// @include     https://t.co/*
// @run-at document-start
// @version     1.0
// @grant       none
// ==/UserScript==

var tcobot = "https://tco.bot.nu";

var loc = window.location;
loc = loc.replace("https://t.co", tcobot);
window.location.replace(loc)
