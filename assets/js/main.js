/* ==========================================================
   tqmirtex.com — main script
   ========================================================== */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  /* Site root, derived from this script's location (works on GitHub Pages
     project sites, custom domains and file:// alike). */
  var ROOT = (function () {
    var src = document.currentScript && document.currentScript.src;
    return src ? src.replace(/assets\/js\/main\.js(\?.*)?$/, "") : "./";
  })();

  var WORKS = sortByDate(window.WORKS || []);
  var BLOG = sortByDate(window.BLOG || []);

  /* ---------- Helpers ---------- */

  function sortByDate(items) {
    return items.slice().sort(function (a, b) {
      return String(b.date).localeCompare(String(a.date));
    });
  }

  function escapeHTML(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDate(iso) {
    var p = String(iso).split("-");
    if (p.length !== 3) return escapeHTML(iso);
    return p[0] + "年" + parseInt(p[1], 10) + "月" + parseInt(p[2], 10) + "日";
  }

  function resolve(path) {
    if (!path) return "";
    return /^(https?:)?\/\//.test(path) ? path : ROOT + path.replace(/^\.?\//, "");
  }

  function workURL(id) {
    return ROOT + "works/detail.html?id=" + encodeURIComponent(id);
  }

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function tagsHTML(list) {
    return (list || []).map(function (t) {
      return '<li class="tag">' + escapeHTML(t) + "</li>";
    }).join("");
  }

  /* ---------- Pagination ---------- */

  function paginate(items, perPage) {
    var total = Math.max(1, Math.ceil(items.length / perPage));
    var page = parseInt(getParam("page"), 10) || 1;
    page = Math.min(Math.max(page, 1), total);
    return {
      page: page,
      total: total,
      items: items.slice((page - 1) * perPage, page * perPage)
    };
  }

  function renderPagination(name, page, total) {
    var nav = document.querySelector('[data-pagination="' + name + '"]');
    if (!nav || total <= 1) return;

    function link(p, label, extra) {
      return '<a href="?page=' + p + '"' + (extra || "") + ">" + label + "</a>";
    }

    var html = page > 1
      ? link(page - 1, "←", ' aria-label="前のページ"')
      : '<span class="is-disabled" aria-hidden="true">←</span>';

    for (var i = 1; i <= total; i++) {
      html += i === page
        ? '<span aria-current="page">' + i + "</span>"
        : link(i, i);
    }

    html += page < total
      ? link(page + 1, "→", ' aria-label="次のページ"')
      : '<span class="is-disabled" aria-hidden="true">→</span>';

    nav.innerHTML = html;
  }

  /* ---------- Works ---------- */

  function workCardHTML(w) {
    return (
      '<a class="work-card reveal" href="' + workURL(w.id) + '">' +
        '<div class="work-card__thumb"><img src="' + escapeHTML(resolve(w.thumbnail)) + '" alt="" loading="lazy"></div>' +
        '<div class="work-card__body">' +
          '<p class="work-card__meta"><time datetime="' + escapeHTML(w.date) + '">' + formatDate(w.date) + "</time>" +
            '<span class="dot" aria-hidden="true"></span><span>' + escapeHTML(w.type) + "</span></p>" +
          '<h3 class="work-card__title">' + escapeHTML(w.title) + "</h3>" +
          '<ul class="tags">' + tagsHTML(w.stack) + "</ul>" +
        "</div>" +
      "</a>"
    );
  }

  function renderWorksList(el) {
    var items = WORKS;
    var perPage = parseInt(el.dataset.perPage, 10);
    var limit = parseInt(el.dataset.limit, 10);

    if (perPage) {
      var res = paginate(items, perPage);
      items = res.items;
      renderPagination("works", res.page, res.total);
    } else if (limit) {
      items = items.slice(0, limit);
    }

    el.innerHTML = items.length
      ? items.map(workCardHTML).join("")
      : '<p class="empty">実績はまだありません。</p>';
  }

  function renderWorkDetail(root) {
    var id = getParam("id");
    var index = -1;
    for (var i = 0; i < WORKS.length; i++) {
      if (WORKS[i].id === id) { index = i; break; }
    }

    var field = function (name) { return root.querySelector('[data-field="' + name + '"]'); };

    if (index === -1) {
      field("title").textContent = "ページが見つかりません";
      field("body").innerHTML = '<p>お探しの実績は見つかりませんでした。<a href="./">実績一覧に戻る</a></p>';
      root.querySelector(".work-detail__thumb").remove();
      root.querySelector(".work-detail__meta").remove();
      document.title = "ページが見つかりません — tqmirtex.com";
      return;
    }

    var w = WORKS[index];
    document.title = w.title + " — tqmirtex.com";

    var date = field("date");
    date.textContent = formatDate(w.date);
    date.setAttribute("datetime", w.date);
    field("type").textContent = w.type;
    field("title").textContent = w.title;
    field("stack").innerHTML = tagsHTML(w.stack);

    var img = field("thumbnail");
    img.src = resolve(w.thumbnail);
    img.alt = w.title;

    // Body is authored HTML from works.js (trusted content).
    field("body").innerHTML = w.body || "";

    // Newer / older navigation
    var newer = WORKS[index - 1];
    var older = WORKS[index + 1];
    var nav = "";
    if (older) {
      nav += '<a class="prev" href="' + workURL(older.id) + '"><small>← 前の実績</small><strong>' + escapeHTML(older.title) + "</strong></a>";
    }
    if (newer) {
      nav += '<a class="next" href="' + workURL(newer.id) + '"><small>次の実績 →</small><strong>' + escapeHTML(newer.title) + "</strong></a>";
    }
    var navEl = field("nav");
    if (nav) navEl.innerHTML = nav; else navEl.remove();
  }

  /* ---------- Blog ---------- */

  function postRowHTML(p) {
    return (
      '<li><a class="post-row reveal" href="' + escapeHTML(p.link) + '" target="_blank" rel="noopener">' +
        '<time class="post-row__date" datetime="' + escapeHTML(p.date) + '">' + formatDate(p.date) + "</time>" +
        '<span class="post-row__title">' + escapeHTML(p.title) + "</span>" +
        '<span class="tag">' + escapeHTML(p.type) + "</span>" +
        '<span class="post-row__arrow" aria-hidden="true">↗</span>' +
      "</a></li>"
    );
  }

  function renderBlogList(el) {
    var items = BLOG;
    var perPage = parseInt(el.dataset.perPage, 10);
    var limit = parseInt(el.dataset.limit, 10);

    if (perPage) {
      var res = paginate(items, perPage);
      items = res.items;
      renderPagination("blog", res.page, res.total);
    } else if (limit) {
      items = items.slice(0, limit);
    }

    el.innerHTML = items.length
      ? items.map(postRowHTML).join("")
      : '<li class="empty">記事はまだありません。</li>';
  }

  /* ---------- Contact form ---------- */

  var CONTACT_TO = "contact@tqmirtex.com";

  function initContactForm(form) {
    var status = form.querySelector("[data-form-status]");
    var messages = {
      name: "お名前を入力してください。",
      email: "有効なメールアドレスを入力してください。",
      subject: "件名を入力してください。",
      message: "お問い合わせ内容を入力してください。"
    };

    function validate(input) {
      var field = input.closest(".field");
      var error = field.querySelector(".field__error");
      var value = input.value.trim();
      var ok = value !== "" && (input.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
      field.classList.toggle("is-invalid", !ok);
      input.setAttribute("aria-invalid", String(!ok));
      error.textContent = ok ? "" : messages[input.name];
      return ok;
    }

    var inputs = Array.prototype.slice.call(form.querySelectorAll("input, textarea"));
    inputs.forEach(function (input) {
      input.addEventListener("blur", function () { if (input.value) validate(input); });
      input.addEventListener("input", function () {
        if (input.closest(".field").classList.contains("is-invalid")) validate(input);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstInvalid = null;
      inputs.forEach(function (input) {
        if (!validate(input) && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      var data = new FormData(form);
      var body =
        "名前: " + data.get("name").trim() + "\n" +
        "メールアドレス: " + data.get("email").trim() + "\n\n" +
        data.get("message").trim();

      window.location.href =
        "mailto:" + CONTACT_TO +
        "?subject=" + encodeURIComponent(data.get("subject").trim()) +
        "&body=" + encodeURIComponent(body);

      status.textContent = "メールアプリが開きます。内容を確認して送信してください。";
    });
  }

  /* ---------- Header / navigation ---------- */

  function initHeader() {
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");

    if (header) {
      var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    if (toggle && nav) {
      var setOpen = function (open) {
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
        nav.classList.toggle("is-open", open);
      };
      toggle.addEventListener("click", function () {
        setOpen(toggle.getAttribute("aria-expanded") !== "true");
      });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
      window.addEventListener("resize", function () { if (window.innerWidth > 768) setOpen(false); });
    }
  }

  /* ---------- Reveal on scroll ---------- */

  function initReveal() {
    var pending = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    pending.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i, 8) * 60 + "ms";
    });

    function check() {
      var limit = window.innerHeight * 0.95;
      pending = pending.filter(function (el) {
        if (el.getBoundingClientRect().top < limit) {
          el.classList.add("is-visible");
          // Clear the stagger delay afterwards so hover effects aren't delayed.
          setTimeout(function () { el.style.transitionDelay = ""; }, 1500);
          return false;
        }
        return true;
      });
      if (!pending.length) {
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      }
    }

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();
  }

  /* ---------- Init ---------- */

  document.querySelectorAll("[data-works-list]").forEach(renderWorksList);
  document.querySelectorAll("[data-blog-list]").forEach(renderBlogList);
  document.querySelectorAll("[data-work-detail]").forEach(renderWorkDetail);
  document.querySelectorAll("[data-contact-form]").forEach(initContactForm);
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  initHeader();
  initReveal();
})();
