import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Award, BadgeCheck, Briefcase, MapPin, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import teamMeetingImg from "/assets/uploads/089photoshootings-people-1979261_1920-5.jpg";
import techProsImg from "/assets/uploads/ChatGPT-Image-Mar-6-2026-02_50_25-PM-6.png";
import itExpertImg from "/assets/uploads/tumisu-expert-5442081_1920-3.jpg";

const reasons = [
  {
    icon: BadgeCheck,
    title: "Pre-Vetted Candidates",
    description:
      "Every candidate goes through a rigorous screening process — technical assessments, background checks, and cultural fit evaluations — so you only meet the best.",
  },
  {
    icon: Zap,
    title: "Fast Placements",
    description:
      "Our deep talent network means we can fill critical roles in days, not months. Speed to hire is our competitive edge.",
  },
  {
    icon: Users,
    title: "Dedicated Account Managers",
    description:
      "You get a single point of contact who understands your business, your culture, and your technical requirements inside and out.",
  },
  {
    icon: MapPin,
    title: "Nationwide Reach",
    description:
      "From coast to coast, our talent network spans all major tech hubs and remote markets, giving you access to candidates wherever you need them.",
  },
  {
    icon: Briefcase,
    title: "Deep Technical Expertise",
    description:
      "Our recruiters have hands-on experience in IT fields — they speak your language and know exactly what skills matter for each role.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description:
      "Trusted by Fortune 500 companies and fast-growing startups alike, we have a consistent record of successful long-term placements.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" as const },
  }),
};

export default function WhyUsPage() {
  return (
    <div className="bg-background">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative bg-brand-navy overflow-hidden py-20 lg:py-28">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 50%, oklch(0.62 0.22 25), transparent 60%)",
          }}
        />
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-brand-gold font-display font-semibold uppercase tracking-widest text-sm mb-4"
          >
            Our Difference
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="font-display font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
          >
            Why Choose <span className="text-brand-red">EL-Shaddai</span>
            <br />
            Technologies Inc?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            We go beyond resumes. We build careers, strengthen teams, and power
            IT organizations with talent that truly fits.
          </motion.p>
        </div>
      </section>

      {/* ── Photo Gallery ──────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-brand-navy text-3xl md:text-4xl mb-4">
              A Team Built for Results
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our people are our product. Meet the professionals dedicated to
              connecting exceptional IT talent with forward-thinking companies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                src: teamMeetingImg,
                alt: "EL-Shaddai team collaborating in a business meeting",
                caption: "Collaborative Team Culture",
              },
              {
                src: itExpertImg,
                alt: "IT expert at work",
                caption: "Expert Talent Network",
              },
              {
                src: techProsImg,
                alt: "Technology professionals",
                caption: "Technology Professionals",
              },
            ].map((img, i) => (
              <motion.div
                key={img.caption}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl shadow-card"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-64 md:h-72 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-display font-semibold text-white text-sm">
                    {img.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reasons Grid ──────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center mb-14"
          >
            <h2 className="font-display font-bold text-brand-navy text-3xl md:text-4xl mb-4">
              6 Reasons to Partner With Us
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From first call to successful placement, here's what sets
              EL-Shaddai apart.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                data-ocid={`why-us.reason.item.${i + 1}`}
                className="bg-white rounded-2xl p-6 shadow-card border border-border hover:border-brand-red/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center mb-4">
                  <reason.icon size={22} className="text-brand-red" />
                </div>
                <h3 className="font-display font-bold text-brand-navy text-lg mb-2">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-brand-navy">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="font-display font-bold text-white text-3xl md:text-4xl mb-4">
              Ready to Find Your Next{" "}
              <span className="text-brand-gold">IT Star?</span>
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Let's talk about your hiring needs. Our team is standing by to
              help you build the IT workforce of tomorrow.
            </p>
            <Link to="/contact" data-ocid="why-us.contact.primary_button">
              <Button
                size="lg"
                className="bg-brand-red hover:bg-brand-red/90 text-white font-display font-semibold px-10 py-6 text-base rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Get in Touch Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
