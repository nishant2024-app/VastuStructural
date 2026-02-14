import { FileText, Clock, AlertTriangle, CreditCard, Gavel, Mail, Phone } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Terms of Service | VastuStructural",
    description: "Terms and conditions for using P M and Associates architectural and Vastu services.",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6">
                        <Gavel size={16} />
                        Legal
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-foreground/50">
                        Last updated: February 2026
                    </p>
                </div>

                {/* Content */}
                <div className="bg-card/60 backdrop-blur-xl rounded-3xl border border-border p-8 md:p-12 space-y-8">
                    {/* Introduction */}
                    <section>
                        <h2 className="text-2xl font-black text-foreground mb-4 flex items-center gap-3">
                            <FileText size={24} className="text-primary" />
                            Agreement to Terms
                        </h2>
                        <p className="text-foreground/70 leading-relaxed">
                            By accessing or using VastuStructural.com and services provided by
                            P M and Associates, you agree to be bound by these Terms of Service.
                            If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    {/* Service Description */}
                    <section>
                        <h2 className="text-2xl font-black text-foreground mb-4">Our Services</h2>
                        <p className="text-foreground/70 leading-relaxed mb-4">
                            P M and Associates provides:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4 text-foreground/70">
                            <li>2D and 3D architectural floor plans</li>
                            <li>Structural engineering drawings</li>
                            <li>Vastu Shastra consultation and analysis</li>
                            <li>AI-powered construction cost estimation</li>
                            <li>Material quantity estimates</li>
                        </ul>
                    </section>

                    {/* Delivery Terms */}
                    <section className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                        <h2 className="text-xl font-black text-foreground mb-3 flex items-center gap-3">
                            <Clock size={20} className="text-primary" />
                            48-Hour Delivery Guarantee
                        </h2>
                        <p className="text-foreground/70 leading-relaxed">
                            For Basic plans (₹2,999), we guarantee delivery within <strong>48 hours</strong>
                            of receiving complete project requirements. Delivery times for Standard and
                            Premium packages are as specified on the product page. Delays may occur if
                            additional information is required from the client.
                        </p>
                    </section>

                    {/* Refund Policy */}
                    <section className="p-6 bg-warning/5 border border-warning/20 rounded-2xl">
                        <h2 className="text-xl font-black text-foreground mb-3 flex items-center gap-3">
                            <CreditCard size={20} className="text-warning" />
                            Refund Policy
                        </h2>
                        <p className="text-foreground/70 leading-relaxed">
                            As our services involve digital products and professional consultation,
                            <strong> payments are non-refundable</strong> once work has commenced.
                            However, we offer:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4 text-foreground/70 mt-3">
                            <li>Free revisions as per your plan (1-3 revisions based on package)</li>
                            <li>Full refund if we fail to deliver within the guaranteed timeframe</li>
                            <li>Partial refund if work has not yet started (within 24 hours of payment)</li>
                        </ul>
                    </section>

                    {/* AI Disclaimer */}
                    <section className="p-6 bg-accent/5 border border-accent/20 rounded-2xl">
                        <h2 className="text-xl font-black text-foreground mb-3 flex items-center gap-3">
                            <AlertTriangle size={20} className="text-accent" />
                            AI Estimates Disclaimer
                        </h2>
                        <p className="text-foreground/70 leading-relaxed">
                            Material quantity and cost estimates provided by our AI calculator are
                            <strong> for guidance purposes only</strong>. Actual requirements may vary
                            based on site conditions, material quality, local rates, and construction
                            methods. Final construction should always be verified by a licensed
                            structural engineer on-site.
                        </p>
                    </section>

                    {/* Professional Responsibility */}
                    <section>
                        <h2 className="text-2xl font-black text-foreground mb-4">Professional Responsibility</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4 text-foreground/70">
                            <li>All structural designs comply with IS (Indian Standard) codes</li>
                            <li>Vastu recommendations are based on traditional principles and may vary by interpretation</li>
                            <li>Site-specific conditions should be assessed by a local engineer before construction</li>
                            <li>We are not liable for construction defects arising from improper execution</li>
                            <li>Soil testing and foundation verification should be done on-site</li>
                        </ul>
                    </section>

                    {/* Intellectual Property */}
                    <section>
                        <h2 className="text-2xl font-black text-foreground mb-4">Intellectual Property</h2>
                        <p className="text-foreground/70 leading-relaxed">
                            Upon full payment, you receive a non-exclusive license to use the delivered
                            plans for your personal construction project. The original design remains
                            our intellectual property. Resale, redistribution, or commercial use of
                            our designs is prohibited without written consent.
                        </p>
                    </section>

                    {/* Limitation of Liability */}
                    <section>
                        <h2 className="text-2xl font-black text-foreground mb-4">Limitation of Liability</h2>
                        <p className="text-foreground/70 leading-relaxed">
                            P M and Associates shall not be liable for any indirect, incidental, or
                            consequential damages arising from the use of our services. Our total
                            liability shall not exceed the amount paid for the specific service in question.
                        </p>
                    </section>

                    {/* Governing Law */}
                    <section>
                        <h2 className="text-2xl font-black text-foreground mb-4">Governing Law</h2>
                        <p className="text-foreground/70 leading-relaxed">
                            These terms are governed by the laws of India. Any disputes shall be
                            resolved in the courts of Washim District, Maharashtra.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                        <h2 className="text-xl font-black text-foreground mb-4">Questions?</h2>
                        <p className="text-foreground/70 leading-relaxed mb-4">
                            For any questions about these Terms of Service:
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="tel:+919067969756"
                                className="flex items-center gap-2 text-primary hover:underline"
                            >
                                <Phone size={16} />
                                +91 9067969756
                            </a>
                            <a
                                href="mailto:contact@vastustructural.com"
                                className="flex items-center gap-2 text-primary hover:underline"
                            >
                                <Mail size={16} />
                                contact@vastustructural.com
                            </a>
                        </div>
                    </section>
                </div>

                {/* Back Link */}
                <div className="mt-8 text-center">
                    <Link
                        href="/"
                        className="text-foreground/50 hover:text-primary transition-colors"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
