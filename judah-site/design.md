# Design System - Judah Imports

Dials: DESIGN_VARIANCE 7 / MOTION_INTENSITY 7 / VISUAL_DENSITY 3
Vibe: cold luxury + showroom fisico (cimento queimado, madeira, leao preto). Tema master dark unico, com UMA inversao clara deliberada (tile Apple).

## Paleta master (fundos sempre grafite frio, nada de creme/bege)

| Token | Valor | Uso |
|---|---|---|
| --bg-0 | #0B0B0D | canvas da pagina |
| --bg-1 | #131316 | superficie elevada 1 (cards, nav scrolled, banda CTA) |
| --bg-2 | #1C1C1F | superficie elevada 2 (chips, celulas bento) |
| --hairline | rgba(244,244,242,0.08) | divisores 1px |
| --text-0 | #F4F4F2 | headlines |
| --text-1 | #B9B9BE | corpo |
| --text-2 | #8A8A90 | muted, legal, logos marquee |
| --gold | #DAA521 | acento oficial Judah (da paleta do pack) |
| --gold-2 | #A57B0F | ponta escura do degrade oficial |
| --gold-hover | #E4B93E | hover |
| --gold-pressed | #B98D14 | active (+ scale 0.97) |
| --navy | #1B2F47 | tinta secundaria oficial (gradiente DJI puxa pra ca) |

Degrade oficial de CTA: linear-gradient(135deg, #A57B0F, #DAA521), texto #0B0B0D.
Verde WhatsApp #25D366: SOMENTE no icone dentro do pill.
Vermelho #D72D48 e azul #107CC4 oficiais: reservados a social media, NAO entram no site.

## Paletas locais por tile (escopo data-brand, nunca vazam)

| Tile | Fundo | Tinta | Acento local |
|---|---|---|---|
| apple | #F5F5F7 (UNICA inversao) | #1D1D1F | #0071E3 |
| sony | #08080B | #F4F4F2 / rgba(255,255,255,.7) | #0070D1 |
| dji | linear-gradient(#0B0B0D, #16202E) | #F4F4F2 | nenhum (foto faz a cor) |
| samsung | #EFF0F2 claro (2a inversao, decisao do cliente; benchmark samsung.com) | #17171A / #4A4A50 | nenhum (mono; CTA pill preto #101013, cards brancos com sombra 0 12px 40px rgba(23,23,26,.08)) |

## Tipografia

Geist (display/UI) 300 + 600, Manrope (body) 400. 1 request Google Fonts, 3 weights, display=swap.

| Token | Spec |
|---|---|
| display-xl | Geist 600, clamp(2.75rem, 6vw, 4.25rem), lh 1.05, ls -0.02em |
| display-air | Geist 300, clamp(2.25rem, 5vw, 3.5rem), lh 1.15, ls 0.01em (Sony, DJI) |
| display-lg | Geist 600, clamp(1.75rem, 3.5vw, 2.5rem), lh 1.1, ls -0.015em |
| title | Geist 600, 1.25rem, lh 1.3 |
| lead | Manrope 400, clamp(1.0625rem, 1.6vw, 1.25rem), lh 1.5 |
| body | Manrope 400, 1.0625rem (17px), lh 1.5 |
| caption | Manrope 400, 0.875rem |
| btn | Geist 600, 1rem, ls 0.01em |
| micro | Manrope 400, 0.75rem |

Eyebrow: Geist 600 11px uppercase tracking .18em, cor --gold. Maximo 3 na pagina (D7, D8, D9).

## Espaco e forma (Shape Lock)

- Base 8px. Secoes Judah: 96px desktop / 64px mobile. Tiles de marca: 80px interno, gap 0 entre tiles (a cor divide).
- Raios: tiles e full-bleed 0; cards/celulas 16px; TODO interativo pill 9999px. Nada intermediario.
- Sombra: ZERO em chrome. Unica sombra do sistema: 0 24px 60px rgba(0,0,0,.35) sob PNG de produto.
- Nav 64px, fundo rgba(11,11,13,.72) + backdrop blur(20px) saturate(160%) apenas quando scrolled (classe via IntersectionObserver de sentinela).
- Grain: pseudo fixo, opacity .04, pointer-events none.
- Curva padrao: cubic-bezier(0.32, 0.72, 0, 1). Hovers 500-700ms. Active: scale(0.97).

## Logos do pack (images/judah/)

- logo01 = icone leao (quadrado arredondado) | logo02 = horizontal icone + JUDAH Co. | logo03 = vertical | logo04 = wordmark
- Sufixo: sem sufixo = branco, A = navy #1D3148, B = preto.
- Nav e footer: logo02.png (branco). Favicon/watermark: logo01.png. CTA final: leao como marca d'agua opacity .06.

## Motion (GSAP so onde ha pin/scrub; CSS pro resto)

- Apple: pin + troca de 4 produtos, start 'top top', end '+=300%', scrub 0.8, anticipatePin 1. Mobile: scroll-snap. Reduced: grid estatico.
- Sony: horizontal-pan canonico 3 paineis, scrub 1, invalidateOnRefresh. Mobile: overflow-x + snap.
- DJI: parallax 3 camadas (ceu -10, scrim -22, drone -38 + rotation), sem pin. Mobile: 2 camadas leve.
- Samsung: sticky-stack canonico 3 cards, pinSpacing false, anterior scale .92 opacity .55. Mobile: AOS.
- Marquee: CSS puro, 40s, pausa hover, unico da pagina.
- Como funciona: linha SVG via CSS animation-timeline: view() + @supports fallback.
- prefers-reduced-motion: GSAP nem baixa; estados estaticos sao o default CSS.
