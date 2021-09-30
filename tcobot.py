import requests

from flask import Flask, abort, redirect
from sqlitedict import SqliteDict

app = Flask(__name__)
urls = SqliteDict('./urls.sqlite', autocommit=True)

ua = {'User-Agent': 'HTTPie/0.9.9'}

@app.route("/<tcourl>")
def get(tcourl):
    print(tcourl, len(tcourl))
    if len(tcourl) > 8 and len(tcourl) < 12:
        if tcourl in urls:
            url = urls[tcourl]
            if url == "404":
                abort(404)
            return redirect(url, 301)
        else:
            r = requests.get("https://t.co/" + tcourl, headers=ua, allow_redirects=False)
            if r.status_code == 301:
                url = r.headers['location']
                urls[tcourl] = url
                return redirect(url, 301)
            elif r.status_code == 200:
                abort(404)
            else:
                urls[tcourl] = "404"
                abort(404)
    else:
        abort(404)

@app.route("/favicon.ico")
def favicon():
    abort(404)

