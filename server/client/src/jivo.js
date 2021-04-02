!(function () {
  "use strict";
  function e(e) {
    if (e) return e.src;
    try {
      throw new Error("Get script URL");
    } catch (e) {
      var t = e.stack;
      if (t) {
        var r = n(t),
          a = o(t),
          d = i(t);
        return r ? r[0] : a ? a[0] : d ? d[0] : null;
      }
    }
  }
  function t() {
    return document.currentScript
      ? document.currentScript
      : document.querySelector("script[jv-id]") ||
          document.querySelector("script[data-jv-id]");
  }
  function n(e) {
    return (
      e && e.match(/https?:\/\/(\S+\.com)\/(widget\.js|widget\/[A-Za-z0-9]+)/)
    );
  }
  function o(e) {
    return e && e.match(/https?:\/\/(\S+)\/script\/widget\/([A-Za-z0-9]+)/);
  }
  function i(e) {
    return e && e.match(/https?:\/\/(\S+)\/script\/geo-widget\/([A-Za-z0-9]+)/);
  }
  function r() {
    var e = window.location && window.location.protocol;
    return -1 === ["http", "https"].indexOf(e || "") && (e = "https:"), e;
  }
  function a() {
    var n = window.jivo_config && window.jivo_config.base_url,
      o = n || e(t());
    if (!o) return null;
    var i = "main";
    return (
      ["jvs", "ru1", "sa1", "ya", "reg"].forEach(function (e) {
        o && -1 !== o.indexOf(e) && (i = e);
      }),
      i
    );
  }
  function d(e, t, n) {
    var o;
    e.addEventListener
      ? e.addEventListener(t, n, !1)
      : e.attachEvent &&
        (e.attachEvent(
          "on" + t,
          ((o = e),
          function () {
            n.call(o, window.event);
          })
        ),
        (e = null));
  }
  function s(e) {
    try {
      d(window, "scroll", e), d(document.body, "mousemove", e);
    } catch (t) {
      e && e();
    }
  }
  function c(e, t, n) {
    if (window.removeEventListener) e.removeEventListener(t, n, !1);
    else {
      if (!window.detachEvent) return !1;
      e.detachEvent("on" + t, function () {
        n.call(e);
      });
    }
  }
  function l(e) {
    try {
      c(window, "scroll", e), c(document.body, "mousemove", e);
    } catch (e) {
      console.warn(e);
    }
  }
  function u(e, t, n, o, i) {
    i && i.error && (i = i.error),
      (i && i instanceof Error) || (i = {}),
      (i.stack = i.stack || "empty"),
      (i.message = "Bundle init error: " + e + " error.message: " + i.message),
      (i.columnNumber = o),
      (i.lineNumber = n),
      (i.url = t),
      window.parent.__jivoOnError(i);
  }
  var g = "loader_loaded",
    f = "no_widget_id_or_confighost",
    m = "error_code_1015",
    v = "widget_deleted",
    p = "ie_loading_blocked";
  (window.__jivoOnError = function (e) {
    if (
      -1 === navigator.userAgent.search(/google/gi) &&
      -1 === navigator.userAgent.search(/\+http:\/\/yandex\.com\/bots/gi)
    )
      try {
        var t = a(),
          n = r() + "//err.jivosite.com/widget",
          o = "POST",
          i = {
            widget: "true",
            widget_version: window.jivo_version,
            level: 2,
            url: window.location.href,
            user_agent: navigator.userAgent,
            lineNumber: e && e.lineNumber,
            fileName: e && e.fileName,
            column: e && e.columnNumber,
            full_message: e && e.stack,
            short_message: e && e.message,
            shard: t,
          },
          d = new XMLHttpRequest();
        "withCredentials" in d
          ? d.open(o, n, !0)
          : "undefined" != typeof XDomainRequest &&
            (d = new XDomainRequest()).open(o, n),
          d.setRequestHeader("Content-Type", "application/json"),
          d.send(JSON.stringify(i));
      } catch (e) {}
  }),
    (function () {
      var c = 0.1;
      window.__hasStorage = !1;
      try {
        localStorage.setItem("testLocalStorage", "ok"),
          localStorage.removeItem("testLocalStorage"),
          (window.__hasStorage = !0);
      } catch (e) {}
      function h(c, h, w, _) {
        var b = c.console;
        if (
          (b || (b = { log: function () {}, error: function () {} }),
          c.WebSocket)
        ) {
          if (void 0 === c.jivo_magic_var) {
            c.jivo_magic_var = !0;
            var y,
              S,
              j,
              C,
              E,
              I,
              T,
              L,
              N,
              O,
              A,
              k = {
                hasStorage: c.__hasStorage,
                jivoLoaderVersion: w,
                loadScript: function (e, t) {
                  var n = t || h,
                    o = n.getElementsByTagName("script")[0],
                    i = n.createElement("script");
                  pe(i), (o.parentNode.insertBefore(i, o).src = e);
                },
                currentLoaderVersionCache: _,
              },
              H = navigator.userAgent.toLowerCase(),
              x = /iPhone|iPad|iPod|Android|Windows Phone/i.test(H),
              B = h.createElement("iframe"),
              W = h.createElement("div"),
              R = 0,
              M = 0,
              q = 0,
              U = [],
              D = !1,
              J = !1,
              X = re(),
              P =
                JSON.parse(
                  '["AF","CG","CF","GW","ER","IR","IQ","KP","LR","LB","LY","ML","CU","PS","SO","SD","SY","ZW","YE"]'
                ) || null,
              G =
                JSON.parse(
                  '["127-129-12k-12i-12c-12h","12e-12i-12e-124-12c-12h","131-12e-12l-12m-124-12b-12c","124-12g-12o-129-12m-124-12g-12c-12h","127-124-12s-12c-12s","12g-124-12k-12c-12p-12n-124-12h-124","3n-12j-124-12d-12l","12g-129-12o-129-128-12k-12i-12h"]'
                ) || null;
            be("Initialization"),
              (c.__jivoBundleOnLoad = function (e) {
                clearTimeout(E), (I = e);
                var t = (new Date().getTime() - T) / 1e3;
                t > 6 && ae("loadTime", t);
                ae("bundleLoaded", !0),
                  ae("buildNumber", y.build_number),
                  be("Bundle is loaded"),
                  (function () {
                    (C = h.body.lastChild),
                      W.style &&
                        ((W.style.opacity = "0"),
                        (W.style.visibility = "hidden"),
                        (W.style.width = 0),
                        (W.style.height = 0));
                    W.setAttribute("id", "jivo-iframe-container"),
                      W.appendChild(B),
                      C
                        ? C.parentNode.insertBefore(W, C.nextSibling)
                        : h.body.appendChild(W);
                    ie();
                  })();
              }),
              (c.__jivoBundleInit = function (e) {
                (e.loaderContext = k),
                  (function () {
                    I = null;
                    var e = (function (e) {
                      if (e) {
                        var t =
                          e.querySelectorAll &&
                          e.querySelectorAll(".js-jivo-bundle");
                        return t && t.length > 0
                          ? t
                          : e.getElementsByClassName("js-jivo-bundle");
                      }
                    })(ye());
                    if (!e)
                      throw (
                        (b.error("Cannot get bundle script element"),
                        new Error("Cannot get bundle script element"))
                      );
                    for (var t = 0; t < e.length; t++)
                      e[t].parentNode && e[t].parentNode.removeChild(e[t]);
                    e = null;
                  })();
              }),
              (c.jivo_init = function () {
                R = 0;
                var e = h.createEvent("Event");
                e.initEvent("jBeforeunload", !0, !0), c.dispatchEvent(e), ne();
              }),
              (c.jivo_destroy = function () {
                R = 0;
                var e = h.createEvent("Event");
                e.initEvent("jBeforeunload", !0, !0),
                  c.dispatchEvent(e),
                  delete c.jivo_magic_var,
                  setTimeout(function () {
                    W.parentNode.removeChild(W);
                  }, 10);
              }),
              (k.getHostURL = _e),
              (k.loadConfig = Y),
              (k.store = X),
              (k.setInStore = ae);
            var z,
              V = !1,
              F = function (e) {
                try {
                  e.blockedURI &&
                    -1 !== e.blockedURI.indexOf("jivosite") &&
                    ((V = !0),
                    h.removeEventListener("securitypolicyviolation", F));
                } catch (e) {}
              }.bind(this);
            try {
              d(h, "securitypolicyviolation", F);
            } catch (e) {}
            le(),
              !(!(z = N) || (!/^\d+$/.test(z) && 10 != z.length)) ||
                ((N = null), (L = null), b.error("Widget id is not valid.")),
              K(g, 5),
              (function () {
                (X = re()).geoWidgetInfo.widgetId &&
                  ((N = X.geoWidgetInfo.widgetId),
                  (X = re()),
                  (L = X.configHost));
                ae("isNewCode", J), (k.store = X);
              })();
            var Z = null;
            O && (A = O.getAttribute("nonce")) && (c.jivo_cspNonce = A),
              N && L
                ? (be("widgetId:", N, "configHost:", L), Y(ce()))
                : (N && L) ||
                  (K(f, 5),
                  b.error("Failed to evaluate the widgetId or configHost"));
          }
        } else b.log("Not supported browser");
        function Y(e, t) {
          if ((U.push(e), ++q > 4)) {
            be("Config load limit is exceeded"),
              k.hasStorage && localStorage.removeItem("jv_loader_info_" + N);
            var n = new Error("Config load limit is exceeded"),
              o = "Config urls: " + U.join(";\r\n");
            try {
              n.stack = o;
            } catch (e) {
              n = new Error("Config load limit is exceeded. " + o);
            }
            c.__jivoOnError(n);
          } else if (
            (be("Loading config from", e),
            X.deletedInfo.widgetId &&
              X.deletedInfo.widgetId === N &&
              X.deletedInfo.resolveTime &&
              parseInt(X.deletedInfo.resolveTime) >= new Date().getTime())
          )
            b.error("This widget is permanently removed");
          else {
            var i = new XMLHttpRequest();
            (i.onreadystatechange = function () {
              if (4 === i.readyState)
                if (200 === i.status) {
                  var e = Ee(he(i));
                  e
                    ? (be("Config is loaded", e),
                      e.isDeleted
                        ? fe()
                        : t
                        ? ((e.chat_mode = t.chat_mode),
                          (e.options = t.options),
                          (e.botmode = t.botmode),
                          (e.geoip = t.geoip),
                          (e.maintenance = !!t.maintenance),
                          Q(e, null))
                        : (function (e, t) {
                            var n = new XMLHttpRequest();
                            function o() {
                              return !1;
                            }
                            n.onreadystatechange = function () {
                              if (4 === n.readyState)
                                if (200 === n.status) {
                                  var o = Ee(he(n));
                                  if (!o)
                                    throw new Error("Load widget status error");
                                  var i = n.getResponseHeader("X-BotMode"),
                                    r = n.getResponseHeader("X-GeoIP"),
                                    a = o.agents && o.agents.length;
                                  be("Status is loaded", o, i, r, a),
                                    (e.botmode = "yes" === i ? "yes" : null),
                                    (e.geoip = r || ";;;"),
                                    (e.chat_mode = a ? "online" : "offline"),
                                    (e.options = o.premium ? 888 : 0),
                                    o.bots &&
                                      o.bots.length &&
                                      (e.bots = o.bots),
                                    (e.maintenance = !!o.maintenance),
                                    t(o.config_updated_ts);
                                } else if (0 !== n.status)
                                  throw (
                                    ((e.botmode = null),
                                    (e.geoip = ";;;"),
                                    (e.chat_mode = "offline"),
                                    (e.options = 0),
                                    t(null),
                                    480 == n.status &&
                                      be(
                                        "Site is under maintenance, try again later."
                                      ),
                                    new Error(
                                      "Load widget status error: " + n.status
                                    ))
                                  );
                            };
                            var i = "/configs/development/status.json",
                              a = o()
                                ? i
                                : r() +
                                  "//" +
                                  e.comet.host +
                                  "/widget/status/" +
                                  e.site_id +
                                  "/" +
                                  e.widget_id +
                                  "?rnd=" +
                                  Math.random();
                            n.open("GET", a, !0), n.send(null);
                          })(e, function (t) {
                            Q(e, t);
                          }))
                    : me();
                } else 0 !== i.status && me();
            }),
              i.open("GET", e, !0),
              i.send(null);
          }
        }
        function $(e) {
          var t = {
            event: e,
            widget_id: N,
            t: new Date().getTime(),
            param1: "30.1.0",
            shard: a(),
          };
          if (
            -1 === navigator.userAgent.search(/google/gi) &&
            -1 === navigator.userAgent.search(/\+http:\/\/yandex\.com\/bots/gi)
          )
            try {
              var n = r() + "//telemetry.jivosite.com/w?cb=loader";
              for (var o in t) n += "&" + o + "=" + encodeURIComponent(t[o]);
              var i = new XMLHttpRequest();
              "withCredentials" in i
                ? i.open("GET", n, !0)
                : "undefined" != typeof XDomainRequest &&
                  (i = new XDomainRequest()).open("GET", n),
                i.send();
            } catch (e) {}
        }
        function K(e, t) {
          Math.random() <= 0.01 * t && $(e);
        }
        function Q(e, t) {
          if ((be("checkConfig", e.config_updated_ts, t), e.isDeleted)) fe();
          else if (
            (function () {
              var e = navigator.userAgent.toLowerCase();
              return -1 !== e.indexOf("msie") || -1 !== e.indexOf("trident");
            })() &&
            e.disable_widget_on_ie11
          )
            $(p);
          else {
            if (t && e.config_updated_ts && e.config_updated_ts !== t)
              return (
                be("update configUpdatedTs in store", t),
                (X.configUpdatedTs = t),
                Y(ce(), e)
              );
            if (e.regions && !X.isChatStarted) {
              var n = (function (e) {
                var t,
                  n,
                  o = e.regions,
                  i = ge(e.geoip);
                if (o) {
                  for (var r = Object.keys(o), a = 0; a < r.length; a++)
                    for (var d = o[r[a]], s = 0; s < d.length; s++)
                      if (1 != d.length || "default" !== d[s]) {
                        var c = ge(d[s]);
                        if (i.country === c.country) {
                          if (i.region === c.region)
                            return ue(r[a], d[s], e.geoip);
                          n || c.region || (n = ue(r[a], d[s], e.geoip));
                        }
                      } else t = r[a];
                  if (n) return n;
                  if (t) return ue(t, "default", e.geoip);
                }
              })(e);
              if (n.widgetId !== N)
                return (
                  be("Wrong geo-widget widgetId", N),
                  ae("geoWidgetInfo", n),
                  (N = n.widgetId),
                  void Y(ce())
                );
            }
            if (
              (Z = e.ab_segment) &&
              Z.name &&
              Z.host &&
              Z.staticHost &&
              1 !== e.site_id
            )
              if (
                (be("AB-testing segmentation is enabled in config"),
                (function (e, t) {
                  var n = X.abTesting,
                    o = !1;
                  o =
                    n && n.name === e.name
                      ? n.match
                      : (function (e, t) {
                          if (
                            (be(
                              'Check for criteria match of test "' +
                                e.name +
                                '"'
                            ),
                            e.device)
                          ) {
                            if (
                              !(function (e) {
                                if ("desktop" === e) return je() && !Ce();
                                if ("mobile" === e) return Ce();
                                if ("all" === e) return je() || Ce();
                                return !1;
                              })(e.device)
                            )
                              return (
                                be(
                                  'Segment "' +
                                    e.name +
                                    '" is NOT matched. Criteria: device'
                                ),
                                !1
                              );
                          }
                          if (e.locale) {
                            if (!(e.locale === t.locale))
                              return (
                                be(
                                  'Segment "' +
                                    e.name +
                                    '" is NOT matched. Criteria: locale'
                                ),
                                !1
                              );
                          }
                          if (e.percentage) {
                            if (
                              !((n = e.percentage), Math.random() <= 0.01 * n)
                            )
                              return (
                                be(
                                  'Segment "' +
                                    e.name +
                                    '" is NOT matched. Criteria: percentage'
                                ),
                                !1
                              );
                          }
                          var n;
                          return be('Segment "' + e.name + '" is matched!'), !0;
                        })(e, t);
                  return ae("abTesting", { name: e.name, match: o }), o;
                })(Z, e))
              ) {
                be("Ab-testing segment match! Segment:", Z.name);
                var o = "//" + Z.host;
                be(
                  'Setting new base_url. Was: "' +
                    e.base_url +
                    '". New: "' +
                    o +
                    '".'
                ),
                  (e.base_url = o),
                  be(
                    'Setting new static_host. Was: "' +
                      e.static_host +
                      '". New: "' +
                      Z.staticHost +
                      '".'
                  ),
                  (e.static_host = Z.staticHost);
              } else be("Ab-testing segment is NOT matched");
            else
              ae("abTesting", null),
                be("AB-testing segmentation is NOT enabled in config"),
                ae("configHost", L);
            !(function (e) {
              if (
                (ae("log", !!e.logs),
                (c.jivo_config = y = e),
                (function () {
                  if (y.host_blacklist)
                    for (
                      var e = y.host_blacklist.split(","), t = 0;
                      t < e.length;
                      t++
                    )
                      if (c.location.host.indexOf(e[t].replace(" ", "")) >= 0)
                        return !0;
                  return !1;
                })())
              )
                throw (
                  (be("Host is blacklisted", c.location.host),
                  new Error(
                    "Placing widget is forbidden on " + c.top.location.host
                  ))
                );
              if (((t = y.geoip.split(";")[0]), P.indexOf(t) >= 0))
                return b.log("[Jivo]: Service unavailable for country");
              if (
                !e.disable_stop_words &&
                (function () {
                  var e = !1,
                    t =
                      ((d = G),
                      d.map(function (e) {
                        return e
                          .split("-")
                          .map(function (e) {
                            return String.fromCharCode(parseInt(e, 32) - 20);
                          })
                          .join("");
                      })),
                    n = h.querySelector('meta[name="description"]'),
                    o = h.querySelector('meta[name="keywords"]'),
                    i = h.title,
                    r = n && n.content ? n.content : "",
                    a = o && o.content ? o.content : "";
                  var d;
                  (we(i, t) || we(r, t) || we(a, t)) && (e = !0);
                  return e;
                })()
              )
                return $(m), void be("Init error, code 1015.");
              if (x && y.disable_mobile)
                return void be("Mobile widget is disabled");
              var t;
              0;
              y.static_host &&
                (~y.static_host.search(/\/\/cdn(-\w+)?.jivosite.com(\/\w)?/) ||
                  ~y.static_host.search(
                    /\/\/code(-\w+)?.jivosite.com(\/\w)?/
                  )) &&
                (D = !0);
              be("isCdnProvider: ", D),
                "complete" == h.readyState
                  ? ee()
                  : X.bundleLoaded && X.buildNumber == y.build_number
                  ? "interactive" == h.readyState
                    ? ee()
                    : d(c, "DOMContentLoaded", ee)
                  : (ae("bundleLoaded", !1), d(c, "load", ee));
            })(e);
          }
        }
        function ee() {
          be("Widget initialization"),
            (function () {
              be("Iframe initialization"),
                (B.src = "javascript:void(0)"),
                (B.role = "presentation"),
                (B.allow = "autoplay"),
                (B.title = "Jivochat"),
                B.setAttribute("name", "jivo_container"),
                B.setAttribute("id", "jivo_container"),
                B.setAttribute("frameborder", "no"),
                A && B.setAttribute("nonce", A);
              c.atob && "complete" !== h.readyState ? d(c, "load", ne) : ne();
              d(c, "message", function (e) {
                if (e && e.data && "object" == typeof e.data) {
                  var t = e.data;
                  "in_node_webkit" == t.name &&
                    (c.jivo_cobrowse = { source: e.source, origin: e.origin }),
                    ("iframe_url_changed" != t.name &&
                      "iframe_url_changed" != t) ||
                      ie();
                } else y && 1 === y.logs && b && b.log && b.log("Error receive postMessage, window message event is empty.");
              });
            })();
        }
        function te() {
          var e = _e();
          be("loadBundleAfterWait", e, k), l(te), oe(e);
        }
        function ne() {
          var e = _e();
          if (!k.store.isChatStarted && y.enable_bundle_wait) {
            be("addWaitActions");
            try {
              s(te),
                setTimeout(function () {
                  be("5s load", k.store), c.jivo_api || te();
                }, 5e3);
            } catch (t) {
              oe(e);
            }
          } else be("startLoadBundle", e), oe(e);
        }
        function oe(e) {
          be("Insertion of bundle code from", e);
          var t = ye(),
            n = h.createElement("script"),
            o = (function (e) {
              var t = y.bundle_folder ? y.bundle_folder : "";
              return (
                e + t + "/js/bundle_" + y.locale + ".js?rand=" + y.build_number
              );
            })(e);
          (T = new Date().getTime()),
            pe(n),
            (n.className = "js-jivo-bundle"),
            (n.src = r() + o),
            (k.bundleSrc = o),
            (n.onerror = function () {
              be("loadBundle errorBundle", e),
                h.getElementById("jcont") &&
                  (function (e, t, n) {
                    if ((clearTimeout(E), ++M >= 5)) {
                      if (
                        (be("Bundle load retries count is exceeded"),
                        be("Bad csp is: " + V),
                        V)
                      )
                        return void b.error(
                          "Widget not loaded due CSP security policy."
                        );
                      var o = new Error(
                        "Bundle NOT loaded. Type: " +
                          e +
                          (t ? ". Host: " + t : "") +
                          (n ? ". Status code: " + n : "")
                      );
                      return void c.__jivoOnError(o);
                    }
                    ne();
                  })("errorBundle", e);
            }),
            t.appendChild(n);
        }
        function ie() {
          if (!(R++ > 3)) {
            if (!I) return R--, ne();
            try {
              j = B.contentWindow.document;
            } catch (e) {
              (S = h.domain),
                (B.src =
                  "javascript:var d=document.open();d.domain='" +
                  S +
                  "';void(0);"),
                (j = B.contentWindow.document);
            }
            var e =
                '<meta name="google" content="notranslate"><meta http-equiv="X-UA-Compatible" content="IE=edge" />',
              t = "";
            try {
              t = "window.onerror = " + u.toString() + ";";
            } catch (e) {}
            var n = (y && !y.disable_error_reporting ? t : "") + I;
            if (
              !(navigator.userAgent.toLowerCase().indexOf("firefox") > -1) &&
              j.head &&
              j.body
            ) {
              (j.body.class = "notranslate"), (j.head.innerHTML = e);
              var o = h.createElement("script");
              (o.type = "text/javascript"),
                A && o.setAttribute("nonce", A),
                (o.innerHTML = n),
                j.head.appendChild(o);
            } else {
              var i = '<body class="notranslate"></body>',
                r =
                  '<script type="text/javascript"' +
                  (A ? 'nonce="' + A + '"' : "") +
                  ">" +
                  n +
                  "</script>",
                a = "<head>" + e + r + "</head>";
              j.write("<!doctype HTML>" + a + i),
                (r = null),
                (i = null),
                (a = null);
            }
            j.close(), (n = null);
          }
        }
        function re() {
          var e = {
            isChatStarted: null,
            geoWidgetInfo: {
              widgetId: null,
              clientLocation: null,
              region: null,
            },
            configHost: null,
            deletedInfo: { widgetId: null, resolveTime: null },
            abTesting: null,
            buildNumber: null,
            bundleLoaded: null,
            isNewCode: null,
            loadTime: null,
            log: null,
            configUpdatedTs: null,
          };
          if (k.hasStorage && (localStorage.removeItem("jv_loader_info"), N)) {
            var t = Ee(localStorage.getItem("jv_loader_info_" + N));
            t && de(t, e);
          }
          return e;
        }
        function ae(e, t) {
          if (((X[e] = t), k.hasStorage && N)) {
            var n = {};
            de(X, n),
              localStorage.setItem(
                "jv_loader_info_" + N,
                ((o = n),
                c.MooTools && void 0 === JSON.stringify
                  ? JSON.encode(o)
                  : JSON.stringify(o))
              );
          }
          var o;
        }
        function de(e, t) {
          Object.keys(e).forEach(function (n) {
            (function (e) {
              if (se(e)) return !0;
              if ("object" == typeof e) {
                for (var t = Object.keys(e), n = 0; n < t.length; n++)
                  if (!se(e[t[n]])) return !1;
                return !0;
              }
            })(e[n]) || (t[n] = e[n]);
          });
        }
        function se(e) {
          return null === e && "object" == typeof e;
        }
        function ce() {
          var e = "";
          return (
            be("getConfigUrl", X.configUpdatedTs),
            X.configUpdatedTs && (e = "?v=" + X.configUpdatedTs),
            r() + L + "/script/widget/config/" + N + e
          );
        }
        function le() {
          var r,
            a = e((O = t())),
            d = n(a),
            s = o(a),
            c = i(a);
          L ||
            (d
              ? ((L = "//" + d[1]), (J = !0))
              : s
              ? (L = "//" + s[1])
              : c && (L = "//" + c[1])),
            N ||
              (s && s[2]
                ? ((N = s[2]), (J = !1))
                : c && c[2]
                ? ((N = c[2]), (J = !1))
                : ((J = !0),
                  O &&
                    (N =
                      O.getAttribute("jv-id") || O.getAttribute("data-jv-id")),
                  N ||
                    ((r = a.match(/https?:\/\/\S+\/widget\/([A-Za-z0-9]+)/)),
                    (N = r ? r[1] : null)))),
            be("getWidgetIdAndConfigHost", N);
        }
        function ue(e, t, n) {
          return { widgetId: e, region: t, clientLocation: n };
        }
        function ge(e) {
          if ("string" == typeof e && "" !== e) {
            var t = e.split(";");
            return { country: t[0], region: t[1], city: t[2] };
          }
        }
        function fe() {
          be("Widget was removed", N),
            ae("configHost", null),
            X.geoWidgetInfo.widgetId || X.isChatStarted
              ? (ae("geoWidgetInfo", ue(null, null, null)),
                ae("isChatStarted", null),
                ve())
              : (ae("deletedInfo", {
                  widgetId: N,
                  resolveTime: (new Date().getTime() + 6048e5).toString(),
                }),
                b.error("Widget " + N + " is permanently removed. Host: " + L),
                $(v));
        }
        function me() {
          be("Config loading error"),
            ae("geoWidgetInfo", ue(null, null, null)),
            ae("isChatStarted", null),
            ae("configHost", null),
            ve();
        }
        function ve() {
          (N = null), (L = null), le(), Y(ce());
        }
        function pe(e) {
          if (e)
            return (
              (e.type = "text/javascript"),
              (e.async = !0),
              (e.charset = "UTF-8"),
              A && e.setAttribute("nonce", A),
              e
            );
        }
        function he(e) {
          return e.responseType && "text" !== e.responseType
            ? "document" === e.responseType
              ? e.responseXML
              : e.response
            : e.responseText;
        }
        function we(e, t) {
          for (var n = !1, o = 0; o < t.length; o++) {
            var i = t[o].toLowerCase(),
              r = new RegExp("([, .]|^)" + i + "([, .]|$)", "gi");
            if (e.toLowerCase().search(r) > -1) {
              n = !0;
              break;
            }
          }
          return n;
        }
        function _e() {
          return D ? y.static_host : y.base_url;
        }
        function be() {
          if (X.log) {
            var e = Array.prototype.slice.call(arguments || []);
            e.unshift("Loader:"), b.log.apply(b, e);
          }
        }
        function ye() {
          var e = h.head || h.getElementsByTagName("head")[0];
          if (!e)
            throw (
              (b.error("Cannot get document head element"),
              new Error("Cannot get document head element"))
            );
          return e;
        }
        function Se(e) {
          return -1 !== H.indexOf(e);
        }
        function je() {
          return (
            Se("chrome") && !Se("opr/") && "Google Inc." === c.navigator.vendor
          );
        }
        function Ce() {
          return !Se("windows") && Se("android");
        }
        function Ee(e) {
          try {
            return c.MooTools && void 0 === JSON.parse
              ? JSON.decode(e)
              : JSON.parse(e);
          } catch (e) {
            return null;
          }
        }
      }
      var w = h,
        _ = null;
      if (window.__hasStorage) {
        try {
          _ = JSON.parse(localStorage.getItem("__jivoLoader"));
        } catch (e) {
          (e.message = "Loader parse error"), window.__jivoOnError(e);
        }
        _ &&
          _.version > c &&
          (w = new Function(
            "window",
            "document",
            "broswerCacheLoaderVersion",
            "currentLoaderVersionCache",
            "(" +
              _.code +
              ")(window, document, broswerCacheLoaderVersion, currentLoaderVersionCache)"
          ));
      }
      try {
        w(window, document, c, _ ? _.version : c);
      } catch (e) {
        (e.message = e.message ? "Loader error. " + e.message : "Loader error"),
          window.__jivoOnError(e),
          delete window.jivo_magic_var,
          (w = h)(window, document, c, c);
      }
    })();
})();
