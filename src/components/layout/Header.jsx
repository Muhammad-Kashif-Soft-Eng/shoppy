import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/useCart'
import { useWishlist } from '../../context/useWishlist'
import { useAuth } from '../../context/useAuth'

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/categories', label: 'Categories' },
]

export default function Header() {
    const { cartCount } = useCart()
    const { wishlistCount } = useWishlist()
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [userMenu, setUserMenu] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchValue.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchValue.trim())}`)
            setSearchValue('')
        }
    }

    const handleLogout = () => {
        logout()
        setUserMenu(false)
        navigate('/')
    }

    return (
        <header className={`sticky top-0 z-40 bg-white transition-shadow duration-200 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center gap-2 sm:gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 font-extrabold text-xl text-brand-600 shrink-0">
                        <span className="w-8 h-8 bg-brand-600 rounded-xl flex items-center justify-center text-white text-sm font-black">S</span>
                        Shoppy
                    </Link>

                    {/* Desktop nav */}
                    <nav className="ml-2 hidden items-center gap-1 lg:ml-4 lg:flex">
                        {navLinks.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === '/'}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${isActive ? 'text-brand-600 bg-brand-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Search bar (desktop) */}
                    <form onSubmit={handleSearch} className="hidden min-w-0 flex-1 lg:flex">
                        <input
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                            placeholder="Search products..."
                            aria-label="Search products"
                            className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                        />
                    </form>

                    {/* Actions */}
                    <div className="ml-auto flex shrink-0 items-center gap-1">
                        <Link to="/wishlist" className="relative inline-flex size-10 items-center justify-center rounded-xl text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900" aria-label="Wishlist">
                            <span>♡</span>
                            {wishlistCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {wishlistCount > 9 ? '9+' : wishlistCount}
                                </span>
                            )}
                        </Link>

                        <Link to="/cart" className="relative inline-flex size-10 items-center justify-center rounded-xl text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900" aria-label="Cart">
                            <span>🛒</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {cartCount > 9 ? '9+' : cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Auth */}
                        {user ? (
                            <div className="relative hidden lg:block">
                                <button
                                    onClick={() => setUserMenu(m => !m)}
                                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    <div className="w-7 h-7 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold text-xs">
                                        {user.username?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700 max-w-[80px] truncate">{user.username}</span>
                                    <span className="text-gray-400 text-xs">▾</span>
                                </button>
                                {userMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-fade-in">
                                        <Link to="/orders" onClick={() => setUserMenu(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                                            📦 My Orders
                                        </Link>
                                        <Link to="/wishlist" onClick={() => setUserMenu(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                                            ♡ Wishlist
                                        </Link>
                                        <hr className="my-1 border-gray-100" />
                                        <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50">
                                            ↩ Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="hidden lg:flex items-center gap-2">
                                <Link to="/login" className="inline-flex min-h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100">Sign In</Link>
                                <Link to="/register" className="inline-flex min-h-10 items-center justify-center rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700">Sign Up</Link>
                            </div>
                        )}

                        {/* Mobile menu toggle */}
                        <button
                            onClick={() => setMenuOpen(m => !m)}
                            className="inline-flex size-10 items-center justify-center rounded-xl text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
                            aria-label={menuOpen ? 'Close menu' : 'Menu'}
                            aria-expanded={menuOpen}
                        >
                            {menuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile search */}
            <div className="px-4 pb-3 sm:px-6 lg:hidden">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        placeholder="Search products..."
                        className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    />
                    <button type="submit" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700">Go</button>
                </form>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="animate-slide-down border-t border-gray-100 bg-white px-4 py-4 sm:px-6 lg:hidden">
                    <nav className="flex flex-col gap-1 mb-4">
                        {navLinks.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === '/'}
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    `px-4 py-3 rounded-xl text-sm font-semibold ${isActive ? 'text-brand-600 bg-brand-50' : 'text-gray-700'
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                        {user && (
                            <NavLink to="/orders" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm font-semibold text-gray-700">
                                My Orders
                            </NavLink>
                        )}
                    </nav>
                    {user ? (
                        <button onClick={handleLogout} className="btn-danger w-full text-sm">Sign Out</button>
                    ) : (
                        <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2">
                            <Link to="/login" onClick={() => setMenuOpen(false)} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50">Sign In</Link>
                            <Link to="/register" onClick={() => setMenuOpen(false)} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700">Sign Up</Link>
                        </div>
                    )}
                </div>
            )}
        </header>
    )
}
