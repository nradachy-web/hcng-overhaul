import type { Metadata } from "next";
import { Band } from "@/components/Band";
import { SlimHero } from "@/components/PageHero";
import { StickyCallBar } from "@/components/StickyCallBar";

/**
 * /privacy-policy/ (DESIGN_DIRECTION 8.12): quiet text page on the shared
 * legal template. Slim espresso band, then verbatim legal copy on plaster at
 * reading measure. No gauges, no plates, no CTAs beyond the global footer.
 */

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How this website collects, uses, and protects your information, your choices about your data, and how to opt out of email and text communications.",
  alternates: { canonical: "/privacy-policy/" },
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-h3s">{title}</h2>
      {children}
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-body mt-4">{children}</p>;
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <SlimHero eyebrow="Legal" title="Privacy Policy" />

      <Band tone="plaster">
        <article className="measure mx-auto">
          <Section title="Privacy Notice">
            <P>
              This privacy notice discloses the privacy practices for this
              website. This privacy notice applies solely to information
              collected by this website. It will notify you of the following:
            </P>
            <ol className="text-body mt-4 list-decimal space-y-2 pl-5 marker:text-(--muted)">
              <li>
                What personally identifiable information is collected from you
                through the website, how it is used and with whom it may be
                shared.
              </li>
              <li>
                What choices are available to you regarding the use of your
                data.
              </li>
              <li>
                The security procedures in place to protect the misuse of your
                information.
              </li>
              <li>
                How you can correct any inaccuracies in the information.
              </li>
            </ol>
          </Section>

          <Section title="Information Collection, Use, and Sharing">
            <P>
              We are the sole owners of the information collected on this
              site. We only have access to/collect information that you
              voluntarily give us via email or other direct contact from you.
            </P>
            <P>We will not sell or rent this information to anyone.</P>
            <P>
              We will use your information to respond to you, regarding the
              reason you contacted us. No mobile opt-in information or
              personally identifiable data will be shared, sold, traded, or
              transferred to any third parties or affiliates for marketing or
              promotional use.
            </P>
            <P>
              Unless you ask us not to, we may contact you via email in the
              future to tell you about specials, new products or services, or
              changes to this privacy policy.
            </P>
          </Section>

          <Section title="Your Access to and Control Over Information">
            <P>
              You may opt out of any future contacts from us at any time. You
              can do the following at any time by contacting us via the email
              address or phone number given on our website:
            </P>
            <ul className="text-body mt-4 list-disc space-y-2 pl-5 marker:text-(--muted)">
              <li>See what data we have about you, if any.</li>
              <li>Change/correct any data we have about you.</li>
              <li>Have us delete any data we have about you.</li>
              <li>Express any concern you have about our use of your data.</li>
            </ul>
          </Section>

          <Section title="Email and Text Communications">
            <P>
              If you wish to unsubscribe from our email campaigns, please
              click on the Unsubscribe link at the bottom of any marketing
              email sent from us.
            </P>
            <P>
              If you wish to stop receiving text messages from us, reply STOP
              to any text message sent from us. Instructions are provided on
              the first message sent to the contact.
            </P>
          </Section>

          <Section title="Security">
            <P>
              We take precautions to protect your information. When you submit
              sensitive information via the website, your information is
              protected both online and offline.
            </P>
            <P>
              While we use encryption to protect sensitive information
              transmitted online, we also protect your information offline.
              Only employees who need the information to perform a specific
              job (for example, billing or customer service) are granted
              access to personally identifiable information. The
              computers/servers in which we store personally identifiable
              information are kept in a secure environment.
            </P>
          </Section>

          <Section title="Cookies">
            <P>
              We use &ldquo;cookies&rdquo; on this site. A cookie is a piece
              of data stored on a site visitor&rsquo;s hard drive to help us
              improve your access to our site and identify repeat visitors to
              our site. For instance, when we use a cookie to identify you,
              you would not have to log in a password more than once, thereby
              saving time while on our site. Cookies can also enable us to
              track and target the interests of our users to enhance the
              experience on our site. Usage of a cookie is in no way linked to
              any personally identifiable information on our site.
            </P>
            <P>
              Some of our business partners may use cookies on our site (for
              example, advertisers). However, we have no access to or control
              over these cookies.
            </P>
          </Section>

          <Section title="Links">
            <P>
              This website contains links to other sites. Please be aware that
              we are not responsible for the content or privacy practices of
              such other sites. We encourage our users to be aware when they
              leave our site and to read the privacy statements of any other
              site that collects personally identifiable information.
            </P>
          </Section>

          <Section title="Surveys">
            <P>
              From time-to-time our site requests information via surveys or
              contests. Participation in these surveys or contests is
              completely voluntary and you may choose whether or not to
              participate and therefore disclose this information.
            </P>
          </Section>
        </article>
      </Band>

      <StickyCallBar />
    </>
  );
}
