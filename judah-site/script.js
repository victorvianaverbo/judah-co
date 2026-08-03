/**
 * Judah Imports - script principal
 * Nav, AOS, links de WhatsApp, tabs de seminovos e loader do motion (GSAP).
 * Regra: nenhum listener de scroll; sentinelas com IntersectionObserver.
 */

const WA_BASE = 'https://wa.me/5531998085184';

document.addEventListener('DOMContentLoaded', () => {
  // O que afeta o primeiro paint roda ja; o resto vai em tarefas curtas
  // separadas para nenhuma passar de ~50ms (TBT em celular fraco).
  initNav();
  initYear();

  const idle = window.requestIdleCallback ? (fn) => window.requestIdleCallback(fn, { timeout: 1500 }) : (fn) => setTimeout(fn, 1);
  idle(() => initWhatsAppLinks());
  idle(() => initTabs());
  idle(() => initAOS());
  idle(() => initMotionLoader());
  idle(() => initPosters());
  idle(() => initVideosDeProduto());
});

/* ==========================================
   POSTERS: atributo poster nao e lazy e disputa
   banda com o hero no carregamento. Entra por
   IntersectionObserver quando a dobra se aproxima.
   ========================================== */

function initPosters() {
  const videos = document.querySelectorAll('video[data-poster]');
  if (!videos.length) return;

  const aplica = (v) => {
    if (v.dataset.poster) {
      v.poster = v.dataset.poster;
      delete v.dataset.poster;
    }
  };

  if (!('IntersectionObserver' in window)) {
    videos.forEach(aplica);
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      aplica(e.target);
      obs.unobserve(e.target);
    });
  }, { rootMargin: '900px 0px' });

  videos.forEach((v) => obs.observe(v));
}

/* ==========================================
   NAV: fundo frosted apos sair do topo
   ========================================== */

function initNav() {
  const nav = document.querySelector('.nav');
  const sentinel = document.getElementById('nav-sentinel');
  if (!nav || !sentinel) return;

  const obs = new IntersectionObserver(([entry]) => {
    nav.classList.toggle('scrolled', !entry.isIntersecting);
  }, { rootMargin: '32px 0px 0px 0px' });

  obs.observe(sentinel);

  // Menu mobile
  const toggle = nav.querySelector('.nav-toggle');
  if (!toggle) return;

  const fecha = () => {
    nav.classList.remove('menu-aberto');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  };

  toggle.addEventListener('click', () => {
    const abrindo = !nav.classList.contains('menu-aberto');
    nav.classList.toggle('menu-aberto', abrindo);
    toggle.setAttribute('aria-expanded', abrindo ? 'true' : 'false');
    toggle.setAttribute('aria-label', abrindo ? 'Fechar menu' : 'Abrir menu');
  });

  nav.querySelectorAll('.nav-links a').forEach((a) => a.addEventListener('click', fecha));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecha();
  });
}

/* ==========================================
   AOS
   ========================================== */

function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      once: true,
      offset: 50,
      easing: 'ease-out-cubic',
      disableMutationObserver: true
    });
  }
}

/* ==========================================
   WHATSAPP: monta href com mensagem contextual
   ========================================== */

function initWhatsAppLinks() {
  document.querySelectorAll('[data-wa-msg]').forEach((el) => {
    el.href = WA_BASE + '?text=' + encodeURIComponent(el.dataset.waMsg);
  });

  document.querySelectorAll('.chip[data-modelo]').forEach((el) => {
    const msg = 'Olá! Vim pelo site e quero um seminovo Apple. Tenho interesse em: ' + el.dataset.modelo + '.';
    el.href = WA_BASE + '?text=' + encodeURIComponent(msg);
  });
}

/* ==========================================
   TABS de seminovos
   ========================================== */

function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  const paineis = document.querySelectorAll('.tab-painel');
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.toggle('on', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });
      paineis.forEach((p) => {
        p.classList.toggle('on', p.dataset.painel === tab.dataset.tab);
      });
    });
  });
}

/* ==========================================
   ANO no footer
   ========================================== */

function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ==========================================
   VIDEOS DE PRODUTO: play so quando visivel,
   pause fora da viewport, nunca com reduced-motion
   (ficam no poster, que e o proprio render).
   ========================================== */

function initVideosDeProduto() {
  const videos = document.querySelectorAll('video[data-produto]');
  if (!videos.length) return;

  // Celular tambem toca: o custo e controlado por preload="none" + IO,
  // entao so baixa o loop da dobra que o dedo alcancou (0,2 a 1,4MB).
  const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  let obs = null;
  const visiveis = new Set();
  let esperandoGesto = false;

  // Safari em Modo de Baixo Consumo recusa autoplay. O primeiro toque do
  // usuario libera: dai em diante o que estiver na tela volta a rodar.
  const destravarNoGesto = () => {
    if (esperandoGesto) return;
    esperandoGesto = true;
    const solta = () => {
      esperandoGesto = false;
      document.removeEventListener('touchstart', solta);
      document.removeEventListener('click', solta);
      visiveis.forEach((v) => v.play().catch(() => {}));
    };
    document.addEventListener('touchstart', solta, { once: true, passive: true });
    document.addEventListener('click', solta, { once: true });
  };

  const desliga = () => {
    if (obs) { obs.disconnect(); obs = null; }
    visiveis.clear();
    videos.forEach((v) => v.pause());
  };

  const avalia = () => {
    if (mqReduce.matches) { desliga(); return; }
    if (obs) return;
    obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const v = e.target;
        if (e.isIntersecting) {
          visiveis.add(v);
          v.play().catch(destravarNoGesto);
        } else {
          visiveis.delete(v);
          v.pause();
        }
      });
    }, { rootMargin: '120px 0px' });
    videos.forEach((v) => obs.observe(v));
  };

  // Se o usuario ligar/desligar animacoes do sistema com a pagina aberta,
  // o comportamento acompanha sem precisar recarregar.
  mqReduce.addEventListener('change', avalia);
  avalia();
}

/* ==========================================
   MOTION: GSAP so baixa quando a primeira dobra
   animada se aproxima, e nunca com reduced-motion.
   ========================================== */

function initMotionLoader() {
  const alvo = document.getElementById('apple');
  if (!alvo) return;

  const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  let armado = false;

  const arma = () => {
    if (armado || mqReduce.matches) return;
    armado = true;
    const obs = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      obs.disconnect();
      import('/judah-site/motion/judah-motion.js?v=2')
        .then((mod) => mod.initMotion())
        .catch(() => { /* CDN indisponivel: a pagina segue 100% funcional estatica */ });
    }, { rootMargin: '600px 0px' });
    obs.observe(alvo);
  };

  // Usuario ligou as animacoes do sistema com a pagina aberta: arma na hora.
  mqReduce.addEventListener('change', arma);
  arma();
}
