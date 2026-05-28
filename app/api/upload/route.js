import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

function safeName(name = 'file') {
  return name
    .replace(/[^a-zA-Z0-9._\-\u4e00-\u9fa5]/g, '_')
    .slice(0, 160);
}

export async function POST(request) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { ok: false, error: 'Missing BLOB_READ_WRITE_TOKEN in Vercel Environment Variables.' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const caseIdRaw = formData.get('caseId') || 'uncategorized';

    if (!file || typeof file === 'string') {
      return NextResponse.json({ ok: false, error: 'No file received.' }, { status: 400 });
    }

    const caseId = safeName(String(caseIdRaw).trim() || 'uncategorized');
    const fileName = safeName(file.name || 'upload.bin');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const pathname = `shipments/${caseId}/${timestamp}-${fileName}`;

    const blob = await put(pathname, file, {
      access: 'public',
      addRandomSuffix: false,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json({
      ok: true,
      fileName,
      caseId,
      size: file.size,
      type: file.type || 'application/octet-stream',
      url: blob.url,
      pathname: blob.pathname,
      uploadedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('BLOB_UPLOAD_ERROR', error);
    return NextResponse.json(
      { ok: false, error: error?.message || 'Upload failed.' },
      { status: 500 }
    );
  }
}
