import { useState } from 'react';
import { faqData } from '../../data/content';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex((currentIndex) => currentIndex === index ? null : index);
    };

    return (
        <section id="faq" className="bg-white">
            <div className="section-container section-padding">
                <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
                    <div className="max-w-sm">
                        <h2 className="eyebrow mb-3">{faqData.heading}</h2>
                        <h3 className="section-title">{faqData.subheading}</h3>
                    </div>

                    <div className="border-t border-line">
                        {faqData.items.map((item, index) => {
                            const isOpen = activeIndex === index;
                            const answerId = `faq-answer-${index}`;

                            return (
                                <div key={index} className="border-b border-line">
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="flex w-full items-center gap-5 py-5 text-left text-ink transition-colors hover:text-green sm:py-6"
                                        aria-expanded={isOpen}
                                        aria-controls={answerId}
                                    >
                                        <span className="flex-1 text-base font-semibold sm:text-lg">{item.question}</span>
                                        <span
                                            className={`grid size-8 shrink-0 place-items-center self-center rounded-full border border-[#dfe5dd] text-xl font-normal leading-none text-green transition-all duration-200 ${isOpen ? 'rotate-45 bg-surface' : 'bg-white'}`}
                                            aria-hidden="true"
                                        >
                                            +
                                        </span>
                                    </button>

                                    <div
                                        id={answerId}
                                        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="max-w-2xl pb-6 pr-10 text-sm leading-relaxed text-muted sm:text-base">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;