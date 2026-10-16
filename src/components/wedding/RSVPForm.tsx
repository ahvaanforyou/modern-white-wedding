import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function RSVPForm() {
  const [attending, setAttending] = useState("yes");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setSubmitState("submitting");
    setMessage("");

    const form = new FormData(formElement);
    const guestName = String(form.get("guestName") ?? "").trim();
    const guestCount = Number(form.get("guestCount"));
    const note = String(form.get("note") ?? "").trim();

    if (guestName.length < 2 || guestName.length > 100 || guestCount < 1 || guestCount > 8) {
      setSubmitState("error");
      setMessage("Please add your name and choose between one and eight guests.");
      return;
    }

    try {
      // Check if Supabase env is available
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      if (supabaseUrl && supabaseKey) {
        const response = await fetch(`${supabaseUrl}/rest/v1/wedding_rsvps`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: "return=representation",
          },
          body: JSON.stringify({
            guest_name: guestName,
            attending: attending === "yes",
            guest_count: guestCount,
            note: note.slice(0, 500),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save RSVP to remote database");
        }
      } else {
        // Local persistence fallback
        const existing = JSON.parse(localStorage.getItem("wedding_rsvps") || "[]");
        existing.push({
          guest_name: guestName,
          attending: attending === "yes",
          guest_count: guestCount,
          note: note.slice(0, 500),
          created_at: new Date().toISOString(),
        });
        localStorage.setItem("wedding_rsvps", JSON.stringify(existing));
        // Small delay for natural user feel
        await new Promise((resolve) => setTimeout(resolve, 600));
      }

      formElement.reset();
      setAttending("yes");
      setSubmitState("success");
      setMessage("Thank you — your reply has been joyfully received.");
    } catch {
      setSubmitState("error");
      setMessage("We couldn’t save your reply. Please try again in a moment.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl px-2" aria-label="Wedding RSVP">
      <div className="grid gap-6 sm:gap-7 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="guest-name" className="font-sans text-xs tracking-[0.2em] text-ink uppercase">
            Your name
          </Label>
          <Input
            id="guest-name"
            name="guestName"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="Full name"
            className="mt-2 h-12 bg-background/75 px-4 font-sans border-border focus:border-gold"
          />
        </div>

        <fieldset className="sm:col-span-1">
          <legend className="font-sans text-xs tracking-[0.2em] text-ink uppercase">
            Will you attend?
          </legend>
          <RadioGroup
            value={attending}
            onValueChange={setAttending}
            className="mt-3 flex min-h-12 items-center gap-6 rounded-md border border-input bg-background/75 px-4"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="yes" id="attending-yes" />
              <Label htmlFor="attending-yes" className="cursor-pointer font-sans text-sm">
                Joyfully, yes
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="no" id="attending-no" />
              <Label htmlFor="attending-no" className="cursor-pointer font-sans text-sm">
                Regretfully, no
              </Label>
            </div>
          </RadioGroup>
        </fieldset>

        <div className="sm:col-span-1">
          <Label htmlFor="guest-count" className="font-sans text-xs tracking-[0.2em] text-ink uppercase">
            Guest count
          </Label>
          <Input
            id="guest-count"
            name="guestCount"
            type="number"
            inputMode="numeric"
            min={1}
            max={8}
            defaultValue={1}
            required
            className="mt-2 h-12 bg-background/75 px-4 font-sans border-border focus:border-gold"
          />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="rsvp-note" className="font-sans text-xs tracking-[0.2em] text-ink uppercase">
            A note for the couple
          </Label>
          <Textarea
            id="rsvp-note"
            name="note"
            maxLength={500}
            placeholder="Dietary needs, a message, or anything we should know"
            className="mt-2 min-h-32 resize-y bg-background/75 px-4 py-3 font-sans border-border focus:border-gold"
          />
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button
          type="submit"
          size="lg"
          disabled={submitState === "submitting"}
          className="min-w-44 bg-gold hover:bg-gold/90 text-background font-sans font-medium uppercase tracking-[0.2em] text-xs h-12 shadow-[var(--shadow-soft)] transition-all"
        >
          {submitState === "submitting" ? "Sending…" : "Send RSVP"}
        </Button>
        <p
          aria-live="polite"
          className={`mt-4 min-h-6 font-sans text-sm transition-opacity duration-300 ${
            submitState === "error"
              ? "text-destructive font-medium"
              : submitState === "success"
                ? "text-gold font-medium"
                : "text-muted-foreground"
          }`}
        >
          {message}
        </p>
      </div>
    </form>
  );
}
