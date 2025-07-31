import Carousel from "./Carousel";
import Particles from "./Particles";
import HeroContent from "./HeroContent";
import ScrollDownIndicator from "./ScrollDownIndicator";

export default function HomeSection() {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Fond animé : Carousel */}
      <div className="absolute inset-0 z-0">
        <Carousel />
      </div>

      {/* Particules */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Particles />
      </div>

      {/* Contenu principal centré */}
      <div className="relative z-20 w-full px-4 md:px-8 max-w-7xl mx-auto">
        <HeroContent />
      </div>

      {/* Scroll Indicator animé */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
        <ScrollDownIndicator />
      </div>

      {/* Overlay en dégradé sur les bords si besoin (optionnel) */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" /> */}
    </section>
  );
}
