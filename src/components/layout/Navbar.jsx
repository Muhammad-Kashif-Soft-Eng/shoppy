import { Link } from 'react-router-dom';
import useUIStore from '../../store/uiStore';
import { navLinks, companyData } from '../../data/content';

const Navbar = () => {
    const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

    return (
        <nav className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">
            <div className="section-container">
                <div className="flex h-[72px] items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-2 text-green-deep">
                            <span className="grid h-8 w-8 place-items-center rounded-sm bg-green text-sm font-bold text-lime">P</span>
                            <span className="text-[1.35rem] font-bold">{companyData.name}</span>
                        </Link>
                    </div>

                    <div className="hidden items-center gap-8 md:flex">
                        {navLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.path}
                                className="text-sm font-medium text-brand-muted transition-colors hover:text-green-deep"
                            >
                                {link.title}
                            </a>
                        ))}
                        <a href="#contact" className="btn-primary min-h-10 px-4 py-2 text-sm">
                            Contact Us
                        </a>
                    </div>

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="inline-flex size-10 items-center justify-center rounded-sm text-green-deep transition-colors hover:bg-surface"
                            aria-expanded={isMobileMenuOpen}
                            aria-label={isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
                        >
                            {isMobileMenuOpen ? (
                                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="border-t border-line bg-paper shadow-lg md:hidden">
                    <div className="section-container space-y-1 py-4">
                        {navLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.path}
                                onClick={closeMobileMenu}
                                className="block rounded-sm px-3 py-3 text-base font-medium text-ink-soft transition-colors hover:bg-surface hover:text-green-deep"
                            >
                                {link.title}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={closeMobileMenu}
                            className="btn-primary mt-3 w-full"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;