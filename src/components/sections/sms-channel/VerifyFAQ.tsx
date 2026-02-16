"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What is the difference between verification & authentication?",
    answer: (
      <p>
        Verification and authentication are typically used interchangeably, but they aren't the same thing. Verification occurs at signup. It ensures that a user is who they say they are. Authentication occurs every time a user logs in. Plivo Verify can be used for both verification and authentication.
      </p>
    ),
  },
  {
    question: "What's the difference between SMS verification and voice verification?",
    answer: (
      <div className="space-y-3">
        <p>Both are great options, but they have different benefits.</p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>SMS verification is fast and easy for users to complete.</li>
          <li>SMS verification has great reach: almost all mobile devices support SMS functionality.</li>
          <li>Voice verification provides an accessible alternative for individuals who may have visual disabilities.</li>
          <li>Voice verification works best for customers who only have access to a landline, as landlines don't support SMS.</li>
          <li>Voice verification can be a reliable alternative or fallback in cases of delays or failures in SMS delivery. Voice is prioritized on carrier networks, resulting in higher delivery rates compared to SMS.</li>
          <li>Voice offers significantly richer data points for analytics, enabling users to gain deeper customer insights and optimize conversions.</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Is 2FA the same as OTP for verification?",
    answer: (
      <div className="space-y-3">
        <p>Two-factor authentication, or 2FA, refers to the use of two different types of authentication factors to verify a user's identity. These factors can come from any of the following three categories.</p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li><strong>Something you know:</strong> This could be a password, PIN, or the answer to a security question.</li>
          <li><strong>Something you have:</strong> This could be a smartphone (to receive an SMS or use an authenticator app), a smart card, or a hardware token.</li>
          <li><strong>Something you are:</strong> This refers to biometric data, like a fingerprint, facial recognition, or retina scans.</li>
        </ul>
        <p>A one-time password (OTP) is valid for only one login session or transaction, and it relies on something you have. After entering a password (something you know), you might be sent an OTP via SMS to your phone (something you have), which you must then enter to gain access.</p>
      </div>
    ),
  },
  {
    question: "What is SMS verification?",
    answer: (
      <p>
        SMS verification adds an extra layer of security by using two-factor authentication (2FA) to verify users' identities. SMS verification helps ensure that the person trying to access the account or register for the service has a mobile device tied to that account. This can help prevent unauthorized access, even if someone gains access to the user's username and password.
      </p>
    ),
  },
  {
    question: "How does SMS verification work?",
    answer: (
      <div className="space-y-3">
        <p>Here are the steps in the SMS verification process:</p>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li>A user provides their mobile number to log in to an account or register for a service.</li>
          <li>The system then sends a request to Plivo to initiate the SMS verification process for that mobile number.</li>
          <li>Plivo generates a one-time password (OTP) - a unique code that can be used for this one instance for verification.</li>
          <li>The OTP is sent via SMS to the user's mobile number. Plivo also keeps a copy of the OTP to check it against the user's input.</li>
          <li>The user receives the OTP in an SMS message on their phone and enters the OTP into the website or application to which they're trying to log in or sign up.</li>
          <li>The user's entry is sent to Plivo. Plivo verifies whether it matches the OTP that was originally generated and sent to the user.</li>
          <li>If the OTPs match, Plivo verifies the user. If not, Plivo may resend the OTP, or the user may have to initiate the process again.</li>
          <li>Once the user is verified, they can proceed to log in to their account or complete their registration.</li>
        </ol>
      </div>
    ),
  },
];

export default function VerifyFAQ() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="font-sora text-center text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-10">
          Frequently asked questions
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-base font-medium text-black hover:no-underline py-5">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-[15px] leading-relaxed pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
