import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, Package } from "lucide-react";
import { type Variants, motion } from "motion/react";
import { useActiveProductListings } from "../hooks/useQueries";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProductsPage() {
  const { data: products, isLoading, isError } = useActiveProductListings();

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative py-20 lg:py-32 bg-brand-navy text-white overflow-hidden"
        data-ocid="products.hero.section"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-red/40 to-brand-gold/20" />
        </div>
        <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-xs font-display font-semibold uppercase tracking-widest text-brand-gold mb-4">
              Our Offerings
            </span>
            <h1 className="font-display text-4xl lg:text-6xl font-bold mb-6 max-w-2xl">
              Technology Products & Solutions
            </h1>
            <p className="text-white/80 max-w-xl text-lg leading-relaxed">
              Discover our curated suite of technology products and platform
              solutions designed to accelerate your business growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Products Grid ────────────────────────────────────────────────── */}
      <section
        className="py-16 lg:py-24 bg-brand-light"
        data-ocid="products.list.section"
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
              Our Product Portfolio
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Purpose-built solutions to streamline your technology operations
              and talent management.
            </p>
          </motion.div>

          {/* Loading state */}
          {isLoading && (
            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="products.loading_state"
            >
              {Array.from({ length: 3 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
                <Card key={i} className="border-0 shadow-card">
                  <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-16 w-full mb-4" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Error state */}
          {isError && (
            <div className="text-center py-12" data-ocid="products.error_state">
              <p className="text-destructive font-medium">
                Failed to load products. Please try again.
              </p>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !isError && (!products || products.length === 0) && (
            <div
              className="text-center py-20 bg-white rounded-2xl shadow-card"
              data-ocid="products.empty_state"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-navy/10 flex items-center justify-center mx-auto mb-4">
                <Package size={28} className="text-brand-navy/40" />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-navy mb-2">
                Products Coming Soon
              </h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                We're finalizing our product catalog. Check back soon for our
                exciting lineup of technology solutions.
              </p>
            </div>
          )}

          {/* Products grid */}
          {!isLoading && products && products.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {products.map((product, i) => (
                <motion.div
                  key={`${product.name}-${i}`}
                  variants={itemVariants}
                >
                  <Card
                    className="h-full border-0 shadow-card hover:shadow-navy transition-all duration-300 hover:-translate-y-1 bg-white"
                    data-ocid={`products.item.${i + 1}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center shrink-0">
                          <Package size={18} className="text-brand-red" />
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-brand-navy/10 text-brand-navy border-0"
                        >
                          Active
                        </Badge>
                      </div>
                      <CardTitle className="font-display text-lg text-brand-navy">
                        {product.name}
                      </CardTitle>
                      {product.tagline && (
                        <p className="text-sm text-brand-red font-medium">
                          {product.tagline}
                        </p>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {product.description}
                      </p>
                      {product.features && product.features.length > 0 && (
                        <div>
                          <p className="text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                            Key Features
                          </p>
                          <ul className="space-y-1.5">
                            {product.features.map((feat) => (
                              <li key={feat} className="flex items-start gap-2">
                                <CheckCircle2
                                  size={14}
                                  className="text-brand-red mt-0.5 shrink-0"
                                />
                                <span className="text-xs text-foreground">
                                  {feat}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
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
