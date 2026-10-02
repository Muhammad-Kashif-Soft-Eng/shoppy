import { servicesData } from '../../data/content';

const Services = () => {
    return (
        <section id="services" className="bg-white">
            <div className="section-container section-padding">
                <div className="mb-10 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end">
                    <div className="max-w-2xl">
                        <h2 className="eyebrow mb-3">{servicesData.heading}</h2>
                        <h3 className="section-title">{servicesData.subheading}</h3>
                    </div>
                    <p className="section-description max-w-sm md:pb-1">
                        Focused expertise, brought together to move your business forward.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {servicesData.items.map((service, index) => (
                        <div
                            key={index}
                            className={`group flex min-h-[270px] flex-col border p-6 transition-colors duration-200 sm:p-7 ${index === 0
                                ? 'border-green bg-green text-white'
                                : 'border-line bg-paper text-ink hover:border-[#aab8a8]'
                                }`}
                        >
                            <div className="mb-8 flex items-center justify-between">
                                <span className={`text-xs font-semibold ${index === 0 ? 'text-lime' : 'text-[#849087]'}`}>
                                    0{index + 1}
                                </span>
                                <svg
                                    className={`h-6 w-6 ${index === 0 ? 'text-lime' : 'text-green'}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                                </svg>
                            </div>

                            <h4 className={`mb-3 text-lg font-semibold ${index === 0 ? 'text-white' : 'text-ink'}`}>
                                {service.title}
                            </h4>
                            <p className={`mt-auto text-sm leading-relaxed ${index === 0 ? 'text-white/75' : 'text-muted'}`}>
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