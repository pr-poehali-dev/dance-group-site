import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const MEMBERS = [
  {
    id: 1,
    name: "Алина Соколова",
    role: "Художественный руководитель",
    style: "Современная хореография",
    bio: "Алина основала группу NOVA в 2018 году после 12 лет профессиональных выступлений в Москве и Берлине. Её стиль — слияние контемпорари с элементами театра движения.",
    years: "12 лет опыта",
    img: "https://cdn.poehali.dev/projects/f6319ffd-de81-46ec-8b17-de42b81af3bf/files/40f73bbc-9206-4350-a48d-b7afb0ee01ec.jpg",
    tag: "ОСНОВАТЕЛЬ",
  },
  {
    id: 2,
    name: "Дмитрий Волков",
    role: "Ведущий танцор",
    style: "Hip-hop / Breakdance",
    bio: "Чемпион России по брейк-дансу 2020 года. Дмитрий привносит в постановки группы уличную энергию и акробатическую технику, создавая невероятный контраст со сценическим стилем.",
    years: "8 лет опыта",
    img: "https://cdn.poehali.dev/projects/f6319ffd-de81-46ec-8b17-de42b81af3bf/files/7258f76a-7238-42eb-a680-8bf7e2bc59be.jpg",
    tag: "ЧЕМПИОН",
  },
  {
    id: 3,
    name: "Мария Лебедева",
    role: "Солистка",
    style: "Балет / Джаз-фанк",
    bio: "Выпускница Академии Русского балета им. Вагановой. Мария соединяет академическую строгость классики с живой экспрессией джаза, создавая собственный неповторимый язык движения.",
    years: "10 лет опыта",
    img: "https://cdn.poehali.dev/projects/f6319ffd-de81-46ec-8b17-de42b81af3bf/files/14baa2e7-5658-4d85-b7f6-bb52e1849f12.jpg",
    tag: "СОЛИСТКА",
  },
];

const GALLERY = [
  {
    id: 1,
    type: "photo",
    src: "https://cdn.poehali.dev/projects/f6319ffd-de81-46ec-8b17-de42b81af3bf/files/b2115a3f-57f9-4426-a671-b22399b0d408.jpg",
    caption: "Гала-концерт 2024",
  },
  {
    id: 2,
    type: "photo",
    src: "https://cdn.poehali.dev/projects/f6319ffd-de81-46ec-8b17-de42b81af3bf/files/719326ab-48b3-4ab2-b978-29a05b94d151.jpg",
    caption: "Репетиция «Эхо»",
  },
  {
    id: 3,
    type: "video",
    src: "https://cdn.poehali.dev/projects/f6319ffd-de81-46ec-8b17-de42b81af3bf/files/ac9b599e-9446-42ea-96e9-0a826c6064cb.jpg",
    caption: "Премьера «NOVA Live»",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: 4,
    type: "photo",
    src: "https://cdn.poehali.dev/projects/f6319ffd-de81-46ec-8b17-de42b81af3bf/files/ce27b0d3-2386-471a-a3d4-1e2bc175f2f5.jpg",
    caption: "За кулисами",
  },
];

const MARQUEE_WORDS = ["ДВИЖЕНИЕ", "ЭНЕРГИЯ", "РИТМ", "СТРАСТЬ", "NOVA", "ТАНЕЦ", "ИСКУССТВО", "СЦЕНА"];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (dot.current) { dot.current.style.left = e.clientX - 4 + "px"; dot.current.style.top = e.clientY - 4 + "px"; }
      if (ring.current) { ring.current.style.left = e.clientX - 16 + "px"; ring.current.style.top = e.clientY - 16 + "px"; }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div ref={dot} className="custom-cursor hidden md:block" />
      <div ref={ring} className="custom-cursor-ring hidden md:block" />
    </>
  );
}

