import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock,
  Network,
  Search,
  Users,
} from "lucide-react";
import { type Variants, motion } from "motion/react";
import accentureLogo from "/assets/generated/client-accenture-transparent.dim_200x100.png";
import ciscoLogo from "/assets/generated/client-cisco-transparent.dim_200x100.png";
import deloitteLogo from "/assets/generated/client-deloitte-transparent.dim_200x100.png";
import ibmLogo from "/assets/generated/client-ibm-transparent.dim_200x100.png";
import infosysLogo from "/assets/generated/client-infosys-transparent.dim_200x100.png";
import microsoftLogo from "/assets/generated/client-microsoft-transparent.dim_200x100.png";
import oracleLogo from "/assets/generated/client-oracle-transparent.dim_200x100.png";
import sapLogo from "/assets/generated/client-sap-transparent.dim_200x100.png";

const services = [
  {
    icon: Users,
    title: "IT Staffing",
    badge: "Most Popular",
    description:
      "Our flagship IT staffing service connects you with pre-vetted technology professionals across all skill levels and specializations. Whether you need front-end developers, cloud architects, or cybersecurity experts, we deliver.",
    features: [
      "Rapid placement within 48-72 hours",
      "Rigorous technical screening process",
      "Skill-matched candidates only",
      "Ongoing performance support",
    ],
  },
  {
    icon: Briefcase,
    title: "Direct Hire",
    badge: "Full-Time",
    description:
      "For organizations seeking to add permanent members to their technology teams, our direct hire service provides end-to-end recruitment with cultural fit assessment and comprehensive background verification.",
    features: [
      "Complete candidate vetting",
      "Cultural alignment assessment",
      "90-day replacement guarantee",
      "Salary benchmarking included",
    ],
  },
  {
    icon: Clock,
    title: "Contract Staffing",
    badge: "Flexible",
    description:
      "Scale your team up or down with flexible contract professionals. Perfect for project-based work, seasonal demands, or bridging gaps in your permanent workforce.",
    features: [
      "Week-to-week or multi-year contracts",
      "Full benefits administration",
      "Payrolling and HR compliance",
      "Seamless onboarding support",
    ],
  },
  {
    icon: Search,
    title: "Executive Search",
    badge: "C-Suite",
    description:
      "Finding transformational technology leaders requires a specialized approach. Our executive search practice is dedicated to identifying and attracting CTO, VP Engineering, and CISO-level talent.",
    features: [
      "Confidential search available",
      "Market mapping and analysis",
      "Comprehensive leadership assessments",
      "Negotiation and offer management",
    ],
  },
  {
    icon: Network,
    title: "Workforce Solutions",
    badge: "Enterprise",
    description:
      "For large organizations with complex talent needs, our workforce solutions offer Recruitment Process Outsourcing (RPO), Managed Service Programs (MSP), and strategic workforce planning.",
    features: [
      "RPO and MSP programs",
      "Vendor management system integration",
      "Analytics and workforce reporting",
      "Dedicated program management team",
    ],
  },
];

const clients = [
  { name: "Microsoft", sector: "Technology", logo: microsoftLogo },
  { name: "IBM", sector: "Enterprise IT", logo: ibmLogo },
  { name: "Deloitte", sector: "Consulting", logo: deloitteLogo },
  { name: "Accenture", sector: "Professional Services", logo: accentureLogo },
  { name: "Oracle", sector: "Cloud & Database", logo: oracleLogo },
  { name: "Cisco", sector: "Networking", logo: ciscoLogo },
  { name: "SAP", sector: "Enterprise Software", logo: sapLogo },
  { name: "Infosys", sector: "IT Services", logo: infosysLogo },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesPage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative py-20 lg:py-32 bg-brand-navy text-white overflow-hidden"
        data-ocid="services.hero.section"
      >
        <div className="absolute inset-0">
          <img
            src="/assets/uploads/tumisu-expert-5442081_1920-3.jpg"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/60" />
        </div>
        <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-xs font-display font-semibold uppercase tracking-widest text-brand-gold mb-4">
              What We Offer
            </span>
            <h1 className="font-display text-4xl lg:text-6xl font-bold mb-6 max-w-2xl">
              Comprehensive IT Staffing Services
            </h1>
            <p className="text-white/80 max-w-xl text-lg leading-relaxed">
              From contract placements to executive search, we deliver tailored
              talent solutions that align with your business objectives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Image Strip ─────────────────────────────────────────── */}
      <div className="relative h-56 lg:h-72 overflow-hidden">
        <img
          src="/assets/uploads/tumisu-expert-5442081_1920-3.jpg"
          alt="IT staffing expert analyzing talent"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-red/70 to-transparent flex items-center">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-white font-display text-xl lg:text-3xl font-bold max-w-md drop-shadow">
                Expert talent matching for every technology role
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Services Grid ────────────────────────────────────────────────── */}
      <section
        className="py-16 lg:py-24 bg-brand-light"
        data-ocid="services.list.section"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-brand-navy mb-4">
              Our Service Portfolio
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every service is designed to solve real talent challenges and
              deliver measurable business impact.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={svc.title}
                  variants={itemVariants}
                  className={i === 4 ? "md:col-span-2 lg:col-span-1" : ""}
                >
                  <Card
                    className="h-full border-0 shadow-card hover:shadow-navy transition-all duration-300 hover:-translate-y-1 bg-white"
                    data-ocid={`services.item.${i + 1}`}
                  >
                    <CardContent className="p-6 lg:p-8 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center">
                          <Icon size={22} className="text-brand-red" />
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-brand-navy/10 text-brand-navy border-0"
                        >
                          {svc.badge}
                        </Badge>
                      </div>
                      <h3 className="font-display text-xl font-bold text-brand-navy mb-3">
                        {svc.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                        {svc.description}
                      </p>
                      <ul className="space-y-2">
                        {svc.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2">
                            <CheckCircle2
                              size={16}
                              className="text-brand-red mt-0.5 shrink-0"
                            />
                            <span className="text-xs text-foreground">
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Our Clients ──────────────────────────────────────────────────── */}
      <section
        className="py-16 lg:py-24 bg-white"
        data-ocid="services.clients.section"
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
              Our Network
            </span>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-brand-navy mb-4">
              Trusted By Leading Organizations
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We are proud to partner with some of the world's most respected
              technology and enterprise companies.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {clients.map((client, i) => (
              <motion.div
                key={client.name}
                variants={itemVariants}
                data-ocid={`services.clients.item.${i + 1}`}
              >
                <Card className="group h-full border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-red/30 transition-all duration-300 hover:-translate-y-1 bg-white">
                  <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                    <div className="h-14 flex items-center justify-center">
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="max-h-12 max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-display font-bold text-brand-navy text-base leading-tight">
                        {client.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {client.sector}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section
        className="py-16 bg-brand-navy text-white"
        data-ocid="services.cta.section"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Find the Right Service for Your Needs
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Not sure which service fits best? Our consultants will guide you
              to the perfect talent solution.
            </p>
            <Link to="/contact" data-ocid="services.cta.contact.button">
              <Button
                size="lg"
                className="bg-brand-red hover:bg-brand-red/90 text-white font-display font-bold gap-2"
              >
                Talk to a Consultant <ArrowRight size={16} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
