import { heroData } from '../../data/content';

const Hero = () => {
    return (
        <section id="hero" className="relative bg-white overflow-hidden">
            <div className="section-container section-padding">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <div className="flex flex-col justify-center space-y-8">
                        <h1 className="heading-primary leading-tight">
                            {heroData.headline}
                        </h1>
                        <p className="text-muted text-lg md:text-xl">
                            {heroData.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="#contact" className="btn-primary">
                                {heroData.primaryCTA}
                            </a>
                            <a href="#about" className="btn-secondary">
                                {heroData.secondaryCTA}
                            </a>
                        </div>
                    </div>

                    {/* Image Content */}
                    <div className="relative">
                        <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src={heroData.image}
                                alt="Business professionals collaborating"
                                className="object-cover w-full h-full"
                                loading="lazy"
                            />
                        </div>
                        {/* Decorative background blob (optional Tailwind technique) */}
                        <div className="absolute -inset-4 bg-blue-50 rounded-3xl -z-10 transform rotate-3"></div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;