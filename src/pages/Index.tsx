import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const MEMBERS = [
  {
    id: 1,
    name: "Мария Магола",
    role: "Участница дуэта · Хореограф",
    style: "Любительские танцы / K-pop",
    bio: "Мария родилась 11 мая 2009 года. Танцует уже почти 10 лет — начинала в группе «Микс» под руководством Н.В. Волковой. В дуэте «Он-лайн» выступает хореографом: именно она придумывает движения и составляет постановки. Подруги с детского сада — их 13-летняя дружба с Дарьей стала основой общего творчества.",
    years: "Род. 11.05.2009",
    img: "https://cdn.poehali.dev/projects/f6319ffd-de81-46ec-8b17-de42b81af3bf/bucket/9bf6397f-6bab-4d64-81c8-e89e65b390af.jpg",
    tag: "ДУЭТ",
  },
  {
    id: 2,
    name: "Дарья Деткова",
    role: "Участница дуэта · Будущий хореограф",
    style: "Любительские танцы / Авторская хореография",
    bio: "Дарья родилась 11 мая 2006 года. Дружит с Марией уже 13 лет — с самого детского сада, и именно эта дружба привела их к общему хобби. Мечтает стать профессиональным хореографом и планирует поступить на специальность в будущем. В 2025 году дуэт показал её первую совместную постановку на конкурсе «Подари минуту радости».",
    years: "Род. 11.05.2006",
    img: "https://cdn.poehali.dev/projects/f6319ffd-de81-46ec-8b17-de42b81af3bf/bucket/dcf44061-b030-49a3-a9e3-80b01c70a223.jpg",
    tag: "ДУЭТ",
  },
];

const GALLERY = [
  {
    id: 1,
    type: "photo",
    src: "https://cdn.poehali.dev/projects/f6319ffd-de81-46ec-8b17-de42b81af3bf/bucket/38818009-a0c7-407a-97e7-cb4da4b3557f.jpg",
    caption: "Дуэт «Он-лайн» — фото из соц. сетей",
  },
  {
    id: 2,
    type: "photo",
    src: "https://cdn.poehali.dev/projects/f6319ffd-de81-46ec-8b17-de42b81af3bf/bucket/b6bf5a11-b3d5-40e7-aa55-6a56db7290f6.jpg",
    caption: "Образ для выступления «По горкам по горам»",
  },
  {
    id: 3,
    type: "photo",
    src: "https://cdn.poehali.dev/projects/f6319ffd-de81-46ec-8b17-de42b81af3bf/bucket/3fcedb28-fef8-4489-aaf3-d9fb6713092b.jpg",
    caption: "Конкурс «Подари минуту радости»",
  },
  {
    id: 4,
    type: "photo",
    src: "https://cdn.poehali.dev/projects/f6319ffd-de81-46ec-8b17-de42b81af3bf/bucket/a52cd1b5-5748-44b5-a482-103231b80208.jpg",
    caption: "За кулисами с руководителем",
  },
  {
    id: 5,
    type: "photo",
    src: "https://cdn.poehali.dev/projects/f6319ffd-de81-46ec-8b17-de42b81af3bf/bucket/00da5ce2-e82c-4df4-aa8b-e714cd4a792b.jpg",
    caption: "За кулисами — дуэт «Он-лайн»",
  },
];

const MARQUEE_WORDS = ["ДВИЖЕНИЕ", "ЭНЕРГИЯ", "РИТМ", "ОН-ЛАЙН", "БИРЮСИНСК", "ТАНЕЦ", "НАДЕЖДА", "СЦЕНА"];

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
          ОН-ЛАЙН
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
        style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/f6319ffd-de81-46ec-8b17-de42b81af3bf/bucket/38818009-a0c7-407a-97e7-cb4da4b3557f.jpg)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 pt-32">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
          <p className="font-mono text-xs tracking-[0.4em] text-gold uppercase mb-6">Танцевальный дуэт · г. Бирюсинск · с 2023</p>
        </div>
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
          <h1 className="font-display text-[clamp(60px,12vw,180px)] font-bold leading-none tracking-[-0.02em] text-white">
            ОН-ЛАЙН
          </h1>
        </div>
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
          <p className="font-display text-[clamp(18px,3vw,36px)] font-light italic text-white/60 mt-2 mb-10 max-w-lg">
            Две девушки. Одна страсть. Бесконечный танец.
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

