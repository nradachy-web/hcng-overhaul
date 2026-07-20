import type { Metadata } from "next";
import Link from "next/link";
import { Band } from "@/components/Band";
import { TelText } from "@/components/Button";
import { SlimHero } from "@/components/PageHero";
import { StickyCallBar } from "@/components/StickyCallBar";

/**
 * /terms/ (DESIGN_DIRECTION 8.12): quiet text page on the shared legal
 * template. Verbatim terms copy on plaster at reading measure, including the
 * SMS messaging terms; every 810.584.7170 renders as a tel link. No gauges,
 * no plates, no CTAs beyond the global footer.
 */

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and conditions for using this website, including SMS messaging terms, HELP and STOP instructions, and liability notices.",
  alternates: { canonical: "/terms/" },
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

function SubHead({ children }: { children: React.ReactNode }) {
  return <h3 className="text-body mt-6 font-semibold">{children}</h3>;
}

const LIST_CLASS =
  "text-body mt-4 list-disc space-y-2 pl-5 marker:text-(--muted)";

export default function TermsPage() {
  return (
    <>
      <SlimHero eyebrow="Legal" title="Terms and Conditions" />

      <Band tone="plaster">
        <article className="measure mx-auto">
          <p className="text-body">
            Hanczaryk Chiropractic Neurology Group (&ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) provides this website
            (&ldquo;Site&rdquo;) to you conditioned on your acceptance without
            modification of the terms, conditions, and notices contained
            herein. Your use of this Site constitutes your agreement to all
            such terms, conditions, and notices.
          </p>

          <Section title="Modifications of these terms of use">
            <P>
              We reserve the right to change the terms, conditions, and
              notices under which this Site is offered, including but not
              limited to the charges associated with the use of this Site.
            </P>
          </Section>

          <Section title="Links to third party sites">
            <P>
              This Site may contain links to other websites (&ldquo;Linked
              Sites&rdquo;). The Linked Sites are not under our control and we
              are not responsible for the contents of any Linked Site,
              including without limitation any link contained in a Linked
              Site, or any changes or updates to a Linked Site. We are not
              responsible for webcasting or any other form of transmission
              received from any Linked Site. We provide these links to you
              only as a convenience, and the inclusion of any link does not
              imply endorsement by us of the site or any association with its
              operators.
            </P>
          </Section>

          <Section title="No unlawful or prohibited use">
            <P>
              As a condition of your use of this Site, you warrant to us that
              you will not use this Site for any purpose that is unlawful or
              prohibited by these terms, conditions, and notices. You may not
              use this Site in any manner which could damage, disable,
              overburden, or impair this Site or interfere with any other
              party&rsquo;s use and enjoyment of this Site. You may not obtain
              or attempt to obtain any materials or information through any
              means not intentionally made available or provided for through
              this Site.
            </P>
          </Section>

          <Section title="Content you submit">
            <P>
              When using this Site, you may have the opportunity to submit
              reviews or feedback regarding your experiences with us, and to
              participate in bulletin boards, chat areas, news groups, forums,
              communities, personal web pages, calendars, and/or other message
              or communication features designed to enable you to communicate
              with the public at large or with a group (collectively,
              &ldquo;Communication Services&rdquo;). You agree to use the
              Communication Services only to post, send, and receive messages
              and material that are proper and related to the particular
              Communication Service.
            </P>
            <P>
              By way of example, and not as a limitation, you agree that when
              using a Communication Service, you will not post content that
              contains:
            </P>
            <ul className={LIST_CLASS}>
              <li>
                Personal and confidential information, including phone
                numbers, addresses, and health information;
              </li>
              <li>
                Vulgar content, including offensive, derogatory, obscene,
                profane, or inflammatory language or content;
              </li>
              <li>Threats or personal attacks on others;</li>
              <li>
                Discriminatory content or hate speech, including content that
                advocates against groups of people based on their race, ethnic
                origin, religion, disability, gender, gender identity, sexual
                orientation, age, or veteran status;
              </li>
              <li>
                Misrepresentations, including content submitted fraudulently
                on behalf of others or that misrepresents your identity or
                connection with us or our practice;
              </li>
              <li>
                Non-applicable content, including posts that are not specific
                to us or our practice;
              </li>
              <li>Advertising or solicitations;</li>
              <li>Illegal content; or</li>
              <li>
                References to or information about ongoing legal matters or
                proceedings.
              </li>
            </ul>
            <SubHead>You further agree that you will not:</SubHead>
            <ul className={LIST_CLASS}>
              <li>
                Upload files that contain software or other material protected
                by intellectual property laws (or by rights of privacy of
                publicity) unless you own or control the rights thereto or
                have received all necessary consents.
              </li>
              <li>
                Upload files that contain viruses, corrupted files, or any
                other similar software or programs that may damage the
                operation of another&rsquo;s computer.
              </li>
              <li>
                Conduct or forward surveys, contests, pyramid schemes, or
                chain letters.
              </li>
              <li>
                Download any file posted by another user of a Communication
                Service that you know, or reasonably should know, cannot be
                legally distributed in such manner.
              </li>
              <li>
                Falsify or delete any legal or other proper notices or
                proprietary designations or labels of the origin or source of
                software or other material contained in a file that is
                uploaded.
              </li>
              <li>
                Restrict or inhibit any other user from using and enjoying the
                Communication Services.
              </li>
              <li>
                Violate any code of conduct or other guidelines which may be
                applicable for any particular Communication Service.
              </li>
              <li>
                Harvest or otherwise collect information about others,
                including e-mail addresses, without their consent.
              </li>
            </ul>
            <P>
              We have no obligation to monitor the Communication Services.
              However, we reserve the right to review materials posted to a
              Communication Service and to remove any content that does not
              comply with these terms or any publicly posted content that
              includes personal and confidential information. We reserve the
              right to terminate your access to any or all of the
              Communication Services at any time without notice for any reason
              whatsoever. Content uploaded to a Communication Service may be
              subject to posted limitations on usage, reproduction, and/or
              dissemination. You are responsible for adhering to such
              limitations if you download the content. If you would like to
              remove your own review from this Site, please contact us.
            </P>
          </Section>

          <Section title="Liability disclaimer">
            <P>
              THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES INCLUDED IN OR
              AVAILABLE THROUGH THIS SITE MAY INCLUDE INACCURACIES OR
              TYPOGRAPHICAL ERRORS. CHANGES ARE PERIODICALLY ADDED TO THE
              INFORMATION HEREIN. WE AND/OR OUR SUPPLIERS MAY MAKE
              IMPROVEMENTS AND/OR CHANGES IN THIS SITE AT ANY TIME.
            </P>
            <P>
              ADVICE RECEIVED VIA THIS SITE SHOULD NOT BE RELIED UPON FOR
              PERSONAL, MEDICAL, LEGAL, OR FINANCIAL DECISIONS AND YOU SHOULD
              CONSULT AN APPROPRIATE PROFESSIONAL FOR SPECIFIC ADVICE TAILORED
              TO YOUR SITUATION.
            </P>
            <P>
              WE AND/OR OUR SUPPLIERS MAKE NO REPRESENTATIONS ABOUT THE
              SUITABILITY, RELIABILITY, AVAILABILITY, TIMELINESS, AND ACCURACY
              OF THE INFORMATION, SOFTWARE, PRODUCTS, SERVICES, AND RELATED
              GRAPHICS CONTAINED ON THIS SITE FOR ANY PURPOSE. TO THE MAXIMUM
              EXTENT PERMITTED BY APPLICABLE LAW, ALL SUCH INFORMATION,
              SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS ARE PROVIDED
              &ldquo;AS IS&rdquo; WITHOUT WARRANTY OR CONDITION OF ANY KIND.
            </P>
            <P>
              WE AND/OR OUR SUPPLIERS HEREBY DISCLAIM ALL WARRANTIES AND
              CONDITIONS WITH REGARD TO THIS INFORMATION, SOFTWARE, PRODUCTS,
              SERVICES AND RELATED GRAPHICS, INCLUDING ALL IMPLIED WARRANTIES
              OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
              PURPOSE, TITLE AND NON-INFRINGEMENT.
            </P>
            <P>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT
              SHALL WE AND/OR OUR SUPPLIERS BE LIABLE FOR ANY DIRECT,
              INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL DAMAGES
              OR ANY DAMAGES WHATSOEVER INCLUDING, WITHOUT LIMITATION, DAMAGES
              FOR LOSS OF USE, DATA OR PROFITS, ARISING OUT OF OR IN ANY WAY
              CONNECTED WITH THE USE OR PERFORMANCE OF THIS SITE, WITH THE
              DELAY OR INABILITY TO USE THIS SITE OR RELATED SERVICES, THE
              PROVISION OF OR FAILURE TO PROVIDE SERVICES, OR FOR ANY
              INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS
              OBTAINED THROUGH THIS SITE, OR OTHERWISE ARISING OUT OF THE USE
              OF THIS SITE, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE,
              STRICT LIABILITY OR OTHERWISE, EVEN IF WE OR ANY OF OUR
              SUPPLIERS HAS BEEN ADVISED OF THE POSSIBILITY OF DAMAGES.
              BECAUSE SOME STATES/JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR
              LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES,
              THE ABOVE LIMITATION MAY NOT APPLY TO YOU. IF YOU ARE
              DISSATISFIED WITH ANY PORTION OF THIS SITE, OR WITH ANY OF THESE
              TERMS OF USE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE
              USING THIS SITE.
            </P>
          </Section>

          <Section title="Copyright and trademark notices">
            <P>
              All contents of this website are Copyright &copy; 2025 Hanczaryk
              Chiropractic Neurology Group. All Rights Reserved. All logos are
              trademarks and service marks of Hanczaryk Chiropractic Neurology
              Group. All other trademarks, service marks and logos used in
              this Site are the property of their respective owners.
            </P>
          </Section>

          <Section title="Trademarks">
            <P>
              The names of actual companies and products mentioned herein may
              be the trademarks of their respective owners. The example
              companies, organizations, products, people, and events depicted
              herein are fictitious. No association with any real company,
              organization, product, person, or event is intended or should be
              inferred. Any rights not expressly granted herein are reserved.
            </P>
          </Section>

          <Section title="Messaging summary">
            <P>
              By opting into our SMS messaging service, you agree to receive
              text messages from Hanczaryk Chiropractic Neurology Group
              regarding your appointments, feedback requests, and office
              notifications. Message frequency may vary based on your
              interactions with our services.
            </P>
            <SubHead>Types of Messages:</SubHead>
            <ul className={LIST_CLASS}>
              <li>
                Appointment Reminders: Notifications regarding upcoming
                scheduled appointments.
              </li>
              <li>
                Feedback Requests: Requests for feedback on the service you
                received.
              </li>
              <li>
                Office Notifications: Important updates, including changes to
                our operating hours.
              </li>
            </ul>
            <SubHead>Message Frequency:</SubHead>
            <P>
              Messages will be sent periodically based on your appointments
              and interactions with our office. Frequency may vary depending
              on the services you utilize.
            </P>
            <SubHead>Message and Data Rates:</SubHead>
            <P>
              Message and data rates may apply. Please check with your mobile
              carrier for details on messaging costs.
            </P>
            <SubHead>Privacy Policy:</SubHead>
            <P>
              Your privacy is important to us. Please review our{" "}
              <Link
                href="/privacy-policy/"
                className="text-(--link) underline decoration-1 underline-offset-4"
              >
                Privacy Policy
              </Link>{" "}
              to understand how we collect, use, and protect your information.
            </P>
            <SubHead>HELP Instructions:</SubHead>
            <P>
              For assistance, text HELP to <TelText location="body" />, or
              call our team at <TelText location="body" />.
            </P>
            <SubHead>STOP Instructions:</SubHead>
            <P>
              To opt out of SMS messages, text STOP to{" "}
              <TelText location="body" />. You will receive a final
              confirmation message, and no further messages will be sent
              unless you opt back in.
            </P>
            <P>
              By continuing to use our SMS messaging service, you acknowledge
              and agree to these terms.
            </P>
          </Section>
        </article>
      </Band>

      <StickyCallBar />
    </>
  );
}
