/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GTM_CONTAINER_ID?: string;
  readonly PUBLIC_GTM_ALLOWED_HOSTS?: string;
  readonly PUBLIC_POSTHOG_KEY?: string;
  readonly PUBLIC_POSTHOG_HOST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
