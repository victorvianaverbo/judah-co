/**
 * Dobra Sony/PS5: horizontal-pan canonico.
 * distance = scrollWidth - innerWidth; pin no wrap; scrub 1.
 */

export function init(gsap, ScrollTrigger) {
  const wrap = document.querySelector('.tile-sony .sony-wrap');
  const track = document.querySelector('.tile-sony .sony-track');
  if (!wrap || !track) return null;

  const tile = document.querySelector('.tile-sony');
  tile.classList.add('pan-active');

  const ctx = gsap.context(() => {
    gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: wrap,
        start: 'top top',
        end: () => '+=' + (track.scrollWidth - window.innerWidth),
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    // Parallax interno leve nos PNGs de produto
    gsap.utils.toArray('.painel-img', track).forEach((img) => {
      gsap.fromTo(img, { xPercent: -6 }, {
        xPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => '+=' + (track.scrollWidth - window.innerWidth),
          scrub: true
        }
      });
    });

    // Simbolos PlayStation em profundidade: cada camada anda numa fracao
    // da distancia do track, criando parallax durante o pan
    [['.sony-simbolos-fundo', 0.3], ['.sony-simbolos-frente', 0.55]].forEach(([sel, fator]) => {
      const camada = wrap.querySelector(sel);
      if (!camada) return;
      gsap.to(camada, {
        x: () => -(track.scrollWidth - window.innerWidth) * fator,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => '+=' + (track.scrollWidth - window.innerWidth),
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    });
  }, wrap);

  return () => {
    ctx.revert();
    tile.classList.remove('pan-active');
  };
}
