import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

const CUSTOMS_PROMPT = `
You are an AI customs document reviewer for a U.S. freight forwarder/customs broker.
Review the uploaded shipping/customs document and return practical intake data.

Return ONLY valid JSON with this structure:
{
  "documentType": "Commercial Invoice | Packing List | Bill of Lading | Delivery Order | Arrival Notice | ISF | Other",
  "confidence": "High | Medium | Low",
  "parties": {
    "shipper": "",
    "consignee": "",
    "notifyParty": "",
    "carrier": ""
  },
  "shipment": {
    "mbl": "",
    "hbl": "",
    "containerNumbers": [],
    "vessel": "",
    "voyage": "",
    "pol": "",
    "pod": "",
    "finalDestination": "",
    "eta": ""
  },
  "goods": [
    {
      "description": "",
      "quantity": "",
      "grossWeight": "",
      "cbm": "",
      "invoiceValue": "",
      "countryOfOrigin": "",
      "hsCodeFound": ""
    }
  ],
  "customsReview": {
    "htsSuggestion": "",
    "dutyRisk": "Low | Medium | High | Unknown",
    "pgaRisk": [],
    "bondRecommendation": "Single Transaction Bond | Continuous Bond | Not enough information",
    "missingDocuments": [],
    "redFlags": [],
    "nextActions": []
  },
  "summary": "short English summary",
  "summaryChinese": "short Chinese summary"
}

Important: Do not invent facts. If information is not visible, use empty string or Unknown. This is preliminary AI review only, not final customs advice.
`;

async function fetchBlob(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Unable to fetch uploaded file: ${res.status}`);
  const contentType = res.headers.get('content-type') || 'application/octet-stream';
  const arrayBuffer = await res.arrayBuffer();
  return { buffer: Buffer.from(arrayBuffer), contentType };
}

function asDataUrl(buffer, contentType) {
  return `data:${contentType};base64,${buffer.toString('base64')}`;
}

function isImage(contentType, fileName = '') {
  return contentType.startsWith('image/') || /\.(png|jpe?g|webp)$/i.test(fileName);
}

function isTextLike(contentType, fileName = '') {
  return contentType.startsWith('text/') || /\.(txt|csv)$/i.test(fileName);
}

export async function POST(request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { ok: false, error: 'Missing OPENAI_API_KEY in Vercel Environment Variables.' },
        { status: 500 }
      );
    }

    const { url, fileName = 'document', caseId = 'JOMA-UNASSIGNED' } = await request.json();
    if (!url) return NextResponse.json({ ok: false, error: 'Missing uploaded file URL.' }, { status: 400 });

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const { buffer, contentType } = await fetchBlob(url);

    const model = process.env.OPENAI_OCR_MODEL || 'gpt-4.1-mini';
    let input;

    if (isImage(contentType, fileName)) {
      input = [{
        role: 'user',
        content: [
          { type: 'input_text', text: `${CUSTOMS_PROMPT}\nCase ID: ${caseId}\nFile name: ${fileName}` },
          { type: 'input_image', image_url: asDataUrl(buffer, contentType) }
        ]
      }];
    } else if (isTextLike(contentType, fileName)) {
      const text = buffer.toString('utf8').slice(0, 120000);
      input = [{
        role: 'user',
        content: [{ type: 'input_text', text: `${CUSTOMS_PROMPT}\nCase ID: ${caseId}\nFile name: ${fileName}\nDocument text:\n${text}` }]
      }];
    } else {
      const file = new File([buffer], fileName, { type: contentType });
      const uploaded = await openai.files.create({ file, purpose: 'user_data' });
      input = [{
        role: 'user',
        content: [
          { type: 'input_text', text: `${CUSTOMS_PROMPT}\nCase ID: ${caseId}\nFile name: ${fileName}` },
          { type: 'input_file', file_id: uploaded.id }
        ]
      }];
    }

    const response = await openai.responses.create({
      model,
      input,
      temperature: 0.1,
      response_format: { type: 'json_object' }
    });

    const text = response.output_text || '{}';
    let analysis;
    try { analysis = JSON.parse(text); } catch { analysis = { raw: text }; }

    return NextResponse.json({ ok: true, caseId, fileName, analysis, analyzedAt: new Date().toISOString() });
  } catch (error) {
    console.error('CUSTOMS_OCR_ERROR', error);
    return NextResponse.json({ ok: false, error: error?.message || 'AI OCR customs review failed.' }, { status: 500 });
  }
}
