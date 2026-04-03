"use client";

import { useState, useEffect, useRef, useCallback } from "react";

import { useGeoCountry } from "@/hooks/useGeoCountry";

// ── Plivo AI Agent constants ────────────────────────────────────────────────
const ENGLISH_APP_ID = "17457073576163534";
const HINDI_APP_ID = "17457073576163534";
const INDIA_APP_ID = "18059965556351397";
const TOKEN_API_URL = "/api/voice-agent";
const TOKEN_ISSUER = "MAOTC4NDM0MDATMMU0NC";

const PLIVO_GRADIENT = "linear-gradient(135deg, #cd3ef9 0%, #323dfe 100%)";
const ACTIVE_GRADIENT = "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)";

type Language = "hindi" | "english";
type DemoState = "loading" | "ready" | "calling" | "active" | "error";

/** Map continent / country to Plivo SDK clientRegion for optimal WebRTC routing */
function mapToClientRegion(continent: string, iso: string): string {
  if (iso === "IN") return "south_asia";
  switch (continent) {
    case "AS":
      return "asia";
    case "EU":
      return "europe";
    case "NA":
      return "usa_east";
    case "SA":
      return "south_america";
    case "OC":
      return "australia";
    case "AF":
      return "europe";
    default:
      return "usa_east";
  }
}

function getAppId(language: Language, countryCode: string): string {
  if (countryCode === "IN") return INDIA_APP_ID;
  return language === "hindi" ? HINDI_APP_ID : ENGLISH_APP_ID;
}

async function fetchAccessToken(appId: string): Promise<string> {
  const res = await fetch(TOKEN_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      app: appId,
      iss: TOKEN_ISSUER,
      per: { voice: { incoming_allow: true, outgoing_allow: true } },
      sub: "testsub",
    }),
  });
  if (!res.ok) throw new Error(`Token fetch failed: ${res.status}`);
  const data = await res.json();
  if (data.token) return data.token;
  throw new Error("No token in response");
}

const BUTTON_TEXT: Record<DemoState, string> = {
  loading: "Setting up..",
  ready: "Press to talk",
  calling: "Connecting...",
  active: "End Call",
  error: "Try again",
};

const STATUS_TEXT: Record<DemoState, string> = {
  loading: "Initializing voice agent",
  ready: "",
  calling: "Allow microphone if prompted",
  active: "Talking to Plivo AI",
  error: "Could not connect",
};

