import { Link } from 'react-router-dom';
import useUIStore from '../../store/uiStore';
import { navLinks, companyData } from '../../data/content';

const Navbar = () => {
    const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="section-container">
                <div className="flex justify-between h-20">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link to="/" onClick={closeMobileMenu} className="flex items-center">
                            <span className="text-2xl font-bold text-blue-600">{companyData.name}</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.path}
                                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                            >
                                {link.title}
                            </a>
                        ))}
                        <a href="#contact" className="btn-primary px-5 py-2.5">
                            Contact Us
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.path}
                                onClick={closeMobileMenu}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                            >
                                {link.title}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={closeMobileMenu}
                            className="block w-full text-center mt-4 btn-primary"
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