import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { makeRes } from '../lib/makeRes';
import { buildBasicEmailHtml, type BasicEmailTemplateProps } from './templates/basicEmailTemplate';

type EmailTemplateName = 'basicEmailTemplate';

type EmailPayload = {
    toEmail?: string;
    toName?: string;
    subject?: string;
    template?: EmailTemplateName;
    body?: string;
    templateProps?: Omit<BasicEmailTemplateProps, 'body'>;
};

export async function POST(request: Request) {
    try {
        const { toEmail, toName, subject, template, body, templateProps } = await request.json() as EmailPayload;

        const missingFields = [
            ['toEmail', toEmail],
            ['toName', toName],
            ['subject', subject],
            ['template', template],
            ['body', body],
        ]
            .filter(([, value]) => typeof value !== 'string' || !value.trim())
            .map(([key]) => key);

        if (missingFields.length > 0) {
            return NextResponse.json(
                makeRes({
                    severity: 'error',
                    message: `Missing required field${missingFields.length > 1 ? 's' : ''}: ${missingFields.join(', ')}.`
                }),
                { status: 400 }
            );
        }

        const safeToEmail: string = toEmail as string;
        const safeToName: string = toName as string;
        const safeSubject: string = subject as string;
        const safeTemplate: EmailTemplateName = template as EmailTemplateName;
        const safeBody: string = body as string;

        let htmlBody: string;

        switch (safeTemplate) {
            case 'basicEmailTemplate': {
                htmlBody = buildBasicEmailHtml({
                    body: safeBody,
                    ...templateProps,
                });
                break;
            }
            default: {
                return NextResponse.json(
                    makeRes({
                        severity: 'error',
                        message: `Unsupported template: ${safeTemplate}`,
                    }),
                    { status: 400 }
                );
            }
        }

        const apiKey = process.env.RESEND_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                makeRes({
                    severity: 'error',
                    message: 'RESEND_API_KEY is not configured.'
                }),
                { status: 500 }
            );
        }

        const resend = new Resend(apiKey);
        const { data, error } = await resend.emails.send({
            from: 'NX <nx@goldlabel.pro>',
            to: [`${safeToName} <${safeToEmail}>`],
            subject: safeSubject,
            html: htmlBody,
        });

        if (error) {
            return NextResponse.json(
                makeRes({
                    severity: 'error',
                    message: error.message,
                    other: error,
                }),
                { status: 502 }
            );
        }

        return NextResponse.json(
            makeRes({
                severity: 'success',
                message: 'Email sent successfully.',
                data,
            })
        );
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to send email.';

        return NextResponse.json(
            makeRes({
                severity: 'error',
                message,
            }),
            { status: 500 }
        );
    }
}