function Friendship() {
  const { ref, inView } = useInView(0.2);
  return (
    <section ref={ref} className="py-20 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex flex-col md:flex-row items-center gap-10 md:gap-20 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex-shrink-0">
            <div className="relative w-48 h-48 md:w-56 md:h-56">
              <img
                src="https://cdn.poehali.dev/projects/f6319ffd-de81-46ec-8b17-de42b81af3bf/bucket/38818009-a0c7-407a-97e7-cb4da4b3557f.jpg"
                alt="Маша и Даша"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute -bottom-3 -right-3 bg-gold text-black font-display font-bold text-2xl px-4 py-2 leading-none">
                13
              </div>
            </div>
          </div>
          <div>
            <p className="font-mono text-xs tracking-[0.4em] text-gold uppercase mb-4">История дружбы</p>
            <h2 className="font-display text-[clamp(28px,4vw,56px)] font-bold text-white leading-tight mb-5">
              ВМЕСТЕ С <span className="text-gold italic">ДЕТСКОГО САДА</span>
            </h2>
            <p className="font-body text-white/70 text-lg leading-relaxed max-w-2xl">
              Маша и Даша дружат уже <span className="text-gold font-semibold">13 лет</span> — с самого первого дня в детском саду. Годы шли, дружба крепла, и однажды две подруги поняли: у них одно сердце и одна страсть — танец. Именно эта дружба стала фундаментом дуэта «Он-лайн», где нет руководителя, зато есть полное доверие друг к другу.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ref, inView } = useInView();
  return (
    <section id="about" ref={ref} className="py-32 max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-20 items-center">
        <div>
          <p className={`font-mono text-xs tracking-[0.4em] text-gold uppercase mb-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            О дуэте
          </p>
          <h2 className={`font-display text-[clamp(40px,6vw,80px)] font-bold leading-none text-white mb-8 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            МЫ — <br /><span className="text-gold italic">ОН-ЛАЙН</span>
          </h2>
          <div className={`section-line mb-8 transition-all duration-1000 delay-200 ${inView ? "opacity-100" : "opacity-0"}`} />
          <p className={`font-body text-white/60 leading-relaxed text-lg mb-6 transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Мария и Дарья — танцевальный дуэт из Бирюсинска. Занимаются в Доме кино и культуры «Надежда», начинали в группе «Микс» Н.В. Волковой. В конце 2023 года создали собственный дуэт, где всё держится на взаимной договорённости и любви к танцу.
          </p>
          <p className={`font-body text-white/40 leading-relaxed transition-all duration-700 delay-400 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Дебют — 18 февраля 2024 года: танец BLACKPINK «Forever Young». В 2024 году взяли 2 место на конкурсе «Подари минуту радости», а в 2025 представили собственную хореографию под песню «По горкам по горам». Их ждёт большой успех!
          </p>
        </div>
        <div className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
          {[["~10", "Лет в танце"], ["2024", "Год дебюта"], ["2", "Участницы"], ["12+", "Наград"]].map(([num, label]) => (
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
          <p className="font-mono text-xs tracking-[0.4em] text-gold uppercase mb-4">Состав дуэта</p>
          <h2 className="font-display text-[clamp(36px,5vw,72px)] font-bold text-white leading-none">
            УЧАСТНИЦЫ
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-1 max-w-3xl mx-auto">
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
          <p className="font-display text-3xl font-bold text-gold tracking-[0.3em] mb-2">ОН-ЛАЙН</p>
          <p className="font-mono text-xs text-white/30 tracking-[0.2em]">ТАНЦЕВАЛЬНЫЙ ДУЭТ · БИРЮСИНСК · С 2023</p>
        </div>
        <div className="flex gap-6">
          {["Instagram", "YouTube", "VK"].map(s => (
            <button key={s} className="font-mono text-xs tracking-[0.2em] text-white/30 hover:text-gold transition-colors uppercase">
              {s}
            </button>
          ))}
        </div>
        <p className="font-mono text-xs text-white/20 tracking-[0.1em]">© 2024 Дуэт «Он-лайн». Бирюсинск</p>
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
      <Friendship />
      <About />
      <Members />
      <Gallery />
      <Footer />
    </div>
  );
}