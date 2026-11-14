#!/usr/bin/env node
/**
 * Writes prerendered static HTML under public/ for Cloudflare asset routing (not_found_handling = none).
 */
import fs from "node:fs";
import path from "node:path";

const SITE = "https://free-background-remover.web-free.site";
const HUB = "https://web-free.site";

const AD_POPUNDER = `<script data-cfasync="false" src="https://abscloud.org/1/cebae6672bf355ae2d1afe20a8c59c67"></script>`;
const AD_SOCIAL = `<script data-cfasync="false" src="https://bauval.org/14/9de61bf64463a87e19b908c4edb7b2c0"></script>`;

function banner(key, w, h) {
  return `<div class="ad"><iframe title="Advertisement" width="${w}" height="${h}" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" srcdoc="&lt;!DOCTYPE html&gt;&lt;html&gt;&lt;head&gt;&lt;meta charset=utf-8&gt;&lt;style&gt;body{margin:0}&lt;/style&gt;&lt;/head&gt;&lt;body&gt;&lt;script&gt;atOptions={key:'${key}',format:'iframe',height:${h},width:${w},params:{}};&lt;/script&gt;&lt;script src=https://bauval.org/22/${key}&gt;&lt;/script&gt;&lt;/body&gt;&lt;/html&gt;"></iframe></div>`;
}

const css = `
  body{font-family:system-ui,sans-serif;margin:0;background:#f9fafb;color:#374151;line-height:1.6}
  header,footer{background:#fff;border-bottom:1px solid #e5e7eb}
  footer{border-top:1px solid #e5e7eb;border-bottom:none;margin-top:2rem}
  .wrap{max-width:48rem;margin:0 auto;padding:1.5rem}
  a{color:#2563eb} nav a{margin-right:1rem}
  h1{color:#111827} .ad{display:flex;justify-content:center;margin:1rem 0}
`;

function page({ title, description, pathname, body, hreflang = "en", extraHead = "" }) {
  const canonical = `${SITE}${pathname}`;
  return `<!DOCTYPE html>
<html lang="${hreflang}">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${title}</title>
<meta name="description" content="${description}"/>
<link rel="canonical" href="${canonical}"/>
<link rel="alternate" hreflang="en" href="${SITE}/"/>
<link rel="alternate" hreflang="fr" href="${SITE}/fr/"/>
<link rel="alternate" hreflang="x-default" href="${SITE}/"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="${canonical}"/>
<meta property="og:title" content="${title}"/>
<meta property="og:description" content="${description}"/>
<meta property="og:image" content="${SITE}/meta.jpg"/>
<style>${css}</style>
${extraHead}
${AD_POPUNDER}
${AD_SOCIAL}
</head>
<body>
<header><div class="wrap"><strong><a href="/">Free Background Remover</a></strong>
<nav style="margin-top:.5rem;font-size:.9rem">
<a href="/">Tool</a><a href="/faq/">FAQ</a><a href="/about/">About</a><a href="/fr/">FR</a>
</nav></div></header>
<div class="wrap">${banner("9c3da2bba002357c8125e19b378b8e89", 728, 90)}
<article>${body}</article>
${banner("fa9db36b5c3ea1ca9f09790310bd8d40", 468, 60)}
</div>
<footer><div class="wrap">
<p>App: <a href="https://github.com/addyosmani/bg-remove">bg-remove</a> (MIT) · Model: <a href="https://huggingface.co/onnx-community/BiRefNet_512x512-ONNX">BiRefNet</a> (MIT)</p>
<p><a href="${HUB}">web-free.site</a> · <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a></p>
</div></footer>
</body>
</html>`;
}

const pages = [
  {
    dir: "about",
    title: "About — Free Background Remover",
    description: "Browser-based background removal using BiRefNet (MIT). Based on Addy Osmani bg-remove.",
    pathname: "/about/",
    body: `<h1>About</h1>
<p>Free Background Remover runs <strong>BiRefNet</strong> (MIT, via onnx-community ONNX export) in your browser. No BRIA RMBG models.</p>
<p>Forked from <a href="https://github.com/addyosmani/bg-remove">bg-remove</a> (MIT) and Transformers.js.</p>`,
  },
  {
    dir: "privacy",
    title: "Privacy — Free Background Remover",
    description: "Images stay on your device. Local WebAssembly processing.",
    pathname: "/privacy/",
    body: `<h1>Privacy</h1><p>We do not receive image bytes. Ads may use cookies per Adsterra policy.</p>`,
  },
  {
    dir: "terms",
    title: "Terms — Free Background Remover",
    description: "Terms of use.",
    pathname: "/terms/",
    body: `<h1>Terms</h1><p>Provided as-is. You must have rights to images you edit. AI cut-outs may be imperfect.</p>`,
  },
  {
    dir: "contact",
    title: "Contact — Free Background Remover",
    description: "Contact via web-free.site.",
    pathname: "/contact/",
    body: `<h1>Contact</h1><p>Reach us through <a href="${HUB}">${HUB}</a>.</p>`,
  },
  {
    dir: "faq",
    title: "FAQ — Free Background Remover",
    description: "How to remove backgrounds free without uploading.",
    pathname: "/faq/",
    body: `<h1>FAQ</h1>
<h2>Is processing local?</h2><p>Yes — BiRefNet runs in the browser.</p>
<h2>Are edges perfect?</h2><p>Hair and glass can look rough; touch up after download.</p>
<p><a href="/">Open the tool</a></p>`,
    extraHead: `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is processing local?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. BiRefNet runs in your browser; images are not uploaded." },
        },
        {
          "@type": "Question",
          name: "Are edges perfect?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Not always. Fine hair and transparent objects may need manual touch-up.",
          },
        },
      ],
    })}</script>`,
  },
  {
    dir: "remove-background-no-upload",
    title: "Remove Background Without Uploading",
    description: "Client-side background removal — no server upload.",
    pathname: "/remove-background-no-upload/",
    body: `<h1>Remove image background without uploading</h1>
<p>Unlike cloud APIs, this tool keeps pixels on your machine using WebAssembly and the MIT-licensed BiRefNet model.</p>
<p><a href="/">Try it now</a></p>`,
  },
];

const frPage = page({
  title: "Supprimer l'arrière-plan gratuitement — dans le navigateur",
  description: "Outil gratuit. Traitement local, sans envoi sur serveur. PNG transparent.",
  pathname: "/fr/",
  hreflang: "fr",
  body: `<h1>Supprimer l'arrière-plan d'une image</h1>
<p><strong>Free Background Remover</strong> fonctionne entièrement dans votre navigateur (WebAssembly). Vos photos ne sont pas envoyées à nos serveurs.</p>
<p>Modèle par défaut : BiRefNet (licence MIT). Résultat : PNG transparent, téléchargement gratuit.</p>
<p><a href="/">Ouvrir l'outil en anglais →</a></p>`,
});

const root = path.join(process.cwd(), "public");
for (const p of pages) {
  const dir = path.join(root, p.dir);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "index.html"),
    page({
      title: p.title,
      description: p.description,
      pathname: p.pathname,
      body: p.body,
      extraHead: p.extraHead ?? "",
    }),
  );
}

fs.mkdirSync(path.join(root, "fr"), { recursive: true });
fs.writeFileSync(path.join(root, "fr", "index.html"), frPage);

console.log(`Generated ${pages.length + 1} static HTML pages under public/`);