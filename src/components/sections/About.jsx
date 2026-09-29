import { aboutData } from '../../data/content';

const About = () => {
    return (
        <section id="about" className="bg-gray-50">
            <div className="section-container section-padding">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Image Content */}
                    <div className="order-2 lg:order-1 relative rounded-2xl overflow-hidden shadow-xl">
                        <img
                            src={aboutData.image}
                            alt="Team collaborating in modern office"
                            className="object-cover w-full h-full"
                            loading="lazy"
                        />
                    </div>

                    {/* Text Content */}
                    <div className="order-1 lg:order-2 flex flex-col justify-center">
                        <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-2">
                            {aboutData.heading}
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            {aboutData.subheading}
                        </h3>

                        <div className="space-y-4 mb-8">
                            {aboutData.description.map((paragraph, index) => (
                                <p key={index} className="text-muted">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Statistics */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                            {aboutData.stats.map((stat, index) => (
                                <div key={index}>
                                    <div className="text-3xl font-bold text-gray-900 mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm font-medium text-gray-500">
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