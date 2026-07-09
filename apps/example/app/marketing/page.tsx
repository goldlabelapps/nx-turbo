'use client';

export default function MarketingPreviewPage() {
  return (
    <main style={{ height: '100vh', width: '100%' }}>
      <iframe
        src="/design-system-preview/templates/marketing-landing/index.html"
        title="NX Marketing Landing Preview"
        style={{ border: 0, width: '100%', height: '100%' }}
      />
    </main>
  );
}
