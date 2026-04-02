/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GTM_CONTAINER_ID?: string;
  readonly PUBLIC_GTM_ALLOWED_HOSTS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
