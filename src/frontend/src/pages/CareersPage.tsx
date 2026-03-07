import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  Clock,
  Heart,
  MapPin,
  TrendingUp,
  Users,
} from "lucide-react";
import { type Variants, motion } from "motion/react";
import { JobType, useActiveJobListings } from "../hooks/useQueries";

const perks = [
  {
    icon: TrendingUp,
    title: "Career Growth",
    description:
      "Structured advancement paths with mentorship and professional development budgets.",
  },
  {
    icon: Heart,
    title: "Great Culture",
    description:
      "Collaborative, inclusive environment where every voice is heard and valued.",
  },
  {
    icon: Award,
    title: "Competitive Pay",
    description:
      "Market-leading compensation with performance bonuses and equity opportunities.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description:
      "Work alongside industry veterans and top performers who inspire excellence.",
  },
];

function jobTypeLabel(jt: JobType): string {
  switch (jt) {
    case JobType.fullTime:
      return "Full-Time";
    case JobType.partTime:
      return "Part-Time";
    case JobType.contract:
      return "Contract";
    default:
      return String(jt);
  }
}

function jobTypeBadgeClass(jt: JobType): string {
  switch (jt) {
    case JobType.fullTime:
      return "bg-brand-navy/10 text-brand-navy border-0";
    case JobType.contract:
      return "bg-brand-gold/20 text-amber-800 border-0";
    case JobType.partTime:
      return "bg-brand-red/10 text-brand-red border-0";
    default:
      return "bg-muted text-muted-foreground border-0";
  }
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CareersPage() {
  const { data: jobs, isLoading, isError } = useActiveJobListings();

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[50vh] flex items-center overflow-hidden"
        data-ocid="careers.hero.section"
      >
        <img
          src="/assets/uploads/tumisu-hiring-3580378_1920-4.png"
          alt="Careers at EL-Shaddai Technologies Inc"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/85 via-brand-navy/60 to-brand-navy/20" />
        <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-xs font-display font-semibold uppercase tracking-widest text-brand-gold mb-4">
              Join Our Team
            </span>
            <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-6 max-w-2xl">
              Build Your Career With Us
            </h1>
            <p className="text-white/80 max-w-xl text-lg leading-relaxed">
              Join a team of passionate talent professionals making a real
              difference in people's careers and companies' success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Why Work With Us ─────────────────────────────────────────────── */}
      <section
        className="py-16 lg:py-24 bg-white"
        data-ocid="careers.why.section"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-xs font-display font-semibold uppercase tracking-widest text-brand-red mb-3">
                Why EL-Shaddai
              </span>
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-brand-navy mb-6">
                Why Work With Us?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At EL-Shaddai Technologies Inc, we believe our people are our
                greatest asset. We invest in your growth, celebrate your wins,
                and create an environment where exceptional work thrives.
              </p>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 gap-4"
              >
                {perks.map((perk) => {
                  const Icon = perk.icon;
                  return (
                    <motion.div
                      key={perk.title}
                      variants={itemVariants}
                      className="flex gap-3"
                    >
                      <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={18} className="text-brand-red" />
                      </div>
                      <div>
                        <p className="font-display font-semibold text-brand-navy text-sm">
                          {perk.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          {perk.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-brand-navy/5 rounded-2xl -z-10" />
              <img
                src="/assets/uploads/tumisu-expert-5442081_1920-3.jpg"
                alt="Talent expert reviewing candidates"
                className="w-full h-80 lg:h-96 object-cover rounded-xl shadow-navy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Job Listings ─────────────────────────────────────────────────── */}
      <section
        className="py-16 lg:py-24 bg-brand-light"
        data-ocid="careers.jobs.section"
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
              Open Positions
            </span>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-brand-navy mb-4">
              Current Opportunities
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Explore our open roles and find your next career move with
              EL-Shaddai Technologies Inc.
            </p>
          </motion.div>

          {/* Loading */}
          {isLoading && (
            <div className="space-y-4" data-ocid="careers.loading_state">
              {Array.from({ length: 3 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
                <Card key={i} className="border-0 shadow-card">
                  <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-48 mb-2" />
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-12 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="text-center py-12" data-ocid="careers.error_state">
              <p className="text-destructive font-medium">
                Failed to load job listings. Please try again.
              </p>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !isError && (!jobs || jobs.length === 0) && (
            <div
              className="text-center py-20 bg-white rounded-2xl shadow-card"
              data-ocid="careers.empty_state"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-navy/10 flex items-center justify-center mx-auto mb-4">
                <Briefcase size={28} className="text-brand-navy/40" />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-navy mb-2">
                No Open Positions Right Now
              </h3>
              <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                We don't have any active openings at the moment, but we're
                always looking for great talent. Send us your resume!
              </p>
              <Link to="/contact" data-ocid="careers.empty.contact.button">
                <Button className="bg-brand-navy hover:bg-brand-navy/90 text-white font-display font-semibold gap-2">
                  Get in Touch <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          )}

          {/* Job listings */}
          {!isLoading && jobs && jobs.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {jobs.map((job, i) => (
                <motion.div key={`${job.title}-${i}`} variants={itemVariants}>
                  <Card
                    className="border-0 shadow-card hover:shadow-navy transition-all duration-300 bg-white"
                    data-ocid={`careers.jobs.item.${i + 1}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <CardTitle className="font-display text-xl text-brand-navy">
                          {job.title}
                        </CardTitle>
                        <Badge
                          variant="secondary"
                          className={jobTypeBadgeClass(job.jobType)}
                        >
                          {jobTypeLabel(job.jobType)}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building2 size={14} className="text-brand-red" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} className="text-brand-red" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} className="text-brand-red" />
                          {jobTypeLabel(job.jobType)}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {job.description}
                      </p>
                      {job.requirements && job.requirements.length > 0 && (
                        <div>
                          <p className="text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                            Requirements
                          </p>
                          <ul className="flex flex-wrap gap-2">
                            {job.requirements.map((req) => (
                              <li key={req}>
                                <Badge
                                  variant="outline"
                                  className="text-xs border-border text-muted-foreground"
                                >
                                  {req}
                                </Badge>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="mt-4">
                        <Link
                          to="/contact"
                          data-ocid={`careers.jobs.apply.button.${i + 1}`}
                        >
                          <Button
                            size="sm"
                            className="bg-brand-red hover:bg-brand-red/90 text-white font-display font-semibold"
                          >
                            Apply Now
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