function Nav({ active, setActive }: { active: string; setActive: (s: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { id: "hero", label: "Главная" },
    { id: "about", label: "О группе" },
    { id: "members", label: "Участники" },
    { id: "gallery", label: "Галерея" },
  ];

  const scrollTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/90 backdrop-blur-md border-b border-white/5" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="font-display text-2xl font-bold tracking-[0.3em] text-gold">
          NOVA
        </button>
        <div className="hidden md:flex items-center gap-10">
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className={`font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-200 ${active === l.id ? "text-gold" : "text-white/50 hover:text-white"}`}
            >
              {l.label}
            </button>
          ))}
        </div>
        <button className="hidden md:block font-mono text-xs tracking-[0.2em] uppercase border border-gold text-gold px-5 py-2 hover:bg-gold hover:text-black transition-all duration-200">
          Связаться
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/f6319ffd-de81-46ec-8b17-de42b81af3bf/files/b2115a3f-57f9-4426-a671-b22399b0d408.jpg)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 pt-32">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
          <p className="font-mono text-xs tracking-[0.4em] text-gold uppercase mb-6">Танцевальная группа · Основана 2018</p>
        </div>
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
          <h1 className="font-display text-[clamp(80px,15vw,200px)] font-bold leading-none tracking-[-0.02em] text-white">
            NOVA
          </h1>
        </div>
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
          <p className="font-display text-[clamp(18px,3vw,36px)] font-light italic text-white/60 mt-2 mb-10 max-w-lg">
            Когда тело становится языком, а сцена — вселенной
          </p>
        </div>
        <div className="opacity-0 animate-fade-up flex flex-wrap gap-4" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
          <button
            onClick={() => document.getElementById("members")?.scrollIntoView({ behavior: "smooth" })}
            className="font-mono text-xs tracking-[0.2em] uppercase bg-gold text-black px-8 py-4 hover:bg-white transition-all duration-300 font-medium"
          >
            Участники
          </button>
          <button
            onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
            className="font-mono text-xs tracking-[0.2em] uppercase border border-white/30 text-white px-8 py-4 hover:border-gold hover:text-gold transition-all duration-300"
          >
            Галерея
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-16 bg-white animate-float" />
        <p className="font-mono text-[10px] tracking-[0.3em] text-white rotate-90 origin-center mt-4">SCROLL</p>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="overflow-hidden bg-gold py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
          <span key={i} className="font-display font-bold text-black text-sm tracking-[0.3em] mx-8">
            {w} <span className="text-black/30">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  const { ref, inView } = useInView();
  return (
    <section id="about" ref={ref} className="py-32 max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-20 items-center">
        <div>
          <p className={`font-mono text-xs tracking-[0.4em] text-gold uppercase mb-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            О группе
          </p>
          <h2 className={`font-display text-[clamp(40px,6vw,80px)] font-bold leading-none text-white mb-8 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            МЫ — <br /><span className="text-gold italic">ДВИЖЕНИЕ</span>
          </h2>
          <div className={`section-line mb-8 transition-all duration-1000 delay-200 ${inView ? "opacity-100" : "opacity-0"}`} />
          <p className={`font-body text-white/60 leading-relaxed text-lg mb-6 transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            NOVA — это не просто танцевальная группа. Это исследование границ человеческого тела, эмоций и пространства. Мы создаём постановки, которые невозможно забыть.
          </p>
          <p className={`font-body text-white/40 leading-relaxed transition-all duration-700 delay-400 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            За шесть лет работы мы выступили на более чем 80 сценах, от камерных залов до международных фестивалей. Наш стиль — это диалог между классикой и современностью.
          </p>
        </div>
        <div className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
          {[["80+", "Выступлений"], ["6", "Лет на сцене"], ["3", "Участника"], ["12", "Наград"]].map(([num, label]) => (
            <div key={label} className="border border-white/10 p-8 hover:border-gold/50 transition-all duration-300 group">
              <p className="font-display text-5xl font-bold text-gold group-hover:scale-110 transition-transform duration-300 origin-left">{num}</p>
              <p className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase mt-2">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Members() {
  const { ref, inView } = useInView(0.1);
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="members" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className={`mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="font-mono text-xs tracking-[0.4em] text-gold uppercase mb-4">Команда</p>
          <h2 className="font-display text-[clamp(36px,5vw,72px)] font-bold text-white leading-none">
            УЧАСТНИКИ
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-1">
          {MEMBERS.map((m, i) => (
            <div
              key={m.id}
              className={`member-card relative overflow-hidden cursor-pointer group transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${i * 150}ms` }}
              onClick={() => setActive(active === m.id ? null : m.id)}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="font-mono text-[10px] tracking-[0.3em] bg-gold text-black px-2 py-1">{m.tag}</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-mono text-xs tracking-[0.2em] text-gold/70 uppercase mb-1">{m.role}</p>
                <h3 className="font-display text-2xl font-bold text-white mb-1">{m.name}</h3>
                <p className="font-mono text-xs text-white/40">{m.style}</p>
              </div>

              <div className="member-overlay absolute inset-0 bg-black/85 flex flex-col justify-center p-8">
                <p className="font-mono text-[10px] tracking-[0.3em] text-gold uppercase mb-4">{m.years}</p>
                <p className="font-body text-white/80 leading-relaxed text-sm mb-6">{m.bio}</p>
                <div className="w-8 h-px bg-gold" />
              </div>
            </div>
          ))}
        </div>

        <p className="font-mono text-xs text-white/20 tracking-[0.2em] text-center mt-8 uppercase">
          Нажмите на карточку, чтобы узнать больше
        </p>
      </div>
    </section>
  );
}

function Gallery() {
  const { ref, inView } = useInView(0.1);
  const [lightbox, setLightbox] = useState<null | typeof GALLERY[0]>(null);

  return (
    <section id="gallery" className="py-32 max-w-7xl mx-auto px-6" ref={ref}>
      <div className={`mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <p className="font-mono text-xs tracking-[0.4em] text-gold uppercase mb-4">Портфолио</p>
        <h2 className="font-display text-[clamp(36px,5vw,72px)] font-bold text-white leading-none">ГАЛЕРЕЯ</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {GALLERY.map((item, i) => (
          <div
            key={item.id}
            className={`relative overflow-hidden cursor-pointer group transition-all duration-700 ${i === 0 ? "md:col-span-2 md:row-span-2" : ""} ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            style={{ transitionDelay: `${i * 100}ms` }}
            onClick={() => setLightbox(item)}
          >
            <div className={`overflow-hidden ${i === 0 ? "aspect-square" : "aspect-square"}`}>
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
                {item.type === "video" ? (
                  <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center">
                    <Icon name="Play" size={20} className="text-white ml-1" />
                  </div>
                ) : (
                  <Icon name="ZoomIn" size={28} className="text-white" />
                )}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
              <p className="font-mono text-xs text-white/80 tracking-[0.1em]">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
            <Icon name="X" size={28} />
          </button>
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.caption} className="w-full max-h-[80vh] object-contain" />
            <p className="font-mono text-xs text-white/40 tracking-[0.2em] text-center mt-4 uppercase">{lightbox.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <p className="font-display text-3xl font-bold text-gold tracking-[0.3em] mb-2">NOVA</p>
          <p className="font-mono text-xs text-white/30 tracking-[0.2em]">ТАНЦЕВАЛЬНАЯ ГРУППА · С 2018</p>
        </div>
        <div className="flex gap-6">
          {["Instagram", "YouTube", "VK"].map(s => (
            <button key={s} className="font-mono text-xs tracking-[0.2em] text-white/30 hover:text-gold transition-colors uppercase">
              {s}
            </button>
          ))}
        </div>
        <p className="font-mono text-xs text-white/20 tracking-[0.1em]">© 2024 NOVA. Все права защищены</p>
      </div>
    </footer>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.5 }
    );
    ["hero", "about", "members", "gallery"].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Cursor />
      <Nav active={activeSection} setActive={setActiveSection} />
      <Hero />
      <Marquee />
      <About />
      <Members />
      <Gallery />
      <Footer />
    </div>
  );
}
