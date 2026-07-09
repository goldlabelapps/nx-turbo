export type BasicEmailTemplateProps = {
    body: string;
    confirmationUrl?: string;
    heading?: string;
    ctaLabel?: string;
    productName?: string;
    sentUsingUrl?: string;
    sentUsingLabel?: string;
    websiteUrl?: string;
    websiteLabel?: string;
};

const DEFAULTS = {
    heading: 'Hello',
    ctaLabel: 'Go',
    productName: 'Leida',
    sentUsingUrl: 'https://goldlabel.pro/nx',
    sentUsingLabel: 'NX°',
    websiteUrl: 'https://app.askleida.com',
    websiteLabel: 'askleida.com',
} as const;

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function safeUrl(url: string, fallback: string): string {
    try {
        const parsed = new URL(url);
        if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
            return parsed.toString();
        }
    } catch {
        // Invalid URL falls through to fallback.
    }

    return fallback;
}

export function buildBasicEmailHtml(props: BasicEmailTemplateProps): string {
    const body = props.body.trim();
    if (!body) {
        throw new Error('body is required for the invite template.');
    }

    const confirmationUrl = props.confirmationUrl ? safeUrl(props.confirmationUrl, '#') : '';
    if (props.confirmationUrl && confirmationUrl === '#') {
        throw new Error('confirmationUrl must be a valid http(s) URL when provided.');
    }

    const heading = escapeHtml(props.heading ?? DEFAULTS.heading);
    const bodyHtml = body;
    const ctaLabel = escapeHtml(props.ctaLabel ?? DEFAULTS.ctaLabel);
    const productName = escapeHtml(props.productName ?? DEFAULTS.productName);

    const sentUsingUrl = escapeHtml(safeUrl(props.sentUsingUrl ?? DEFAULTS.sentUsingUrl, DEFAULTS.sentUsingUrl));
    const sentUsingLabel = escapeHtml(props.sentUsingLabel ?? DEFAULTS.sentUsingLabel);

    const websiteUrl = escapeHtml(safeUrl(props.websiteUrl ?? DEFAULTS.websiteUrl, DEFAULTS.websiteUrl));
    const websiteLabel = escapeHtml(props.websiteLabel ?? DEFAULTS.websiteLabel);

    const ctaBlock = confirmationUrl
        ? `<table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:36px;">
                                <tr>
                                    <td align="center" style="background-color:#2C2C2A;border-radius:8px;">
                                        <a href="${escapeHtml(confirmationUrl)}" style="display:inline-block;padding:16px 40px;font-size:17px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.3px;">
                                            ${ctaLabel}
                                        </a>
                                    </td>
                                </tr>
                            </table>`
        : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${productName} Invite</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f5;">
        <tr>
            <td align="center" style="padding:40px 16px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e0e0e0;">
                    <tr>
                        <td align="center" style="padding:32px 32px 24px 32px;background-color:#f7f7f4;border-bottom:1px solid #e0e0e0;">
                            <a href="https://askleida.com" style="display:inline-block;text-decoration:none;">
                                <img src="https://v3.askleida.com/askleida/svg/logo-dark.svg" alt="${productName}" width="148" height="48" style="display:block;" />
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:36px 32px 12px 32px;">
                            <p style="margin:0 0 28px 0;font-size:15px;color:#555555;line-height:1.6;">
                                ${bodyHtml}
                            </p>
                            ${ctaBlock}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:24px 32px;border-top:1px solid #e8e8e8;background-color:#f8f8f8;text-align:center;">
                            <p style="margin:0 0 6px 0;font-size:12px;color:#888888;">
                                Send by 
                                <a href="${websiteUrl}" style="color:#888888;text-decoration:none;">
                                    <strong style="color:#555555;">
                                        Leida
                                    </strong>
                                </a> 
                                using 
                                <a href="${sentUsingUrl}" style="color:#888888;text-decoration:none;">
                                    <strong style="color:#555555;">
                                        ${sentUsingLabel}
                                    </strong>
                                </a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}
