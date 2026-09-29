import { pricingData } from '../../data/content';

const Pricing = () => {
    return (
        <section id="pricing" className="bg-gray-50">
            <div className="section-container section-padding">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-2">
                        {pricingData.heading}
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {pricingData.subheading}
                    </h3>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                    {pricingData.plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative bg-white rounded-2xl shadow-sm border flex flex-col h-full
                ${plan.isPopular ? 'border-blue-600 shadow-xl md:-translate-y-4 z-10 relative' : 'border-gray-200'}
              `}
                        >
                            {/* Popular Badge */}
                            {plan.isPopular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span className="bg-blue-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            {/* Pricing Header */}
                            <div className="p-8 border-b border-gray-100 text-center">
                                <h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
                                <p className="text-gray-500 text-sm mb-6 h-10">{plan.description}</p>
                                <div className="flex items-baseline justify-center">
                                    <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                                    <span className="text-gray-500 ml-1 font-medium">{plan.period}</span>
                                </div>
                            </div>

                            {/* Pricing Features */}
                            <div className="p-8 flex-grow">
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA Button */}
                            <div className="p-8 pt-0 mt-auto">
                                <a
                                    href="#contact"
                                    className={`w-full block text-center py-3 px-4 rounded-md font-medium transition-colors duration-200 
                    ${plan.isPopular
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                                        }`}
                                >
                                    {plan.buttonText}
                                </a>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Pricing;