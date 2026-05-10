/*
 * PreciseHire — Contact
 * Style: Trusted Modernism. Two-column: editorial copy + brand-styled form on
 * cream surface; navy submit button uses coral hover state.
 */
import { useState, type FormEvent } from "react";
import { Mail, Phone, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { COMPANY, ASSETS } from "@/content/site";

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    // Subject line that shows up in your Info@ inbox
    const firstName = String(formData.get("firstName") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const subjectBits = ["PreciseHire website lead", company, firstName].filter(Boolean);
    formData.append("_subject", subjectBits.join(" — "));

    // Honeypot: real users won't fill _gotcha; bots often will
    if (formData.get("_gotcha")) {
      toast.success("Thanks — a Precise Hire specialist will be in touch shortly.");
      formEl.reset();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/xnjworvg", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        formEl.reset();
        toast.success("Thanks — a Precise Hire specialist will be in touch shortly.");
      } else {
        const data = await res.json().catch(() => ({} as Record<string, unknown>));
        const msg = (data as { errors?: { message?: string }[] })?.errors?.[0]?.message;
        toast.error(msg || "Something went wrong sending your message. Please call (866) 773-5486 or email Info@precisehire.com.");
      }
    } catch {
      toast.error("Network error. Please call (866) 773-5486 or email Info@precisehire.com.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SEO
        title="Contact Precise Hire — Background Check Specialists"
        description="Speak to a Precise Hire specialist about pricing, packages, ATS integrations, or compliance. Most accounts are set up the same business day."
        canonical="https://precisehire.com/contact"
      />

      <section className="relative overflow-hidden">
        <img src={ASSETS.swooshCoral} alt="" aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 w-[460px] opacity-50 rotate-[18deg]" />
        <div className="container pt-20 lg:pt-28 pb-16 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">Contact</span>
              <h1 className="display-xl mt-4 text-[#0B1F3A]">Tell us what you're hiring for.</h1>
              <p className="mt-6 text-lg text-[#0B1F3A]/75 leading-relaxed">
                Share a few details and a real specialist will get back the same
                business day with a recommended package and pricing.
              </p>
              <div className="mt-8 grid gap-3 text-[#0B1F3A]/85">
                <a href={`tel:${COMPANY.phoneRaw}`} className="inline-flex items-center gap-3 hover:text-[#B7232A]"><Phone className="size-4 text-[#B7232A]" /> {COMPANY.phone}</a>
                <a href={`mailto:${COMPANY.email}`} className="inline-flex items-center gap-3 hover:text-[#B7232A]"><Mail className="size-4 text-[#B7232A]" /> {COMPANY.email}</a>
              </div>
              <div className="mt-8 p-5 rounded-2xl bg-[#FFFCF7] border border-[#0B1F3A]/10 text-sm text-[#0B1F3A]/75">
                <p><strong className="text-[#0B1F3A]">Hours:</strong> Mon–Fri, 7am–7pm CT</p>
                <p><strong className="text-[#0B1F3A]">Response time:</strong> Under one hour during business hours</p>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <form onSubmit={onSubmit} className="rounded-3xl bg-white border border-[#0B1F3A]/10 p-6 lg:p-8 grid gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field name="firstName" label="First name" required />
                  <Field name="lastName" label="Last name" required />
                </div>
                <Field name="email" label="Work email" type="email" required />
                <Field name="company" label="Company" required />
                <div className="grid sm:grid-cols-2 gap-5">
                  <SelectField name="hires" label="Hires per month" options={["1–10", "10–50", "50–250", "250+"]} required />
                  <SelectField name="industry" label="Industry" options={["Healthcare", "Transportation & Logistics", "Staffing", "Finance", "Retail & Hospitality", "Nonprofit", "Other"]} required />
                </div>
                <Field name="message" label="What are you hiring for?" textarea />
                {/* Spam honeypot (hidden from real users) */}
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-5000px", height: 0, width: 0, opacity: 0 }} />
                <button type="submit" disabled={submitting} className="btn-coral inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold disabled:opacity-70">
                  {submitting ? <><Loader2 className="size-4 animate-spin" /> Sending</> : <>Send message <ArrowRight className="size-4" /></>}
                </button>
                <p className="text-xs text-[#0B1F3A]/55">By submitting, you agree to our privacy policy. We'll never share your details with anyone.</p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ name, label, type = "text", textarea, required }: { name: string; label: string; type?: string; textarea?: boolean; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-[#0B1F3A]/85">{label}{required && <span className="text-[#B7232A]"> *</span>}</span>
      {textarea ? (
        <textarea name={name} required={required} rows={4} className="mt-2 w-full rounded-xl border border-[#0B1F3A]/15 bg-white px-4 py-3 text-[15px] text-[#0B1F3A] placeholder:text-[#0B1F3A]/40 focus:outline-none focus:border-[#B7232A] focus:ring-2 focus:ring-[#B7232A]/20" />
      ) : (
        <input name={name} type={type} required={required} className="mt-2 w-full rounded-xl border border-[#0B1F3A]/15 bg-white px-4 py-3 text-[15px] text-[#0B1F3A] placeholder:text-[#0B1F3A]/40 focus:outline-none focus:border-[#B7232A] focus:ring-2 focus:ring-[#B7232A]/20" />
      )}
    </label>
  );
}

function SelectField({ name, label, options, required }: { name: string; label: string; options: string[]; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-[#0B1F3A]/85">{label}{required && <span className="text-[#B7232A]"> *</span>}</span>
      <select name={name} required={required} defaultValue="" className="mt-2 w-full rounded-xl border border-[#0B1F3A]/15 bg-white px-4 py-3 text-[15px] text-[#0B1F3A] focus:outline-none focus:border-[#B7232A] focus:ring-2 focus:ring-[#B7232A]/20">
        <option value="" disabled>Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
