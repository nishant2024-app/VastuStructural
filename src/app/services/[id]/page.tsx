"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { Check, Clock, Shield, Upload, CreditCard, X, FileText, ArrowLeft, Phone, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Package {
    name: string;
    price: string;
    priceNum: number;
    features: string[];
    popular?: boolean;
}

interface ServiceData {
    title: string;
    subtitle: string;
    description: string;
    deliveryTime: string;
    packages: Package[];
    process: { step: string; desc: string }[];
    faqs: { q: string; a: string }[];
}

const servicesData: Record<string, ServiceData> = {
    "2d-floor-plan": {
        title: "2D Floor Plan",
        subtitle: "Vastu-Compliant Layouts",
        description: "Professional 2D floor plans designed with Vastu principles. Every room placement is optimized for positive energy flow and functional living.",
        deliveryTime: "3-5 days",
        packages: [
            { name: "Basic", price: "2,499", priceNum: 2499, features: ["Single Floor Plan", "Vastu Analysis Report", "Room Layout", "PDF Delivery"] },
            { name: "Standard", price: "4,999", priceNum: 4999, features: ["Up to 2 Floors", "Furniture Layout", "Electrical Points", "DWG Source File", "2 Revisions"], popular: true },
            { name: "Premium", price: "7,999", priceNum: 7999, features: ["Unlimited Floors", "Plumbing Layout", "Virtual Consultation", "Priority Support", "Unlimited Revisions"] }
        ],
        process: [
            { step: "Share Requirements", desc: "Upload plot size, dimensions, and preferences" },
            { step: "Expert Consultation", desc: "Our architect reviews and confirms scope" },
            { step: "Design & Draft", desc: "Vastu-compliant floor plan creation" },
            { step: "Review & Deliver", desc: "Final delivery with revision support" }
        ],
        faqs: [
            { q: "What details do you need from me?", a: "Plot dimensions, facing direction, number of floors, and room requirements." },
            { q: "How many revisions are included?", a: "Basic includes 1, Standard includes 2, Premium has unlimited revisions." },
            { q: "Do you provide source files?", a: "Yes, Standard and Premium plans include AutoCAD DWG files." },
            { q: "What is the delivery format?", a: "High-resolution PDF, plus DWG for Standard/Premium plans." }
        ]
    },
    "3d-elevation": {
        title: "3D Elevation Design",
        subtitle: "Stunning Visual Facades",
        description: "Realistic 3D exterior visualizations that bring your dream home to life. See textures, materials, and lighting before construction begins.",
        deliveryTime: "5-7 days",
        packages: [
            { name: "Basic", price: "4,999", priceNum: 4999, features: ["Front Elevation", "Day View Render", "Material Suggestions", "HD Image"] },
            { name: "Standard", price: "8,999", priceNum: 8999, features: ["3 Elevation Views", "Day + Night Renders", "Landscape Design", "4K Resolution", "2 Revisions"], popular: true },
            { name: "Premium", price: "14,999", priceNum: 14999, features: ["All Side Views", "360° Walkthrough Video", "Lighting Design", "Source 3D Models", "Unlimited Revisions"] }
        ],
        process: [
            { step: "Send Floor Plan", desc: "Share your approved 2D floor plan" },
            { step: "Style Discussion", desc: "Choose architectural style and materials" },
            { step: "3D Modeling", desc: "Create detailed exterior model" },
            { step: "Rendering & Delivery", desc: "Photorealistic renders delivered" }
        ],
        faqs: [
            { q: "Do I need a floor plan first?", a: "Yes, 3D elevation is based on your approved 2D floor plan." },
            { q: "Can I choose the design style?", a: "Absolutely! Modern, Contemporary, Traditional, Colonial - your choice." },
            { q: "What resolution are the renders?", a: "Basic: HD (1920x1080), Standard/Premium: 4K (3840x2160)." },
            { q: "Can you make changes after delivery?", a: "Yes, revisions are included as per your plan." }
        ]
    },
    "structural-drawings": {
        title: "Structural Drawings",
        subtitle: "Engineering Precision",
        description: "Detailed structural drawings including foundation, beam, column, and slab designs. Certified by licensed structural engineers for safe construction.",
        deliveryTime: "7-10 days",
        packages: [
            { name: "Basic", price: "6,999", priceNum: 6999, features: ["Foundation Drawing", "Column Layout", "Basic Beam Design", "PDF + DWG"] },
            { name: "Standard", price: "12,999", priceNum: 12999, features: ["Complete Structure", "Slab & Lintel Details", "Steel Estimation", "Engineer Certificate", "2 Revisions"], popular: true },
            { name: "Premium", price: "19,999", priceNum: 19999, features: ["Full Structural Design", "Seismic Analysis", "BOQ Estimation", "Site Supervision Support", "Unlimited Revisions"] }
        ],
        process: [
            { step: "Submit Architectural Plan", desc: "Share approved floor plan with soil report" },
            { step: "Structural Analysis", desc: "Load calculations and safety checks" },
            { step: "Detailed Drawings", desc: "Foundation, columns, beams, slabs" },
            { step: "Certification", desc: "Signed by licensed structural engineer" }
        ],
        faqs: [
            { q: "Do I need a soil report?", a: "Recommended for accurate foundation design. We can guide you." },
            { q: "Are drawings government approved?", a: "Drawings are prepared as per IS codes, certified by engineers." },
            { q: "What's included in BOQ?", a: "Bill of Quantities includes steel, cement, and material estimates." },
            { q: "Do you provide site supervision?", a: "Premium plan includes virtual supervision support." }
        ]
    },
    "renovation-plans": {
        title: "Renovation Plans",
        subtitle: "Transform Your Space",
        description: "Breathe new life into existing structures. Our renovation plans optimize layouts, enhance Vastu compliance, and modernize your home.",
        deliveryTime: "5-7 days",
        packages: [
            { name: "Basic", price: "3,999", priceNum: 3999, features: ["Single Room Redesign", "Layout Optimization", "Vastu Correction", "Before/After Plan"] },
            { name: "Standard", price: "7,999", priceNum: 7999, features: ["Full Floor Renovation", "Space Optimization", "Electrical Update Plan", "Material Suggestions", "2 Revisions"], popular: true },
            { name: "Premium", price: "14,999", priceNum: 14999, features: ["Complete Home Renovation", "3D Visualization", "Contractor Coordination", "Site Visit Support", "Unlimited Revisions"] }
        ],
        process: [
            { step: "Share Existing Layout", desc: "Photos and current floor plan" },
            { step: "Identify Changes", desc: "Discuss renovation goals and budget" },
            { step: "Create New Design", desc: "Optimized layout with Vastu fixes" },
            { step: "Implementation Plan", desc: "Step-by-step renovation guide" }
        ],
        faqs: [
            { q: "Can you fix Vastu issues?", a: "Yes, we specialize in Vastu correction without major structural changes." },
            { q: "Do I need to vacate during renovation?", a: "Depends on scope. We plan phases to minimize disruption." },
            { q: "Can you recommend contractors?", a: "Premium plan includes contractor coordination and recommendations." },
            { q: "What if my building is old?", a: "We assess structural integrity and plan safe modifications." }
        ]
    },
    "interior-planning": {
        title: "Interior Planning",
        subtitle: "Design Your Lifestyle",
        description: "Complete interior design solutions from layout to furniture placement. Create spaces that reflect your personality with Vastu harmony.",
        deliveryTime: "7-10 days",
        packages: [
            { name: "Basic", price: "4,999", priceNum: 4999, features: ["Living Room Design", "Furniture Layout", "Color Scheme", "Mood Board"] },
            { name: "Standard", price: "9,999", priceNum: 9999, features: ["3 Room Interior", "3D Visualization", "Material Palette", "Vendor List", "2 Revisions"], popular: true },
            { name: "Premium", price: "18,999", priceNum: 18999, features: ["Full Home Interior", "Custom Furniture Design", "Lighting Plan", "Procurement Support", "Unlimited Revisions"] }
        ],
        process: [
            { step: "Style Consultation", desc: "Understand your taste and lifestyle" },
            { step: "Concept Development", desc: "Create mood boards and themes" },
            { step: "Detailed Design", desc: "3D renders with specifications" },
            { step: "Execution Support", desc: "Vendor coordination and QC" }
        ],
        faqs: [
            { q: "Do you provide furniture?", a: "We design and recommend. Premium includes procurement support." },
            { q: "Can I mix traditional and modern?", a: "Absolutely! We specialize in fusion designs." },
            { q: "What about Vastu for interiors?", a: "Every design follows Vastu principles for positive energy." },
            { q: "Do you work with my existing furniture?", a: "Yes, we can incorporate your existing pieces into the design." }
        ]
    },
    "vastu-consultancy": {
        title: "Vastu Consultation",
        subtitle: "Ancient Wisdom, Modern Living",
        description: "Expert Vastu analysis and remedies for your home or office. Identify doshas and implement practical solutions for harmony and prosperity.",
        deliveryTime: "1-3 days",
        packages: [
            { name: "Basic", price: "1,999", priceNum: 1999, features: ["Plot Analysis", "Direction Assessment", "Basic Recommendations", "PDF Report"] },
            { name: "Standard", price: "3,999", priceNum: 3999, features: ["Full Home Analysis", "Room-wise Report", "Remedy Suggestions", "Video Consultation", "Follow-up Call"], popular: true },
            { name: "Premium", price: "6,999", priceNum: 6999, features: ["Comprehensive Audit", "Personalized Remedies", "Annual Review", "Priority Support", "Unlimited Consultations"] }
        ],
        process: [
            { step: "Share Floor Plan", desc: "Current layout with directions" },
            { step: "Expert Analysis", desc: "Detailed Vastu assessment" },
            { step: "Report Generation", desc: "Issues and remedies documented" },
            { step: "Implementation Guidance", desc: "Practical steps to improve" }
        ],
        faqs: [
            { q: "Is Vastu only for Hindus?", a: "No, Vastu is scientific and applies to all. It's about energy and directions." },
            { q: "Can Vastu fix financial problems?", a: "Proper Vastu can enhance positive energy, which may support prosperity." },
            { q: "Do I need to break walls?", a: "Usually no. We provide non-structural remedies first." },
            { q: "Is online consultation effective?", a: "Yes! With proper floor plans and photos, remote analysis is equally accurate." }
        ]
    }
};

