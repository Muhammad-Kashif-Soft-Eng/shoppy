import { useState } from 'react';
import { faqData } from '../../data/content';

const FAQ = () => {
    // Local UI state for accordion interaction
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq" className="bg-white">
            <div className="section-container section-padding">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-2">
                        {faqData.heading}
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {faqData.subheading}
                    </h3>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto">
                    {faqData.items.map((item, index) => {
                        const isOpen = activeIndex === index;

                        return (
                            <div
                                key={index}
                                className="mb-4 border border-gray-200 rounded-lg overflow-hidden transition-all duration-300"
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className={`w-full flex justify-between items-center p-5 text-left focus:outline-none transition-colors duration-300
                    ${isOpen ? 'bg-blue-50 text-blue-700' : 'bg-white text-gray-900 hover:bg-gray-50'}`}
                                    aria-expanded={isOpen}
                                >
                                    <span className="font-semibold">{item.question}</span>
                                    {/* Chevron Icon */}
                                    <svg
                                        className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-blue-600' : 'text-gray-400'}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Answer Content with smooth grid layout transition */}
                                <div
                                    className={`grid transition-all duration-300 ease-in-out
                    ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                  `}
                                >
                                    <div className="overflow-hidden">
                                        <p className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 bg-blue-50">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default FAQ;