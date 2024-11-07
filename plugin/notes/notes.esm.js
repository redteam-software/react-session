function e() {
  return {
    async: !1,
    baseUrl: null,
    breaks: !1,
    extensions: null,
    gfm: !0,
    headerIds: !0,
    headerPrefix: "",
    highlight: null,
    hooks: null,
    langPrefix: "language-",
    mangle: !0,
    pedantic: !1,
    renderer: null,
    sanitize: !1,
    sanitizer: null,
    silent: !1,
    smartypants: !1,
    tokenizer: null,
    walkTokens: null,
    xhtml: !1,
  };
}
let n = {
  async: !1,
  baseUrl: null,
  breaks: !1,
  extensions: null,
  gfm: !0,
  headerIds: !0,
  headerPrefix: "",
  highlight: null,
  hooks: null,
  langPrefix: "language-",
  mangle: !0,
  pedantic: !1,
  renderer: null,
  sanitize: !1,
  sanitizer: null,
  silent: !1,
  smartypants: !1,
  tokenizer: null,
  walkTokens: null,
  xhtml: !1,
};
const t = /[&<>"']/,
  i = new RegExp(t.source, "g"),
  s = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
  r = new RegExp(s.source, "g"),
  a = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" },
  o = (e) => a[e];
function l(e, n) {
  if (n) {
    if (t.test(e)) return e.replace(i, o);
  } else if (s.test(e)) return e.replace(r, o);
  return e;
}
const c = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
function p(e) {
  return e.replace(c, (e, n) =>
    "colon" === (n = n.toLowerCase())
      ? ":"
      : "#" === n.charAt(0)
        ? "x" === n.charAt(1)
          ? String.fromCharCode(parseInt(n.substring(2), 16))
          : String.fromCharCode(+n.substring(1))
        : "",
  );
}
const u = /(^|[^\[])\^/g;
function d(e, n) {
  (e = "string" == typeof e ? e : e.source), (n = n || "");
  const t = {
    replace: (n, i) => (
      (i = (i = i.source || i).replace(u, "$1")), (e = e.replace(n, i)), t
    ),
    getRegex: () => new RegExp(e, n),
  };
  return t;
}
const h = /[^\w:]/g,
  g = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
function m(e, n, t) {
  if (e) {
    let e;
    try {
      e = decodeURIComponent(p(t)).replace(h, "").toLowerCase();
    } catch (e) {
      return null;
    }
    if (
      0 === e.indexOf("javascript:") ||
      0 === e.indexOf("vbscript:") ||
      0 === e.indexOf("data:")
    )
      return null;
  }
  n &&
    !g.test(t) &&
    (t = (function (e, n) {
      f[" " + e] ||
        (k.test(e) ? (f[" " + e] = e + "/") : (f[" " + e] = v(e, "/", !0)));
      e = f[" " + e];
      const t = -1 === e.indexOf(":");
      return "//" === n.substring(0, 2)
        ? t
          ? n
          : e.replace(w, "$1") + n
        : "/" === n.charAt(0)
          ? t
            ? n
            : e.replace(x, "$1") + n
          : e + n;
    })(n, t));
  try {
    t = encodeURI(t).replace(/%25/g, "%");
  } catch (e) {
    return null;
  }
  return t;
}
const f = {},
  k = /^[^:]+:\/*[^/]*$/,
  w = /^([^:]+:)[\s\S]*$/,
  x = /^([^:]+:\/*[^/]*)[\s\S]*$/;
const b = { exec: function () {} };
function y(e, n) {
  const t = e
    .replace(/\|/g, (e, n, t) => {
      let i = !1,
        s = n;
      for (; --s >= 0 && "\\" === t[s]; ) i = !i;
      return i ? "|" : " |";
    })
    .split(/ \|/);
  let i = 0;
  if (
    (t[0].trim() || t.shift(),
    t.length > 0 && !t[t.length - 1].trim() && t.pop(),
    t.length > n)
  )
    t.splice(n);
  else for (; t.length < n; ) t.push("");
  for (; i < t.length; i++) t[i] = t[i].trim().replace(/\\\|/g, "|");
  return t;
}
function v(e, n, t) {
  const i = e.length;
  if (0 === i) return "";
  let s = 0;
  for (; s < i; ) {
    const r = e.charAt(i - s - 1);
    if (r !== n || t) {
      if (r === n || !t) break;
      s++;
    } else s++;
  }
  return e.slice(0, i - s);
}
function S(e, n) {
  if (n < 1) return "";
  let t = "";
  for (; n > 1; ) 1 & n && (t += e), (n >>= 1), (e += e);
  return t + e;
}
function T(e, n, t, i) {
  const s = n.href,
    r = n.title ? l(n.title) : null,
    a = e[1].replace(/\\([\[\]])/g, "$1");
  if ("!" !== e[0].charAt(0)) {
    i.state.inLink = !0;
    const e = {
      type: "link",
      raw: t,
      href: s,
      title: r,
      text: a,
      tokens: i.inlineTokens(a),
    };
    return (i.state.inLink = !1), e;
  }
  return { type: "image", raw: t, href: s, title: r, text: l(a) };
}
class _ {
  constructor(e) {
    this.options = e || n;
  }
  space(e) {
    const n = this.rules.block.newline.exec(e);
    if (n && n[0].length > 0) return { type: "space", raw: n[0] };
  }
  code(e) {
    const n = this.rules.block.code.exec(e);
    if (n) {
      const e = n[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: n[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? e : v(e, "\n"),
      };
    }
  }
  fences(e) {
    const n = this.rules.block.fences.exec(e);
    if (n) {
      const e = n[0],
        t = (function (e, n) {
          const t = e.match(/^(\s+)(?:```)/);
          if (null === t) return n;
          const i = t[1];
          return n
            .split("\n")
            .map((e) => {
              const n = e.match(/^\s+/);
              if (null === n) return e;
              const [t] = n;
              return t.length >= i.length ? e.slice(i.length) : e;
            })
            .join("\n");
        })(e, n[3] || "");
      return {
        type: "code",
        raw: e,
        lang: n[2]
          ? n[2].trim().replace(this.rules.inline._escapes, "$1")
          : n[2],
        text: t,
      };
    }
  }
  heading(e) {
    const n = this.rules.block.heading.exec(e);
    if (n) {
      let e = n[2].trim();
      if (/#$/.test(e)) {
        const n = v(e, "#");
        this.options.pedantic
          ? (e = n.trim())
          : (n && !/ $/.test(n)) || (e = n.trim());
      }
      return {
        type: "heading",
        raw: n[0],
        depth: n[1].length,
        text: e,
        tokens: this.lexer.inline(e),
      };
    }
  }
  hr(e) {
    const n = this.rules.block.hr.exec(e);
    if (n) return { type: "hr", raw: n[0] };
  }
  blockquote(e) {
    const n = this.rules.block.blockquote.exec(e);
    if (n) {
      const e = n[0].replace(/^ *>[ \t]?/gm, ""),
        t = this.lexer.state.top;
      this.lexer.state.top = !0;
      const i = this.lexer.blockTokens(e);
      return (
        (this.lexer.state.top = t),
        { type: "blockquote", raw: n[0], tokens: i, text: e }
      );
    }
  }
  list(e) {
    let n = this.rules.block.list.exec(e);
    if (n) {
      let t,
        i,
        s,
        r,
        a,
        o,
        l,
        c,
        p,
        u,
        d,
        h,
        g = n[1].trim();
      const m = g.length > 1,
        f = {
          type: "list",
          raw: "",
          ordered: m,
          start: m ? +g.slice(0, -1) : "",
          loose: !1,
          items: [],
        };
      (g = m ? `\\d{1,9}\\${g.slice(-1)}` : `\\${g}`),
        this.options.pedantic && (g = m ? g : "[*+-]");
      const k = new RegExp(`^( {0,3}${g})((?:[\t ][^\\n]*)?(?:\\n|$))`);
      for (
        ;
        e && ((h = !1), (n = k.exec(e))) && !this.rules.block.hr.test(e);

      ) {
        if (
          ((t = n[0]),
          (e = e.substring(t.length)),
          (c = n[2]
            .split("\n", 1)[0]
            .replace(/^\t+/, (e) => " ".repeat(3 * e.length))),
          (p = e.split("\n", 1)[0]),
          this.options.pedantic
            ? ((r = 2), (d = c.trimLeft()))
            : ((r = n[2].search(/[^ ]/)),
              (r = r > 4 ? 1 : r),
              (d = c.slice(r)),
              (r += n[1].length)),
          (o = !1),
          !c &&
            /^ *$/.test(p) &&
            ((t += p + "\n"), (e = e.substring(p.length + 1)), (h = !0)),
          !h)
        ) {
          const n = new RegExp(
              `^ {0,${Math.min(3, r - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`,
            ),
            i = new RegExp(
              `^ {0,${Math.min(3, r - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`,
            ),
            s = new RegExp(`^ {0,${Math.min(3, r - 1)}}(?:\`\`\`|~~~)`),
            a = new RegExp(`^ {0,${Math.min(3, r - 1)}}#`);
          for (
            ;
            e &&
            ((u = e.split("\n", 1)[0]),
            (p = u),
            this.options.pedantic &&
              (p = p.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")),
            !s.test(p)) &&
            !a.test(p) &&
            !n.test(p) &&
            !i.test(e);

          ) {
            if (p.search(/[^ ]/) >= r || !p.trim()) d += "\n" + p.slice(r);
            else {
              if (o) break;
              if (c.search(/[^ ]/) >= 4) break;
              if (s.test(c)) break;
              if (a.test(c)) break;
              if (i.test(c)) break;
              d += "\n" + p;
            }
            o || p.trim() || (o = !0),
              (t += u + "\n"),
              (e = e.substring(u.length + 1)),
              (c = p.slice(r));
          }
        }
        f.loose || (l ? (f.loose = !0) : /\n *\n *$/.test(t) && (l = !0)),
          this.options.gfm &&
            ((i = /^\[[ xX]\] /.exec(d)),
            i && ((s = "[ ] " !== i[0]), (d = d.replace(/^\[[ xX]\] +/, "")))),
          f.items.push({
            type: "list_item",
            raw: t,
            task: !!i,
            checked: s,
            loose: !1,
            text: d,
          }),
          (f.raw += t);
      }
      (f.items[f.items.length - 1].raw = t.trimRight()),
        (f.items[f.items.length - 1].text = d.trimRight()),
        (f.raw = f.raw.trimRight());
      const w = f.items.length;
      for (a = 0; a < w; a++)
        if (
          ((this.lexer.state.top = !1),
          (f.items[a].tokens = this.lexer.blockTokens(f.items[a].text, [])),
          !f.loose)
        ) {
          const e = f.items[a].tokens.filter((e) => "space" === e.type),
            n = e.length > 0 && e.some((e) => /\n.*\n/.test(e.raw));
          f.loose = n;
        }
      if (f.loose) for (a = 0; a < w; a++) f.items[a].loose = !0;
      return f;
    }
  }
  html(e) {
    const n = this.rules.block.html.exec(e);
    if (n) {
      const e = {
        type: "html",
        raw: n[0],
        pre:
          !this.options.sanitizer &&
          ("pre" === n[1] || "script" === n[1] || "style" === n[1]),
        text: n[0],
      };
      if (this.options.sanitize) {
        const t = this.options.sanitizer
          ? this.options.sanitizer(n[0])
          : l(n[0]);
        (e.type = "paragraph"), (e.text = t), (e.tokens = this.lexer.inline(t));
      }
      return e;
    }
  }
  def(e) {
    const n = this.rules.block.def.exec(e);
    if (n) {
      const e = n[1].toLowerCase().replace(/\s+/g, " "),
        t = n[2]
          ? n[2]
              .replace(/^<(.*)>$/, "$1")
              .replace(this.rules.inline._escapes, "$1")
          : "",
        i = n[3]
          ? n[3]
              .substring(1, n[3].length - 1)
              .replace(this.rules.inline._escapes, "$1")
          : n[3];
      return { type: "def", tag: e, raw: n[0], href: t, title: i };
    }
  }
  table(e) {
    const n = this.rules.block.table.exec(e);
    if (n) {
      const e = {
        type: "table",
        header: y(n[1]).map((e) => ({ text: e })),
        align: n[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
        rows:
          n[3] && n[3].trim() ? n[3].replace(/\n[ \t]*$/, "").split("\n") : [],
      };
      if (e.header.length === e.align.length) {
        e.raw = n[0];
        let t,
          i,
          s,
          r,
          a = e.align.length;
        for (t = 0; t < a; t++)
          /^ *-+: *$/.test(e.align[t])
            ? (e.align[t] = "right")
            : /^ *:-+: *$/.test(e.align[t])
              ? (e.align[t] = "center")
              : /^ *:-+ *$/.test(e.align[t])
                ? (e.align[t] = "left")
                : (e.align[t] = null);
        for (a = e.rows.length, t = 0; t < a; t++)
          e.rows[t] = y(e.rows[t], e.header.length).map((e) => ({ text: e }));
        for (a = e.header.length, i = 0; i < a; i++)
          e.header[i].tokens = this.lexer.inline(e.header[i].text);
        for (a = e.rows.length, i = 0; i < a; i++)
          for (r = e.rows[i], s = 0; s < r.length; s++)
            r[s].tokens = this.lexer.inline(r[s].text);
        return e;
      }
    }
  }
  lheading(e) {
    const n = this.rules.block.lheading.exec(e);
    if (n)
      return {
        type: "heading",
        raw: n[0],
        depth: "=" === n[2].charAt(0) ? 1 : 2,
        text: n[1],
        tokens: this.lexer.inline(n[1]),
      };
  }
  paragraph(e) {
    const n = this.rules.block.paragraph.exec(e);
    if (n) {
      const e =
        "\n" === n[1].charAt(n[1].length - 1) ? n[1].slice(0, -1) : n[1];
      return {
        type: "paragraph",
        raw: n[0],
        text: e,
        tokens: this.lexer.inline(e),
      };
    }
  }
  text(e) {
    const n = this.rules.block.text.exec(e);
    if (n)
      return {
        type: "text",
        raw: n[0],
        text: n[0],
        tokens: this.lexer.inline(n[0]),
      };
  }
  escape(e) {
    const n = this.rules.inline.escape.exec(e);
    if (n) return { type: "escape", raw: n[0], text: l(n[1]) };
  }
  tag(e) {
    const n = this.rules.inline.tag.exec(e);
    if (n)
      return (
        !this.lexer.state.inLink && /^<a /i.test(n[0])
          ? (this.lexer.state.inLink = !0)
          : this.lexer.state.inLink &&
            /^<\/a>/i.test(n[0]) &&
            (this.lexer.state.inLink = !1),
        !this.lexer.state.inRawBlock &&
        /^<(pre|code|kbd|script)(\s|>)/i.test(n[0])
          ? (this.lexer.state.inRawBlock = !0)
          : this.lexer.state.inRawBlock &&
            /^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0]) &&
            (this.lexer.state.inRawBlock = !1),
        {
          type: this.options.sanitize ? "text" : "html",
          raw: n[0],
          inLink: this.lexer.state.inLink,
          inRawBlock: this.lexer.state.inRawBlock,
          text: this.options.sanitize
            ? this.options.sanitizer
              ? this.options.sanitizer(n[0])
              : l(n[0])
            : n[0],
        }
      );
  }
  link(e) {
    const n = this.rules.inline.link.exec(e);
    if (n) {
      const e = n[2].trim();
      if (!this.options.pedantic && /^</.test(e)) {
        if (!/>$/.test(e)) return;
        const n = v(e.slice(0, -1), "\\");
        if ((e.length - n.length) % 2 == 0) return;
      } else {
        const e = (function (e, n) {
          if (-1 === e.indexOf(n[1])) return -1;
          const t = e.length;
          let i = 0,
            s = 0;
          for (; s < t; s++)
            if ("\\" === e[s]) s++;
            else if (e[s] === n[0]) i++;
            else if (e[s] === n[1] && (i--, i < 0)) return s;
          return -1;
        })(n[2], "()");
        if (e > -1) {
          const t = (0 === n[0].indexOf("!") ? 5 : 4) + n[1].length + e;
          (n[2] = n[2].substring(0, e)),
            (n[0] = n[0].substring(0, t).trim()),
            (n[3] = "");
        }
      }
      let t = n[2],
        i = "";
      if (this.options.pedantic) {
        const e = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(t);
        e && ((t = e[1]), (i = e[3]));
      } else i = n[3] ? n[3].slice(1, -1) : "";
      return (
        (t = t.trim()),
        /^</.test(t) &&
          (t =
            this.options.pedantic && !/>$/.test(e)
              ? t.slice(1)
              : t.slice(1, -1)),
        T(
          n,
          {
            href: t ? t.replace(this.rules.inline._escapes, "$1") : t,
            title: i ? i.replace(this.rules.inline._escapes, "$1") : i,
          },
          n[0],
          this.lexer,
        )
      );
    }
  }
  reflink(e, n) {
    let t;
    if (
      (t = this.rules.inline.reflink.exec(e)) ||
      (t = this.rules.inline.nolink.exec(e))
    ) {
      let e = (t[2] || t[1]).replace(/\s+/g, " ");
      if (((e = n[e.toLowerCase()]), !e)) {
        const e = t[0].charAt(0);
        return { type: "text", raw: e, text: e };
      }
      return T(t, e, t[0], this.lexer);
    }
  }
  emStrong(e, n, t = "") {
    let i = this.rules.inline.emStrong.lDelim.exec(e);
    if (!i) return;
    if (i[3] && t.match(/[\p{L}\p{N}]/u)) return;
    const s = i[1] || i[2] || "";
    if (!s || (s && ("" === t || this.rules.inline.punctuation.exec(t)))) {
      const t = i[0].length - 1;
      let s,
        r,
        a = t,
        o = 0;
      const l =
        "*" === i[0][0]
          ? this.rules.inline.emStrong.rDelimAst
          : this.rules.inline.emStrong.rDelimUnd;
      for (
        l.lastIndex = 0, n = n.slice(-1 * e.length + t);
        null != (i = l.exec(n));

      ) {
        if (((s = i[1] || i[2] || i[3] || i[4] || i[5] || i[6]), !s)) continue;
        if (((r = s.length), i[3] || i[4])) {
          a += r;
          continue;
        }
        if ((i[5] || i[6]) && t % 3 && !((t + r) % 3)) {
          o += r;
          continue;
        }
        if (((a -= r), a > 0)) continue;
        r = Math.min(r, r + a + o);
        const n = e.slice(0, t + i.index + (i[0].length - s.length) + r);
        if (Math.min(t, r) % 2) {
          const e = n.slice(1, -1);
          return {
            type: "em",
            raw: n,
            text: e,
            tokens: this.lexer.inlineTokens(e),
          };
        }
        const l = n.slice(2, -2);
        return {
          type: "strong",
          raw: n,
          text: l,
          tokens: this.lexer.inlineTokens(l),
        };
      }
    }
  }
  codespan(e) {
    const n = this.rules.inline.code.exec(e);
    if (n) {
      let e = n[2].replace(/\n/g, " ");
      const t = /[^ ]/.test(e),
        i = /^ /.test(e) && / $/.test(e);
      return (
        t && i && (e = e.substring(1, e.length - 1)),
        (e = l(e, !0)),
        { type: "codespan", raw: n[0], text: e }
      );
    }
  }
  br(e) {
    const n = this.rules.inline.br.exec(e);
    if (n) return { type: "br", raw: n[0] };
  }
  del(e) {
    const n = this.rules.inline.del.exec(e);
    if (n)
      return {
        type: "del",
        raw: n[0],
        text: n[2],
        tokens: this.lexer.inlineTokens(n[2]),
      };
  }
  autolink(e, n) {
    const t = this.rules.inline.autolink.exec(e);
    if (t) {
      let e, i;
      return (
        "@" === t[2]
          ? ((e = l(this.options.mangle ? n(t[1]) : t[1])), (i = "mailto:" + e))
          : ((e = l(t[1])), (i = e)),
        {
          type: "link",
          raw: t[0],
          text: e,
          href: i,
          tokens: [{ type: "text", raw: e, text: e }],
        }
      );
    }
  }
  url(e, n) {
    let t;
    if ((t = this.rules.inline.url.exec(e))) {
      let e, i;
      if ("@" === t[2])
        (e = l(this.options.mangle ? n(t[0]) : t[0])), (i = "mailto:" + e);
      else {
        let n;
        do {
          (n = t[0]), (t[0] = this.rules.inline._backpedal.exec(t[0])[0]);
        } while (n !== t[0]);
        (e = l(t[0])), (i = "www." === t[1] ? "http://" + t[0] : t[0]);
      }
      return {
        type: "link",
        raw: t[0],
        text: e,
        href: i,
        tokens: [{ type: "text", raw: e, text: e }],
      };
    }
  }
  inlineText(e, n) {
    const t = this.rules.inline.text.exec(e);
    if (t) {
      let e;
      return (
        (e = this.lexer.state.inRawBlock
          ? this.options.sanitize
            ? this.options.sanitizer
              ? this.options.sanitizer(t[0])
              : l(t[0])
            : t[0]
          : l(this.options.smartypants ? n(t[0]) : t[0])),
        { type: "text", raw: t[0], text: e }
      );
    }
  }
}
const z = {
  newline: /^(?: *(?:\n|$))+/,
  code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  fences:
    /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
  html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
  def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
  table: b,
  lheading: /^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  _paragraph:
    /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  text: /^[^\n]+/,
  _label: /(?!\s*\])(?:\\.|[^\[\]\\])+/,
  _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,
};
(z.def = d(z.def)
  .replace("label", z._label)
  .replace("title", z._title)
  .getRegex()),
  (z.bullet = /(?:[*+-]|\d{1,9}[.)])/),
  (z.listItemStart = d(/^( *)(bull) */)
    .replace("bull", z.bullet)
    .getRegex()),
  (z.list = d(z.list)
    .replace(/bull/g, z.bullet)
    .replace(
      "hr",
      "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))",
    )
    .replace("def", "\\n+(?=" + z.def.source + ")")
    .getRegex()),
  (z._tag =
    "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul"),
  (z._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/),
  (z.html = d(z.html, "i")
    .replace("comment", z._comment)
    .replace("tag", z._tag)
    .replace(
      "attribute",
      / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/,
    )
    .getRegex()),
  (z.paragraph = d(z._paragraph)
    .replace("hr", z.hr)
    .replace("heading", " {0,3}#{1,6} ")
    .replace("|lheading", "")
    .replace("|table", "")
    .replace("blockquote", " {0,3}>")
    .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
    .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
    .replace(
      "html",
      "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)",
    )
    .replace("tag", z._tag)
    .getRegex()),
  (z.blockquote = d(z.blockquote).replace("paragraph", z.paragraph).getRegex()),
  (z.normal = { ...z }),
  (z.gfm = {
    ...z.normal,
    table:
      "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",
  }),
  (z.gfm.table = d(z.gfm.table)
    .replace("hr", z.hr)
    .replace("heading", " {0,3}#{1,6} ")
    .replace("blockquote", " {0,3}>")
    .replace("code", " {4}[^\\n]")
    .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
    .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
    .replace(
      "html",
      "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)",
    )
    .replace("tag", z._tag)
    .getRegex()),
  (z.gfm.paragraph = d(z._paragraph)
    .replace("hr", z.hr)
    .replace("heading", " {0,3}#{1,6} ")
    .replace("|lheading", "")
    .replace("table", z.gfm.table)
    .replace("blockquote", " {0,3}>")
    .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
    .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
    .replace(
      "html",
      "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)",
    )
    .replace("tag", z._tag)
    .getRegex()),
  (z.pedantic = {
    ...z.normal,
    html: d(
      "^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))",
    )
      .replace("comment", z._comment)
      .replace(
        /tag/g,
        "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b",
      )
      .getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: b,
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: d(z.normal._paragraph)
      .replace("hr", z.hr)
      .replace("heading", " *#{1,6} *[^\n]")
      .replace("lheading", z.lheading)
      .replace("blockquote", " {0,3}>")
      .replace("|fences", "")
      .replace("|list", "")
      .replace("|html", "")
      .getRegex(),
  });
