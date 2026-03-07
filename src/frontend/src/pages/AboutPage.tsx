import { Card, CardContent } from "@/components/ui/card";
import { Eye, Globe, Heart, Shield, Target, Zap } from "lucide-react";
import { type Variants, motion } from "motion/react";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards in every placement, every interaction, and every solution we deliver.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description:
      "Transparency and honesty form the foundation of every relationship we build with clients and candidates.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "We continuously evolve our processes and leverage emerging technologies to stay ahead in talent acquisition.",
  },
  {
    icon: Globe,
    title: "Diversity",
    description:
      "We champion inclusive hiring practices and actively build diverse talent pipelines for every engagement.",
  },
  {
    icon: Shield,
    title: "Partnership",
    description:
      "We act as a true extension of your HR team — aligned with your goals, culture, and long-term success.",
  },
  {
    icon: Eye,
    title: "Vision",
    description:
      "We don't just fill roles; we help you architect the future team your business needs to thrive.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AboutPage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative py-20 lg:py-32 bg-brand-navy text-white overflow-hidden"
        data-ocid="about.hero.section"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy/70" />
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
          <img
            src="/assets/uploads/089photoshootings-people-1979261_1920-5.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-xs font-display font-semibold uppercase tracking-widest text-brand-gold mb-4">
              Our Story
            </span>
            <h1 className="font-display text-4xl lg:text-6xl font-bold mb-6 max-w-2xl">
              About EL-Shaddai Technologies Inc
            </h1>
            <p className="text-white/80 max-w-xl text-lg leading-relaxed">
              Founded on faith, driven by excellence. We are a premier IT
              staffing firm dedicated to connecting America's businesses with
              world-class technology talent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Mission & Vision ──────────────────────────────────────────────── */}
      <section
        className="py-16 lg:py-24 bg-white"
        data-ocid="about.mission.section"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="h-1 w-12 bg-brand-red mb-6" />
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-navy mb-4">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To empower businesses by providing innovative, efficient, and
                reliable IT talent solutions that drive growth, foster
                innovation, and create lasting value. We serve as the critical
                bridge between exceptional technology professionals and the
                organizations that need them.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every placement we make is guided by a deep understanding of
                both our clients' technical requirements and our candidates'
                career aspirations — ensuring success for all parties.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="h-1 w-12 bg-brand-gold mb-6" />
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-navy mb-4">
                Our Vision
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To be the most trusted name in IT staffing across North America
                — recognized for our integrity, precision, and transformative
                impact on the careers and companies we serve.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We envision a future where every technology company, regardless
                of size, has access to the talent it needs to fulfill its
                potential. That's the future we're building every day.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Team Photo ──────────────────────────────────────────────────── */}
      <section className="bg-brand-light py-0" data-ocid="about.team.section">
        <div className="relative w-full h-80 lg:h-[500px] overflow-hidden">
          <img
            src="/assets/uploads/089photoshootings-people-1979261_1920-5.jpg"
            alt="Business team meeting and collaboration"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-white font-display font-bold text-2xl lg:text-3xl drop-shadow-lg">
              Building Partnerships That Last
            </p>
          </div>
        </div>
      </section>

      {/* ── Founder Spotlight ────────────────────────────────────────────── */}
      <section
        className="py-16 lg:py-24 bg-white"
        data-ocid="about.founder.section"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-xs font-display font-semibold uppercase tracking-widest text-brand-red mb-3">
              Leadership
            </span>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-brand-navy">
              Founder Spotlight
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            <Card className="border-0 shadow-card overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-5">
                  <div className="md:col-span-2 bg-gradient-to-br from-brand-navy to-brand-navy/80 p-10 flex flex-col items-center justify-center text-white text-center">
                    <div className="w-24 h-24 rounded-full bg-brand-red/20 border-4 border-brand-gold/40 flex items-center justify-center mb-4">
                      <span className="font-display text-3xl font-bold text-brand-gold">
                        SC
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold">
                      Shanthi Chittala
                    </h3>
                    <p className="text-brand-gold text-sm mt-1 font-medium">
                      Founder & CEO
                    </p>
                    <p className="text-white/60 text-xs mt-1">
                      EL-Shaddai Technologies Inc
                    </p>
                  </div>
                  <div className="md:col-span-3 p-8 lg:p-10 flex flex-col justify-center">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Shanthi Chittala founded EL-Shaddai Technologies Inc with
                      a clear vision: to create a staffing firm that genuinely
                      cares about both clients and candidates. With extensive
                      experience in IT workforce solutions, she built the
                      company on principles of trust, transparency, and
                      excellence.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Under her leadership, EL-Shaddai Technologies Inc has
                      grown into a respected name in IT staffing, known for its
                      rigorous vetting process and deep industry relationships.
                    </p>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2 text-brand-navy font-medium">
                        <span className="text-brand-red">📞</span> +1
                        732-913-1541
                      </p>
                      <p className="flex items-center gap-2 text-brand-navy font-medium">
                        <span className="text-brand-red">✉️</span>{" "}
                        shg@el-shaddaitechnologies.com
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <section
        className="py-16 lg:py-24 bg-brand-light"
        data-ocid="about.values.section"
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
              What We Stand For
            </span>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-brand-navy">
              Our Core Values
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div key={val.title} variants={itemVariants}>
                  <Card
                    className="h-full border-0 shadow-card hover:shadow-navy transition-all duration-300 hover:-translate-y-1 bg-white"
                    data-ocid={`about.values.item.${i + 1}`}
                  >
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-brand-navy/10 flex items-center justify-center mb-4">
                        <Icon size={22} className="text-brand-navy" />
                      </div>
                      <h3 className="font-display font-bold text-brand-navy mb-2">
                        {val.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {val.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
