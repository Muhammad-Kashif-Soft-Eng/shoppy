import { featuresData } from '../../data/content';

const Features = () => {
    return (
        <section id="features" className="bg-blue-900 text-white">
            <div className="section-container section-padding">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-blue-300 font-semibold tracking-wide uppercase text-sm mb-2">
                        {featuresData.heading}
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">
                        {featuresData.subheading}
                    </h3>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {featuresData.items.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            {/* Icon */}
                            <div className="w-16 h-16 rounded-full bg-blue-800 flex items-center justify-center mb-6 shadow-lg">
                                <svg
                                    className="w-8 h-8 text-blue-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                                </svg>
                            </div>

                            {/* Content */}
                            <h4 className="text-xl font-bold mb-3">
                                {feature.title}
                            </h4>
                            <p className="text-blue-100 leading-relaxed text-sm md:text-base">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Features;