import { servicesData } from '../../data/content';

const Services = () => {
    return (
        <section id="services" className="bg-white">
            <div className="section-container section-padding">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-2">
                        {servicesData.heading}
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {servicesData.subheading}
                    </h3>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {servicesData.items.map((service, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 rounded-xl p-8 border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:bg-white group"
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                                <svg
                                    className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                                </svg>
                            </div>

                            {/* Content */}
                            <h4 className="text-xl font-bold text-gray-900 mb-3">
                                {service.title}
                            </h4>
                            <p className="text-gray-600 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Services;