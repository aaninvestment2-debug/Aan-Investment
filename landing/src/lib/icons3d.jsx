const ICON3D_MAP = {
    building: "icon_property",
    briefcase: "icon_business",
    layers: "icon_structured",
    landmark: "icon_corporate",
    chart: "icon_investment",
    compass: "icon_advisory",
    shield: "icon_trust",
    zap: "icon_speed",
    eye: "icon_transparency",
    users: "icon_team",
    sliders: "icon_flexible",
    handshake: "icon_relationship",
    lock: "icon_secure",
    filecheck: "icon_compliance",
};

export const icon3dSrc = (name) => `/assets/gen/${ICON3D_MAP[name] || "icon_advisory"}.webp`;

export const Icon3D = ({ name, className = "", alt = "" }) => (
    <img src={icon3dSrc(name)} alt={alt} className={className} loading="lazy" aria-hidden={alt ? undefined : true} />
);