export default function ServiceDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedPackage, setSelectedPackage] = useState(1);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [contactInfo, setContactInfo] = useState({ name: "", phone: "", notes: "" });

    const service = servicesData[id as string];

    // Handle unknown service
    if (!service) {
        return (
            <div className="pt-32 pb-20 px-6 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-black text-foreground mb-4">Service Not Found</h1>
                    <p className="text-foreground/60 mb-6">This service doesn't exist.</p>
                    <Link href="/services" className="px-6 py-3 bg-primary text-background rounded-full font-bold">
                        View All Services
                    </Link>
                </div>
            </div>
        );
    }

    const currentPackage = service.packages[selectedPackage];

    const handleFileUpload = (files: FileList | null) => {
        if (!files) return;
        const newFiles = Array.from(files).filter(file => {
            const ext = file.name.split('.').pop()?.toLowerCase();
            return ['pdf', 'dwg', 'jpg', 'jpeg', 'png', 'doc', 'docx'].includes(ext || '');
        });
        setUploadedFiles(prev => [...prev, ...newFiles].slice(0, 5)); // Max 5 files
    };

    const removeFile = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (!contactInfo.name || !contactInfo.phone) {
            alert("Please enter your name and phone number");
            return;
        }

        if (contactInfo.phone.length < 10) {
            alert("Please enter a valid phone number");
            return;
        }

        setIsSubmitting(true);

        try {
            // Save lead
            await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: contactInfo.name,
                    phone: contactInfo.phone,
                    city: "",
                    plotSize: "",
                    direction: "",
                    rooms: "",
                    notes: `Service: ${service.title} | Package: ${currentPackage.name} (₹${currentPackage.price}) | Files: ${uploadedFiles.length} | Notes: ${contactInfo.notes}`,
                    aiStatus: "direct",
                    source: "service_booking"
                })
            });

            setSubmitSuccess(true);
        } catch (error) {
            console.error("Submit error:", error);
            alert("Something went wrong. Please try again or call us directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitSuccess) {
        return (
            <div className="pt-32 pb-20 px-6 min-h-screen flex items-center justify-center">
                <div className="max-w-md text-center bg-card p-10 rounded-3xl border border-border">
                    <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check size={40} className="text-success" />
                    </div>
                    <h1 className="text-2xl font-black text-foreground mb-2">Request Submitted!</h1>
                    <p className="text-foreground/60 mb-6">
                        Thank you {contactInfo.name}! Our team will call you within 2 hours to confirm your {service.title} project.
                    </p>
                    <div className="bg-primary/10 p-4 rounded-xl mb-6">
                        <p className="text-sm font-bold text-foreground">Selected Package: {currentPackage.name}</p>
                        <p className="text-2xl font-black text-primary">₹{currentPackage.price}</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/" className="flex-1 py-3 bg-card border border-border rounded-full font-bold text-sm">
                            Home
                        </Link>
                        <a href="tel:+919876543210" className="flex-1 py-3 bg-primary text-background rounded-full font-bold text-sm flex items-center justify-center gap-2">
                            <Phone size={16} /> Call Now
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-28 pb-20 px-6 bg-background min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-foreground/60 hover:text-foreground mb-8 font-medium"
                >
                    <ArrowLeft size={18} />
                    Back to Services
                </button>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left: Service Info */}
                    <div className="space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-4">
                                <Clock size={12} />
                                {service.deliveryTime} delivery
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-black text-foreground leading-tight mb-2">
                                {service.title}
                            </h1>
                            <p className="text-lg text-primary font-bold mb-4">{service.subtitle}</p>
                            <p className="text-foreground/60 leading-relaxed">
                                {service.description}
                            </p>
                        </div>

                        {/* Process */}
                        <div>
                            <h3 className="font-black text-sm uppercase tracking-wider text-foreground/40 mb-4">Our Process</h3>
                            <div className="space-y-4">
                                {service.process.map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-sm flex-shrink-0">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <div className="font-bold text-foreground">{item.step}</div>
                                            <div className="text-sm text-foreground/50">{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FAQs */}
                        <div>
                            <h3 className="font-black text-sm uppercase tracking-wider text-foreground/40 mb-4">FAQs</h3>
                            <div className="space-y-3">
                                {service.faqs.map((faq, idx) => (
                                    <div key={idx} className="p-4 bg-card rounded-xl border border-border">
                                        <h4 className="font-bold text-foreground text-sm mb-1">{faq.q}</h4>
                                        <p className="text-xs text-foreground/60">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Booking Card */}
                    <div className="lg:sticky lg:top-28 h-fit">
                        <div className="bg-card p-6 rounded-2xl border border-border shadow-xl">
                            <div className="flex items-center gap-2 text-success text-xs font-bold mb-4">
                                <Shield size={14} />
                                100% Vastu Compliant
                            </div>

                            {/* Package Selection */}
                            <h2 className="text-lg font-black mb-3">Choose Package</h2>
                            <div className="grid grid-cols-3 gap-2 mb-6">
                                {service.packages.map((pkg, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedPackage(idx)}
                                        className={cn(
                                            "p-3 rounded-xl border-2 transition-all relative",
                                            selectedPackage === idx
                                                ? "border-primary bg-primary/5"
                                                : "border-border hover:border-primary/30"
                                        )}
                                    >
                                        {pkg.popular && (
                                            <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-primary text-background text-[8px] font-black rounded-full">
                                                POPULAR
                                            </span>
                                        )}
                                        <div className="text-[10px] font-bold text-foreground/50 uppercase">{pkg.name}</div>
                                        <div className="text-lg font-black text-foreground">₹{pkg.price}</div>
                                    </button>
                                ))}
                            </div>

                            {/* Package Features */}
                            <div className="bg-background rounded-xl p-4 mb-6">
                                <h4 className="text-xs font-bold text-foreground/50 uppercase mb-3">
                                    {currentPackage.name} Includes:
                                </h4>
                                <div className="space-y-2">
                                    {currentPackage.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm">
                                            <Check size={14} className="text-success" />
                                            <span className="text-foreground/80">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-3 mb-4">
                                <input
                                    type="text"
                                    placeholder="Your Name *"
                                    value={contactInfo.name}
                                    onChange={(e) => setContactInfo(p => ({ ...p, name: e.target.value }))}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary"
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number *"
                                    value={contactInfo.phone}
                                    onChange={(e) => setContactInfo(p => ({ ...p, phone: e.target.value }))}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary"
                                />
                                <textarea
                                    placeholder="Additional notes (optional)"
                                    value={contactInfo.notes}
                                    onChange={(e) => setContactInfo(p => ({ ...p, notes: e.target.value }))}
                                    rows={2}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary resize-none"
                                />
                            </div>

                            {/* File Upload */}
                            <div className="mb-6">
                                <h4 className="text-xs font-bold text-foreground/50 uppercase mb-2">
                                    Upload Files (Optional)
                                </h4>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept=".pdf,.dwg,.jpg,.jpeg,.png,.doc,.docx"
                                    onChange={(e) => handleFileUpload(e.target.files)}
                                    className="hidden"
                                />
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                    onDrop={(e) => { e.preventDefault(); handleFileUpload(e.dataTransfer.files); }}
                                    className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
                                >
                                    <Upload size={24} className="mx-auto text-primary/50 mb-2" />
                                    <span className="text-xs text-foreground/50">
                                        Click or drop files (PDF, DWG, Images)
                                    </span>
                                </div>

                                {/* Uploaded Files */}
                                {uploadedFiles.length > 0 && (
                                    <div className="mt-3 space-y-2">
                                        {uploadedFiles.map((file, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-2 bg-background rounded-lg">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <FileText size={14} className="text-primary flex-shrink-0" />
                                                    <span className="text-xs text-foreground truncate">{file.name}</span>
                                                </div>
                                                <button onClick={() => removeFile(idx)} className="p-1 hover:bg-red-500/10 rounded">
                                                    <X size={12} className="text-red-500" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-background rounded-xl font-black text-base flex items-center justify-center gap-3 hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard size={20} />
                                        Confirm & Start Project
                                    </>
                                )}
                            </button>

                            <p className="text-[10px] text-center text-foreground/40 mt-3">
                                Our team will call to confirm details before payment
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
