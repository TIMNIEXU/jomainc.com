import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

function safeName(name = 'shipment-document') {
  return name
    .replace(/[^a-zA-Z0-9._\-\u4e00-\u9fa5 ]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 120);
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files');
    const caseId = formData.get('caseId') || `JOMA-${Date.now()}`;

    if (!files.length) {
      return NextResponse.json({ error: 'No files received.' }, { status: 400 });
    }

    const uploaded = [];

    for (const file of files) {
      if (!file || typeof file === 'string') continue;

      const pathname = `shipments/${caseId}/${Date.now()}-${safeName(file.name)}`;

      const blob = await put(pathname, file, {
        access: 'public',
        addRandomSuffix: false,
      });

      uploaded.push({
        name: file.name,
        size: file.size,
        type: file.type,
        url: blob.url,
        pathname: blob.pathname,
      });
    }

    return NextResponse.json({
      ok: true,
      caseId,
      uploaded,
    });
  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.json(
      { error: 'Upload failed. Check Vercel Blob token and server logs.' },
      { status: 500 }
    );
  }
}
