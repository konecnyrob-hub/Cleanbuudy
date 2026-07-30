import Reveal from "./Reveal";
import ProductImage from "./ProductImage";
import { images } from "@/lib/product";

const surfaces = [
  {
    title: "Mechanické klávesnice",
    body: "Zvedne drobky a prach mezi klávesami, aniž by jedinou vypáčil.",
    img: images.product1,
    span: "sm:col-span-2",
    ratio: "16 / 10",
  },
  {
    title: "Notebooky",
    body: "Nízká hubice sklouzne podél pantu i ventilace.",
    img: images.product2,
    span: "",
    ratio: "4 / 3",
  },
  {
    title: "Herní sestavy",
    body: "I RGB si zaslouží scénu bez prachu.",
    img: images.product3,
    span: "",
    ratio: "4 / 3",
  },
  {
    title: "Po obědě u stolu",
    body: "Drobky z pečiva i sušenek zmizí dřív, než začne další hovor.",
    img: images.gallery1,
    span: "sm:col-span-2",
    ratio: "16 / 10",
  },
];

export default function Surfaces() {
  return (
    <section className="section bg-surface/50">
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Stvořený pro stůl</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight tracking-tight sm:text-5xl">
              Všude, kde den nechá nepořádek.
            </h2>
          </div>
          <p className="max-w-xs text-muted">
            Tvarovaný pro malá místa, kam se hadřík nedostane a velký vysavač
            nevejde.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {surfaces.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06} className={s.span}>
              <article className="group relative h-full overflow-hidden rounded-[2rem] border border-line-2">
                <ProductImage
                  src={s.img}
                  alt={s.title}
                  ratio={s.ratio}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-full"
                  imgClassName="transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-2xl tracking-tight text-white">{s.title}</h3>
                    <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-white/80">{s.body}</p>
                  </div>
                </ProductImage>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
