// Будує бокове меню з window.NAV_TREE (_nav/tree.js).
// Сторінка вказує корінь репо відносно себе: <html data-root="./"> або data-root="../../".
(function () {
  var root = document.documentElement.getAttribute("data-root") || "./";
  if (root.slice(-1) !== "/") root += "/";

  function normalize(url) {
    var u = new URL(url, location.href);
    var path = u.pathname;
    if (path.slice(-1) === "/") path += "index.html";
    return u.protocol + "//" + u.host + decodeURI(path);
  }

  var here = normalize(location.href);

  function renderItems(items) {
    var ul = document.createElement("ul");
    items.forEach(function (item) {
      var li = document.createElement("li");
      var label;
      if (item.href) {
        label = document.createElement("a");
        label.href = root + item.href;
        label.className = "pn-page";
        if (normalize(label.href) === here) {
          label.className += " pn-current";
          label.setAttribute("aria-current", "page");
        }
      } else {
        label = document.createElement("span");
        label.className = "pn-branch";
      }
      label.textContent = item.title;
      li.appendChild(label);
      if (item.children && item.children.length) li.appendChild(renderItems(item.children));
      ul.appendChild(li);
    });
    return ul;
  }

  function build() {
    var nav = document.createElement("nav");
    nav.className = "pn";
    nav.id = "pn";
    nav.setAttribute("aria-label", "Навігатор репо");

    var head = document.createElement("div");
    head.className = "pn-head";
    head.textContent = "Прайд · репо";
    nav.appendChild(head);
    nav.appendChild(renderItems(window.NAV_TREE || []));

    var toggle = document.createElement("button");
    toggle.className = "pn-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-controls", "pn");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "☰ Навігатор";
    toggle.addEventListener("click", function () {
      var open = document.documentElement.classList.toggle("pn-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    document.body.insertBefore(nav, document.body.firstChild);
    document.body.insertBefore(toggle, nav);
    document.documentElement.classList.add("pn-on");
  }

  if (document.body) build();
  else document.addEventListener("DOMContentLoaded", build);
})();
