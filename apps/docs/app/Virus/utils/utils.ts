const displayNames = new Intl.DisplayNames(['en'], { type: 'language' });

type T_DeviceSummaryInput = {
    model?: string;
    modelCode?: string;
    isMobile?: boolean;
    vendor?: string;
    browser?: string;
    platform?: string;
    languages?: string[];
};

const normalize = (value?: string) => (value || '').trim().toLowerCase();

const toTitleCase = (value?: string) => {
    if (!value) return '';
    return value
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

export const formatLanguages = (languages: string[]): string => {
    const seen = new Set<string>();
    const result: string[] = [];

    for (const tag of languages) {
        const base = tag.split('-')[0].toLowerCase();
        if (seen.has(base)) continue;
        seen.add(base);

        try {
            const label = displayNames.of(base);
            if (label) result.push(label);
        } catch {
            result.push(base);
        }
    }

    return result.join(', ');
};

export const formatDeviceSummary = (device?: T_DeviceSummaryInput): string => {
    if (!device) return '';

    const normalizedModel = normalize(device.model);
    const normalizedModelCode = normalize(device.modelCode);
    const model = normalizedModel && normalizedModel === normalizedModelCode
        ? (device.model || device.modelCode || '')
        : (device.model || device.modelCode || '');

    const modelOrPlatform = model || device.platform || '';
    const formFactor = typeof device.isMobile === 'boolean'
        ? (device.isMobile ? 'Mobile' : 'Desktop')
        : '';
    const vendor = device.vendor || '';
    const browser = toTitleCase(device.browser);
    const languageString = device.languages?.length ? formatLanguages(device.languages) : '';

    return [modelOrPlatform, formFactor, vendor, browser, languageString].filter(Boolean).join(', ');
};
