'use client';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  HiddenMessage,
  FeedbackBtn,
  CleverTextShortcode,
  GithubLink,
  ContentCard,
  PageLink,
} from '../../Shortcodes';

export type I_RenderMarkdown = {
  children: React.ReactNode;
  config?: any;
  slug?: string;
};

export default function RenderMarkdown({
  children = '',
  config,
  slug,
}: I_RenderMarkdown) {
  // --- Normalize children to array to prevent map errors ---
  const normalizeChildren = (children: any) =>
    Array.isArray(children) ? children : [children];

  // --- Shortcode parser ---
  const renderShortcode = (text: string) => {
    const parseShortcode = (
      regex: RegExp,
      Component: React.ElementType,
      extraProps: Record<string, any> = {},
    ): React.ReactNode | null => {
      const match = text.match(regex);
      if (!match) return null;

      const attrs = match[1];
      const props: Record<string, any> = {};
      const attrRegex = /(\w+)="(.*?)"/g;
      let attrMatch;
      while ((attrMatch = attrRegex.exec(attrs)) !== null) {
        let val: any = attrMatch[2];
        if (!isNaN(Number(val))) {
          val = Number(val);
        } else if (val === 'true' || val === 'false') {
          val = val === 'true';
        }
        props[attrMatch[1]] = val;
      }

      return <Component {...props} {...extraProps} config={config} />;
    };

    // HiddenMessage
    const hiddenMessage = parseShortcode(
      /\[HiddenMessage\s*(.*?)\]/,
      HiddenMessage,
      { slug, placeholder: slug },
    );
    if (hiddenMessage) return hiddenMessage;

    // FeedbackBtn
    const feedbackBtn = parseShortcode(/\[FeedbackBtn\s+(.*?)\]/, FeedbackBtn);
    if (feedbackBtn) return feedbackBtn;

    // CleverText
    const cleverText = parseShortcode(/\[CleverText\s+(.*?)\]/, CleverTextShortcode);
    if (cleverText) return cleverText;

    // GithubLink
    const githubLink = parseShortcode(/\[GithubLink\s+(.*?)\]/, GithubLink);
    if (githubLink) return githubLink;

    // ContentCard
    const contentCard = parseShortcode(/\[ContentCard\s+(.*?)\]/, ContentCard);
    if (contentCard) return contentCard;
    
    // PageLink
    const pageLink = parseShortcode(/\[PageLink\s+(.*?)\]/, PageLink);
    if (pageLink) return pageLink;

    // fallback: simply return text
    return text;
  };

  return (
    <div>
        <ReactMarkdown
          components={{
            h1: ({ children }) => <h1>{children}</h1>,
            h2: ({ children }) => <h2>{children}</h2>,
            h3: ({ children }) => <h3>{children}</h3>,
            p: ({ children }) => (
              <p>
                {normalizeChildren(children).map((child, i) => (
                  <React.Fragment key={i}>
                    {typeof child === 'string' ? renderShortcode(child) : child}
                  </React.Fragment>
                ))}
              </p>
            ),
            li: ({ children }) => (
              <li>
                <span>
                  {normalizeChildren(children).map((child, i) => (
                    <React.Fragment key={i}>
                      {typeof child === 'string'
                        ? renderShortcode(child)
                        : child}
                    </React.Fragment>
                  ))}
                </span>
              </li>
            ),
            strong: ({ children }) => <strong>{children}</strong>,
            em: ({ children }) => <em>{children}</em>,
            a: ({ href = '', children }) => {
              const isExternal = /^https?:\/\//.test(href);
              return (
                <a
                  href={href}
                  target={isExternal ? '_blank' : '_self'}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                >
                  <strong>{children}</strong>
                </a>
              );
            },
          }}
        >
          {children as string}
        </ReactMarkdown>
    </div>
  );
}
