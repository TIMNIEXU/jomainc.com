'use client';

import { useState } from 'react';
import { Shell } from '../components';

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [caseId, setCaseId] = useState('');
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  function handleFiles(selected) {
    setFiles(Array.from(selected || []));
    setResult(null);
    setError('');
  }

  async function uploadFiles() {
    if (!files.length) {
      setError('Please select shipment documents first.');
      return;
    }

    setUploading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    if (caseId.trim()) formData.append('caseId', caseId.trim());

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed.');
      setResult(data);
    } catch (err) {
      setError(err.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <Shell>
      {() => (
        <main>
          <section className="page-hero">
            <h1>Upload Shipment Documents</h1>
            <p>Commercial Invoice, Packing List, BOL, Arrival Notice, ISF and POA.</p>
          </section>

          <section className="section">
            <div className="upload">
              <h2>Real Document Upload</h2>
              <p className="section-sub">
                Files are uploaded to Vercel Blob storage and grouped by Case ID for future AI OCR and customs review.
              </p>

              <div className="form-grid">
                <label>
                  Case ID / Shipment Reference
                  <input
                    value={caseId}
                    onChange={(e) => setCaseId(e.target.value)}
                    placeholder="Example: JOMA-2026-0001 or container number"
                  />
                </label>
              </div>

              <input
                type="file"
                multiple
                accept=".pdf,.xls,.xlsx,.csv,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) => handleFiles(e.target.files)}
              />

              <div className="list">
                {files.map((f, i) => (
                  <div className="dash-row" key={i}>
                    <span>{f.name}</span>
                    <b>{Math.max(1, Math.round(f.size / 1024))} KB</b>
                  </div>
                ))}
              </div>

              {error && <p className="error-text">{error}</p>}

              <button className="btn primary" onClick={uploadFiles} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload to Vercel Blob'}
              </button>

              {result && (
                <div className="result-box">
                  <h3>Upload Complete</h3>
                  <p><strong>Case ID:</strong> {result.caseId}</p>
                  <div className="list">
                    {result.uploaded.map((file, i) => (
                      <div className="dash-row" key={i}>
                        <span>{file.name}</span>
                        <a href={file.url} target="_blank" rel="noreferrer">Open file</a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
      )}
    </Shell>
  );
}
