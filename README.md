# Joma Logistics Incorporated AI Website

Vercel-ready Next.js website for www.jomainc.com.

## Pages

- Home
- AI Customs Chatbot
- Upload Documents with Vercel Blob storage
- AI Duty Calculator
- Shipment Tracking
- Contact

## Production Upload Setup

This version includes a real upload API route:

`app/api/upload/route.js`

Files upload to Vercel Blob and are grouped under:

`shipments/{Case ID}/filename`

### Required Vercel setup

1. Go to Vercel project dashboard.
2. Open **Storage**.
3. Create **Blob** store.
4. Connect it to this project.
5. Vercel will automatically add:

`BLOB_READ_WRITE_TOKEN`

6. Redeploy the project.

After redeploy, the Upload Documents page will store real files in Vercel Blob.

## Local Development

```bash
npm install
npm run dev
```
