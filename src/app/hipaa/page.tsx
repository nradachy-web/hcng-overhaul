import type { Metadata } from "next";
import { Band, Rule } from "@/components/Band";
import { TelText } from "@/components/Button";
import { SlimHero } from "@/components/PageHero";
import { StickyCallBar } from "@/components/StickyCallBar";
import { FAX_DISPLAY } from "@/lib/constants";

/**
 * /hipaa/ (DESIGN_DIRECTION 8.12): quiet text page on the shared legal
 * template. The page title reads HIPAA Privacy Notice, fixing the source
 * defect where it said Terms And Conditions. The source copy's en dashes
 * become bold lead-ins per the no-dash rule; the wording stays verbatim.
 * Fax 810.584.7173 renders here and nowhere else.
 */

export const metadata: Metadata = {
  title: "HIPAA Privacy Notice",
  description:
    "HIPAA Notice of Privacy Practices for Hanczaryk Chiropractic Neurology Group, updated 2.13.2026. How your medical information may be used and disclosed.",
  alternates: { canonical: "/hipaa/" },
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

/** List item with the source's lead term, dash restructured to a period. */
function Item({ lead, children }: { lead: string; children: React.ReactNode }) {
  return (
    <li>
      <strong className="font-semibold">{lead}.</strong> {children}
    </li>
  );
}

const OL_CLASS =
  "text-body mt-4 list-decimal space-y-3 pl-5 marker:text-(--muted)";
const UL_CLASS = "text-body mt-4 list-disc space-y-3 pl-5 marker:text-(--muted)";

export default function HipaaPage() {
  return (
    <>
      <SlimHero eyebrow="Legal" title="HIPAA Privacy Notice" />

      <Band tone="plaster">
        <article className="measure mx-auto">
          <p className="text-mono-cap text-(--muted) uppercase">
            Updated 2.13.2026
          </p>
          <p className="text-body mt-4 font-semibold">
            PLEASE REVIEW THIS NOTICE CAREFULLY. IT DESCRIBES HOW YOUR MEDICAL
            INFORMATION MAY BE USED AND DISCLOSED AND HOW YOU MAY GAIN ACCESS
            TO THAT INFORMATION.
          </p>

          <Section title="Policy Statement">
            <P>
              This Practice is committed to maintaining the privacy of your
              protected health information (&ldquo;PHI&rdquo;), which includes
              information about your medical condition and the care and
              treatment you receive from the Practice and other health care
              providers. This Notice details how your PHI may be used and
              disclosed to third parties for purposes of your care, payment
              for your care, health care operations of the Practice, and for
              other purposes permitted or required by law. This Notice also
              details your rights regarding your PHI.
            </P>
          </Section>

          <Section title="Use or Disclosure of PHI">
            <P>
              The Practice may use and/or disclose your PHI for purposes
              related to your care, payment for your care, and health care
              operations of the Practice. The following are examples of the
              types of uses and/or disclosures of your PHI that may occur.
              These examples are not meant to include all possible types of
              use and/or disclosure.
            </P>
            <P>
              <strong className="font-semibold">Care.</strong> In order to
              provide care to you, the Practice will provide your PHI to those
              health care professionals directly involved in your care so they
              may understand your medical condition and needs and provide
              advice or treatment. For example, your physician may need to
              know how your condition is responding to the treatment provided
              by the Practice.
            </P>
            <P>
              <strong className="font-semibold">Payment.</strong> In order to
              get paid for some or all of the health care provided by the
              Practice, the Practice may provide your PHI, directly or through
              a billing service, to appropriate third party payers, pursuant
              to their billing and payment requirements. For example, the
              Practice may need to provide your health insurance carrier with
              information about health care services you received from the
              Practice so the Practice may be properly reimbursed.
            </P>
            <P>
              <strong className="font-semibold">Health Care Operations.</strong>{" "}
              In order for the Practice to operate in accordance with
              applicable law and insurance requirements and in order for the
              Practice to provide quality and efficient care, it may be
              necessary for the Practice to compile, use and/or disclose your
              PHI. For example, the Practice may use your PHI in order to
              evaluate the performance of the Practice&rsquo;s personnel in
              providing care to you.
            </P>
            <P>
              Note: Genetic information is protected by law and is not
              considered part of Health Care Operations.
            </P>
          </Section>

          <Section title="Authorization Not Required">
            <P>
              The Practice may use and/or disclose your PHI, without a written
              Authorization from you, in the following instances:
            </P>
            <ol className={OL_CLASS}>
              <Item lead="De-identified Information">
                Your PHI is altered so that it does not identify you and, even
                without your name, cannot be used to identify you.
              </Item>
              <Item lead="Business Associate">
                To a business associate, who is someone the Practice contracts
                with to provide a service necessary for your treatment,
                payment for your treatment and/or health care operations
                (e.g., billing service or transcription service). The Practice
                will obtain satisfactory written assurance, in accordance with
                applicable law, that the business associate and their
                subcontractors will appropriately safeguard your PHI. An
                outside service will send text and/or email reminders
                regarding appointments and overdue reminders. Please inform
                the staff if you wish to opt out of any of these items.
              </Item>
              <Item lead="Personal Representative">
                To a person who, under applicable law, has the authority to
                represent you in making decisions related to your health care.
              </Item>
              <Item lead="Public Health Activities">
                Such activities include, for example, information collected by
                a public health authority, as authorized by law, to prevent or
                control disease, injury or disability. This includes reports
                of child abuse or neglect.
              </Item>
              <Item lead="Federal Drug Administration">
                If required by the Food and Drug Administration to report
                adverse events, product defects, problems, biological product
                deviations, or to track products, enable product recalls,
                repairs or replacements, or to conduct post marketing
                surveillance.
              </Item>
              <Item lead="Abuse, Neglect or Domestic Violence">
                To a government authority, if the Practice is required by law
                to make such disclosure. If the Practice is authorized by law
                to make such a disclosure, it will do so if it believes the
                disclosure is necessary to prevent serious harm or if the
                Practice believes you have been the victim of abuse, neglect
                or domestic violence. Any such disclosure will be made in
                accordance with the requirements of law, which may also
                involve notice to you of the disclosure.
              </Item>
              <Item lead="Health Oversight Activities">
                Such activities, which must be required by law, involve
                government agencies involved in oversight activities that
                relate to the health care system, government benefit programs,
                government regulatory programs and civil rights law. Those
                activities include, for example, criminal investigations,
                audits, disciplinary actions, or general oversight activities
                relating to the community&rsquo;s health care system.
              </Item>
              <Item lead="Family and Friends">
                Unless expressly prohibited by you, the Practice may disclose
                PHI to a member of your family, a relative, a close friend or
                any other person you identify, as it directly relates to that
                person&rsquo;s involvement in your health care. If you do not
                express an objection or are unable to object to such a
                disclosure, we may disclose such information, as necessary, if
                we determine that it is in your best interest based on our
                professional judgment.
              </Item>
              <Item lead="Judicial and Administrative Proceeding">
                For example, the Practice may be required to disclose your PHI
                in response to a court order or a lawfully issued subpoena.
              </Item>
              <Item lead="Law Enforcement Purposes">
                In certain instances, your PHI may have to be disclosed to a
                law enforcement official for law enforcement purposes. Law
                enforcement purposes include: (1) complying with a legal
                process (i.e., subpoena) or as required by law; (2)
                information for identification and location purposes (e.g.,
                suspect or missing person); (3) information regarding a person
                who is or is suspected to be a crime victim; (4) in situations
                where the death of an individual may have resulted from
                criminal conduct; (5) in the event of a crime occurring on the
                premises of the Practice; and (6) a medical emergency (not on
                the Practice&rsquo;s premises) has occurred, and it appears
                that a crime has occurred.
              </Item>
              <Item lead="Coroner or Medical Examiner">
                The Practice may disclose your PHI to a coroner or medical
                examiner for the purpose of identifying you or determining
                your cause of death, or to a funeral director as permitted by
                law and as necessary to carry out its duties.
              </Item>
              <Item lead="Organ, Eye or Tissue Donation">
                If you are an organ donor, the Practice may disclose your PHI
                to the entity to whom you have agreed to donate your organs.
              </Item>
              <Item lead="Research">
                If the Practice is involved in research activities, your PHI
                may be used, but such use is subject to numerous governmental
                requirements intended to protect the privacy of your PHI such
                as approval of the research by an institutional review board,
                the de-identification of your PHI before it is used, and the
                requirement that protocols must be followed. Individuals have
                the option to &lsquo;opt out&rsquo; of certain types of
                research activities.
              </Item>
              <Item lead="Avert a Threat to Health or Safety">
                The Practice may disclose your PHI if it believes that such
                disclosure is necessary to prevent or lessen a serious and
                imminent threat to the health or safety of a person or the
                public and the disclosure is to an individual who is
                reasonably able to prevent or lessen the threat.
              </Item>
              <Item lead="Specialized Government Functions">
                When the appropriate conditions apply, the Practice may use
                PHI of individuals who are Armed Forces personnel: (1) for
                activities deemed necessary by appropriate military command
                authorities; (2) for the purpose of a determination by the
                Department of Veteran Affairs of eligibility for benefits; or
                (3) to a foreign military authority if you are a member of
                that foreign military service. The Practice may also disclose
                your PHI to authorized federal officials for conducting
                national security and intelligence activities including the
                provision of protective services to the President or others
                legally authorized.
              </Item>
              <Item lead="Inmates">
                The Practice may disclose your PHI to a correctional
                institution or a law enforcement official if you are an inmate
                of that correctional facility and your PHI is necessary to
                provide care and treatment to you or is necessary for the
                health and safety of other individuals or inmates.
              </Item>
              <Item lead="Workers' Compensation">
                If you are involved in a Workers&rsquo; Compensation claim,
                the Practice may be required to disclose your PHI to an
                individual or entity that is part of the Workers&rsquo;
                Compensation system.
              </Item>
              <Item lead="Disaster Relief Efforts">
                The Practice may use or disclose your PHI to a public or
                private entity authorized to assist in disaster relief
                efforts.
              </Item>
              <Item lead="Marketing">
                Face to face communication directly with the patient,
                treatment and coordination of care activities, refill
                reminders or communications about services that have already
                been prescribed, or promotional gifts of nominal value do not
                require authorization as long as the Practice receives no
                financial remuneration for making the communication. All other
                situations require separate authorization. Please inform the
                office if you wish to opt out of any marketing mailings or
                emails.
              </Item>
              <Item lead="Required by Law">
                If otherwise required by law, but such use or disclosure will
                be made in compliance with the law and limited to the
                requirements of the law.
              </Item>
            </ol>
          </Section>

          <Section title="Authorization">
            <P>
              Uses and/or disclosures, other than those described above, will
              be made only with your written Authorization. These
              authorizations may be revoked at any time, however, we cannot
              take back disclosures already made with your permission.
            </P>
            <P>
              We also will NOT use or disclose your PHI for the following
              purposes, where applicable, without your express written
              Authorization:
            </P>
            <ul className={UL_CLASS}>
              <Item lead="Marketing">
                This does not include marketing communications described in
                item #19. The Practice will obtain prior authorization before
                disclosing PHI in connection with marketing activities in
                which financial remuneration is received.
              </Item>
              <Item lead="Sales">
                The Practice may receive payment for sharing your information
                in specific situations (i.e. public health purposes or
                specific research projects, see #12 above).
              </Item>
              <Item lead="Specially Protected Information">
                Certain types of information such as psychotherapy notes, HIV
                status, substance abuse, mental health, and genetic testing
                information require their separate written authorization for
                the purposes of treatment, payment or healthcare operations.
              </Item>
              <Item lead="Substance Abuse">
                There is no documentation regarding substance abuse in our
                medical records.
              </Item>
            </ul>
          </Section>

          <Section title="Appointment Reminder">
            <P>
              The Practice may, from time to time, contact you to provide
              appointment reminders. The reminder may be in the form of a
              letter or postcard. The Practice will try to minimize the amount
              of information contained in the reminder. The Practice may also
              contact you by phone and, if you are not available, the Practice
              will leave a message for you. The Practice also utilizes a third
              party reminder system that will utilize text, email and phone
              reminders. Please inform the office if you wish to opt out of
              this type of communication.
            </P>
          </Section>

          <Section title="Treatment Alternatives/Benefits">
            <P>
              The Practice may, from time to time, contact you about treatment
              alternatives it offers, or other health benefits or services
              that may be of interest to you.
            </P>
          </Section>

          <Section title="Your Rights">
            <P>You have the right to:</P>
            <ul className={UL_CLASS}>
              <Item lead="Revoke Authorization">
                Revoke any Authorization, in writing, at any time. To request
                a revocation, you must submit a written request to the
                Practice&rsquo;s Privacy Officer. Marketing revocations may be
                submitted to the Practice via telephone or email.
              </Item>
              <Item lead="Request Restrictions">
                Request restrictions on certain use and/or disclosure of your
                PHI as provided by law. However, the Practice is not obligated
                to agree to any requested restrictions. To request
                restrictions, you must submit a written request to the
                Practice&rsquo;s Privacy Officer. In your written request, you
                must inform the Practice of what information you want to
                limit, whether you want to limit the Practice&rsquo;s use or
                disclosure, or both, and to whom you want the limits to apply.
                If the Practice agrees to your request, the Practice will
                comply with your request unless the information is needed in
                order to provide you with emergency treatment.
              </Item>
              <Item lead="Restrict Health Plan Disclosures">
                Restrict disclosures to your health plan when you have paid
                out-of-pocket in full for health care items or services
                provided by the Practice.
              </Item>
              <Item lead="Confidential Communications">
                Receive confidential communications of PHI by alternative
                means or at alternative locations. You must make your request
                in writing to the Practice&rsquo;s Privacy Officer. The
                Practice will accommodate all reasonable requests.
              </Item>
              <Item lead="Inspect and Copy">
                Inspect and copy your PHI as provided by law. To inspect and
                copy your PHI, you must submit a written request to the
                Practice&rsquo;s Privacy Officer. In certain situations that
                are defined by law, the Practice may deny your request, but
                you will have the right to have the denial reviewed. The
                Practice may charge you a fee (to cover costs incurred by the
                Practice to reproduce records) for the cost of copying,
                mailing or other supplies associated with your request.
              </Item>
              <Item lead="Amend Your PHI">
                Amend your PHI as provided by law. To request an amendment,
                you must submit a written request to the Practice&rsquo;s
                Privacy Officer. You must provide a reason that supports your
                request. The Practice may deny your request if it is not in
                writing, if you do not provide a reason in support of your
                request, if the information to be amended was not created by
                the Practice (unless the originating individual or entity that
                created the information is no longer available), if the
                information is not part of your PHI maintained by the
                Practice, if the information is not part of the information
                you would be permitted to inspect and copy, and/or if the
                information is accurate and complete. If you disagree with the
                Practice&rsquo;s denial, you have the right to submit a
                written statement of disagreement.
              </Item>
              <Item lead="Accounting of Disclosures">
                Receive an accounting of non-routine disclosures of your PHI
                as provided by law. To request an accounting, you must submit
                a written request to the Practice&rsquo;s Privacy Officer. The
                request must state a time period which may not be longer than
                six years and may not include the dates before April 14, 2003.
                The request should indicate in what form you want the list
                (such as a paper or electronic copy). The first list you
                request within a 12 month period will be free, but the
                Practice may charge you for the cost of providing additional
                lists in that same 12 month period. The Practice will notify
                you of the costs involved and you can decide to withdraw or
                modify your request before any costs are incurred.
              </Item>
              <Item lead="Paper Copy">
                Receive a paper copy of this Notice of Privacy Practices from
                the Practice upon request.
              </Item>
              <Item lead="File a Complaint">
                To file a complaint with the Practice, please contact the
                Practice&rsquo;s Privacy Officer. All complaints must be in
                writing. If your complaint is not satisfactorily resolved, you
                may file a complaint with the Secretary of Health and Human
                Services, Office for Civil Rights. Our Privacy Officer will
                furnish you with the address upon request.
              </Item>
              <Item lead="More Information">
                To obtain more information, or have your questions about your
                rights answered, please contact the Practice&rsquo;s Privacy
                Officer.
              </Item>
            </ul>
          </Section>

          <Section title="Practice's Requirements">
            <P>The health care office:</P>
            <ul className={UL_CLASS}>
              <li>
                Is required by law to maintain the privacy of your PHI and to
                provide you with this Notice of Privacy Practices upon
                request.
              </li>
              <li>
                Is required to abide by the terms of this Notice of Privacy
                Practices.
              </li>
              <li>
                Reserves the right to change the terms of this Notice of
                Privacy Practices and to make the new Notice of Privacy
                Practices provisions effective for all of your PHI that it
                maintains.
              </li>
              <li>Will not retaliate against you for making a complaint.</li>
              <li>
                Must make a good faith effort to obtain from you an
                Acknowledgment of receipt of this Notice.
              </li>
              <li>
                Will post this Notice of Privacy Practices in its lobby and on
                the Practice&rsquo;s web site, if the Practice maintains a Web
                site.
              </li>
              <li>
                Will inform you in a timely manner, if there is a case of a
                breach of unsecured health information.
              </li>
            </ul>
          </Section>

          <Rule className="mt-12" />
          <address className="text-body mt-8 not-italic">
            <p className="font-semibold">
              Hanczaryk Chiropractic Neurology Group
            </p>
            <p>Dr. Christine Hanczaryk</p>
            <p>8185 Holly Road</p>
            <p>Grand Blanc, MI 48439</p>
            <p className="mt-3">
              Phone: <TelText location="body" />
            </p>
            <p>Fax: {FAX_DISPLAY}</p>
          </address>
        </article>
      </Band>

      <StickyCallBar />
    </>
  );
}
