"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface UseCase {
  title: string;
  tags: string[];
  description: string;
  illustration: React.ReactNode;
}

function IllustrationWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative h-[244px] w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100", className)}>
      <div className="relative h-full w-full px-3 py-4 flex flex-col">
        {children}
      </div>
    </div>
  );
}

// Lead Capture Illustration - Flow builder UI matching product (static)
function LeadCaptureIllustration() {
  return (
    <IllustrationWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-4 gap-0">
        {/* Trigger node - Receive message on WhatsApp */}
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 shadow-sm max-w-[220px] w-full overflow-hidden">
          <div className="w-5 h-5 rounded-md bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-3 h-3 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <span className="text-[11px] font-semibold text-gray-900 truncate">Receive message on WhatsApp</span>
        </div>

        {/* Connector arrow */}
        <div className="flex flex-col items-center">
          <div className="w-px h-2.5 bg-gray-300" />
          <svg className="w-2.5 h-2.5 text-gray-300 -mt-px" fill="currentColor" viewBox="0 0 10 6">
            <path d="M5 6L0 0h10L5 6z" />
          </svg>
        </div>

        {/* Action node - Capture Leads (compact) */}
        <div className="rounded-xl border border-gray-900 bg-white px-3 py-2 shadow-sm max-w-[220px] w-full">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <div className="w-4.5 h-4.5 rounded-md bg-purple-50 flex items-center justify-center">
                <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-gray-900">Capture Leads</span>
            </div>
            <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
              <circle cx="8" cy="3" r="1.2" />
              <circle cx="8" cy="8" r="1.2" />
              <circle cx="8" cy="13" r="1.2" />
            </svg>
          </div>
          <p className="text-[9px] text-gray-500 leading-snug mb-1">
            Greet the prospects and ask gather their details and requirements.
          </p>
          <span className="text-[8px] font-medium text-gray-400 tracking-wide uppercase">AI Conversation</span>
        </div>

        {/* Connector + plus */}
        <div className="flex flex-col items-center">
          <div className="w-px h-2 bg-gray-300" />
          <div className="w-4 h-4 rounded-full border border-gray-300 bg-white flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
        </div>

        {/* Integration icons */}
        <div className="flex items-center gap-2 mt-1">
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center p-1.5">
            <img src="/images/integrations/salesforce.svg" alt="Salesforce" className="w-full h-full object-contain" />
          </div>
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center p-1.5">
            <img src="/images/integrations/hubspot.svg" alt="HubSpot" className="w-full h-full object-contain" />
          </div>
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center p-1.5">
            <img src="/images/integrations/zoho.svg" alt="Zoho" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

// Support Agent Illustration - Flow builder format
function SupportAgentIllustration() {
  return (
    <IllustrationWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-4 gap-0">
        {/* Trigger node - Incoming call */}
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 shadow-sm max-w-[220px] w-full overflow-hidden">
          <div className="w-5 h-5 rounded-md bg-blue-50 flex items-center justify-center flex-shrink-0">
            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </div>
          <span className="text-[11px] font-semibold text-gray-900 truncate">Incoming call on Voice</span>
        </div>

        {/* Connector arrow */}
        <div className="flex flex-col items-center">
          <div className="w-px h-2.5 bg-gray-300" />
          <svg className="w-2.5 h-2.5 text-gray-300 -mt-px" fill="currentColor" viewBox="0 0 10 6">
            <path d="M5 6L0 0h10L5 6z" />
          </svg>
        </div>

        {/* Action node */}
        <div className="rounded-xl border border-gray-900 bg-white px-3 py-2 shadow-sm max-w-[220px] w-full">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <div className="w-4.5 h-4.5 rounded-md bg-purple-50 flex items-center justify-center">
                <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-gray-900">Resolve Query</span>
            </div>
            <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
              <circle cx="8" cy="3" r="1.2" />
              <circle cx="8" cy="8" r="1.2" />
              <circle cx="8" cy="13" r="1.2" />
            </svg>
          </div>
          <p className="text-[9px] text-gray-500 leading-snug mb-1">
            Look up order details and provide real-time shipping updates.
          </p>
          <span className="text-[8px] font-medium text-gray-400 tracking-wide uppercase">AI Conversation</span>
        </div>

        {/* Connector + plus */}
        <div className="flex flex-col items-center">
          <div className="w-px h-2 bg-gray-300" />
          <div className="w-4 h-4 rounded-full border border-gray-300 bg-white flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
        </div>

        {/* Integration icons - Shopify, Zendesk, Woo */}
        <div className="flex items-center gap-2 mt-1">
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center p-1.5">
            <img src="/images/integrations/shopify.svg" alt="Shopify" className="w-full h-full object-contain" />
          </div>
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center p-1.5">
            <img src="/images/integrations/zendesk.svg" alt="Zendesk" className="w-full h-full object-contain" />
          </div>
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center p-1.5">
            <img src="/images/integrations/woo.svg" alt="Woo" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

// Appointment Booking Illustration - Flow builder format
function AppointmentBookingIllustration() {
  return (
    <IllustrationWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-4 gap-0">
        {/* Trigger node - Incoming call */}
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 shadow-sm max-w-[220px] w-full overflow-hidden">
          <div className="w-5 h-5 rounded-md bg-blue-50 flex items-center justify-center flex-shrink-0">
            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </div>
          <span className="text-[11px] font-semibold text-gray-900 truncate">Incoming call on Voice</span>
        </div>

        {/* Connector arrow */}
        <div className="flex flex-col items-center">
          <div className="w-px h-2.5 bg-gray-300" />
          <svg className="w-2.5 h-2.5 text-gray-300 -mt-px" fill="currentColor" viewBox="0 0 10 6">
            <path d="M5 6L0 0h10L5 6z" />
          </svg>
        </div>

        {/* Action node */}
        <div className="rounded-xl border border-gray-900 bg-white px-3 py-2 shadow-sm max-w-[220px] w-full">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <div className="w-4.5 h-4.5 rounded-md bg-purple-50 flex items-center justify-center">
                <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-gray-900">Book Appointment</span>
            </div>
            <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
              <circle cx="8" cy="3" r="1.2" />
              <circle cx="8" cy="8" r="1.2" />
              <circle cx="8" cy="13" r="1.2" />
            </svg>
          </div>
          <p className="text-[9px] text-gray-500 leading-snug mb-1">
            Check availability and confirm booking in real-time.
          </p>
          <span className="text-[8px] font-medium text-gray-400 tracking-wide uppercase">AI Conversation</span>
        </div>

        {/* Connector + plus */}
        <div className="flex flex-col items-center">
          <div className="w-px h-2 bg-gray-300" />
          <div className="w-4 h-4 rounded-full border border-gray-300 bg-white flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
        </div>

        {/* Integration icons - Calendly, Google Calendar, Cal.com */}
        <div className="flex items-center gap-2 mt-1">
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center p-1.5">
            <img src="/images/integrations/calendly.svg" alt="Calendly" className="w-full h-full object-contain" />
          </div>
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center p-1.5">
            <img src="/images/integrations/google-calendar.svg" alt="Google Calendar" className="w-full h-full object-contain" />
          </div>
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center p-1.5">
            <img src="/images/integrations/calcom.svg" alt="Cal.com" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

// Tech Support Illustration - Flow builder format
function TechSupportIllustration() {
  return (
    <IllustrationWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-4 gap-0">
        {/* Trigger node - Incoming call */}
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 shadow-sm max-w-[220px] w-full overflow-hidden">
          <div className="w-5 h-5 rounded-md bg-blue-50 flex items-center justify-center flex-shrink-0">
            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </div>
          <span className="text-[11px] font-semibold text-gray-900 truncate">Incoming call on Voice</span>
        </div>

        {/* Connector arrow */}
        <div className="flex flex-col items-center">
          <div className="w-px h-2.5 bg-gray-300" />
          <svg className="w-2.5 h-2.5 text-gray-300 -mt-px" fill="currentColor" viewBox="0 0 10 6">
            <path d="M5 6L0 0h10L5 6z" />
          </svg>
        </div>

        {/* Action node */}
        <div className="rounded-xl border border-gray-900 bg-white px-3 py-2 shadow-sm max-w-[220px] w-full">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <div className="w-4.5 h-4.5 rounded-md bg-purple-50 flex items-center justify-center">
                <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-gray-900">Run Diagnostics</span>
            </div>
            <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
              <circle cx="8" cy="3" r="1.2" />
              <circle cx="8" cy="8" r="1.2" />
              <circle cx="8" cy="13" r="1.2" />
            </svg>
          </div>
          <p className="text-[9px] text-gray-500 leading-snug mb-1">
            Troubleshoot using knowledge base and escalate if needed.
          </p>
          <span className="text-[8px] font-medium text-gray-400 tracking-wide uppercase">AI Conversation</span>
        </div>

        {/* Connector + plus */}
        <div className="flex flex-col items-center">
          <div className="w-px h-2 bg-gray-300" />
          <div className="w-4 h-4 rounded-full border border-gray-300 bg-white flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
        </div>

        {/* Integration icons - Jira, ServiceNow, Freshdesk */}
        <div className="flex items-center gap-2 mt-1">
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center p-1.5">
            <img src="/images/integrations/jira.svg" alt="Jira" className="w-full h-full object-contain" />
          </div>
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center p-1.5">
            <img src="/images/integrations/servicenow.svg" alt="ServiceNow" className="w-full h-full object-contain" />
          </div>
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center p-1.5">
            <img src="/images/integrations/freshdesk.svg" alt="Freshdesk" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

// Survey & Feedback Illustration - Flow builder format
function SurveyFeedbackIllustration() {
  return (
    <IllustrationWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-4 gap-0">
        {/* Trigger node - Receive SMS */}
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 shadow-sm max-w-[220px] w-full overflow-hidden">
          <div className="w-5 h-5 rounded-md bg-green-50 flex items-center justify-center flex-shrink-0">
            <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <span className="text-[11px] font-semibold text-gray-900 truncate">Receive SMS message</span>
        </div>

        {/* Connector arrow */}
        <div className="flex flex-col items-center">
          <div className="w-px h-2.5 bg-gray-300" />
          <svg className="w-2.5 h-2.5 text-gray-300 -mt-px" fill="currentColor" viewBox="0 0 10 6">
            <path d="M5 6L0 0h10L5 6z" />
          </svg>
        </div>

        {/* Action node */}
        <div className="rounded-xl border border-gray-900 bg-white px-3 py-2 shadow-sm max-w-[220px] w-full">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <div className="w-4.5 h-4.5 rounded-md bg-purple-50 flex items-center justify-center">
                <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-gray-900">Collect Feedback</span>
            </div>
            <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
              <circle cx="8" cy="3" r="1.2" />
              <circle cx="8" cy="8" r="1.2" />
              <circle cx="8" cy="13" r="1.2" />
            </svg>
          </div>
          <p className="text-[9px] text-gray-500 leading-snug mb-1">
            Run post-interaction surveys and gather CSAT scores.
          </p>
          <span className="text-[8px] font-medium text-gray-400 tracking-wide uppercase">AI Conversation</span>
        </div>

        {/* Connector + plus */}
        <div className="flex flex-col items-center">
          <div className="w-px h-2 bg-gray-300" />
          <div className="w-4 h-4 rounded-full border border-gray-300 bg-white flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
        </div>

        {/* Integration icons - Typeform, SurveyMonkey, Qualtrics */}
        <div className="flex items-center gap-2 mt-1">
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center p-1.5">
            <img src="/images/integrations/typeform.svg" alt="Typeform" className="w-full h-full object-contain" />
          </div>
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center p-1.5">
            <img src="/images/integrations/surveymonkey.svg" alt="SurveyMonkey" className="w-full h-full object-contain" />
          </div>
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center p-1.5">
            <img src="/images/integrations/qualtrics.svg" alt="Qualtrics" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

// Multichannel Engagement Illustration - Flow builder format
function ConversationalIllustration() {
  return (
    <IllustrationWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-4 gap-0">
        {/* Trigger node - New chat message */}
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 shadow-sm max-w-[220px] w-full overflow-hidden">
          <div className="w-5 h-5 rounded-md bg-purple-50 flex items-center justify-center flex-shrink-0">
            <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <span className="text-[11px] font-semibold text-gray-900 truncate">New chat message</span>
        </div>

        {/* Connector arrow */}
        <div className="flex flex-col items-center">
          <div className="w-px h-2.5 bg-gray-300" />
          <svg className="w-2.5 h-2.5 text-gray-300 -mt-px" fill="currentColor" viewBox="0 0 10 6">
            <path d="M5 6L0 0h10L5 6z" />
          </svg>
        </div>

        {/* Action node */}
        <div className="rounded-xl border border-gray-900 bg-white px-3 py-2 shadow-sm max-w-[220px] w-full">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <div className="w-4.5 h-4.5 rounded-md bg-purple-50 flex items-center justify-center">
                <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-gray-900">Route & Engage</span>
            </div>
            <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
              <circle cx="8" cy="3" r="1.2" />
              <circle cx="8" cy="8" r="1.2" />
              <circle cx="8" cy="13" r="1.2" />
            </svg>
          </div>
          <p className="text-[9px] text-gray-500 leading-snug mb-1">
            Detect channel, maintain context, and engage seamlessly.
          </p>
          <span className="text-[8px] font-medium text-gray-400 tracking-wide uppercase">AI Conversation</span>
        </div>

        {/* Connector + plus */}
        <div className="flex flex-col items-center">
          <div className="w-px h-2 bg-gray-300" />
          <div className="w-4 h-4 rounded-full border border-gray-300 bg-white flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
        </div>

        {/* Integration icons - Slack, Intercom, Salesforce */}
        <div className="flex items-center gap-2 mt-1">
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center p-1.5">
            <img src="/images/integrations/slack.svg" alt="Slack" className="w-full h-full object-contain" />
          </div>
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center p-1.5">
            <img src="/images/integrations/intercom.svg" alt="Intercom" className="w-full h-full object-contain" />
          </div>
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center p-1.5">
            <img src="/images/integrations/salesforce.svg" alt="Salesforce" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

const useCases: UseCase[] = [
  {
    title: "Lead capture & qualification",
    tags: ["Sales", "CRM", "Marketing"],
    description: "Capture inbound leads across chat, SMS, and voice, qualify them in real-time using smart branching logic, and instantly route high-intent prospects to your sales team.",
    illustration: <LeadCaptureIllustration />,
  },
  {
    title: "Customer support",
    tags: ["eCommerce", "Logistics", "SaaS"],
    description: "Connect to Shopify or Woo to automatically manage order status, shipping updates, and product inquiries, directly on call.",
    illustration: <SupportAgentIllustration />,
  },
  {
    title: "Appointment booking",
    tags: ["Healthcare", "Services", "Hospitality"],
    description: "Let customers schedule appointments via phone or chat, with real-time availability synced to Calendly or your booking system.",
    illustration: <AppointmentBookingIllustration />,
  },
  {
    title: "Tech support",
    tags: ["SaaS", "Telecom", "IT Services"],
    description: "Troubleshoot common tech queries using your knowledge base, with smart conversational flows that route only complex cases to humans.",
    illustration: <TechSupportIllustration />,
  },
  {
    title: "Survey & feedback",
    tags: ["Retail", "Healthcare", "Consumer Services"],
    description: "Gather timely input from customers through surveys and conversations, so you can improve continuously.",
    illustration: <SurveyFeedbackIllustration />,
  },
  {
    title: "Multichannel engagement",
    tags: ["Enterprise", "eCommerce", "Finance"],
    description: "Build agents that work where your customers are - voice, chat, SMS, or WhatsApp - with context preserved across every touchpoint.",
    illustration: <ConversationalIllustration />,
  },
];

export default function AIAgentUseCases() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-4 max-w-3xl mx-auto">
          Vibe create your agents for your use case in plain English
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 md:mb-14">
          Explore the top AI agents that streamline operations, boost CSAT, and cut resolution times - no training required.
        </p>

        <div className="grid gap-x-6 gap-y-14 sm:gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <div key={index} className="group">
              <div className="mb-4 overflow-hidden rounded-xl transition-all">
                {useCase.illustration}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black">
                {useCase.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {useCase.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {useCase.tags.map((tag, i) => (
                  <Badge key={i} variant="outline" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
