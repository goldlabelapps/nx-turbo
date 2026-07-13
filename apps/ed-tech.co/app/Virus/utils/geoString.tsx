type T_GeoLike = {
    city?: string;
    district?: string;
    state_prov?: string;
    country_name?: string;
    country_name_official?: string;
    country_code2?: string;
    country_emoji?: string;
    continent_name?: string;
};

const clean = (value?: unknown): string => {
    if (typeof value !== 'string') return '';
    return value.trim();
};

export const geoString = (geo?: T_GeoLike | null): string => {
    if (!geo || typeof geo !== 'object') return '';

    const parts = [
        clean(geo.city),
        clean(geo.district),
        clean(geo.state_prov),
    ].filter(Boolean);

    const uniqueParts: string[] = [];
    const seen = new Set<string>();

    for (const part of parts) {
        const key = part.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        uniqueParts.push(part);
    }

    if (uniqueParts.length === 0) {
        const fallback = [
            clean(geo.country_name) || clean(geo.country_name_official) || clean(geo.country_code2),
            clean(geo.continent_name),
        ].filter(Boolean).join(', ');
        return fallback;
    }

    const emoji = clean(geo.country_emoji);
    const location = uniqueParts.join(', ');
    return location;
};
