import { howItWorksData } from '../../data/content';

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="bg-gray-50">
            <div className="section-container section-padding">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-2">
                        {howItWorksData.heading}
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {howItWorksData.subheading}
                    </h3>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {howItWorksData.steps.map((step, index) => (
                        <div key={index} className="relative flex flex-col items-center text-center group">

                            {/* Step Number Circle */}
                            <div className="w-16 h-16 rounded-full bg-white border-4 border-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold mb-6 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 z-10 relative shadow-sm">
                                {index + 1}
                            </div>

                            {/* Content */}
                            <h4 className="text-xl font-bold text-gray-900 mb-3">
                                {step.title.split('. ')[1]} {/* Extracts the text after the number */}
                            </h4>
                            <p className="text-gray-600 leading-relaxed">
                                {step.description}
                            </p>

                            {/* Connecting Line (Desktop Only) - Hides on the last item */}
                            {index !== howItWorksData.steps.length - 1 && (
                                <div className="hidden lg:block absolute top-8 left-[60%] w-full h-[2px] bg-blue-100 -z-0"></div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default HowItWorks;