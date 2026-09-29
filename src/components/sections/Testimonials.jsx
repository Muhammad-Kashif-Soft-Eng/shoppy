import { testimonialsData } from '../../data/content';

const Testimonials = () => {
    return (
        <section id="testimonials" className="bg-white">
            <div className="section-container section-padding">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-2">
                        {testimonialsData.heading}
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {testimonialsData.subheading}
                    </h3>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonialsData.items.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                        >
                            {/* Quote Icon & Text */}
                            <div>
                                <svg className="w-10 h-10 text-blue-200 mb-6" fill="currentColor" viewBox="0 0 32 32">
                                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                </svg>
                                <p className="text-gray-600 italic leading-relaxed mb-8">
                                    "{testimonial.text}"
                                </p>
                            </div>

                            {/* Customer Info */}
                            <div className="flex items-center mt-auto border-t border-gray-200 pt-6">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover mr-4"
                                    loading="lazy"
                                />
                                <div>
                                    <h5 className="text-gray-900 font-bold text-sm">
                                        {testimonial.name}
                                    </h5>
                                    <p className="text-gray-500 text-sm">
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