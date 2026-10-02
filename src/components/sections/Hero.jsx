import { heroData } from '../../data/content';

const Hero = () => {
    return (
        <section id="hero" className="overflow-hidden bg-paper">
            <div className="section-container pb-16 pt-14 md:pb-20 md:pt-20 lg:pb-24 lg:pt-24">
                <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
                    <div className="flex flex-col items-start">
                        <p className="eyebrow mb-5 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-olive" />
                            Digital partners for ambitious teams
                        </p>
                        <h1 className="heading-primary max-w-[620px]">
                            {heroData.headline}
                        </h1>
                        <p className="text-muted mt-6 max-w-[520px] text-lg">
                            {heroData.description}
                        </p>
                        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
                            <a href="#contact" className="btn-primary w-full sm:w-auto">
                                {heroData.primaryCTA}
                                <span aria-hidden="true">↗</span>
                            </a>
                            <a href="#about" className="btn-secondary w-full sm:w-auto">
                                {heroData.secondaryCTA}
                            </a>
                        </div>
                        <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#e1e6df] pt-5 text-xs font-semibold uppercase text-[#68746b]">
                            <span>Strategy</span>
                            <span>Digital design</span>
                            <span>Growth</span>
                        </div>
                    </div>

                    <div className="relative min-w-0">
                        <div className="aspect-[4/3] overflow-hidden rounded-sm bg-card-soft">
                            <img
                                src={heroData.image}
                                alt="Business professionals collaborating"
                                className="h-full w-full object-cover"
                                fetchPriority="high"
                            />
                        </div>
                        <div className="absolute bottom-4 left-4 max-w-[230px] bg-paper px-4 py-3 sm:bottom-6 sm:left-6 sm:px-5">
                            <span className="block text-xs font-semibold uppercase text-green">Primora, in practice</span>
                            <span className="mt-1 block text-sm font-medium text-ink">Clear thinking. Measurable progress.</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;