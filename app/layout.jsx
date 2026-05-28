import './globals.css';

export const metadata = {
  title: 'Joma Logistics Incorporated',
  description: 'AI-powered freight, customs and logistics platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <div className="brand">JOMA LOGISTICS</div>
          <nav>
            <a href="/">Home</a>
            <a href="/upload-documents">Upload Documents</a>
            <a href="/duty-calculator">Duty Calculator</a>
            <a href="/tracking">Tracking</a>
            <a href="/ai-customs-chatbot">AI Customs Chatbot</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
