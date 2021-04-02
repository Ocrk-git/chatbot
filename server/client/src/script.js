window.ymConfig = {
  bot: "x1572447766397",
  containerId: "test",
};
(function () {
  var w = window,
    ic = w.YellowMessenger;
  if ("function" === typeof ic)
    ic("reattach_activator"), ic("update", ymConfig);
  else {
    var d = document,
      i = function () {
        i.c(arguments);
      };
    function l() {
      var e = d.createElement("script");
      (e.type = "text/javascript"),
        (e.async = !0),
        (e.src = "https://app.yellowmessenger.com/widget/main.js");
      var t = d.getElementsByTagName("script")[0];
      t.parentNode.insertBefore(e, t);
    }
    (i.q = []),
      (i.c = function (e) {
        i.q.push(e);
      }),
      (w.YellowMessenger = i),
      w.attachEvent
        ? w.attachEvent("onload", l)
        : w.addEventListener("load", l, !1);
  }
})();
