import * as Localization from 'expo-localization';
import { uniqNormalizedStrings } from '@/utils/array';
import { COMMON_LANGUAGE_CODES } from '@/constants/languages';

// Lightweight English fallbacks for common language codes
const LANGUAGE_NAMES_EN: Record<string, string> = {
    en: 'English',
    de: 'German',
    fr: 'French',
    es: 'Spanish',
    it: 'Italian',
    pt: 'Portuguese',
    nl: 'Dutch',
    sv: 'Swedish',
    no: 'Norwegian',
    da: 'Danish',
    fi: 'Finnish',
    pl: 'Polish',
    cs: 'Czech',
    sk: 'Slovak',
    hu: 'Hungarian',
    ro: 'Romanian',
    bg: 'Bulgarian',
    el: 'Greek',
    tr: 'Turkish',
    ru: 'Russian',
    uk: 'Ukrainian',
    ar: 'Arabic',
    he: 'Hebrew',
    hi: 'Hindi',
    th: 'Thai',
    vi: 'Vietnamese',
    id: 'Indonesian',
    ms: 'Malay',
    ja: 'Japanese',
    ko: 'Korean',
    zh: 'Chinese',
};

export const getDevicePreferredLanguageCodes = (): string[] => {
    try {
        const locales = Localization.getLocales();
        const codes = locales
            .map((l) => l.languageCode)
            .filter((code): code is string => typeof code === 'string');
        const unique = uniqNormalizedStrings(codes);
        if (unique.length > 0) return unique;
    } catch {
        // ignore
    }

    try {
        const locale = Intl.DateTimeFormat().resolvedOptions().locale;
        const primary = locale.split('-')[0]?.toLowerCase();
        if (primary) return uniqNormalizedStrings([primary, 'en']);
    } catch {
        // ignore
    }

    return ['en'];
};

export const normalizeLanguageCode = (language?: string): string | undefined => {
    const trimmed = language?.trim();
    if (!trimmed) return undefined;
    return trimmed.split(/[-_]/)[0]?.toLowerCase();
};

export const getPreferredLanguageCodes = (preferred?: string[]): string[] => {
    const normalizedPreferred = preferred ? uniqNormalizedStrings(preferred) : [];
    if (normalizedPreferred.length > 0) return normalizedPreferred;
    return getDevicePreferredLanguageCodes();
};

export const getLanguageDisplayName = (languageCode: string): string => {
    const code = normalizeLanguageCode(languageCode) ?? languageCode;

    try {
        const displayLocale = getDevicePreferredLanguageCodes()[0] ?? 'en';
        const DisplayNames = (Intl as any)?.DisplayNames;
        if (DisplayNames) {
            // Hermes/React Native can be picky: prefer single locale string.
            const displayNames = new DisplayNames(displayLocale, { type: 'language' });
            const name = displayNames.of(code);
            if (typeof name === 'string' && name.trim().length > 0) return name;
        }
    } catch {
        // ignore
    }

    // Fallback: curated English names for common codes
    const fallbackCode = normalizeLanguageCode(code);
    if (fallbackCode && COMMON_LANGUAGE_CODES.includes(fallbackCode)) {
        const name = LANGUAGE_NAMES_EN[fallbackCode];
        if (name) return name;
    }

    return code;
};

export const findBestTrackByLanguage = <T extends { language?: string }>(
    tracks: T[],
    preferredLanguageCodes: string[]
): T | undefined => {
    for (const preferred of preferredLanguageCodes) {
        const match = tracks.find((track) => normalizeLanguageCode(track.language) === preferred);
        if (match) return match;
    }
    return undefined;
};
