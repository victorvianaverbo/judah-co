/**
 * Entry do motion: importa GSAP + ScrollTrigger via CDN (+esm)
 * e registra as coreografias por breakpoint com gsap.matchMedia.
 * Pins so existem em >=768px. DJI roda em todo lugar (leve).
 *
 * Os modulos sao importados ANTES do matchMedia de proposito: um callback
 * async devolve Promise em vez de funcao de cleanup, e o que for criado
 * depois de um await fica fora do contexto que o GSAP reverte no resize.
 */

export async function initMotion() {
  const [{ gsap }, { ScrollTrigger }, apple, sony, dji] = await Promise.all([
    import('https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm'),
    import('https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm'),
    import('/judah-site/motion/apple-pin.js'),
    import('/judah-site/motion/sony-pan.js'),
    import('/judah-site/motion/dji-parallax.js')
  ]);

  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  // Pins e pan: apenas desktop. Sai do breakpoint, o GSAP reverte tudo.
  mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
    const cleanups = [
      apple.init(gsap, ScrollTrigger),
      sony.init(gsap, ScrollTrigger)
    ];
    return () => cleanups.forEach((fn) => fn && fn());
  });

  // Parallax do DJI roda nos dois breakpoints, com intensidades diferentes.
  mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
    return dji.init(gsap, ScrollTrigger, { mobile: false });
  });

  mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
    return dji.init(gsap, ScrollTrigger, { mobile: true });
  });
}
