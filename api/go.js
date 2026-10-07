// Go-Link für Instagram-Bio und Co: shinywrks.de/go (Rewrite in vercel.json).
// Normale Browser werden direkt weitergeleitet. In In-App-Browsern (Instagram, Threads, Facebook, TikTok …)
// versucht die Seite einmal, den Besucher in den eigenen Browser zu schicken, und bietet sonst einen Knopf an.
//
// Stand Oktober 2026 (plugwith.me, auf echten iPhones geprüft):
// - Instagram iOS: nur instagram://extbrowser/ als Meta-Refresh im HTML, ein Skript-Redirect wird verschluckt.
//   Danach fragt Instagram einmal, ob der Link außerhalb geöffnet werden soll.
// - Facebook iOS: x-safari-https:// nach einem Tipp auf den Knopf.
// - TikTok iOS: lässt nichts durch, dort bleibt nur der Hinweis aufs Menü.
// - Android: intent:// mit Chrome und Fallback-URL.
// Nichts davon ist eine offizielle Schnittstelle. Immer nur ein automatischer Versuch, damit nie zwei Browser aufgehen.

const DEFAULT_HOST = 'shinywrks.de';

function targetUrl(req) {
  const host = /^[a-z0-9.-]+(:\d+)?$/i.test(req.headers.host || '') ? req.headers.host : DEFAULT_HOST;
  const to = new URL(req.url, 'http://x').searchParams.get('to') || '/';
  // Nur eigene Pfade, keine fremden Ziele (kein Open Redirect)
  const path = /^\/(?!\/)[\w\-./#]*$/.test(to) ? to : '/';
  return `https://${host}${path}`;
}

function detect(ua) {
  const ios = /iPhone|iPad|iPod/i.test(ua);
  const android = /Android/i.test(ua);
  let app = null;
  if (/Barcelona/i.test(ua)) app = 'threads';
  else if (/Instagram/i.test(ua)) app = 'instagram';
  else if (/FBAN|FBAV|FB_IAB|FBIOS|Messenger/i.test(ua)) app = 'facebook';
  else if (/musical_ly|BytedanceWebview|TikTok/i.test(ua)) app = 'tiktok';
  else if (/LinkedInApp/i.test(ua)) app = 'linkedin';
  else if (/Snapchat/i.test(ua)) app = 'snapchat';
  return { ios, android, app };
}

function escapeUrl(target, { ios, android, app }) {
  const enc = encodeURIComponent(target);
  if (android) {
    const u = new URL(target);
    return `intent://${u.host}${u.pathname}${u.search}${u.hash}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${enc};end`;
  }
  if (ios && app === 'instagram') return `instagram://extbrowser/?url=${enc}`;
  if (ios && app === 'threads') return `barcelona://extbrowser/?url=${enc}`;
  if (ios) return `x-safari-${target}`;
  return target;
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function page(target, escape, autoEscape, app) {
  const tiktokHint = app === 'tiktok';
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${autoEscape ? `<meta http-equiv="refresh" content="0;url=${esc(escape)}">` : ''}
<title>shinywrks</title>
<meta name="robots" content="noindex">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&family=Space+Mono&display=swap" rel="stylesheet">
<style>
  body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #F5F3EF; color: #1A1209; font-family: 'Space Grotesk', sans-serif; }
  main { padding: 32px 24px; max-width: 360px; text-align: center; }
  h1 { font-weight: 500; font-size: 40px; letter-spacing: -0.03em; margin: 0 0 12px; color: #0D0B08; }
  p { font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 0.06em; line-height: 1.7; color: #3D3428; margin: 0 0 24px; }
  a.btn { display: block; font-family: 'Space Mono', monospace; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; text-decoration: none; color: #F5F3EF; background: #0D0B08; padding: 16px 20px; margin-bottom: 14px; }
  a.alt { font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 0.06em; color: #3D3428; }
</style>
</head>
<body>
<main>
  <h1>shinywrks</h1>
  <p>${tiktokHint
    ? 'Tippe oben rechts auf ••• und wähle „Im Browser öffnen“.<br>Tap ••• top right and choose “Open in browser”.'
    : 'Für die volle Seite mit Videos und Ton im Browser öffnen.<br>Open in your browser for the full site.'}</p>
  ${tiktokHint ? '' : `<a class="btn" href="${esc(escape)}">Im Browser öffnen</a>`}
  <a class="alt" href="${esc(target)}">Hier weiter ansehen →</a>
</main>
</body>
</html>`;
}

export default function handler(req, res) {
  const ua = req.headers['user-agent'] || '';
  const target = targetUrl(req);
  const env = detect(ua);
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Vary', 'User-Agent');

  if (!env.app) {
    res.statusCode = 302;
    res.setHeader('Location', target);
    res.end();
    return;
  }

  const escape = escapeUrl(target, env);
  // Ein automatischer Versuch nur dort, wo er belegt ist; sonst wartet die Seite auf den Tipp.
  const autoEscape = env.android || (env.ios && (env.app === 'instagram' || env.app === 'threads'));
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(page(target, escape, autoEscape && env.app !== 'tiktok', env.app));
}