const $ = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: b,
  tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(ref)\]/,
  nolink: /^!?\[(ref)\](?:\[\])?/,
  reflinkSearch: "reflink|nolink(?!\\()",
  emStrong: {
    lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
    rDelimAst:
      /^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,
    rDelimUnd:
      /^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/,
  },
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: b,
  text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  punctuation: /^([\spunctuation])/,
};
function E(e) {
  return e
    .replace(/---/g, "—")
    .replace(/--/g, "–")
    .replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘")
    .replace(/'/g, "’")
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“")
    .replace(/"/g, "”")
    .replace(/\.{3}/g, "…");
}
function A(e) {
  let n,
    t,
    i = "";
  const s = e.length;
  for (n = 0; n < s; n++)
    (t = e.charCodeAt(n)),
      Math.random() > 0.5 && (t = "x" + t.toString(16)),
      (i += "&#" + t + ";");
  return i;
}
($._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~"),
  ($.punctuation = d($.punctuation)
    .replace(/punctuation/g, $._punctuation)
    .getRegex()),
  ($.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g),
  ($.escapedEmSt = /(?:^|[^\\])(?:\\\\)*\\[*_]/g),
  ($._comment = d(z._comment).replace("(?:--\x3e|$)", "--\x3e").getRegex()),
  ($.emStrong.lDelim = d($.emStrong.lDelim)
    .replace(/punct/g, $._punctuation)
    .getRegex()),
  ($.emStrong.rDelimAst = d($.emStrong.rDelimAst, "g")
    .replace(/punct/g, $._punctuation)
    .getRegex()),
  ($.emStrong.rDelimUnd = d($.emStrong.rDelimUnd, "g")
    .replace(/punct/g, $._punctuation)
    .getRegex()),
  ($._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g),
  ($._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/),
  ($._email =
    /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/),
  ($.autolink = d($.autolink)
    .replace("scheme", $._scheme)
    .replace("email", $._email)
    .getRegex()),
  ($._attribute =
    /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/),
  ($.tag = d($.tag)
    .replace("comment", $._comment)
    .replace("attribute", $._attribute)
    .getRegex()),
  ($._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/),
  ($._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/),
  ($._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/),
  ($.link = d($.link)
    .replace("label", $._label)
    .replace("href", $._href)
    .replace("title", $._title)
    .getRegex()),
  ($.reflink = d($.reflink)
    .replace("label", $._label)
    .replace("ref", z._label)
    .getRegex()),
  ($.nolink = d($.nolink).replace("ref", z._label).getRegex()),
  ($.reflinkSearch = d($.reflinkSearch, "g")
    .replace("reflink", $.reflink)
    .replace("nolink", $.nolink)
    .getRegex()),
  ($.normal = { ...$ }),
  ($.pedantic = {
    ...$.normal,
    strong: {
      start: /^__|\*\*/,
      middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
      endAst: /\*\*(?!\*)/g,
      endUnd: /__(?!_)/g,
    },
    em: {
      start: /^_|\*/,
      middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
      endAst: /\*(?!\*)/g,
      endUnd: /_(?!_)/g,
    },
    link: d(/^!?\[(label)\]\((.*?)\)/)
      .replace("label", $._label)
      .getRegex(),
    reflink: d(/^!?\[(label)\]\s*\[([^\]]*)\]/)
      .replace("label", $._label)
      .getRegex(),
  }),
  ($.gfm = {
    ...$.normal,
    escape: d($.escape).replace("])", "~|])").getRegex(),
    _extended_email:
      /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
    _backpedal:
      /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
  }),
  ($.gfm.url = d($.gfm.url, "i")
    .replace("email", $.gfm._extended_email)
    .getRegex()),
  ($.breaks = {
    ...$.gfm,
    br: d($.br).replace("{2,}", "*").getRegex(),
    text: d($.gfm.text)
      .replace("\\b_", "\\b_| {2,}\\n")
      .replace(/\{2,\}/g, "*")
      .getRegex(),
  });
class R {
  constructor(e) {
    (this.tokens = []),
      (this.tokens.links = Object.create(null)),
      (this.options = e || n),
      (this.options.tokenizer = this.options.tokenizer || new _()),
      (this.tokenizer = this.options.tokenizer),
      (this.tokenizer.options = this.options),
      (this.tokenizer.lexer = this),
      (this.inlineQueue = []),
      (this.state = { inLink: !1, inRawBlock: !1, top: !0 });
    const t = { block: z.normal, inline: $.normal };
    this.options.pedantic
      ? ((t.block = z.pedantic), (t.inline = $.pedantic))
      : this.options.gfm &&
        ((t.block = z.gfm),
        this.options.breaks ? (t.inline = $.breaks) : (t.inline = $.gfm)),
      (this.tokenizer.rules = t);
  }
  static get rules() {
    return { block: z, inline: $ };
  }
  static lex(e, n) {
    return new R(n).lex(e);
  }
  static lexInline(e, n) {
    return new R(n).inlineTokens(e);
  }
  lex(e) {
    let n;
    for (
      e = e.replace(/\r\n|\r/g, "\n"), this.blockTokens(e, this.tokens);
      (n = this.inlineQueue.shift());

    )
      this.inlineTokens(n.src, n.tokens);
    return this.tokens;
  }
  blockTokens(e, n = []) {
    let t, i, s, r;
    for (
      e = this.options.pedantic
        ? e.replace(/\t/g, "    ").replace(/^ +$/gm, "")
        : e.replace(/^( *)(\t+)/gm, (e, n, t) => n + "    ".repeat(t.length));
      e;

    )
      if (
        !(
          this.options.extensions &&
          this.options.extensions.block &&
          this.options.extensions.block.some(
            (i) =>
              !!(t = i.call({ lexer: this }, e, n)) &&
              ((e = e.substring(t.raw.length)), n.push(t), !0),
          )
        )
      )
        if ((t = this.tokenizer.space(e)))
          (e = e.substring(t.raw.length)),
            1 === t.raw.length && n.length > 0
              ? (n[n.length - 1].raw += "\n")
              : n.push(t);
        else if ((t = this.tokenizer.code(e)))
          (e = e.substring(t.raw.length)),
            (i = n[n.length - 1]),
            !i || ("paragraph" !== i.type && "text" !== i.type)
              ? n.push(t)
              : ((i.raw += "\n" + t.raw),
                (i.text += "\n" + t.text),
                (this.inlineQueue[this.inlineQueue.length - 1].src = i.text));
        else if ((t = this.tokenizer.fences(e)))
          (e = e.substring(t.raw.length)), n.push(t);
        else if ((t = this.tokenizer.heading(e)))
          (e = e.substring(t.raw.length)), n.push(t);
        else if ((t = this.tokenizer.hr(e)))
          (e = e.substring(t.raw.length)), n.push(t);
        else if ((t = this.tokenizer.blockquote(e)))
          (e = e.substring(t.raw.length)), n.push(t);
        else if ((t = this.tokenizer.list(e)))
          (e = e.substring(t.raw.length)), n.push(t);
        else if ((t = this.tokenizer.html(e)))
          (e = e.substring(t.raw.length)), n.push(t);
        else if ((t = this.tokenizer.def(e)))
          (e = e.substring(t.raw.length)),
            (i = n[n.length - 1]),
            !i || ("paragraph" !== i.type && "text" !== i.type)
              ? this.tokens.links[t.tag] ||
                (this.tokens.links[t.tag] = { href: t.href, title: t.title })
              : ((i.raw += "\n" + t.raw),
                (i.text += "\n" + t.raw),
                (this.inlineQueue[this.inlineQueue.length - 1].src = i.text));
        else if ((t = this.tokenizer.table(e)))
          (e = e.substring(t.raw.length)), n.push(t);
        else if ((t = this.tokenizer.lheading(e)))
          (e = e.substring(t.raw.length)), n.push(t);
        else {
          if (
            ((s = e),
            this.options.extensions && this.options.extensions.startBlock)
          ) {
            let n = 1 / 0;
            const t = e.slice(1);
            let i;
            this.options.extensions.startBlock.forEach(function (e) {
              (i = e.call({ lexer: this }, t)),
                "number" == typeof i && i >= 0 && (n = Math.min(n, i));
            }),
              n < 1 / 0 && n >= 0 && (s = e.substring(0, n + 1));
          }
          if (this.state.top && (t = this.tokenizer.paragraph(s)))
            (i = n[n.length - 1]),
              r && "paragraph" === i.type
                ? ((i.raw += "\n" + t.raw),
                  (i.text += "\n" + t.text),
                  this.inlineQueue.pop(),
                  (this.inlineQueue[this.inlineQueue.length - 1].src = i.text))
                : n.push(t),
              (r = s.length !== e.length),
              (e = e.substring(t.raw.length));
          else if ((t = this.tokenizer.text(e)))
            (e = e.substring(t.raw.length)),
              (i = n[n.length - 1]),
              i && "text" === i.type
                ? ((i.raw += "\n" + t.raw),
                  (i.text += "\n" + t.text),
                  this.inlineQueue.pop(),
                  (this.inlineQueue[this.inlineQueue.length - 1].src = i.text))
                : n.push(t);
          else if (e) {
            const n = "Infinite loop on byte: " + e.charCodeAt(0);
            if (this.options.silent) {
              console.error(n);
              break;
            }
            throw new Error(n);
          }
        }
    return (this.state.top = !0), n;
  }
  inline(e, n = []) {
    return this.inlineQueue.push({ src: e, tokens: n }), n;
  }
  inlineTokens(e, n = []) {
    let t,
      i,
      s,
      r,
      a,
      o,
      l = e;
    if (this.tokens.links) {
      const e = Object.keys(this.tokens.links);
      if (e.length > 0)
        for (
          ;
          null != (r = this.tokenizer.rules.inline.reflinkSearch.exec(l));

        )
          e.includes(r[0].slice(r[0].lastIndexOf("[") + 1, -1)) &&
            (l =
              l.slice(0, r.index) +
              "[" +
              S("a", r[0].length - 2) +
              "]" +
              l.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; null != (r = this.tokenizer.rules.inline.blockSkip.exec(l)); )
      l =
        l.slice(0, r.index) +
        "[" +
        S("a", r[0].length - 2) +
        "]" +
        l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; null != (r = this.tokenizer.rules.inline.escapedEmSt.exec(l)); )
      (l =
        l.slice(0, r.index + r[0].length - 2) +
        "++" +
        l.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex)),
        this.tokenizer.rules.inline.escapedEmSt.lastIndex--;
    for (; e; )
      if (
        (a || (o = ""),
        (a = !1),
        !(
          this.options.extensions &&
          this.options.extensions.inline &&
          this.options.extensions.inline.some(
            (i) =>
              !!(t = i.call({ lexer: this }, e, n)) &&
              ((e = e.substring(t.raw.length)), n.push(t), !0),
          )
        ))
      )
        if ((t = this.tokenizer.escape(e)))
          (e = e.substring(t.raw.length)), n.push(t);
        else if ((t = this.tokenizer.tag(e)))
          (e = e.substring(t.raw.length)),
            (i = n[n.length - 1]),
            i && "text" === t.type && "text" === i.type
              ? ((i.raw += t.raw), (i.text += t.text))
              : n.push(t);
        else if ((t = this.tokenizer.link(e)))
          (e = e.substring(t.raw.length)), n.push(t);
        else if ((t = this.tokenizer.reflink(e, this.tokens.links)))
          (e = e.substring(t.raw.length)),
            (i = n[n.length - 1]),
            i && "text" === t.type && "text" === i.type
              ? ((i.raw += t.raw), (i.text += t.text))
              : n.push(t);
        else if ((t = this.tokenizer.emStrong(e, l, o)))
          (e = e.substring(t.raw.length)), n.push(t);
        else if ((t = this.tokenizer.codespan(e)))
          (e = e.substring(t.raw.length)), n.push(t);
        else if ((t = this.tokenizer.br(e)))
          (e = e.substring(t.raw.length)), n.push(t);
        else if ((t = this.tokenizer.del(e)))
          (e = e.substring(t.raw.length)), n.push(t);
        else if ((t = this.tokenizer.autolink(e, A)))
          (e = e.substring(t.raw.length)), n.push(t);
        else if (this.state.inLink || !(t = this.tokenizer.url(e, A))) {
          if (
            ((s = e),
            this.options.extensions && this.options.extensions.startInline)
          ) {
            let n = 1 / 0;
            const t = e.slice(1);
            let i;
            this.options.extensions.startInline.forEach(function (e) {
              (i = e.call({ lexer: this }, t)),
                "number" == typeof i && i >= 0 && (n = Math.min(n, i));
            }),
              n < 1 / 0 && n >= 0 && (s = e.substring(0, n + 1));
          }
          if ((t = this.tokenizer.inlineText(s, E)))
            (e = e.substring(t.raw.length)),
              "_" !== t.raw.slice(-1) && (o = t.raw.slice(-1)),
              (a = !0),
              (i = n[n.length - 1]),
              i && "text" === i.type
                ? ((i.raw += t.raw), (i.text += t.text))
                : n.push(t);
          else if (e) {
            const n = "Infinite loop on byte: " + e.charCodeAt(0);
            if (this.options.silent) {
              console.error(n);
              break;
            }
            throw new Error(n);
          }
        } else (e = e.substring(t.raw.length)), n.push(t);
    return n;
  }
}
class L {
  constructor(e) {
    this.options = e || n;
  }
  code(e, n, t) {
    const i = (n || "").match(/\S*/)[0];
    if (this.options.highlight) {
      const n = this.options.highlight(e, i);
      null != n && n !== e && ((t = !0), (e = n));
    }
    return (
      (e = e.replace(/\n$/, "") + "\n"),
      i
        ? '<pre><code class="' +
          this.options.langPrefix +
          l(i) +
          '">' +
          (t ? e : l(e, !0)) +
          "</code></pre>\n"
        : "<pre><code>" + (t ? e : l(e, !0)) + "</code></pre>\n"
    );
  }
  blockquote(e) {
    return `<blockquote>\n${e}</blockquote>\n`;
  }
  html(e) {
    return e;
  }
  heading(e, n, t, i) {
    if (this.options.headerIds) {
      return `<h${n} id="${this.options.headerPrefix + i.slug(t)}">${e}</h${n}>\n`;
    }
    return `<h${n}>${e}</h${n}>\n`;
  }
  hr() {
    return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
  }
  list(e, n, t) {
    const i = n ? "ol" : "ul";
    return (
      "<" +
      i +
      (n && 1 !== t ? ' start="' + t + '"' : "") +
      ">\n" +
      e +
      "</" +
      i +
      ">\n"
    );
  }
  listitem(e) {
    return `<li>${e}</li>\n`;
  }
  checkbox(e) {
    return (
      "<input " +
      (e ? 'checked="" ' : "") +
      'disabled="" type="checkbox"' +
      (this.options.xhtml ? " /" : "") +
      "> "
    );
  }
  paragraph(e) {
    return `<p>${e}</p>\n`;
  }
  table(e, n) {
    return (
      n && (n = `<tbody>${n}</tbody>`),
      "<table>\n<thead>\n" + e + "</thead>\n" + n + "</table>\n"
    );
  }
  tablerow(e) {
    return `<tr>\n${e}</tr>\n`;
  }
  tablecell(e, n) {
    const t = n.header ? "th" : "td";
    return (n.align ? `<${t} align="${n.align}">` : `<${t}>`) + e + `</${t}>\n`;
  }
  strong(e) {
    return `<strong>${e}</strong>`;
  }
  em(e) {
    return `<em>${e}</em>`;
  }
  codespan(e) {
    return `<code>${e}</code>`;
  }
  br() {
    return this.options.xhtml ? "<br/>" : "<br>";
  }
  del(e) {
    return `<del>${e}</del>`;
  }
  link(e, n, t) {
    if (null === (e = m(this.options.sanitize, this.options.baseUrl, e)))
      return t;
    let i = '<a href="' + e + '"';
    return n && (i += ' title="' + n + '"'), (i += ">" + t + "</a>"), i;
  }
  image(e, n, t) {
    if (null === (e = m(this.options.sanitize, this.options.baseUrl, e)))
      return t;
    let i = `<img src="${e}" alt="${t}"`;
    return (
      n && (i += ` title="${n}"`), (i += this.options.xhtml ? "/>" : ">"), i
    );
  }
  text(e) {
    return e;
  }
}
class I {
  strong(e) {
    return e;
  }
  em(e) {
    return e;
  }
  codespan(e) {
    return e;
  }
  del(e) {
    return e;
  }
  html(e) {
    return e;
  }
  text(e) {
    return e;
  }
  link(e, n, t) {
    return "" + t;
  }
  image(e, n, t) {
    return "" + t;
  }
  br() {
    return "";
  }
}
class M {
  constructor() {
    this.seen = {};
  }
  serialize(e) {
    return e
      .toLowerCase()
      .trim()
      .replace(/<[!\/a-z].*?>/gi, "")
      .replace(
        /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,
        "",
      )
      .replace(/\s/g, "-");
  }
  getNextSafeSlug(e, n) {
    let t = e,
      i = 0;
    if (this.seen.hasOwnProperty(t)) {
      i = this.seen[e];
      do {
        i++, (t = e + "-" + i);
      } while (this.seen.hasOwnProperty(t));
    }
    return n || ((this.seen[e] = i), (this.seen[t] = 0)), t;
  }
  slug(e, n = {}) {
    const t = this.serialize(e);
    return this.getNextSafeSlug(t, n.dryrun);
  }
}
class C {
  constructor(e) {
    (this.options = e || n),
      (this.options.renderer = this.options.renderer || new L()),
      (this.renderer = this.options.renderer),
      (this.renderer.options = this.options),
      (this.textRenderer = new I()),
      (this.slugger = new M());
  }
  static parse(e, n) {
    return new C(n).parse(e);
  }
  static parseInline(e, n) {
    return new C(n).parseInline(e);
  }
  parse(e, n = !0) {
    let t,
      i,
      s,
      r,
      a,
      o,
      l,
      c,
      u,
      d,
      h,
      g,
      m,
      f,
      k,
      w,
      x,
      b,
      y,
      v = "";
    const S = e.length;
    for (t = 0; t < S; t++)
      if (
        ((d = e[t]),
        this.options.extensions &&
          this.options.extensions.renderers &&
          this.options.extensions.renderers[d.type] &&
          ((y = this.options.extensions.renderers[d.type].call(
            { parser: this },
            d,
          )),
          !1 !== y ||
            ![
              "space",
              "hr",
              "heading",
              "code",
              "table",
              "blockquote",
              "list",
              "html",
              "paragraph",
              "text",
            ].includes(d.type)))
      )
        v += y || "";
      else
        switch (d.type) {
          case "space":
            continue;
          case "hr":
            v += this.renderer.hr();
            continue;
          case "heading":
            v += this.renderer.heading(
              this.parseInline(d.tokens),
              d.depth,
              p(this.parseInline(d.tokens, this.textRenderer)),
              this.slugger,
            );
            continue;
          case "code":
            v += this.renderer.code(d.text, d.lang, d.escaped);
            continue;
          case "table":
            for (c = "", l = "", r = d.header.length, i = 0; i < r; i++)
              l += this.renderer.tablecell(
                this.parseInline(d.header[i].tokens),
                { header: !0, align: d.align[i] },
              );
            for (
              c += this.renderer.tablerow(l), u = "", r = d.rows.length, i = 0;
              i < r;
              i++
            ) {
              for (o = d.rows[i], l = "", a = o.length, s = 0; s < a; s++)
                l += this.renderer.tablecell(this.parseInline(o[s].tokens), {
                  header: !1,
                  align: d.align[s],
                });
              u += this.renderer.tablerow(l);
            }
            v += this.renderer.table(c, u);
            continue;
          case "blockquote":
            (u = this.parse(d.tokens)), (v += this.renderer.blockquote(u));
            continue;
          case "list":
            for (
              h = d.ordered,
                g = d.start,
                m = d.loose,
                r = d.items.length,
                u = "",
                i = 0;
              i < r;
              i++
            )
              (k = d.items[i]),
                (w = k.checked),
                (x = k.task),
                (f = ""),
                k.task &&
                  ((b = this.renderer.checkbox(w)),
                  m
                    ? k.tokens.length > 0 && "paragraph" === k.tokens[0].type
                      ? ((k.tokens[0].text = b + " " + k.tokens[0].text),
                        k.tokens[0].tokens &&
                          k.tokens[0].tokens.length > 0 &&
                          "text" === k.tokens[0].tokens[0].type &&
                          (k.tokens[0].tokens[0].text =
                            b + " " + k.tokens[0].tokens[0].text))
                      : k.tokens.unshift({ type: "text", text: b })
                    : (f += b)),
                (f += this.parse(k.tokens, m)),
                (u += this.renderer.listitem(f, x, w));
            v += this.renderer.list(u, h, g);
            continue;
          case "html":
            v += this.renderer.html(d.text);
            continue;
          case "paragraph":
            v += this.renderer.paragraph(this.parseInline(d.tokens));
            continue;
          case "text":
            for (
              u = d.tokens ? this.parseInline(d.tokens) : d.text;
              t + 1 < S && "text" === e[t + 1].type;

            )
              (d = e[++t]),
                (u += "\n" + (d.tokens ? this.parseInline(d.tokens) : d.text));
            v += n ? this.renderer.paragraph(u) : u;
            continue;
          default: {
            const e = 'Token with "' + d.type + '" type was not found.';
            if (this.options.silent) return void console.error(e);
            throw new Error(e);
          }
        }
    return v;
  }
  parseInline(e, n) {
    n = n || this.renderer;
    let t,
      i,
      s,
      r = "";
    const a = e.length;
    for (t = 0; t < a; t++)
      if (
        ((i = e[t]),
        this.options.extensions &&
          this.options.extensions.renderers &&
          this.options.extensions.renderers[i.type] &&
          ((s = this.options.extensions.renderers[i.type].call(
            { parser: this },
            i,
          )),
          !1 !== s ||
            ![
              "escape",
              "html",
              "link",
              "image",
              "strong",
              "em",
              "codespan",
              "br",
              "del",
              "text",
            ].includes(i.type)))
      )
        r += s || "";
      else
        switch (i.type) {
          case "escape":
          case "text":
            r += n.text(i.text);
            break;
          case "html":
            r += n.html(i.text);
            break;
          case "link":
            r += n.link(i.href, i.title, this.parseInline(i.tokens, n));
            break;
          case "image":
            r += n.image(i.href, i.title, i.text);
            break;
          case "strong":
            r += n.strong(this.parseInline(i.tokens, n));
            break;
          case "em":
            r += n.em(this.parseInline(i.tokens, n));
            break;
          case "codespan":
            r += n.codespan(i.text);
            break;
          case "br":
            r += n.br();
            break;
          case "del":
            r += n.del(this.parseInline(i.tokens, n));
            break;
          default: {
            const e = 'Token with "' + i.type + '" type was not found.';
            if (this.options.silent) return void console.error(e);
            throw new Error(e);
          }
        }
    return r;
  }
}
class q {
  constructor(e) {
    this.options = e || n;
  }
  static passThroughHooks = new Set(["preprocess", "postprocess"]);
  preprocess(e) {
    return e;
  }
  postprocess(e) {
    return e;
  }
}
function P(e, n) {
  return (t, i, s) => {
    "function" == typeof i && ((s = i), (i = null));
    const r = { ...i },
      a = (function (e, n, t) {
        return (i) => {
          if (
            ((i.message +=
              "\nPlease report this to https://github.com/markedjs/marked."),
            e)
          ) {
            const e =
              "<p>An error occurred:</p><pre>" +
              l(i.message + "", !0) +
              "</pre>";
            return n ? Promise.resolve(e) : t ? void t(null, e) : e;
          }
          if (n) return Promise.reject(i);
          if (!t) throw i;
          t(i);
        };
      })((i = { ...O.defaults, ...r }).silent, i.async, s);
    if (null == t)
      return a(new Error("marked(): input parameter is undefined or null"));
    if ("string" != typeof t)
      return a(
        new Error(
          "marked(): input parameter is of type " +
            Object.prototype.toString.call(t) +
            ", string expected",
        ),
      );
    if (
      ((function (e) {
        e &&
          e.sanitize &&
          !e.silent &&
          console.warn(
            "marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options",
          );
      })(i),
      i.hooks && (i.hooks.options = i),
      s)
    ) {
      const r = i.highlight;
      let o;
      try {
        i.hooks && (t = i.hooks.preprocess(t)), (o = e(t, i));
      } catch (e) {
        return a(e);
      }
      const l = function (e) {
        let t;
        if (!e)
          try {
            i.walkTokens && O.walkTokens(o, i.walkTokens),
              (t = n(o, i)),
              i.hooks && (t = i.hooks.postprocess(t));
          } catch (n) {
            e = n;
          }
        return (i.highlight = r), e ? a(e) : s(null, t);
      };
      if (!r || r.length < 3) return l();
      if ((delete i.highlight, !o.length)) return l();
      let c = 0;
      return (
        O.walkTokens(o, function (e) {
          "code" === e.type &&
            (c++,
            setTimeout(() => {
              r(e.text, e.lang, function (n, t) {
                if (n) return l(n);
                null != t && t !== e.text && ((e.text = t), (e.escaped = !0)),
                  c--,
                  0 === c && l();
              });
            }, 0));
        }),
        void (0 === c && l())
      );
    }
    if (i.async)
      return Promise.resolve(i.hooks ? i.hooks.preprocess(t) : t)
        .then((n) => e(n, i))
        .then((e) =>
          i.walkTokens
            ? Promise.all(O.walkTokens(e, i.walkTokens)).then(() => e)
            : e,
        )
        .then((e) => n(e, i))
        .then((e) => (i.hooks ? i.hooks.postprocess(e) : e))
        .catch(a);
    try {
      i.hooks && (t = i.hooks.preprocess(t));
      const s = e(t, i);
      i.walkTokens && O.walkTokens(s, i.walkTokens);
      let r = n(s, i);
      return i.hooks && (r = i.hooks.postprocess(r)), r;
    } catch (e) {
      return a(e);
    }
  };
}
function O(e, n, t) {
  return P(R.lex, C.parse)(e, n, t);
}
(O.options = O.setOptions =
  function (e) {
    var t;
    return (O.defaults = { ...O.defaults, ...e }), (t = O.defaults), (n = t), O;
  }),
  (O.getDefaults = e),
  (O.defaults = n),
  (O.use = function (...e) {
    const n = O.defaults.extensions || { renderers: {}, childTokens: {} };
    e.forEach((e) => {
      const t = { ...e };
      if (
        ((t.async = O.defaults.async || t.async || !1),
        e.extensions &&
          (e.extensions.forEach((e) => {
            if (!e.name) throw new Error("extension name required");
            if (e.renderer) {
              const t = n.renderers[e.name];
              n.renderers[e.name] = t
                ? function (...n) {
                    let i = e.renderer.apply(this, n);
                    return !1 === i && (i = t.apply(this, n)), i;
                  }
                : e.renderer;
            }
            if (e.tokenizer) {
              if (!e.level || ("block" !== e.level && "inline" !== e.level))
                throw new Error("extension level must be 'block' or 'inline'");
              n[e.level]
                ? n[e.level].unshift(e.tokenizer)
                : (n[e.level] = [e.tokenizer]),
                e.start &&
                  ("block" === e.level
                    ? n.startBlock
                      ? n.startBlock.push(e.start)
                      : (n.startBlock = [e.start])
                    : "inline" === e.level &&
                      (n.startInline
                        ? n.startInline.push(e.start)
                        : (n.startInline = [e.start])));
            }
            e.childTokens && (n.childTokens[e.name] = e.childTokens);
          }),
          (t.extensions = n)),
        e.renderer)
      ) {
        const n = O.defaults.renderer || new L();
        for (const t in e.renderer) {
          const i = n[t];
          n[t] = (...s) => {
            let r = e.renderer[t].apply(n, s);
            return !1 === r && (r = i.apply(n, s)), r;
          };
        }
        t.renderer = n;
      }
      if (e.tokenizer) {
        const n = O.defaults.tokenizer || new _();
        for (const t in e.tokenizer) {
          const i = n[t];
          n[t] = (...s) => {
            let r = e.tokenizer[t].apply(n, s);
            return !1 === r && (r = i.apply(n, s)), r;
          };
        }
        t.tokenizer = n;
      }
      if (e.hooks) {
        const n = O.defaults.hooks || new q();
        for (const t in e.hooks) {
          const i = n[t];
          q.passThroughHooks.has(t)
            ? (n[t] = (s) => {
                if (O.defaults.async)
                  return Promise.resolve(e.hooks[t].call(n, s)).then((e) =>
                    i.call(n, e),
                  );
                const r = e.hooks[t].call(n, s);
                return i.call(n, r);
              })
            : (n[t] = (...s) => {
                let r = e.hooks[t].apply(n, s);
                return !1 === r && (r = i.apply(n, s)), r;
              });
        }
        t.hooks = n;
      }
      if (e.walkTokens) {
        const n = O.defaults.walkTokens;
        t.walkTokens = function (t) {
          let i = [];
          return (
            i.push(e.walkTokens.call(this, t)),
            n && (i = i.concat(n.call(this, t))),
            i
          );
        };
      }
      O.setOptions(t);
    });
  }),
  (O.walkTokens = function (e, n) {
    let t = [];
    for (const i of e)
      switch (((t = t.concat(n.call(O, i))), i.type)) {
        case "table":
          for (const e of i.header) t = t.concat(O.walkTokens(e.tokens, n));
          for (const e of i.rows)
            for (const i of e) t = t.concat(O.walkTokens(i.tokens, n));
          break;
        case "list":
          t = t.concat(O.walkTokens(i.items, n));
          break;
        default:
          O.defaults.extensions &&
          O.defaults.extensions.childTokens &&
          O.defaults.extensions.childTokens[i.type]
            ? O.defaults.extensions.childTokens[i.type].forEach(function (e) {
                t = t.concat(O.walkTokens(i[e], n));
              })
            : i.tokens && (t = t.concat(O.walkTokens(i.tokens, n)));
      }
    return t;
  }),
  (O.parseInline = P(R.lexInline, C.parseInline)),
  (O.Parser = C),
  (O.parser = C.parse),
  (O.Renderer = L),
  (O.TextRenderer = I),
  (O.Lexer = R),
  (O.lexer = R.lex),
  (O.Tokenizer = _),
  (O.Slugger = M),
  (O.Hooks = q),
  (O.parse = O),
  O.options,
  O.setOptions,
  O.use,
  O.walkTokens,
  O.parseInline,
  C.parse,
  R.lex;
const N = () => {
  let e,
    n,
    t = null;
  function i() {
    if (t && !t.closed) t.focus();
    else {
      if (
        ((t = window.open(
          "about:blank",
          "reveal.js - Notes",
          "width=1100,height=700",
        )),
        (t.marked = O),
        t.document.write(
          '\x3c!--\n\tNOTE: You need to build the notes plugin after making changes to this file.\n--\x3e\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n\n    <title>reveal.js - Speaker View</title>\n\n    <style>\n      body {\n        font-family: Helvetica;\n        font-size: 18px;\n      }\n\n      #current-slide,\n      #upcoming-slide,\n      #speaker-controls {\n        padding: 6px;\n        box-sizing: border-box;\n        -moz-box-sizing: border-box;\n      }\n\n      #current-slide iframe,\n      #upcoming-slide iframe {\n        width: 100%;\n        height: 100%;\n        border: 1px solid #ddd;\n      }\n\n      #current-slide .label,\n      #upcoming-slide .label {\n        position: absolute;\n        top: 10px;\n        left: 10px;\n        z-index: 2;\n      }\n\n      #connection-status {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        z-index: 20;\n        padding: 30% 20% 20% 20%;\n        font-size: 18px;\n        color: #222;\n        background: #fff;\n        text-align: center;\n        box-sizing: border-box;\n        line-height: 1.4;\n      }\n\n      .overlay-element {\n        height: 34px;\n        line-height: 34px;\n        padding: 0 10px;\n        text-shadow: none;\n        background: rgba(220, 220, 220, 0.8);\n        color: #222;\n        font-size: 14px;\n      }\n\n      .overlay-element.interactive:hover {\n        background: rgba(220, 220, 220, 1);\n      }\n\n      #current-slide {\n        position: absolute;\n        width: 60%;\n        height: 100%;\n        top: 0;\n        left: 0;\n        padding-right: 0;\n      }\n\n      #upcoming-slide {\n        position: absolute;\n        width: 40%;\n        height: 40%;\n        right: 0;\n        top: 0;\n      }\n\n      /* Speaker controls */\n      #speaker-controls {\n        position: absolute;\n        top: 40%;\n        right: 0;\n        width: 40%;\n        height: 60%;\n        overflow: auto;\n        font-size: 18px;\n      }\n\n      .speaker-controls-time.hidden,\n      .speaker-controls-notes.hidden {\n        display: none;\n      }\n\n      .speaker-controls-time .label,\n      .speaker-controls-pace .label,\n      .speaker-controls-notes .label {\n        text-transform: uppercase;\n        font-weight: normal;\n        font-size: 0.66em;\n        color: #666;\n        margin: 0;\n      }\n\n      .speaker-controls-time,\n      .speaker-controls-pace {\n        border-bottom: 1px solid rgba(200, 200, 200, 0.5);\n        margin-bottom: 10px;\n        padding: 10px 16px;\n        padding-bottom: 20px;\n        cursor: pointer;\n      }\n\n      .speaker-controls-time .reset-button {\n        opacity: 0;\n        float: right;\n        color: #666;\n        text-decoration: none;\n      }\n      .speaker-controls-time:hover .reset-button {\n        opacity: 1;\n      }\n\n      .speaker-controls-time .timer,\n      .speaker-controls-time .clock {\n        width: 50%;\n      }\n\n      .speaker-controls-time .timer,\n      .speaker-controls-time .clock,\n      .speaker-controls-time .pacing .hours-value,\n      .speaker-controls-time .pacing .minutes-value,\n      .speaker-controls-time .pacing .seconds-value {\n        font-size: 1.9em;\n      }\n\n      .speaker-controls-time .timer {\n        float: left;\n      }\n\n      .speaker-controls-time .clock {\n        float: right;\n        text-align: right;\n      }\n\n      .speaker-controls-time span.mute {\n        opacity: 0.3;\n      }\n\n      .speaker-controls-time .pacing-title {\n        margin-top: 5px;\n      }\n\n      .speaker-controls-time .pacing.ahead {\n        color: blue;\n      }\n\n      .speaker-controls-time .pacing.on-track {\n        color: green;\n      }\n\n      .speaker-controls-time .pacing.behind {\n        color: red;\n      }\n\n      .speaker-controls-notes {\n        padding: 10px 16px;\n      }\n\n      .speaker-controls-notes .value {\n        margin-top: 5px;\n        line-height: 1.4;\n        font-size: 1.2em;\n      }\n\n      /* Layout selector */\n      #speaker-layout {\n        position: absolute;\n        top: 10px;\n        right: 10px;\n        color: #222;\n        z-index: 10;\n      }\n      #speaker-layout select {\n        position: absolute;\n        width: 100%;\n        height: 100%;\n        top: 0;\n        left: 0;\n        border: 0;\n        box-shadow: 0;\n        cursor: pointer;\n        opacity: 0;\n\n        font-size: 1em;\n        background-color: transparent;\n\n        -moz-appearance: none;\n        -webkit-appearance: none;\n        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n      }\n\n      #speaker-layout select:focus {\n        outline: none;\n        box-shadow: none;\n      }\n\n      .clear {\n        clear: both;\n      }\n\n      /* Speaker layout: Wide */\n      body[data-speaker-layout="wide"] #current-slide,\n      body[data-speaker-layout="wide"] #upcoming-slide {\n        width: 50%;\n        height: 45%;\n        padding: 6px;\n      }\n\n      body[data-speaker-layout="wide"] #current-slide {\n        top: 0;\n        left: 0;\n      }\n\n      body[data-speaker-layout="wide"] #upcoming-slide {\n        top: 0;\n        left: 50%;\n      }\n\n      body[data-speaker-layout="wide"] #speaker-controls {\n        top: 45%;\n        left: 0;\n        width: 100%;\n        height: 50%;\n        font-size: 1.25em;\n      }\n\n      /* Speaker layout: Tall */\n      body[data-speaker-layout="tall"] #current-slide,\n      body[data-speaker-layout="tall"] #upcoming-slide {\n        width: 45%;\n        height: 50%;\n        padding: 6px;\n      }\n\n      body[data-speaker-layout="tall"] #current-slide {\n        top: 0;\n        left: 0;\n      }\n\n      body[data-speaker-layout="tall"] #upcoming-slide {\n        top: 50%;\n        left: 0;\n      }\n\n      body[data-speaker-layout="tall"] #speaker-controls {\n        padding-top: 40px;\n        top: 0;\n        left: 45%;\n        width: 55%;\n        height: 100%;\n        font-size: 1.25em;\n      }\n\n      /* Speaker layout: Notes only */\n      body[data-speaker-layout="notes-only"] #current-slide,\n      body[data-speaker-layout="notes-only"] #upcoming-slide {\n        display: none;\n      }\n\n      body[data-speaker-layout="notes-only"] #speaker-controls {\n        padding-top: 40px;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        font-size: 1.25em;\n      }\n\n      @media screen and (max-width: 1080px) {\n        body[data-speaker-layout="default"] #speaker-controls {\n          font-size: 16px;\n        }\n      }\n\n      @media screen and (max-width: 900px) {\n        body[data-speaker-layout="default"] #speaker-controls {\n          font-size: 14px;\n        }\n      }\n\n      @media screen and (max-width: 800px) {\n        body[data-speaker-layout="default"] #speaker-controls {\n          font-size: 12px;\n        }\n      }\n    </style>\n  </head>\n\n  <body>\n    <div id="connection-status">Loading speaker view...</div>\n\n    <div id="current-slide"></div>\n    <div id="upcoming-slide">\n      <span class="overlay-element label">Upcoming</span>\n    </div>\n    <div id="speaker-controls">\n      <div class="speaker-controls-time">\n        <h4 class="label">\n          Time <span class="reset-button">Click to Reset</span>\n        </h4>\n        <div class="clock">\n          <span class="clock-value">0:00 AM</span>\n        </div>\n        <div class="timer">\n          <span class="hours-value">00</span\n          ><span class="minutes-value">:00</span\n          ><span class="seconds-value">:00</span>\n        </div>\n        <div class="clear"></div>\n\n        <h4 class="label pacing-title" style="display: none">\n          Pacing – Time to finish current slide\n        </h4>\n        <div class="pacing" style="display: none">\n          <span class="hours-value">00</span\n          ><span class="minutes-value">:00</span\n          ><span class="seconds-value">:00</span>\n        </div>\n      </div>\n\n      <div class="speaker-controls-notes hidden">\n        <h4 class="label">Notes</h4>\n        <div class="value"></div>\n      </div>\n    </div>\n    <div id="speaker-layout" class="overlay-element interactive">\n      <span class="speaker-layout-label"></span>\n      <select class="speaker-layout-dropdown"></select>\n    </div>\n\n    <script>\n      (function () {\n        var notes,\n          notesValue,\n          currentState,\n          currentSlide,\n          upcomingSlide,\n          layoutLabel,\n          layoutDropdown,\n          pendingCalls = {},\n          lastRevealApiCallId = 0,\n          connected = false;\n\n        var connectionStatus = document.querySelector("#connection-status");\n\n        var SPEAKER_LAYOUTS = {\n          default: "Default",\n          wide: "Wide",\n          tall: "Tall",\n          "notes-only": "Notes only",\n        };\n\n        setupLayout();\n\n        let openerOrigin;\n\n        try {\n          openerOrigin = window.opener.location.origin;\n        } catch (error) {\n          console.warn(error);\n        }\n\n        // In order to prevent XSS, the speaker view will only run if its\n        // opener has the same origin as itself\n        if (window.location.origin !== openerOrigin) {\n          connectionStatus.innerHTML =\n            "Cross origin error.<br>The speaker window can only be opened from the same origin.";\n          return;\n        }\n\n        var connectionTimeout = setTimeout(function () {\n          connectionStatus.innerHTML =\n            "Error connecting to main window.<br>Please try closing and reopening the speaker view.";\n        }, 5000);\n\n        window.addEventListener("message", function (event) {\n          // Validate the origin of all messages to avoid parsing messages\n          // that aren\'t meant for us. Ignore when running off file:// so\n          // that the speaker view continues to work without a web server.\n          if (\n            window.location.origin !== event.origin &&\n            window.location.origin !== "file://"\n          ) {\n            return;\n          }\n\n          clearTimeout(connectionTimeout);\n          connectionStatus.style.display = "none";\n\n          var data = JSON.parse(event.data);\n\n          // The overview mode is only useful to the reveal.js instance\n          // where navigation occurs so we don\'t sync it\n          if (data.state) delete data.state.overview;\n\n          // Messages sent by the notes plugin inside of the main window\n          if (data && data.namespace === "reveal-notes") {\n            if (data.type === "connect") {\n              handleConnectMessage(data);\n            } else if (data.type === "state") {\n              handleStateMessage(data);\n            } else if (data.type === "return") {\n              pendingCalls[data.callId](data.result);\n              delete pendingCalls[data.callId];\n            }\n          }\n          // Messages sent by the reveal.js inside of the current slide preview\n          else if (data && data.namespace === "reveal") {\n            if (/ready/.test(data.eventName)) {\n              // Send a message back to notify that the handshake is complete\n              window.opener.postMessage(\n                JSON.stringify({\n                  namespace: "reveal-notes",\n                  type: "connected",\n                }),\n                "*",\n              );\n            } else if (\n              /slidechanged|fragmentshown|fragmenthidden|paused|resumed/.test(\n                data.eventName,\n              ) &&\n              currentState !== JSON.stringify(data.state)\n            ) {\n              dispatchStateToMainWindow(data.state);\n            }\n          }\n        });\n\n        /**\n         * Updates the presentation in the main window to match the state\n         * of the presentation in the notes window.\n         */\n        const dispatchStateToMainWindow = debounce((state) => {\n          window.opener.postMessage(\n            JSON.stringify({ method: "setState", args: [state] }),\n            "*",\n          );\n        }, 500);\n\n        /**\n         * Asynchronously calls the Reveal.js API of the main frame.\n         */\n        function callRevealApi(methodName, methodArguments, callback) {\n          var callId = ++lastRevealApiCallId;\n          pendingCalls[callId] = callback;\n          window.opener.postMessage(\n            JSON.stringify({\n              namespace: "reveal-notes",\n              type: "call",\n              callId: callId,\n              methodName: methodName,\n              arguments: methodArguments,\n            }),\n            "*",\n          );\n        }\n\n        /**\n         * Called when the main window is trying to establish a\n         * connection.\n         */\n        function handleConnectMessage(data) {\n          if (connected === false) {\n            connected = true;\n\n            setupIframes(data);\n            setupKeyboard();\n            setupNotes();\n            setupTimer();\n            setupHeartbeat();\n          }\n        }\n\n        /**\n         * Called when the main window sends an updated state.\n         */\n        function handleStateMessage(data) {\n          // Store the most recently set state to avoid circular loops\n          // applying the same state\n          currentState = JSON.stringify(data.state);\n\n          // No need for updating the notes in case of fragment changes\n          if (data.notes) {\n            notes.classList.remove("hidden");\n            notesValue.style.whiteSpace = data.whitespace;\n            if (data.markdown) {\n              notesValue.innerHTML = marked(data.notes);\n            } else {\n              notesValue.innerHTML = data.notes;\n            }\n          } else {\n            notes.classList.add("hidden");\n          }\n\n          // Update the note slides\n          currentSlide.contentWindow.postMessage(\n            JSON.stringify({ method: "setState", args: [data.state] }),\n            "*",\n          );\n          upcomingSlide.contentWindow.postMessage(\n            JSON.stringify({ method: "setState", args: [data.state] }),\n            "*",\n          );\n          upcomingSlide.contentWindow.postMessage(\n            JSON.stringify({ method: "next" }),\n            "*",\n          );\n        }\n\n        // Limit to max one state update per X ms\n        handleStateMessage = debounce(handleStateMessage, 200);\n\n        /**\n         * Forward keyboard events to the current slide window.\n         * This enables keyboard events to work even if focus\n         * isn\'t set on the current slide iframe.\n         *\n         * Block F5 default handling, it reloads and disconnects\n         * the speaker notes window.\n         */\n        function setupKeyboard() {\n          document.addEventListener("keydown", function (event) {\n            if (\n              event.keyCode === 116 ||\n              (event.metaKey && event.keyCode === 82)\n            ) {\n              event.preventDefault();\n              return false;\n            }\n            currentSlide.contentWindow.postMessage(\n              JSON.stringify({ method: "triggerKey", args: [event.keyCode] }),\n              "*",\n            );\n          });\n        }\n\n        /**\n         * Creates the preview iframes.\n         */\n        function setupIframes(data) {\n          var params = [\n            "receiver",\n            "progress=false",\n            "history=false",\n            "transition=none",\n            "autoSlide=0",\n            "backgroundTransition=none",\n          ].join("&");\n\n          var urlSeparator = /\\?/.test(data.url) ? "&" : "?";\n          var hash = "#/" + data.state.indexh + "/" + data.state.indexv;\n          var currentURL =\n            data.url +\n            urlSeparator +\n            params +\n            "&scrollActivationWidth=false&postMessageEvents=true" +\n            hash;\n          var upcomingURL =\n            data.url +\n            urlSeparator +\n            params +\n            "&scrollActivationWidth=false&controls=false" +\n            hash;\n\n          currentSlide = document.createElement("iframe");\n          currentSlide.setAttribute("width", 1280);\n          currentSlide.setAttribute("height", 1024);\n          currentSlide.setAttribute("src", currentURL);\n          document.querySelector("#current-slide").appendChild(currentSlide);\n\n          upcomingSlide = document.createElement("iframe");\n          upcomingSlide.setAttribute("width", 640);\n          upcomingSlide.setAttribute("height", 512);\n          upcomingSlide.setAttribute("src", upcomingURL);\n          document.querySelector("#upcoming-slide").appendChild(upcomingSlide);\n        }\n\n        /**\n         * Setup the notes UI.\n         */\n        function setupNotes() {\n          notes = document.querySelector(".speaker-controls-notes");\n          notesValue = document.querySelector(".speaker-controls-notes .value");\n        }\n\n        /**\n         * We send out a heartbeat at all times to ensure we can\n         * reconnect with the main presentation window after reloads.\n         */\n        function setupHeartbeat() {\n          setInterval(() => {\n            window.opener.postMessage(\n              JSON.stringify({ namespace: "reveal-notes", type: "heartbeat" }),\n              "*",\n            );\n          }, 1000);\n        }\n\n        function getTimings(callback) {\n          callRevealApi("getSlidesAttributes", [], function (slideAttributes) {\n            callRevealApi("getConfig", [], function (config) {\n              var totalTime = config.totalTime;\n              var minTimePerSlide = config.minimumTimePerSlide || 0;\n              var defaultTiming = config.defaultTiming;\n              if (defaultTiming == null && totalTime == null) {\n                callback(null);\n                return;\n              }\n              // Setting totalTime overrides defaultTiming\n              if (totalTime) {\n                defaultTiming = 0;\n              }\n              var timings = [];\n              for (var i in slideAttributes) {\n                var slide = slideAttributes[i];\n                var timing = defaultTiming;\n                if (slide.hasOwnProperty("data-timing")) {\n                  var t = slide["data-timing"];\n                  timing = parseInt(t);\n                  if (isNaN(timing)) {\n                    console.warn(\n                      "Could not parse timing \'" +\n                        t +\n                        "\' of slide " +\n                        i +\n                        "; using default of " +\n                        defaultTiming,\n                    );\n                    timing = defaultTiming;\n                  }\n                }\n                timings.push(timing);\n              }\n              if (totalTime) {\n                // After we\'ve allocated time to individual slides, we summarize it and\n                // subtract it from the total time\n                var remainingTime =\n                  totalTime -\n                  timings.reduce(function (a, b) {\n                    return a + b;\n                  }, 0);\n                // The remaining time is divided by the number of slides that have 0 seconds\n                // allocated at the moment, giving the average time-per-slide on the remaining slides\n                var remainingSlides = timings.filter(function (x) {\n                  return x == 0;\n                }).length;\n                var timePerSlide = Math.round(\n                  remainingTime / remainingSlides,\n                  0,\n                );\n                // And now we replace every zero-value timing with that average\n                timings = timings.map(function (x) {\n                  return x == 0 ? timePerSlide : x;\n                });\n              }\n              var slidesUnderMinimum = timings.filter(function (x) {\n                return x < minTimePerSlide;\n              }).length;\n              if (slidesUnderMinimum) {\n                message =\n                  "The pacing time for " +\n                  slidesUnderMinimum +\n                  " slide(s) is under the configured minimum of " +\n                  minTimePerSlide +\n                  " seconds. Check the data-timing attribute on individual slides, or consider increasing the totalTime or minimumTimePerSlide configuration options (or removing some slides).";\n                alert(message);\n              }\n              callback(timings);\n            });\n          });\n        }\n\n        /**\n         * Return the number of seconds allocated for presenting\n         * all slides up to and including this one.\n         */\n        function getTimeAllocated(timings, callback) {\n          callRevealApi("getSlidePastCount", [], function (currentSlide) {\n            var allocated = 0;\n            for (var i in timings.slice(0, currentSlide + 1)) {\n              allocated += timings[i];\n            }\n            callback(allocated);\n          });\n        }\n\n        /**\n         * Create the timer and clock and start updating them\n         * at an interval.\n         */\n        function setupTimer() {\n          var start = new Date(),\n            timeEl = document.querySelector(".speaker-controls-time"),\n            clockEl = timeEl.querySelector(".clock-value"),\n            hoursEl = timeEl.querySelector(".hours-value"),\n            minutesEl = timeEl.querySelector(".minutes-value"),\n            secondsEl = timeEl.querySelector(".seconds-value"),\n            pacingTitleEl = timeEl.querySelector(".pacing-title"),\n            pacingEl = timeEl.querySelector(".pacing"),\n            pacingHoursEl = pacingEl.querySelector(".hours-value"),\n            pacingMinutesEl = pacingEl.querySelector(".minutes-value"),\n            pacingSecondsEl = pacingEl.querySelector(".seconds-value");\n\n          var timings = null;\n          getTimings(function (_timings) {\n            timings = _timings;\n            if (_timings !== null) {\n              pacingTitleEl.style.removeProperty("display");\n              pacingEl.style.removeProperty("display");\n            }\n\n            // Update once directly\n            _updateTimer();\n\n            // Then update every second\n            setInterval(_updateTimer, 1000);\n          });\n\n          function _resetTimer() {\n            if (timings == null) {\n              start = new Date();\n              _updateTimer();\n            } else {\n              // Reset timer to beginning of current slide\n              getTimeAllocated(timings, function (slideEndTimingSeconds) {\n                var slideEndTiming = slideEndTimingSeconds * 1000;\n                callRevealApi("getSlidePastCount", [], function (currentSlide) {\n                  var currentSlideTiming = timings[currentSlide] * 1000;\n                  var previousSlidesTiming =\n                    slideEndTiming - currentSlideTiming;\n                  var now = new Date();\n                  start = new Date(now.getTime() - previousSlidesTiming);\n                  _updateTimer();\n                });\n              });\n            }\n          }\n\n          timeEl.addEventListener("click", function () {\n            _resetTimer();\n            return false;\n          });\n\n          function _displayTime(hrEl, minEl, secEl, time) {\n            var sign = Math.sign(time) == -1 ? "-" : "";\n            time = Math.abs(Math.round(time / 1000));\n            var seconds = time % 60;\n            var minutes = Math.floor(time / 60) % 60;\n            var hours = Math.floor(time / (60 * 60));\n            hrEl.innerHTML = sign + zeroPadInteger(hours);\n            if (hours == 0) {\n              hrEl.classList.add("mute");\n            } else {\n              hrEl.classList.remove("mute");\n            }\n            minEl.innerHTML = ":" + zeroPadInteger(minutes);\n            if (hours == 0 && minutes == 0) {\n              minEl.classList.add("mute");\n            } else {\n              minEl.classList.remove("mute");\n            }\n            secEl.innerHTML = ":" + zeroPadInteger(seconds);\n          }\n\n          function _updateTimer() {\n            var diff,\n              hours,\n              minutes,\n              seconds,\n              now = new Date();\n\n            diff = now.getTime() - start.getTime();\n\n            clockEl.innerHTML = now.toLocaleTimeString("en-US", {\n              hour12: true,\n              hour: "2-digit",\n              minute: "2-digit",\n            });\n            _displayTime(hoursEl, minutesEl, secondsEl, diff);\n            if (timings !== null) {\n              _updatePacing(diff);\n            }\n          }\n\n          function _updatePacing(diff) {\n            getTimeAllocated(timings, function (slideEndTimingSeconds) {\n              var slideEndTiming = slideEndTimingSeconds * 1000;\n\n              callRevealApi("getSlidePastCount", [], function (currentSlide) {\n                var currentSlideTiming = timings[currentSlide] * 1000;\n                var timeLeftCurrentSlide = slideEndTiming - diff;\n                if (timeLeftCurrentSlide < 0) {\n                  pacingEl.className = "pacing behind";\n                } else if (timeLeftCurrentSlide < currentSlideTiming) {\n                  pacingEl.className = "pacing on-track";\n                } else {\n                  pacingEl.className = "pacing ahead";\n                }\n                _displayTime(\n                  pacingHoursEl,\n                  pacingMinutesEl,\n                  pacingSecondsEl,\n                  timeLeftCurrentSlide,\n                );\n              });\n            });\n          }\n        }\n\n        /**\n         * Sets up the speaker view layout and layout selector.\n         */\n        function setupLayout() {\n          layoutDropdown = document.querySelector(".speaker-layout-dropdown");\n          layoutLabel = document.querySelector(".speaker-layout-label");\n\n          // Render the list of available layouts\n          for (var id in SPEAKER_LAYOUTS) {\n            var option = document.createElement("option");\n            option.setAttribute("value", id);\n            option.textContent = SPEAKER_LAYOUTS[id];\n            layoutDropdown.appendChild(option);\n          }\n\n          // Monitor the dropdown for changes\n          layoutDropdown.addEventListener(\n            "change",\n            function (event) {\n              setLayout(layoutDropdown.value);\n            },\n            false,\n          );\n\n          // Restore any currently persisted layout\n          setLayout(getLayout());\n        }\n\n        /**\n         * Sets a new speaker view layout. The layout is persisted\n         * in local storage.\n         */\n        function setLayout(value) {\n          var title = SPEAKER_LAYOUTS[value];\n\n          layoutLabel.innerHTML = "Layout" + (title ? ": " + title : "");\n          layoutDropdown.value = value;\n\n          document.body.setAttribute("data-speaker-layout", value);\n\n          // Persist locally\n          if (supportsLocalStorage()) {\n            window.localStorage.setItem("reveal-speaker-layout", value);\n          }\n        }\n\n        /**\n         * Returns the ID of the most recently set speaker layout\n         * or our default layout if none has been set.\n         */\n        function getLayout() {\n          if (supportsLocalStorage()) {\n            var layout = window.localStorage.getItem("reveal-speaker-layout");\n            if (layout) {\n              return layout;\n            }\n          }\n\n          // Default to the first record in the layouts hash\n          for (var id in SPEAKER_LAYOUTS) {\n            return id;\n          }\n        }\n\n        function supportsLocalStorage() {\n          try {\n            localStorage.setItem("test", "test");\n            localStorage.removeItem("test");\n            return true;\n          } catch (e) {\n            return false;\n          }\n        }\n\n        function zeroPadInteger(num) {\n          var str = "00" + parseInt(num);\n          return str.substring(str.length - 2);\n        }\n\n        /**\n         * Limits the frequency at which a function can be called.\n         */\n        function debounce(fn, ms) {\n          var lastTime = 0,\n            timeout;\n\n          return function () {\n            var args = arguments;\n            var context = this;\n\n            clearTimeout(timeout);\n\n            var timeSinceLastCall = Date.now() - lastTime;\n            if (timeSinceLastCall > ms) {\n              fn.apply(context, args);\n              lastTime = Date.now();\n            } else {\n              timeout = setTimeout(function () {\n                fn.apply(context, args);\n                lastTime = Date.now();\n              }, ms - timeSinceLastCall);\n            }\n          };\n        }\n      })();\n    </script>\n  </body>\n</html>\n',
        ),
        !t)
      )
        return void alert(
          "Speaker view popup failed to open. Please make sure popups are allowed and reopen the speaker view.",
        );
      !(function () {
        const i = n.getConfig().url,
          s =
            "string" == typeof i
              ? i
              : window.location.protocol +
                "//" +
                window.location.host +
                window.location.pathname +
                window.location.search;
        (e = setInterval(function () {
          t.postMessage(
            JSON.stringify({
              namespace: "reveal-notes",
              type: "connect",
              state: n.getState(),
              url: s,
            }),
            "*",
          );
        }, 500)),
          window.addEventListener("message", r);
      })();
    }
  }
  function s(e) {
    let i = n.getCurrentSlide(),
      s = i.querySelectorAll("aside.notes"),
      r = i.querySelector(".current-fragment"),
      a = {
        namespace: "reveal-notes",
        type: "state",
        notes: "",
        markdown: !1,
        whitespace: "normal",
        state: n.getState(),
      };
    if (
      (i.hasAttribute("data-notes") &&
        ((a.notes = i.getAttribute("data-notes")), (a.whitespace = "pre-wrap")),
      r)
    ) {
      let e = r.querySelector("aside.notes");
      e
        ? ((a.notes = e.innerHTML),
          (a.markdown = "string" == typeof e.getAttribute("data-markdown")),
          (s = null))
        : r.hasAttribute("data-notes") &&
          ((a.notes = r.getAttribute("data-notes")),
          (a.whitespace = "pre-wrap"),
          (s = null));
    }
    s &&
      s.length &&
      ((s = Array.from(s).filter((e) => null === e.closest(".fragment"))),
      (a.notes = s.map((e) => e.innerHTML).join("\n")),
      (a.markdown =
        s[0] && "string" == typeof s[0].getAttribute("data-markdown"))),
      t.postMessage(JSON.stringify(a), "*");
  }
  function r(i) {
    if (
      (function (e) {
        try {
          return window.location.origin === e.source.location.origin;
        } catch (e) {
          return !1;
        }
      })(i)
    )
      try {
        let s = JSON.parse(i.data);
        s && "reveal-notes" === s.namespace && "connected" === s.type
          ? (clearInterval(e), a())
          : s &&
            "reveal-notes" === s.namespace &&
            "call" === s.type &&
            (function (e, i, s) {
              let r = n[e].apply(n, i);
              t.postMessage(
                JSON.stringify({
                  namespace: "reveal-notes",
                  type: "return",
                  result: r,
                  callId: s,
                }),
                "*",
              );
            })(s.methodName, s.arguments, s.callId);
      } catch (e) {}
  }
  function a() {
    n.on("slidechanged", s),
      n.on("fragmentshown", s),
      n.on("fragmenthidden", s),
      n.on("overviewhidden", s),
      n.on("overviewshown", s),
      n.on("paused", s),
      n.on("resumed", s),
      s();
  }
  return {
    id: "notes",
    init: function (e) {
      (n = e),
        /receiver/i.test(window.location.search) ||
          (null !== window.location.search.match(/(\?|\&)notes/gi)
            ? i()
            : window.addEventListener("message", (e) => {
                if (!t && "string" == typeof e.data) {
                  let i;
                  try {
                    i = JSON.parse(e.data);
                  } catch (e) {}
                  i &&
                    "reveal-notes" === i.namespace &&
                    "heartbeat" === i.type &&
                    ((n = e.source),
                    t && !t.closed
                      ? t.focus()
                      : ((t = n), window.addEventListener("message", r), a()));
                }
                var n;
              }),
          n.addKeyBinding(
            { keyCode: 83, key: "S", description: "Speaker notes view" },
            function () {
              i();
            },
          ));
    },
    open: i,
  };
};
export { N as default };
