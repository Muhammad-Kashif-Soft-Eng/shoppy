import { companyData, footerData } from '../../data/content';

const Footer = () => {
    return (
        <footer className="bg-gray-900 pt-16 pb-8 text-gray-300 border-t border-gray-800">
            <div className="section-container">

                {/* Top Footer / Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand & Description */}
                    <div className="lg:col-span-1">
                        <a href="/" className="inline-block mb-6">
                            <span className="text-2xl font-bold text-white tracking-wide">{companyData.name}</span>
                        </a>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            {footerData.description}
                        </p>
                        {/* Social Icons */}
                        <div className="flex space-x-4">
                            {footerData.socials.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.path}
                                    aria-label={social.name}
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors duration-300"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                        <path d={social.icon} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Link Columns */}
                    {footerData.links.map((column, index) => (
                        <div key={index}>
                            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
                                {column.title}
                            </h4>
                            <ul className="space-y-4">
                                {column.items.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a
                                            href={link.path}
                                            className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Details in Footer */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
                            Contact Us
                        </h4>
                        <ul className="space-y-4 text-gray-400">
                            <li>{companyData.email}</li>
                            <li>{companyData.phone}</li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Footer / Copyright */}
                <div className="pt-8 border-t border-gray-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center">
                    <p className="mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} {companyData.name}. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;