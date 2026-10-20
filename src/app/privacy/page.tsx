import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/section";
import { SITE } from "@/config/links";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How steinproduct.com and Jacob Stein's personal tools handle data, including the read-only Google Calendar access used by his own command center.",
  alternates: { canonical: "/privacy" },
};

/**
 * Privacy policy for this site and for the personal tools Jacob runs under
 * the "Command Center" Google OAuth app. Google requires a public policy URL
 * before an OAuth app can leave Testing status, even when its only user is
 * the developer. Not linked from the nav on purpose.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="What this site and my tools do with data"
        intro="Short version: this site collects anonymous page analytics, and my personal tools read my own Google Calendar. Nothing here handles anyone else's data."
      />
      <section>
        <Container className="py-16 sm:py-20">
          <div className="max-w-2xl space-y-12 text-base leading-relaxed text-muted-foreground">
            <div className="space-y-4">
              <h2 className="title text-foreground">This website</h2>
              <p>
                steinproduct.com is a static portfolio site. It has no accounts, no forms and no
                cookies you need to accept. It uses PostHog for anonymous page analytics so I can
                see which pages people read. That data is not sold or shared, and it is not tied to
                your name or email.
              </p>
              <p>
                If you email me, I keep the email. I do not add you to a list.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="title text-foreground">Command Center and my personal tools</h2>
              <p>
                Command Center is a private dashboard I built for myself. It runs on my own
                computer, is reachable only on my private network, and has one user: me.
              </p>
              <p>
                It connects to Google through an OAuth app named &ldquo;Command Center&rdquo; using
                the read-only calendar scope. With that access it reads events from my own
                calendars for today and tomorrow so the dashboard can show my next meeting. It
                never creates, edits or deletes events, and it never reads anyone else&rsquo;s
                calendar.
              </p>
              <p>
                Calendar data stays on my machine in a local cache that is refreshed every few
                minutes and overwritten each time. It is not sent to any third party, not used for
                advertising, and not used to train AI models. The sign-in token is stored in the
                macOS Keychain and can be revoked at any time from my Google account.
              </p>
              <p>
                Use and transfer of information received from Google APIs follows the{" "}
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Google API Services User Data Policy
                </a>
                , including the Limited Use requirements.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="title text-foreground">Questions</h2>
              <p>
                Email{" "}
                <a href={`mailto:${SITE.email}`} className="text-primary underline-offset-4 hover:underline">
                  {SITE.email}
                </a>
                . Last updated October 20, 2026.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
