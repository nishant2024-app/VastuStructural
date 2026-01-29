import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
    id: string;
    title: string;
    description: string;
    price: string;
    deliveryTime: string;
    icon: LucideIcon;
    features: string[];
}

export default function ServiceCard({
    id,
    title,
    description,
    price,
    deliveryTime,
    icon: Icon,
    features,
}: ServiceCardProps) {
    return (
        <div className="group bg-card border border-border rounded-3xl p-8 transition-all hover:shadow-2xl hover:-translate-y-2">
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-all transform group-hover:rotate-6">
                <Icon size={28} />
            </div>

            <h3 className="text-2xl font-black text-card-foreground mb-3 tracking-tight">{title}</h3>
            <p className="text-sm text-card-foreground/70 mb-8 leading-relaxed font-medium">
                {description}
            </p>

            <div className="space-y-4 mb-10">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-accent/60">Includes</h4>
                <ul className="space-y-3">
                    {features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-card-foreground font-bold">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="pt-6 border-t border-border flex items-center justify-between">
                <div>
                    <div className="text-[10px] text-card-foreground/40 uppercase tracking-widest font-black">Investment</div>
                    <div className="text-2xl font-black text-card-foreground">₹{price}</div>
                </div>
                <Link
                    href={`/services/${id}`}
                    className="px-8 py-3.5 bg-accent text-white rounded-full text-sm font-black hover:bg-forest transition-all shadow-lg shadow-accent/20 active:scale-95 flex items-center gap-2 group/btn"
                >
                    View Details
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </Link>
            </div>
            <div className="mt-4 text-[10px] text-card-foreground/30 font-bold uppercase tracking-widest text-center">
                Estimated Delivery: {deliveryTime}
            </div>
        </div>
    );
}
