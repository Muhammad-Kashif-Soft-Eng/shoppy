import { pricingData } from '../../data/content';

const Pricing = () => {
    return (
        <section id="pricing" className="bg-[#f1f3ed]">
            <div className="section-container section-padding">
                <div className="mb-10 max-w-2xl md:mb-14">
                    <h2 className="eyebrow mb-3">{pricingData.heading}</h2>
                    <h3 className="section-title">{pricingData.subheading}</h3>
                </div>

                <div className="mx-auto grid max-w-6xl items-stretch gap-4 md:grid-cols-3">
                    {pricingData.plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative flex h-full flex-col border bg-white ${plan.isPopular ? 'border-[#315c4b] md:-translate-y-2' : 'border-[#dfe5dd]'}`}
                        >
                            {plan.isPopular && <div className="absolute inset-x-0 top-0 h-1 bg-[#d7ed84]" />}
                            {plan.isPopular && (
                                <div className="px-7 pt-5">
                                    <span className="text-xs font-bold uppercase text-[#315c4b]">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className={`border-b border-[#e4e8e1] px-7 pb-6 ${plan.isPopular ? 'pt-3' : 'pt-7'}`}>
                                <h4 className="mb-2 text-xl font-semibold text-[#1f2a25]">{plan.name}</h4>
                                <p className="mb-6 min-h-12 text-sm leading-relaxed text-[#65716a]">{plan.description}</p>
                                <div className="flex items-baseline">
                                    <span className="text-4xl font-semibold text-[#1f2a25]">{plan.price}</span>
                                    <span className="ml-1 text-sm font-medium text-[#65716a]">{plan.period}</span>
                                </div>
                            </div>

                            <div className="flex-grow px-7 py-6">
                                <ul className="mb-8 space-y-4">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <svg className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-[#52775f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-sm leading-relaxed text-[#58655d]">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-auto px-7 pb-7">
                                <a
                                    href="#contact"
                                    className={plan.isPopular ? 'btn-primary w-full' : 'btn-secondary w-full'}
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