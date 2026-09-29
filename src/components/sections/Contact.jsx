import { contactData } from '../../data/content';

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would handle form submission here (e.g., API call)
        alert("Thank you for your message. We will get back to you shortly!");
        e.target.reset();
    };

    return (
        <section id="contact" className="bg-gray-50">
            <div className="section-container section-padding">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-2">
                        {contactData.heading}
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {contactData.subheading}
                    </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">

                    {/* Contact Information */}
                    <div className="space-y-10">
                        <div>
                            <p className="text-gray-600 leading-relaxed mb-8">
                                {contactData.description}
                            </p>
                        </div>

                        <div className="space-y-8">
                            {contactData.contactInfo.map((info, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="w-12 h-12 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center mr-6 flex-shrink-0 text-blue-600">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={info.icon} />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-1">{info.title}</h4>
                                        <p className="text-gray-600">{info.details}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-gray-50 focus:bg-white"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-gray-50 focus:bg-white"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-gray-50 focus:bg-white"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    required
                                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-gray-50 focus:bg-white resize-none"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>

                            <button type="submit" className="w-full btn-primary py-4">
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