import Carousel from './Carousel';
import Particles  from './Particles';
import HeroContent from './HeroContent';
import ScrollDownIndicator from './ScrollDownIndicator';

export default function HomeSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Carousel : fond */}
      <div className="absolute inset-0 z-0">
        <Carousel />
      </div>

      {/* Particles : au-dessus du fond, mais derrière le contenu */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Particles />
      </div>

      {/* HeroContent : contenu principal */}
      <div className="relative z-20 w-full">
        <HeroContent />
      </div>

      {/* Scroll indicator : tout devant */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
        <ScrollDownIndicator />
      </div>
    </section>
  );
}

