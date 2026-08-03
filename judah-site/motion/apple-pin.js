/**
 * Dobra Apple: palco pinado com 4 produtos que trocam no scroll.
 * Padrao canonico: start 'top top', pin true, scrub, anticipatePin 1.
 */

export function init(gsap, ScrollTrigger) {
  const secao = document.querySelector('.tile-apple .apple-pin');
  const stage = document.getElementById('apple-stage');
  if (!secao || !stage) return null;

  const tile = document.querySelector('.tile-apple');
  tile.classList.add('pin-active');

  const itens = gsap.utils.toArray('.apple-item', stage);
  const dots = gsap.utils.toArray('.apple-progress i', stage);

  const ctx = gsap.context(() => {
    gsap.set(itens, { opacity: 0, scale: 1.06, yPercent: 6 });
    gsap.set(itens[0], { opacity: 1, scale: 1, yPercent: 0 });

    // duracao total da timeline: cada troca ocupa 1 unidade a partir de 1
    const fim = itens.length - 1 + 0.47;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: secao,
        start: 'top top',
        end: () => '+=' + ((itens.length - 1) * 100) + '%',
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate(self) {
          // o dot segue a posicao real da timeline, nao o progresso bruto
          const t = self.progress * fim;
          let idx = 0;
          for (let i = 1; i < itens.length; i++) if (t >= i + 0.24) idx = i;
          dots.forEach((d, i) => d.classList.toggle('on', i === idx));
        }
      }
    });

    itens.forEach((item, i) => {
      if (i === 0) return;
      const pos = i;
      tl.to(itens[i - 1], { opacity: 0, scale: 0.94, yPercent: -6, duration: 0.35, ease: 'none' }, pos)
        .fromTo(item, { opacity: 0, scale: 1.06, yPercent: 6 }, { opacity: 1, scale: 1, yPercent: 0, duration: 0.35, ease: 'none' }, pos + 0.12);
    });

    // trava a duracao total para o calculo do dot bater com a animacao
    tl.to({}, { duration: 0.01 }, fim);
  }, secao);

  return () => {
    ctx.revert();
    tile.classList.remove('pin-active');
  };
}
