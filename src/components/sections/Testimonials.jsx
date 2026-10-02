import { testimonialsData } from '../../data/content';

const Testimonials = () => {
    return (
        <section id="testimonials" className="bg-white">
            <div className="section-container section-padding">
                <div className="mb-10 max-w-2xl md:mb-14">
                    <h2 className="eyebrow mb-3">{testimonialsData.heading}</h2>
                    <h3 className="section-title">{testimonialsData.subheading}</h3>
                </div>

                <div className="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
                    {testimonialsData.items.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`flex flex-col justify-between p-6 sm:p-8 ${index === 0
                                ? 'min-h-[330px] bg-green text-white lg:row-span-2 lg:p-10'
                                : 'min-h-[230px] border border-line bg-paper text-ink'
                                }`}
                        >
                            <div>
                                <svg className={`mb-5 h-8 w-8 ${index === 0 ? 'text-lime' : 'text-[#789080]'}`} fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                </svg>
                                <p className={`mb-8 leading-relaxed ${index === 0 ? 'text-xl text-white sm:text-2xl' : 'text-base text-brand-muted'}`}>
                                    "{testimonial.text}"
                                </p>
                            </div>

                            <div className={`mt-auto flex items-center border-t pt-5 ${index === 0 ? 'border-white/20' : 'border-[#dfe5dd]'}`}>
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="mr-4 size-12 rounded-full object-cover"
                                    loading="lazy"
                                />
                                <div>
                                    <h5 className={`text-sm font-semibold ${index === 0 ? 'text-white' : 'text-ink'}`}>
                                        {testimonial.name}
                                    </h5>
                                    <p className={`text-sm ${index === 0 ? 'text-white/70' : 'text-muted'}`}>
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;