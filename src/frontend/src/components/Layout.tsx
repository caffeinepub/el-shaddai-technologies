import { Button } from "@/components/ui/button";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ChevronRight, Mail, Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Products", to: "/products" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath]);

  const isActive = (to: string) =>
    to === "/" ? currentPath === "/" : currentPath.startsWith(to);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-card border-b border-border"
            : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 shrink-0"
              data-ocid="nav.logo.link"
            >
              <img
                src="/assets/uploads/image-3-1.png"
                alt="El-Shaddai Technologies Logo"
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid={`nav.${link.label.toLowerCase()}.link`}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 font-display ${
                    isActive(link.to)
                      ? "text-brand-red bg-brand-red/10"
                      : "text-foreground hover:text-brand-red hover:bg-brand-red/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/admin" data-ocid="nav.admin.link">
                <Button
                  size="sm"
                  className="ml-2 bg-brand-navy hover:bg-brand-navy/90 text-white font-display font-semibold"
                >
                  Admin
                </Button>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              data-ocid="nav.mobile.toggle"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden border-t border-border bg-white/98 backdrop-blur-md overflow-hidden"
            >
              <nav className="container px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium font-display transition-colors ${
                      isActive(link.to)
                        ? "text-brand-red bg-brand-red/10"
                        : "text-foreground hover:text-brand-red hover:bg-muted"
                    }`}
                  >
                    {link.label}
                    <ChevronRight size={16} className="opacity-40" />
                  </Link>
                ))}
                <Link
                  to="/admin"
                  className="mt-2"
                  data-ocid="nav.mobile.admin.link"
                >
                  <Button className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white font-display font-semibold">
                    Admin Portal
                  </Button>
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Page Content ─────────────────────────────────────────────────── */}
      <main className="flex-1 pt-16 lg:pt-20">
        <Outlet />
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-brand-navy text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/assets/uploads/image-3-1.png"
                  alt="El-Shaddai Technologies Logo"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                Building high-performance IT talent pipelines. Your trusted
                partner in technology staffing and workforce solutions.
              </p>
              <div className="mt-6 space-y-2">
                <a
                  href="tel:+17329131541"
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-brand-gold transition-colors"
                  data-ocid="footer.phone.link"
                >
                  <Phone size={14} />
                  +1 732-913-1541
                </a>
                <a
                  href="mailto:shg@el-shaddaitechnologies.com"
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-brand-gold transition-colors"
                  data-ocid="footer.email.link"
                >
                  <Mail size={14} />
                  shg@el-shaddaitechnologies.com
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      data-ocid={`footer.${link.label.toLowerCase()}.link`}
                      className="text-sm text-white/70 hover:text-brand-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">
                Our Services
              </h3>
              <ul className="space-y-2">
                {[
                  "IT Staffing",
                  "Direct Hire",
                  "Contract Staffing",
                  "Executive Search",
                  "Workforce Solutions",
                ].map((svc) => (
                  <li key={svc}>
                    <Link
                      to="/services"
                      className="text-sm text-white/70 hover:text-brand-gold transition-colors"
                    >
                      {svc}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} EL-Shaddai Technologies Inc. All
              rights reserved.
            </p>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Built with ♥ using caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
