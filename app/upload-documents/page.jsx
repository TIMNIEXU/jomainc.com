'use client';
import { useState } from 'react';

function formatSize(bytes){
  if(!bytes) return '0 B';
  if(bytes < 1024) return `${bytes} B`;
  if(bytes < 1024 * 1024) return `${Math.round(bytes/1024)} KB`;
  return `${(bytes/1024/1024).toFixed(2)} MB`;
}

export default function UploadDocumentsPage(){
  const [caseId,setCaseId] = useState('');
  const [files,setFiles] = useState([]);
  const [status,setStatus] = useState('');
  const [statusType,setStatusType] = useState('');
  const [uploaded,setUploaded] = useState([]);
  const [busy,setBusy] = useState(false);

  const selectedFile = files[0];

  async function upload(){
    if(!selectedFile){
      setStatusType('error');
      setStatus('Please choose a file first.');
      return;
    }
    setBusy(true);
    setStatus('Uploading...');
    setStatusType('');
    setUploaded([]);

    try{
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('caseId', caseId || 'JOMA-UNASSIGNED');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if(!res.ok || !data.ok){
        throw new Error(data.error || 'Upload failed.');
      }

      setStatusType('success');
      setStatus('Upload successful. File saved to Vercel Blob.');
      setUploaded([data]);
    }catch(err){
      setStatusType('error');
      setStatus(err.message || 'Upload failed.');
    }finally{
      setBusy(false);
    }
  }

  return <main className="container">
    <h1 className="page-title">Real Document Upload</h1>
    <p className="subtitle">Files are uploaded to Vercel Blob storage and grouped by Case ID for future AI OCR and customs review.</p>
    <section className="form">
      <label className="label">Case ID / Shipment Reference</label>
      <input className="input" value={caseId} onChange={e=>setCaseId(e.target.value)} placeholder="Example: JOMA-2026-0001 or container number" />
      <div className="upload-box">
        <input type="file" onChange={e=>setFiles(Array.from(e.target.files || []))} accept=".pdf,.xls,.xlsx,.csv,.doc,.docx,.jpg,.jpeg,.png,.txt" />
        {selectedFile && <div className="file-row"><span>{selectedFile.name}</span><strong>{formatSize(selectedFile.size)}</strong></div>}
        {status && <div className={`status ${statusType}`}>{status}</div>}
        <button className="btn" disabled={busy} onClick={upload}>{busy ? 'Uploading...' : 'Upload to Vercel Blob'}</button>
        <p className="small" style={{marginTop:18}}>Supported: PDF, Excel, Word, CSV, JPG, PNG, TXT.</p>
      </div>
      {uploaded.map((item)=> <div className="result" key={item.url}>
        <strong>Uploaded File URL:</strong><br />
        <a className="link" href={item.url} target="_blank" rel="noreferrer">{item.url}</a><br /><br />
        <strong>Blob Path:</strong> {item.pathname}<br />
        <strong>Case ID:</strong> {item.caseId}
      </div>)}
    </section>
  </main>
}
