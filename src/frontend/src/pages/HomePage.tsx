import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Network,
  Search,
  Users,
} from "lucide-react";
import { type Variants, motion } from "motion/react";

const services = [
  {
    icon: Users,
    title: "IT Staffing",
    description:
      "Connecting businesses with top-tier technology professionals for both short and long-term engagements.",
  },
  {
    icon: Briefcase,
    title: "Direct Hire",
    description:
      "Permanent placement services to build your core team with exceptional talent matched to your culture.",
  },
  {
    icon: Search,
    title: "Executive Search",
    description:
      "Strategic leadership recruitment for CTO, VP Engineering, and senior technology roles.",
  },
  {
    icon: Network,
    title: "Workforce Solutions",
    description:
      "End-to-end talent pipeline management, RPO services, and workforce planning strategies.",
  },
];

const stats = [
  { value: "500+", label: "Placements Made" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "15+", label: "Industries Served" },
  { value: "24/7", label: "Dedicated Support" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[85vh] flex items-end"
        data-ocid="home.hero.section"
      >
        <img
          src="/assets/uploads/image-4-2.png"
          alt="EL-Shaddai Technologies – Building High-Performance IT Talent Pipelines"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Gradient overlay for CTAs area */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent" />
        <div className="relative z-10 w-full container max-w-7xl mx-auto px-4 sm:px-6 pb-16 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-2xl"
          >
            <span className="inline-block text-xs font-display font-semibold uppercase tracking-widest text-brand-gold mb-4">
              Premier IT Staffing &amp; Workforce Solutions
            </span>
            <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
              Building High-Performance IT Talent Pipelines
            </h1>
            <p className="text-white/85 text-lg mb-8 leading-relaxed">
              EL-Shaddai Technologies Inc connects America's top businesses with
              exceptional technology professionals — fast, reliably, and with
              care.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link to="/services" data-ocid="home.hero.learn_more.button">
                <Button
                  size="lg"
                  className="bg-brand-red hover:bg-brand-red/90 text-white font-display font-semibold shadow-red gap-2"
                >
                  Our Services <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/contact" data-ocid="home.hero.contact.button">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 border-white/40 text-white hover:bg-white/20 hover:text-white font-display font-semibold backdrop-blur-sm"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Intro Strip ─────────────────────────────────────────────────── */}
      <section
        className="bg-brand-red text-white py-12 lg:py-16"
        data-ocid="home.intro.section"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-display text-2xl lg:text-4xl font-bold mb-4">
              Empowering Businesses with Top-Tier IT Talent
            </h2>
            <p className="text-white/85 max-w-2xl mx-auto text-lg">
              From startups to Fortune 500s, we match exceptional technology
              professionals with companies that need them most.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="py-12 bg-brand-navy text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <p className="font-display text-3xl lg:text-4xl font-bold text-brand-gold">
                  {stat.value}
                </p>
                <p className="text-white/70 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Services Highlights ──────────────────────────────────────────── */}
      <section
        className="py-16 lg:py-24 bg-brand-light"
        data-ocid="home.services.section"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-xs font-display font-semibold uppercase tracking-widest text-brand-red mb-3">
              What We Do
            </span>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-brand-navy mb-4">
              Our Core Services
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive IT talent solutions tailored to your business needs
              and growth goals.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div key={svc.title} variants={itemVariants}>
                  <Card
                    className="h-full border-0 shadow-card hover:shadow-navy transition-all duration-300 hover:-translate-y-1 bg-white"
                    data-ocid={`home.services.item.${i + 1}`}
                  >
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center mb-4">
                        <Icon size={22} className="text-brand-red" />
                      </div>
                      <h3 className="font-display font-bold text-brand-navy mb-2">
                        {svc.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {svc.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="text-center mt-10">
            <Link to="/services" data-ocid="home.services.view_all.button">
              <Button
                variant="outline"
                className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-display font-semibold gap-2"
              >
                View All Services <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Hiring Banner ────────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden h-56 lg:h-72">
        <img
          src="/assets/uploads/tumisu-hiring-3580378_1920-4.png"
          alt="We are hiring"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 to-transparent flex items-center">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-white font-display text-2xl lg:text-4xl font-bold max-w-md drop-shadow mb-4">
                We're Hiring — Join Our Team
              </p>
              <Link to="/careers" data-ocid="home.hiring.careers.button">
                <Button
                  size="lg"
                  className="bg-brand-red hover:bg-brand-red/90 text-white font-display font-semibold gap-2"
                >
                  View Open Positions <ArrowRight size={16} />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Why Choose Us ────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white" data-ocid="home.why.section">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-xs font-display font-semibold uppercase tracking-widest text-brand-red mb-3">
                Why Us
              </span>
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-brand-navy mb-6">
                Your Strategic Talent Partner
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                EL-Shaddai Technologies Inc has built a reputation for
                delivering exceptional IT talent solutions with speed,
                precision, and care. We understand your business challenges and
                deliver results.
              </p>
              <ul className="space-y-4">
                {[
                  "Deep technical expertise across all IT domains",
                  "Pre-vetted talent pool of 10,000+ candidates",
                  "Average placement time of 72 hours",
                  "Dedicated account management team",
                  "Nationwide reach across all major US markets",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="text-brand-red mt-0.5 shrink-0"
                    />
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex gap-4">
                <Link to="/about" data-ocid="home.why.about.button">
                  <Button className="bg-brand-navy hover:bg-brand-navy/90 text-white font-display font-semibold">
                    About Us
                  </Button>
                </Link>
                <Link to="/careers" data-ocid="home.why.careers.button">
                  <Button
                    variant="ghost"
                    className="text-brand-red hover:text-brand-red hover:bg-brand-red/10 font-display font-semibold gap-2"
                  >
                    Join Our Team <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative grid grid-cols-2 gap-3"
            >
              <div className="absolute -inset-4 bg-brand-red/5 rounded-2xl -z-10" />
              <img
                src="/assets/uploads/089photoshootings-people-1979261_1920-5.jpg"
                alt="Business team meeting"
                className="w-full h-80 lg:h-96 object-cover rounded-xl shadow-navy col-span-2"
              />
              <img
                src="/assets/uploads/tumisu-expert-5442081_1920-3.jpg"
                alt="IT expert at work"
                className="w-full h-36 object-cover rounded-xl shadow-card"
              />
              <img
                src="/assets/uploads/ChatGPT-Image-Mar-6-2026-02_50_25-PM-6.png"
                alt="Technology professionals"
                className="w-full h-36 object-cover rounded-xl shadow-card"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────────────── */}
      <section
        className="py-16 bg-gradient-to-r from-brand-navy to-brand-navy/80 text-white"
        data-ocid="home.cta.section"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Ready to Build Your Dream IT Team?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Let's discuss how EL-Shaddai Technologies Inc can help you find
              the right talent at the right time.
            </p>
            <Link to="/contact" data-ocid="home.cta.contact.button">
              <Button
                size="lg"
                className="bg-brand-red hover:bg-brand-red/90 text-white font-display font-bold shadow-red gap-2"
              >
                Get Started Today <ArrowRight size={16} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
