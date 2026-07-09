'use client';

export default function ClientPreviewPage() {
  return (
    <main style={{ height: '100vh', width: '100%' }}>
      <iframe
        src="/design-system-preview/templates/client-living-page/index.html"
        title="NX Client Living Page Preview"
        style={{ border: 0, width: '100%', height: '100%' }}
      />
    </main>
  );
}
