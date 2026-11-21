import {
    Building2, Briefcase, Layers, Landmark, TrendingUp, Compass,
    ShieldCheck, Zap, Eye, Users, SlidersHorizontal, Handshake, Lock, FileCheck,
} from "lucide-react";

const MAP = {
    building: Building2,
    briefcase: Briefcase,
    layers: Layers,
    landmark: Landmark,
    chart: TrendingUp,
    compass: Compass,
    shield: ShieldCheck,
    zap: Zap,
    eye: Eye,
    users: Users,
    sliders: SlidersHorizontal,
    handshake: Handshake,
    lock: Lock,
    filecheck: FileCheck,
};

export const Icon = ({ name, className = "" }) => {
    const C = MAP[name] || Compass;
    return <C className={className} strokeWidth={1.5} aria-hidden="true" />;
};
