import { aboutData } from '../../data/content';

const About = () => {
    return (
        <section id="about" className="border-y border-[#e9ece6] bg-white">
            <div className="section-container section-padding">
                <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.92fr] lg:gap-20">
                    <div className="relative order-2 lg:order-1">
                        <div className="aspect-[5/4] overflow-hidden rounded-sm bg-[#dce4da]">
                            <img
                                src={aboutData.image}
                                alt="Team collaborating in modern office"
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        <div className="absolute bottom-4 right-4 bg-[#d7ed84] px-4 py-3 sm:bottom-6 sm:right-6 sm:px-6 sm:py-4">
                            <span className="block text-2xl font-semibold leading-none text-[#1f2a25]">10+</span>
                            <span className="mt-1 block text-xs font-medium text-[#34483a]">years of experience</span>
                        </div>
                    </div>

                    <div className="order-1 flex flex-col justify-center lg:order-2">
                        <h2 className="eyebrow mb-3">
                            {aboutData.heading}
                        </h2>
                        <h3 className="section-title mb-5">
                            {aboutData.subheading}
                        </h3>

                        <div className="mb-8 space-y-4">
                            {aboutData.description.map((paragraph, index) => (
                                <p key={index} className="text-muted">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-[#e4e8e1] pt-6 sm:gap-6">
                            {aboutData.stats.filter((stat) => stat.label !== 'Years Experience').map((stat) => (
                                <div key={stat.label}>
                                    <div className="mb-1 text-2xl font-semibold text-[#1f2a25] sm:text-3xl">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs font-medium leading-snug text-[#65716a] sm:text-sm">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;