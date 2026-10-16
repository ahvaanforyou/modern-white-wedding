const QUERY = "Rua da Bica do Sapato, Lisboa, Portugal";

export function VenueMap() {
  return (
    <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-sm border border-border shadow-[var(--shadow-soft)]">
      <iframe
        title="Map showing the wedding venue, Villa Serena in Lisbon"
        src={`https://www.google.com/maps?q=${encodeURIComponent(QUERY)}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-[280px] w-full border-0 sm:h-[380px] md:h-[460px]"
      />
    </div>
  );
}
