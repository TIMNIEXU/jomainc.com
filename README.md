# Joma Logistics Incorporated AI Website - AI OCR Customs Engine v4

Production-ready Vercel Blob upload plus AI OCR Customs Review.

Required Vercel Environment Variables:

- BLOB_READ_WRITE_TOKEN
- OPENAI_API_KEY

Optional:

- OPENAI_OCR_MODEL=gpt-4.1-mini

Deploy steps:

1. Upload/replace all files in GitHub.
2. In Vercel project Environment Variables, add BLOB_READ_WRITE_TOKEN and OPENAI_API_KEY for Production and Preview.
3. Redeploy the latest Production deployment.
4. Test `/upload-documents`.

Workflow:

Upload document → save to Vercel Blob → run AI OCR Customs Review → returns structured JSON for customs intake.
