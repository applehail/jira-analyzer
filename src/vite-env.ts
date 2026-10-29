/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare global {
  interface ImportMetaEnv {
    readonly PACKAGE_VERSION: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

// Обязательный пустой экспорт, чтобы файл считался модулем
// export {};
