
export type T_Geo = {
    city?: string;
    district?: string;
    state_prov?: string;
    state_code?: string;
    country_name?: string;
    country_name_official?: string;
    country_code2?: string;
    country_code3?: string;
    country_emoji?: string;
    continent_name?: string;
    continent_code?: string;
    latitude?: number | string;
    longitude?: number | string;
    lat?: number | string;
    lon?: number | string;
    zipcode?: string;
    ip?: string;
    calling_code?: string;
    connection_type?: string;
    isp?: string;
    organization?: string;
    country_flag?: string;
    is_eu?: boolean;
    time_zone?: Record<string, unknown>;
    currency?: Record<string, unknown>;
};

export type T_DeviceInfo = {
    ua: string;
    browser: string;
    browserVersion?: string;
    os: string;
    osVersion?: string;
    platform: string;
    vendor: string;
    isMobile: boolean;
    languages: string[];
    device: {
        vendor?: string;
        model?: string;
        type?: string;
    };
    cpu: string;
    engine: {
        name?: string;
        version?: string;
    };
    model?: string;
    modelCode?: string;
};

export type T_Fingerprint = {
    id: string;
    name: string;
    created: number;
    updated: number;
    device: T_DeviceInfo;
    geo?: T_Geo;
};

export type T_HistoryEntry = {
	timestamp: number;
	title: string;
	description: string;
	featuredImage: string;
	url: string;
	slug: string;
	tenant: string;
	siteName: string;
	favicon: string;
};

export type T_Email = {
    from: {
        label: string;
        email: string;
    },
    to: {
        label: string;
        email: string;
    }
    subject: string;
    body: string; // Markdown or HTML content?  
    template?: string;

};
