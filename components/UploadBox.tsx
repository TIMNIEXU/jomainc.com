import { UploadCloud, FileText, ShieldCheck } from "lucide-react";

export default function UploadBox({ title, help }: { title: string; help: string }) {
  return (
    <div className="card rounded-3xl p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-2xl bg-gold/15 p-3 text-gold"><UploadCloud /></div>
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm text-slate-400">{help}</p>
        </div>
      </div>
      <label className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-slate-500 bg-slate-950/40 p-8 text-center hover:border-gold">
        <UploadCloud className="mb-3 h-10 w-10 text-gold" />
        <span className="font-medium">Drag & drop files here</span>
        <span className="mt-1 text-sm text-slate-400">or click to choose documents</span>
        <input type="file" multiple className="hidden" />
      </label>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-900/80 p-4"><FileText className="mb-2 text-gold" />OCR extraction ready</div>
        <div className="rounded-2xl bg-slate-900/80 p-4"><ShieldCheck className="mb-2 text-gold" />Customs risk review ready</div>
      </div>
    </div>
  );
}
