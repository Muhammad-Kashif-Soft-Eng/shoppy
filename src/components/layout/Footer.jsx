import { companyData, footerData } from '../../data/content';

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-forest py-14 text-forest-soft sm:py-16">
            <div className="section-container">
                <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr] lg:gap-12">
                    <div className="lg:col-span-1">
                        <a href="/" className="mb-5 inline-flex items-center gap-2 text-white">
                            <span className="grid h-8 w-8 place-items-center rounded-sm bg-lime text-sm font-bold text-green-deep">P</span>
                            <span className="text-xl font-bold">{companyData.name}</span>
                        </a>
                        <p className="mb-6 max-w-xs text-sm leading-relaxed text-white/60">
                            {footerData.description}
                        </p>
                        <div className="flex gap-3">
                            {footerData.socials.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.path}
                                    aria-label={social.name}
                                    className="grid size-9 place-items-center border border-white/15 text-white/70 transition-colors hover:border-lime hover:text-lime"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                        <path d={social.icon} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {footerData.links.map((column, index) => (
                        <div key={index}>
                            <h4 className="mb-5 text-xs font-bold uppercase text-white">
                                {column.title}
                            </h4>
                            <ul className="space-y-3">
                                {column.items.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a
                                            href={link.path}
                                            className="text-sm text-white/60 transition-colors hover:text-lime"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h4 className="mb-5 text-xs font-bold uppercase text-white">
                            Contact Us
                        </h4>
                        <ul className="space-y-3 text-sm text-white/60">
                            <li><a href={`mailto:${companyData.email}`} className="transition-colors hover:text-lime">{companyData.email}</a></li>
                            <li>{companyData.phone}</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
                    <p>
                        &copy; {new Date().getFullYear()} {companyData.name}. All rights reserved.
                    </p>
                    <div className="flex gap-5">
                        <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
                        <a href="#" className="transition-colors hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;