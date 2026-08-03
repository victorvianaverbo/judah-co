/**
 * Dobra DJI: a cena de video full-bleed ganha parallax leve no scroll
 * (o movimento interno vem do proprio video). Mobile: versao reduzida.
 */

export function init(gsap, ScrollTrigger, opts = {}) {
  const secao = document.querySelector('.tile-dji');
  if (!secao) return null;

  const ceu = secao.querySelector('.dji-ceu');
  const scrim = secao.querySelector('.dji-scrim');
  const drone = secao.querySelector('.dji-drone');
  const mobile = !!opts.mobile;

  const ctx = gsap.context(() => {
    const st = {
      trigger: secao,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    };

    if (ceu) gsap.fromTo(ceu, { yPercent: 5 }, { yPercent: mobile ? -4 : -10, ease: 'none', scrollTrigger: st });
    if (!mobile && scrim) gsap.fromTo(scrim, { yPercent: 6 }, { yPercent: -22, ease: 'none', scrollTrigger: st });
    if (drone) {
      gsap.fromTo(drone,
        { yPercent: mobile ? 10 : 24, rotation: -4 },
        { yPercent: mobile ? -16 : -38, rotation: 3, ease: 'none', scrollTrigger: st });

      // Flutuacao continua de voo, somada ao parallax do scroll
      // (y em px compoe com o yPercent do scrub sem conflito)
      gsap.to(drone, {
        y: mobile ? 6 : 10,
        duration: 2.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    }
  }, secao);

  return () => ctx.revert();
}
