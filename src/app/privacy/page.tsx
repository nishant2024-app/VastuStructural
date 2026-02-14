import { Shield, Lock, Eye, FileText, Mail, Phone } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Privacy Policy | VastuStructural",
    description: "Learn how P M and Associates protects your personal information and data.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6">
                        <Shield size={16} />
                        Legal
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                        Privacy Policy
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
                            <Lock size={24} className="text-primary" />
                            Introduction
                        </h2>
                        <p className="text-foreground/70 leading-relaxed">
                            P M and Associates (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates VastuStructural.com.
                            This Privacy Policy explains how we collect, use, and protect your personal
                            information when you use our website and services.
                        </p>
                    </section>

                    {/* Data Collection */}
                    <section>
                        <h2 className="text-2xl font-black text-foreground mb-4 flex items-center gap-3">
                            <Eye size={24} className="text-primary" />
                            Information We Collect
                        </h2>
                        <div className="space-y-4 text-foreground/70">
                            <p className="leading-relaxed">We collect the following types of information:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li><strong>Personal Information:</strong> Name, phone number, email address</li>
                                <li><strong>Project Details:</strong> Plot dimensions, location, soil reports</li>
                                <li><strong>Payment Information:</strong> Transaction IDs (processed by Razorpay)</li>
                                <li><strong>Communication Data:</strong> Chat conversations with our AI assistant</li>
                                <li><strong>Usage Data:</strong> Browser type, IP address, pages visited</li>
                            </ul>
                        </div>
                    </section>

                    {/* Payment Processing */}
                    <section className="p-6 bg-success/5 border border-success/20 rounded-2xl">
                        <h2 className="text-xl font-black text-foreground mb-3 flex items-center gap-3">
                            <Shield size={20} className="text-success" />
                            Payment Security
                        </h2>
                        <p className="text-foreground/70 leading-relaxed">
                            All payments are processed securely through <strong>Razorpay</strong>, a PCI-DSS
                            compliant payment gateway. We do <strong>not</strong> store any credit card numbers,
                            CVV codes, or UPI PINs on our servers. Your financial data is handled entirely
                            by Razorpay in accordance with bank-level security standards.
                        </p>
                    </section>

                    {/* How We Use Data */}
                    <section>
                        <h2 className="text-2xl font-black text-foreground mb-4 flex items-center gap-3">
                            <FileText size={24} className="text-primary" />
                            How We Use Your Information
                        </h2>
                        <ul className="list-disc list-inside space-y-2 ml-4 text-foreground/70">
                            <li>To process and deliver your architectural plans</li>
                            <li>To provide Vastu consultancy and AI-powered analysis</li>
                            <li>To communicate project updates and delivery timelines</li>
                            <li>To send order confirmations and receipts</li>
                            <li>To improve our services and website experience</li>
                            <li>To respond to customer inquiries and support requests</li>
                        </ul>
                    </section>

                    {/* Data Protection */}
                    <section>
                        <h2 className="text-2xl font-black text-foreground mb-4">Data Protection</h2>
                        <p className="text-foreground/70 leading-relaxed">
                            We implement industry-standard security measures to protect your personal
                            information. Your data is stored on secure servers and is accessible only
                            to authorized personnel. We do not sell, trade, or rent your personal
                            information to third parties.
                        </p>
                    </section>

                    {/* Data Retention */}
                    <section>
                        <h2 className="text-2xl font-black text-foreground mb-4">Data Retention</h2>
                        <p className="text-foreground/70 leading-relaxed">
                            We retain your personal information for as long as necessary to provide
                            our services and fulfill the purposes outlined in this policy. Project
                            files and architectural plans are retained for a minimum of 5 years for
                            reference and revision purposes.
                        </p>
                    </section>

                    {/* Your Rights */}
                    <section>
                        <h2 className="text-2xl font-black text-foreground mb-4">Your Rights</h2>
                        <p className="text-foreground/70 leading-relaxed mb-4">
                            You have the right to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4 text-foreground/70">
                            <li>Access the personal information we hold about you</li>
                            <li>Request correction of inaccurate information</li>
                            <li>Request deletion of your data (subject to legal requirements)</li>
                            <li>Opt-out of marketing communications</li>
                        </ul>
                    </section>

                    {/* Contact */}
                    <section className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                        <h2 className="text-xl font-black text-foreground mb-4">Contact Us</h2>
                        <p className="text-foreground/70 leading-relaxed mb-4">
                            For any questions about this Privacy Policy or to exercise your rights:
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
