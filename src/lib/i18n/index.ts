// src/lib/i18n/index.ts

import enUS from "./locales/en-US";
import enGB from "./locales/en-GB";
import esES from "./locales/es-ES";
import deDE from "./locales/de-DE";
import itIT from "./locales/it-IT";
import frFR from "./locales/fr-FR";
import ptBR from "./locales/pt-BR";
import ptPT from "./locales/pt-PT";
import arSA from "./locales/ar-SA";

/**
 * Locale suportados.
 * (Mantém o tipo travado e evita "string solta".)
 */
export const supportedLocales = [
    "en-US",
    "en-GB",
    "es-ES",
    "de-DE",
    "it-IT",
    "fr-FR",
    "pt-BR",
    "pt-PT",
    "ar-SA",
] as const;

export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "en-US";

/**
 * Dicionário base (en-US) vira o "schema" do sistema.
 * Todos os outros idiomas devem respeitar esse formato.
 */
export type Dictionary = typeof enUS;

/**
 * Mapa de dicionários carregados (sync, simples e robusto).
 * Se quiser otimizar depois, trocamos para dynamic import por idioma.
 */
const dictionaries: Record<Locale, Dictionary> = {
    "en-US": enUS as Dictionary,
    "en-GB": enGB as any as Dictionary,
    "es-ES": esES as any as Dictionary,
    "de-DE": deDE as any as Dictionary,
    "it-IT": itIT as any as Dictionary,
    "fr-FR": frFR as any as Dictionary,
    "pt-BR": ptBR as any as Dictionary,
    "pt-PT": ptPT as any as Dictionary,
    "ar-SA": arSA as any as Dictionary,
};

/**
 * Retorna o dicionário do locale.
 * Se vier algo inválido (runtime), cai no default.
 */
export function getDictionary(locale: string | Locale): Dictionary {
    if (typeof locale !== "string") return dictionaries[locale];
    return (dictionaries as Record<string, Dictionary>)[locale] ?? dictionaries[defaultLocale];
}

/**
 * Dicionário ativo (padrão English para compatibilidade com o novo requisito)
 */
export const dict: Dictionary = getDictionary(defaultLocale);

/**
 * Helpers úteis
 */
export function isSupportedLocale(locale: string): locale is Locale {
    return (supportedLocales as readonly string[]).includes(locale);
}
