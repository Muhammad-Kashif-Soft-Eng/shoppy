import { featuresData } from '../../data/content';

const Features = () => {
    return (
        <section id="features" className="bg-[#24483a] text-white">
            <div className="section-container section-padding">
                <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                    <div className="max-w-md">
                        <h2 className="mb-3 text-xs font-bold uppercase text-[#d7ed84]">{featuresData.heading}</h2>
                        <h3 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">{featuresData.subheading}</h3>
                        <p className="mt-5 text-base leading-relaxed text-white/70">
                            Reliable partnership, thoughtful execution, and support that stays with you after launch.
                        </p>
                    </div>

                    <div className="grid gap-x-8 sm:grid-cols-2">
                        {featuresData.items.map((feature, index) => (
                            <div key={index} className="flex gap-4 border-t border-white/20 py-6">
                                <div className="grid size-11 shrink-0 place-items-center bg-white/10">
                                    <svg
                                        className="h-5 w-5 text-[#d7ed84]"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="mb-2 text-base font-semibold text-white">{feature.title}</h4>
                                    <p className="text-sm leading-relaxed text-white/70">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Features;