// ── Component ───────────────────────────────────────────────────────────────
export default function VoiceDemo() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("hindi");
  const [demoState, setDemoState] = useState<DemoState>("loading");

  const { country, continent } = useGeoCountry("US");

  // Refs to survive across renders without re-triggering effects
  const sdkRef = useRef<PlivoBrowserSDK | null>(null);
  const endCallTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const registeredRef = useRef(false);
  const wsConnectedRef = useRef(false);
  const initAttemptedRef = useRef(false);
  const initializingRef = useRef(false); // guard against concurrent initSdk calls
  const sdkInstanceIdRef = useRef(0); // track current SDK instance to ignore stale events
  const retryCountRef = useRef(0);
  const callingMinTimeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxRetries = 3;

  // ── Initialize Plivo SDK ────────────────────────────────────────────────
  const initSdk = useCallback(
    (lang: Language) => {
      // Guard: prevent concurrent initializations
      if (initializingRef.current) {
        return;
      }

      // Guard: Plivo SDK not loaded yet
      if (typeof window === "undefined" || !window.Plivo) {
        setDemoState("error");
        return;
      }

      initializingRef.current = true;
      const instanceId = ++sdkInstanceIdRef.current;
      const clientRegion = mapToClientRegion(continent, country);

      retryCountRef.current = 0;

      // If we already have an SDK instance, logout first
      if (sdkRef.current?.client) {
        try {
          sdkRef.current.client.hangup();
          sdkRef.current.client.logout();
        } catch {
          /* ignore */
        }
      }

      const sdkOptions: Record<string, any> = {
        debug: "ERROR",
        permOnClick: true,
        enableTracking: true,
        closeProtection: true,
        maxAverageBitrate: 48000,
        enableNoiseReduction: false,
        audioConstraints: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      };
      if (clientRegion) sdkOptions.clientRegion = clientRegion;

      try {
        const sdk = new window.Plivo(sdkOptions);
        sdkRef.current = sdk;

        const client = sdk.client;

        // Helper: only process events from the current SDK instance
        const isCurrent = () => instanceId === sdkInstanceIdRef.current;

        client.on("onWebrtcNotSupported", () => {
          if (!isCurrent()) return;
          setDemoState("error");
        });

        client.on("onWebSocketConnected", () => {
          if (!isCurrent()) return;
          wsConnectedRef.current = true;
        });

        client.on("onLogin", () => {
          if (!isCurrent()) return;
          registeredRef.current = true;
          wsConnectedRef.current = true;
          initializingRef.current = false;
          setDemoState("ready");
        });

        client.on("onLoginFailed", (error: any) => {
          if (!isCurrent()) return;
          registeredRef.current = false;
          initializingRef.current = false;
          if (retryCountRef.current < maxRetries) {
            retryCountRef.current++;
            setTimeout(() => initSdk(lang), 2000);
          } else {
            setDemoState("error");
          }
        });

        client.on("onLogout", () => {
          if (!isCurrent()) return;
          registeredRef.current = false;
        });

        client.on("onCalling", () => {
          if (!isCurrent()) return;
        });

        client.on("onCallRemoteRinging", () => {
          if (!isCurrent()) return;
        });

        client.on("onCallConnected", () => {
          if (!isCurrent()) return;
        });

        client.on("onCallAnswered", () => {
          if (!isCurrent()) return;
        });

        client.on("onMediaConnected", () => {
          if (!isCurrent()) return;
          if (endCallTimeoutRef.current) clearTimeout(endCallTimeoutRef.current);
          endCallTimeoutRef.current = setTimeout(() => {
            setDemoState("active");
            endCallTimeoutRef.current = null;
          }, 3000);
        });

        client.on("onCallTerminated", () => {
          if (!isCurrent()) return;
          if (endCallTimeoutRef.current) {
            clearTimeout(endCallTimeoutRef.current);
            endCallTimeoutRef.current = null;
          }
          if (callingMinTimeRef.current) {
            clearTimeout(callingMinTimeRef.current);
            callingMinTimeRef.current = null;
          }
          setDemoState("ready");
        });

        client.on("onCallFailed", (error: any) => {
          if (!isCurrent()) return;
          if (endCallTimeoutRef.current) {
            clearTimeout(endCallTimeoutRef.current);
            endCallTimeoutRef.current = null;
          }
          if (callingMinTimeRef.current) {
            clearTimeout(callingMinTimeRef.current);
            callingMinTimeRef.current = null;
          }
          setDemoState("ready");
        });

        client.on("onMediaPermission", (data: { permission: boolean }) => {
          if (!isCurrent()) return;
          if (!data.permission) {
            setDemoState("ready");
          }
        });

        client.on("onPermissionDenied", (data: any) => {
          if (!isCurrent()) return;
        });

        client.on("onConnectionChange", (data: any) => {
          if (!isCurrent()) return;
          if (data?.state === "connected") {
            wsConnectedRef.current = true;
          }
          // Don't reset wsConnectedRef on disconnect - old instances fire
          // stale disconnect events that interfere with the current instance
        });

        // Disable default Plivo connect tone
        if (typeof client.setConnectTone === "function") {
          client.setConnectTone(false);
        }

        const appId = getAppId(lang, country);
        fetchAccessToken(appId)
          .then((token) => {
            if (instanceId !== sdkInstanceIdRef.current) return;
            client.loginWithAccessToken(token);
          })
          .catch(() => {
            if (instanceId !== sdkInstanceIdRef.current) return;
            initializingRef.current = false;
            if (retryCountRef.current < maxRetries) {
              retryCountRef.current++;
              setTimeout(() => initSdk(lang), 2000);
            } else {
              setDemoState("error");
            }
          });
      } catch (err) {
        initializingRef.current = false;
        setDemoState("error");
      }
    },
    [continent, country]
  );

  // ── Bootstrap SDK on mount ──────────────────────────────────────────────
  useEffect(() => {
    if (initAttemptedRef.current) return;
    initAttemptedRef.current = true;

    let pollCount = 0;
    const maxPolls = 50;

    const waitForSdk = () => {
      pollCount++;
      if (typeof window !== "undefined" && window.Plivo) {
        initSdk(selectedLanguage);
      } else if (pollCount >= maxPolls) {
        setDemoState("error");
      } else {
        setTimeout(waitForSdk, 200);
      }
    };
    waitForSdk();

    return () => {
      if (endCallTimeoutRef.current) clearTimeout(endCallTimeoutRef.current);
      if (callingMinTimeRef.current) clearTimeout(callingMinTimeRef.current);
      if (sdkRef.current?.client) {
        try {
          sdkRef.current.client.hangup();
          sdkRef.current.client.logout();
        } catch {
          /* ignore */
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Handle language switch ──────────────────────────────────────────────
  const handleLanguageChange = useCallback(
    (lang: Language) => {
      if (lang === selectedLanguage) return;
      if (demoState === "calling" || demoState === "active") return;

      setSelectedLanguage(lang);
      setDemoState("loading");
      registeredRef.current = false;
      wsConnectedRef.current = false;
      retryCountRef.current = 0;
      initSdk(lang);
    },
    [selectedLanguage, demoState, initSdk]
  );

  // ── Handle talk button click ────────────────────────────────────────────
  const handleTalk = useCallback(() => {
    // On error state, allow retry
    if (demoState === "error") {
      setDemoState("loading");
      retryCountRef.current = 0;
      initSdk(selectedLanguage);
      return;
    }

    if (demoState === "loading" || demoState === "calling") return;

    if (demoState === "ready") {
      if (!sdkRef.current?.client) {
        return;
      }
      if (!wsConnectedRef.current || !registeredRef.current) {
        setDemoState("loading");
        initSdk(selectedLanguage);
        return;
      }

      setDemoState("calling");
      const appId = getAppId(selectedLanguage, country);
      const extraHeaders = {
        "X-PH-header2": "+919090909090",
        "X-PH-header4": "web",
        "X-PH-header6": "",
        "X-PH-header7": "call",
        "X-PH-header8": "09b0dcc8-f3ed-4d20-8c6a-460595e990a0",
      };
      const sipUri = `sip:${appId}@app.plivo.com`;

      try {
        sdkRef.current.client.call(sipUri, extraHeaders);
      } catch (err) {
        // Keep "Connecting..." visible for at least 2s so user sees something
        callingMinTimeRef.current = setTimeout(() => {
          setDemoState("ready");
          callingMinTimeRef.current = null;
        }, 2000);
      }
    } else if (demoState === "active") {
      try {
        sdkRef.current?.client.hangup();
      } catch (err) {
        // hangup failed silently
      }
    }
  }, [demoState, selectedLanguage, initSdk]);

  // ── Determine visual state ──────────────────────────────────────────────
  const isActive = demoState === "active";
  const isCalling = demoState === "calling";
  const isLoading = demoState === "loading";
  const isClickable = demoState === "ready" || demoState === "active" || demoState === "error";
  const statusText = STATUS_TEXT[demoState];

  return (
    <section className="voice-demo-section relative z-20 bg-white overflow-hidden pt-2 pb-20">
      {/* Dotted Grid Background */}
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center', maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.3) 15%, rgba(255,255,255,0.7) 30%, white 45%, white 55%, rgba(255,255,255,0.7) 70%, rgba(255,255,255,0.3) 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.3) 15%, rgba(255,255,255,0.7) 30%, white 45%, white 55%, rgba(255,255,255,0.7) 70%, rgba(255,255,255,0.3) 85%, transparent 100%)' }} />

      {/* Fade Edges */}
      <div className="absolute inset-y-0 left-0 z-[5] w-8 sm:w-16 md:w-32 bg-gradient-to-r from-white to-transparent" />
      <div className="absolute inset-y-0 right-0 z-[5] w-8 sm:w-16 md:w-32 bg-gradient-to-l from-white to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-3 py-12">
        {/* Language Selector */}
        <div className="flex rounded-full bg-white p-0.5 shadow-sm">
          <button
            onClick={() => handleLanguageChange("hindi")}
            disabled={demoState === "calling" || demoState === "active"}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              selectedLanguage === "hindi"
                ? "text-white"
                : "text-gray-500 hover:text-black"
            } ${demoState === "calling" || demoState === "active" ? "opacity-50 cursor-not-allowed" : ""}`}
            style={
              selectedLanguage === "hindi"
                ? { background: PLIVO_GRADIENT }
                : undefined
            }
          >
            <span className="mr-0.5">🇮🇳</span> Hindi
          </button>
          <button
            onClick={() => handleLanguageChange("english")}
            disabled={demoState === "calling" || demoState === "active"}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              selectedLanguage === "english"
                ? "text-white"
                : "text-gray-500 hover:text-black"
            } ${demoState === "calling" || demoState === "active" ? "opacity-50 cursor-not-allowed" : ""}`}
            style={
              selectedLanguage === "english"
                ? { background: PLIVO_GRADIENT }
                : undefined
            }
          >
            <span className="mr-0.5">🇮🇳</span> English
          </button>
        </div>

        {/* Talk Button */}
        <button
          onClick={handleTalk}
          disabled={isLoading || isCalling}
          className={`flex items-center gap-3 sm:gap-5 rounded-[80px] bg-white pl-3 pr-8 sm:pl-4 sm:pr-14 py-3 sm:py-4 shadow-xl transition-all duration-200 ${
            isClickable
              ? "hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
              : "cursor-default"
          }`}
        >
          {/* Gradient Circle with Animations */}
          <div className="relative flex items-center justify-center">
            {/* Pulsing ring for active call */}
            {isActive && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full animate-ping-slow bg-red-400 opacity-30" />
              </div>
            )}

            <div
              className="relative flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full transition-all duration-300"
              style={{
                background: isActive ? ACTIVE_GRADIENT : PLIVO_GRADIENT,
              }}
            >
              {isLoading || isCalling ? (
                /* Circular loading spinner */
                <div
                  className="h-6 w-6 sm:h-8 sm:w-8 rounded-full animate-spin-slow"
                  style={{
                    border: "2.5px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff",
                  }}
                />
              ) : (
                /* Wave bars for ready/active states */
                <div className="flex items-center gap-[3px]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className={`w-[3px] rounded-full bg-white ${
                        isActive ? "animate-wave-bar-fast" : "animate-wave-bar"
                      }`}
                      style={{
                        height: `${14 + (i % 3) * 5}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <span className="text-base sm:text-xl font-semibold text-black">
            {BUTTON_TEXT[demoState]}
          </span>
        </button>

        {/* Status text */}
        {statusText && (
          <p className="text-xs text-black animate-fade-in">
            {statusText}
          </p>
        )}
      </div>

      <style>{`
        @keyframes wave-bar {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.5); }
        }
        @keyframes wave-bar-fast {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(2.2); }
        }
        .animate-wave-bar {
          animation: wave-bar 0.6s ease-in-out infinite;
        }
        .animate-wave-bar-fast {
          animation: wave-bar-fast 0.3s ease-in-out infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 1.5s linear infinite;
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.3; }
          75%, 100% { transform: scale(1.4); opacity: 0; }
        }
        .animate-ping-slow {
          animation: ping-slow 2s ease-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}
