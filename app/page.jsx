export default function HomePage(){
  return <main className="container">
    <section className="hero">
      <div>
        <div className="badge">AI logistics platform</div>
        <h1 className="h1">AI-Powered Freight, Customs & Logistics Solutions</h1>
        <p className="lead">Joma Logistics Incorporated helps importers manage international freight, U.S. customs clearance, trucking, warehousing, document upload and AI-assisted shipment workflows.</p>
        <div className="cta">
          <a className="btn" href="/upload-documents">Upload Documents</a>
          <a className="btn secondary" href="/duty-calculator">AI Duty Calculator</a>
          <a className="btn secondary" href="/ai-customs-chatbot">Ask AI Assistant</a>
        </div>
      </div>
      <div className="panel">
        <h2>Shipment OS</h2>
        <p className="small">Case-based document upload, customs review and future AI OCR workflow.</p>
        <div className="grid">
          <div className="card"><h3>Documents</h3><p>Invoice, Packing List, BOL, ISF, Arrival Notice.</p></div>
          <div className="card"><h3>Customs</h3><p>HTS, duty, bond and PGA review support.</p></div>
        </div>
      </div>
    </section>
    <section className="grid">
      <div className="card"><h3>Ocean Freight</h3><p>FCL / LCL international shipping.</p></div>
      <div className="card"><h3>Air Freight</h3><p>Fast global cargo solutions.</p></div>
      <div className="card"><h3>Customs Clearance</h3><p>U.S. customs brokerage support.</p></div>
      <div className="card"><h3>Trucking & Delivery</h3><p>Port pickup, rail, warehouse and final mile.</p></div>
    </section>
  </main>
}
