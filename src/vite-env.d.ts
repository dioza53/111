/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SHOPIFY_STORE_DOMAIN: string
  readonly VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN: string
  readonly VITE_SHOPIFY_PRODUCT_VARIANT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
