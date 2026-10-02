import { howItWorksData } from '../../data/content';

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="bg-surface-alt">
            <div className="section-container section-padding">
                <div className="mb-12 max-w-2xl md:mb-14">
                    <h2 className="eyebrow mb-3">{howItWorksData.heading}</h2>
                    <h3 className="section-title">{howItWorksData.subheading}</h3>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-10 md:gap-y-10 lg:grid-cols-4 lg:gap-6">
                    {howItWorksData.steps.map((step, index) => (
                        <div key={index} className="relative grid grid-cols-[48px_1fr] items-start gap-4 lg:grid-cols-1 lg:gap-0">
                            <div className="relative z-10 grid size-11 place-items-center rounded-full border border-[#aebeaa] bg-surface-alt text-sm font-semibold text-green lg:mb-6 lg:size-12">
                                0{index + 1}
                            </div>
                            <div>
                                <h4 className="mb-2 text-lg font-semibold text-ink">
                                    {step.title.split('. ')[1]}
                                </h4>
                                <p className="text-sm leading-relaxed text-muted">
                                    {step.description}
                                </p>
                            </div>
                            {index !== howItWorksData.steps.length - 1 && (
                                <div className="absolute left-[21px] top-12 h-[calc(100%+1.5rem)] w-px bg-[#d1d9ce] md:hidden" />
                            )}
                            {index !== howItWorksData.steps.length - 1 && (
                                <div className="absolute left-[60px] right-[-16px] top-[22px] hidden h-px bg-[#d1d9ce] lg:block" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;