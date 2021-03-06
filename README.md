A small caching server and associated user script to remotely fetch Twitter's t.co shortlinks to avoid user tracking. Run it on your own server or use the test server below.

The userscript by default replaces "https://t.co/[linkcode]" with "https://tco.bot.nu/[linkcode]". This is a test server running this script. This server keeps no logs except with nginx. IP addresses are scrubbed from the logs every 24 hours. While the server is intended to run 24/7, its uptime and correct behavior cannot be guaranteed. NO WARRANTY is provided for either the code or the service.

File a PR if you can improve the userscript. It was hard to get working in Firefox due to the Webextensions update which broke a lot of userscript injectors. It's currently only tested with Firefox and Greasemonkey.

You could also use this without the userscript by setting a host file entry for t.co, but this might be flaky if the IP address ever changes for the server.
