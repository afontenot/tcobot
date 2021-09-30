import re
import requests

from flask import Flask, abort, redirect
from sqlitedict import SqliteDict
from urllib.parse import urlencode, urlunparse, urlparse, parse_qs

app = Flask(__name__)
urls = SqliteDict('./urls.sqlite', autocommit=True)

ua = {'User-Agent': "HTTPie/2.5.0"}

strip_params = ["utm_source", "utm_medium", "utm_term", "utm_content", "utm_campaign", 
                "utm_reader", "utm_place", "utm_userid", "utm_cid", "utm_name", 
                "utm_pubreferrer", "utm_swu", "utm_viz_id", "ga_source", "ga_medium", 
                "ga_term", "ga_content", "ga_campaign", "ga_place", "yclid", 
                "_openstat", "fb_action_ids", "fb_action_types", "fb_ref", "fb_source", 
                "action_object_map", "action_type_map", "action_ref_map", "gs_l", 
                "pd_rd_r@amazon.*", "pd_rd_w@amazon.*", "pd_rd_wg@amazon.*", 
                "_encoding@amazon.*", "psc@amazon.*", "ved@google.*", "ei@google.*", 
                "sei@google.*", "gws_rd@google.*", "cvid@bing.com", "form@bing.com", 
                "sk@bing.com", "sp@bing.com", "sc@bing.com", "qs@bing.com", 
                "pq@bing.com", "feature@youtube.com", "gclid@youtube.com", 
                "kw@youtube.com", "ref@amazon.*", "_hsenc", "mkt_tok", "hmb_campaign", 
                "hmb_source", "hmb_medium", "fbclid", "spReportId", "spJobID", 
                "spUserID", "spMailingID", "utm_mailing", "utm_brand", "CNDID", "mbid", 
                "trk", "trkCampaign", "sc_campaign", "sc_channel", "sc_content", 
                "sc_medium", "sc_outcome", "sc_geo", "sc_country", "wt_zmc"]

def unredirect(url):
    r = requests.get(url, headers=ua)
    return r.url

def clean(url):
    url = urlparse(url)
    query = parse_qs(url.query)
    newquery = query.copy()
    for key in query.keys(): # we're modifying dictionary, so copy keys
        for param in strip_params:
            if re.search(param, key):
                del newquery[key]
    return urlunparse((url.scheme, url.netloc, url.path, url.params,
                       urlencode(newquery, doseq=True), url.fragment))


@app.route("/<tcourl>")
def get(tcourl):
    if len(tcourl) == 10 and re.search('\W', tcourl) == None:
        print(tcourl, len(tcourl))
        if tcourl in urls:
            url = urls[tcourl]
            if url == "404":
                abort(404)
            return redirect(url, 301)
        else:
            r = requests.get("https://t.co/" + tcourl, headers=ua, allow_redirects=False)
            if r.status_code == 301:
                url = clean(unredirect(r.headers['location']))
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

