import { contactData } from '../../data/content';

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message. We will get back to you shortly!');
        e.target.reset();
    };

    return (
        <section id="contact" className="bg-green-deep">
            <div className="section-container section-padding">
                <div className="mb-10 max-w-2xl md:mb-14">
                    <h2 className="mb-3 text-xs font-bold uppercase text-lime">{contactData.heading}</h2>
                    <h3 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">{contactData.subheading}</h3>
                </div>

                <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                    <div className="space-y-9 pt-1">
                        <div>
                            <p className="max-w-md text-base leading-relaxed text-white/75">
                                {contactData.description}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {contactData.contactInfo.map((info, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="mr-4 grid size-11 shrink-0 place-items-center border border-white/20 text-lime">
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={info.icon} />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="mb-1 text-sm font-semibold text-white">{info.title}</h4>
                                        <p className="text-sm leading-relaxed text-white/70">{info.details}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border border-white/10 bg-paper p-5 sm:p-8 lg:p-9">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="mb-2 block text-sm font-semibold text-ink-soft">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="field-input"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink-soft">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="field-input"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-ink-soft">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    className="field-input"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-ink-soft">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    required
                                    className="field-input resize-none"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>

                            <button type="submit" className="btn-primary w-full">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;