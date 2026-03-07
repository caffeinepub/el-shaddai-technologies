import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Building2,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  Send,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitContactForm } from "../hooks/useQueries";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useSubmitContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await submitMutation.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        message: form.message,
      });
      setSubmitted(true);
      toast.success("Message sent successfully! We'll be in touch soon.");
    } catch {
      toast.error(
        "Failed to send message. Please try again or email us directly.",
      );
    }
  };

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative py-20 lg:py-32 bg-brand-navy text-white overflow-hidden"
        data-ocid="contact.hero.section"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy to-brand-red/30 opacity-60" />
        <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-xs font-display font-semibold uppercase tracking-widest text-brand-gold mb-4">
              Get In Touch
            </span>
            <h1 className="font-display text-4xl lg:text-6xl font-bold mb-6 max-w-2xl">
              Let's Start a Conversation
            </h1>
            <p className="text-white/80 max-w-xl text-lg leading-relaxed">
              Whether you need to fill a critical role, explore our services, or
              simply want to learn more — we're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Section ──────────────────────────────────────────────── */}
      <section
        className="py-16 lg:py-24 bg-brand-light"
        data-ocid="contact.main.section"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <span className="inline-block text-xs font-display font-semibold uppercase tracking-widest text-brand-red mb-3">
                Contact Information
              </span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-navy mb-6">
                Reach Out to Us
              </h2>

              <Card className="border-0 shadow-card bg-brand-navy text-white mb-6">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-brand-red/20 border-2 border-brand-gold/40 flex items-center justify-center">
                      <span className="font-display text-xl font-bold text-brand-gold">
                        SC
                      </span>
                    </div>
                    <div>
                      <CardTitle className="font-display text-lg text-white">
                        Shanthi Chittala
                      </CardTitle>
                      <p className="text-brand-gold text-sm font-medium">
                        Founder & CEO
                      </p>
                      <p className="text-white/60 text-xs">
                        EL-Shaddai Technologies
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <a
                    href="tel:+17329131541"
                    className="flex items-center gap-3 group"
                    data-ocid="contact.phone.link"
                  >
                    <div className="w-9 h-9 rounded-lg bg-brand-red/20 flex items-center justify-center group-hover:bg-brand-red/30 transition-colors">
                      <Phone size={16} className="text-brand-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wide">
                        Phone
                      </p>
                      <p className="text-white font-medium text-sm">
                        +1 732-913-1541
                      </p>
                    </div>
                  </a>
                  <a
                    href="mailto:shg@el-shaddaitechnologies.com"
                    className="flex items-center gap-3 group"
                    data-ocid="contact.email.link"
                  >
                    <div className="w-9 h-9 rounded-lg bg-brand-red/20 flex items-center justify-center group-hover:bg-brand-red/30 transition-colors">
                      <Mail size={16} className="text-brand-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wide">
                        Email
                      </p>
                      <p className="text-white font-medium text-sm break-all">
                        shg@el-shaddaitechnologies.com
                      </p>
                    </div>
                  </a>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-red/20 flex items-center justify-center">
                      <Building2 size={16} className="text-brand-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wide">
                        Company
                      </p>
                      <p className="text-white font-medium text-sm">
                        EL-Shaddai Technologies Inc
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-white rounded-xl p-6 shadow-card">
                <h3 className="font-display font-bold text-brand-navy mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-red inline-block" />
                  Office Hours
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday – Friday</span>
                    <span className="font-medium text-foreground">
                      9:00 AM – 6:00 PM EST
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium text-foreground">
                      10:00 AM – 2:00 PM EST
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-muted-foreground">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-3"
            >
              <Card className="border-0 shadow-card bg-white">
                <CardHeader>
                  <CardTitle className="font-display text-2xl text-brand-navy">
                    Send Us a Message
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">
                    Fill in the form below and we'll get back to you within 24
                    hours.
                  </p>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="text-center py-12"
                      data-ocid="contact.form.success_state"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={32} className="text-green-600" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-brand-navy mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                        Thank you for reaching out. Shanthi or a team member
                        will respond within 24 hours.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSubmitted(false);
                          setForm({
                            name: "",
                            email: "",
                            phone: "",
                            message: "",
                          });
                        }}
                        className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-display font-semibold"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      data-ocid="contact.form.panel"
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="contact-name"
                            className="font-display font-medium text-sm"
                          >
                            Full Name <span className="text-brand-red">*</span>
                          </Label>
                          <div className="relative">
                            <User
                              size={16}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                            <Input
                              id="contact-name"
                              data-ocid="contact.name.input"
                              placeholder="John Smith"
                              value={form.name}
                              onChange={(e) =>
                                setForm((p) => ({ ...p, name: e.target.value }))
                              }
                              className="pl-9 border-input focus:border-brand-red focus-visible:ring-brand-red/20"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="contact-email"
                            className="font-display font-medium text-sm"
                          >
                            Email Address{" "}
                            <span className="text-brand-red">*</span>
                          </Label>
                          <div className="relative">
                            <Mail
                              size={16}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                            <Input
                              id="contact-email"
                              data-ocid="contact.email.input"
                              type="email"
                              placeholder="john@company.com"
                              value={form.email}
                              onChange={(e) =>
                                setForm((p) => ({
                                  ...p,
                                  email: e.target.value,
                                }))
                              }
                              className="pl-9 border-input focus:border-brand-red focus-visible:ring-brand-red/20"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label
                          htmlFor="contact-phone"
                          className="font-display font-medium text-sm"
                        >
                          Phone Number{" "}
                          <span className="text-muted-foreground text-xs">
                            (Optional)
                          </span>
                        </Label>
                        <div className="relative">
                          <Phone
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          />
                          <Input
                            id="contact-phone"
                            data-ocid="contact.phone.input"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={form.phone}
                            onChange={(e) =>
                              setForm((p) => ({ ...p, phone: e.target.value }))
                            }
                            className="pl-9 border-input focus:border-brand-red focus-visible:ring-brand-red/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label
                          htmlFor="contact-message"
                          className="font-display font-medium text-sm"
                        >
                          Message <span className="text-brand-red">*</span>
                        </Label>
                        <Textarea
                          id="contact-message"
                          data-ocid="contact.message.textarea"
                          placeholder="Tell us about your hiring needs, the roles you're looking to fill, or any questions you have..."
                          value={form.message}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, message: e.target.value }))
                          }
                          className="min-h-32 border-input focus:border-brand-red focus-visible:ring-brand-red/20"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        data-ocid="contact.form.submit_button"
                        disabled={submitMutation.isPending}
                        className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-display font-bold gap-2 h-12"
                      >
                        {submitMutation.isPending ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Send Message
                          </>
                        )}
                      </Button>

                      {submitMutation.isError && (
                        <p
                          className="text-sm text-destructive text-center"
                          data-ocid="contact.form.error_state"
                        >
                          Something went wrong. Please email us directly at
                          shg@el-shaddaitechnologies.com
                        </p>
                      )}
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
