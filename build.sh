#!/bin/bash
# Gera public/index.html a partir dos arquivos desta pasta (um único arquivo, sem dependências de build).
cd "$(dirname "$0")"
OUT=../public/index.html
{
echo '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="robots" content="noindex"><title>Soldados Socorristas</title>'
echo '<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;800&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">'
echo '<style>'; cat style.css; echo '</style></head><body>'
echo '<div id="root"></div><div id="toasts" class="toasts" aria-live="polite"></div><div id="modal"></div>'
echo '<script>'
for f in mods_a.js mods_b.js sims_a.js sims_b.js data.js core.js icons.js art_chars.js art_scene.js auth.js run.js ui_s.js ui_a.js main.js; do cat $f; echo; done
echo '</script></body></html>'
} > $OUT
wc -c $OUT
