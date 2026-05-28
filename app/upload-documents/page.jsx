'use client';
import { useState } from 'react';

function formatSize(bytes){
  if(!bytes) return '0 B';
  if(bytes < 1024) return `${bytes} B`;
  if(bytes < 1024 * 1024) return `${Math.round(bytes/1024)} KB`;
  return `${(bytes/1024/1024).toFixed(2)} MB`;
}

function JsonBlock({ data }){
  return <pre className="json-block">{JSON.stringify(data, null, 2)}</pre>;
}

export default function UploadDocumentsPage(){
  const [caseId,setCaseId] = useState('');
  const [files,setFiles] = useState([]);
  const [status,setStatus] = useState('');
  const [statusType,setStatusType] = useState('');
  const [uploaded,setUploaded] = useState([]);
  const [analysis,setAnalysis] = useState(null);
  const [busy,setBusy] = useState(false);
  const [ocrBusy,setOcrBusy] = useState(false);

  const selectedFile = files[0];
  const uploadedFile = uploaded[0];

  async function upload(){
    if(!selectedFile){
      setStatusType('error');
      setStatus('Please choose a file first.');
      return;
    }
    setBusy(true);
    setAnalysis(null);
    setStatus('Uploading...');
    setStatusType('');
    setUploaded([]);

    try{
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('caseId', caseId || 'JOMA-UNASSIGNED');

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if(!res.ok || !data.ok) throw new Error(data.error || 'Upload failed.');

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

  async function analyze(){
    if(!uploadedFile?.url){
      setStatusType('error');
      setStatus('Please upload a file before AI OCR Customs Review.');
      return;
    }
    setOcrBusy(true);
    setAnalysis(null);
    setStatusType('');
    setStatus('AI OCR Customs Engine is reviewing the document...');

    try{
      const res = await fetch('/api/customs-ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: uploadedFile.url,
          fileName: uploadedFile.fileName,
          caseId: uploadedFile.caseId || caseId || 'JOMA-UNASSIGNED'
        })
      });
      const data = await res.json();
      if(!res.ok || !data.ok) throw new Error(data.error || 'AI OCR review failed.');
      setStatusType('success');
      setStatus('AI OCR Customs Review completed.');
      setAnalysis(data.analysis);
    }catch(err){
      setStatusType('error');
      setStatus(err.message || 'AI OCR review failed.');
    }finally{
      setOcrBusy(false);
    }
  }

  return <main className="container">
    <h1 className="page-title">AI OCR Customs Engine</h1>
    <p className="subtitle">Upload freight/customs documents, save them to Vercel Blob, then run preliminary AI customs review.</p>

    <section className="form">
      <label className="label">Case ID / Shipment Reference</label>
      <input className="input" value={caseId} onChange={e=>setCaseId(e.target.value)} placeholder="Example: JOMA-2026-0001 or container number" />

      <div className="upload-box">
        <input type="file" onChange={e=>setFiles(Array.from(e.target.files || []))} accept=".pdf,.xls,.xlsx,.csv,.doc,.docx,.jpg,.jpeg,.png,.txt" />
        {selectedFile && <div className="file-row"><span>{selectedFile.name}</span><strong>{formatSize(selectedFile.size)}</strong></div>}
        {status && <div className={`status ${statusType}`}>{status}</div>}

        <div className="button-row">
          <button className="btn" disabled={busy} onClick={upload}>{busy ? 'Uploading...' : '1. Upload to Vercel Blob'}</button>
          <button className="btn secondary" disabled={ocrBusy || !uploadedFile} onClick={analyze}>{ocrBusy ? 'Reviewing...' : '2. Run AI OCR Customs Review'}</button>
        </div>
        <p className="small" style={{marginTop:18}}>Supported: PDF, Excel, Word, CSV, JPG, PNG, TXT.</p>
      </div>

      {uploaded.map((item)=> <div className="result" key={item.url}>
        <strong>Uploaded File URL:</strong><br />
        <a className="link" href={item.url} target="_blank" rel="noreferrer">{item.url}</a><br /><br />
        <strong>Blob Path:</strong> {item.pathname}<br />
        <strong>Case ID:</strong> {item.caseId}
      </div>)}

      {analysis && <div className="result">
        <h2>AI Customs Review Result</h2>
        <p><strong>Document Type:</strong> {analysis.documentType || 'Unknown'}</p>
        <p><strong>Confidence:</strong> {analysis.confidence || 'Unknown'}</p>
        <p><strong>Summary:</strong> {analysis.summary}</p>
        <p><strong>中文摘要:</strong> {analysis.summaryChinese}</p>
        <JsonBlock data={analysis} />
      </div>}
    </section>
  </main>
}
