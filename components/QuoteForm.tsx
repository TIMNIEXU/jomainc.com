export default function QuoteForm({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div id="quote" className="card rounded-3xl p-6 md:p-8">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="mt-2 text-slate-300">{subtitle}</p>
      <form className="mt-6 grid gap-4 md:grid-cols-2">
        <input className="input" placeholder="Company Name" />
        <input className="input" placeholder="Email / Phone" />
        <input className="input" placeholder="POL / Origin" />
        <input className="input" placeholder="POD / Destination" />
        <input className="input" placeholder="Commodity / HTS if known" />
        <input className="input" placeholder="Weight / CBM / PCS" />
        <textarea className="input md:col-span-2" rows={4} placeholder="Shipment details, delivery address, Amazon ISA, deadline, special requirements" />
        <button type="button" className="rounded-2xl bg-gold px-6 py-3 font-semibold text-navy hover:bg-amber-300 md:w-fit">Submit Quote Request</button>
      </form>
    </div>
  );
}
