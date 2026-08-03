# Layout - Judah Imports

One-page, 12 dobras. Tema master dark; o tile Apple e a unica inversao clara da pagina.
Regra transversal: nenhuma familia de layout se repete em dobras consecutivas.

| # | Dobra | Arquetipo | Paleta local | Motion | Mobile | Reduced-motion |
|---|---|---|---|---|---|---|
| D1 | Hero | Split assimetrico 60/40 com foto full-bleed + scrim lateral | master | nenhuma de entrada (regra do framework) | stack vertical, scrim vertical | identico |
| D2 | Marquee de marcas | Kinetic marquee (unico da pagina) | master | CSS 40s linear, pausa no hover | mantem | grid estatico centralizado |
| D3 | Apple | Palco pinado com troca de 6 produtos | #F5F5F7 / #1D1D1F / #0071E3 | GSAP pin `start:'top top'`, `end:'+=300%'`, `scrub:0.8`, `anticipatePin:1`; progress dots | pilha vertical com videos rodando | grid estatico |
| D4 | Sony / PS5 | Horizontal-pan de 3 paineis | #08080B / #0070D1 | GSAP pan `x: -(scrollWidth-innerWidth)`, `scrub:1`, `invalidateOnRefresh`; parallax interno nos PNGs | `overflow-x:auto` + paineis empilhados | paineis empilhados |
| D5 | DJI | Parallax de 3 camadas sem pin | gradiente #0B0B0D→#16202E | GSAP scrub: ceu -10, scrim -22, drone -38 + rotacao -4→3 | 2 camadas, drone -16 | composicao estatica |
| D6 | Câmeras Sony | Split 6/5: janela de vídeo arredondada + texto | #0A0A0E master + hairline | vídeo em cena com IO play/pause; AOS | stack vertical, poster | poster |
| D7 | Samsung | Grade estilo samsung.com: card grande + 3 menores, brancos com sombra suave | #EFF0F2 claro (2a inversao, decisao do cliente) | AOS cascata; aurora pastel animada no card grande (desktop) | grade 1 coluna | aurora estatica |
| D7 | Vitrine | Bento 3x3 (celula grande 2x2 + 5 celulas), `grid-auto-flow: dense` | master | AOS stagger + hover lift | 1 coluna | sem stagger |
| D8 | Seminovos | Tabs + chips (lista longa nunca vira tabela) | master | crossfade CSS 250ms | tabs em scroll horizontal | idem |
| D9 | Como funciona | Timeline vertical estreita (720px) com linha SVG | master | CSS `animation-timeline: view()` + `@supports` fallback | identico | linha estatica |
| D10 | Showroom | Photo essay masonry 3 colunas | master | AOS stagger + hover scale | 2 colunas | sem stagger |
| D11 | CTA final | Band de alto contraste com leao em marca d'agua | #131316 + hairline dourado | AOS fade-up | identico | estatico |
| D12 | Footer | 3 colunas + legal | master | nenhuma | 1 coluna | identico |

## Contagens de controle (pre-flight)

- Eyebrows: 3 (D7, D8, D9), teto 4 para 12 dobras
- Marquee: 1
- Bento: 6 itens = 9 celulas de grade preenchidas (grande ocupa 4), zero buraco
- H1: 1 (hero), 2 linhas no desktop
- Familias de layout distintas: 12 (13 dobras)
- Inversoes de tema: 2 (tile Apple e tile Samsung, a segunda por decisao do cliente)
- Sombras no sistema: 2 (sob PNG de produto; cards do tile Samsung, escopada)

## Pendencias

- Video de unboxing com facade em D10 (aguardando export do Drive)
- B-roll de voo DJI opcional em D5 (`preload="none"`, poster obrigatorio)
- Endereco, CNPJ e horario no footer e no JSON-LD
