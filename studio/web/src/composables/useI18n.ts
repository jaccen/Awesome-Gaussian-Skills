import { ref, watch } from 'vue';
import zh from '../i18n/zh';
import en from '../i18n/en';

export type Locale = 'zh' | 'en';

const messages = { zh, en };

const STORAGE_KEY = 'splatverse-locale';

function detectInitialLocale(): Locale {
  // 1. Check localStorage
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'zh' || saved === 'en') return saved;

  // 2. Check browser language
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('zh')) return 'zh';

  // 3. Default to English
  return 'en';
}

// Global reactive locale — shared across all components
const locale = ref<Locale>(detectInitialLocale());

// Update <html lang="..."> when locale changes
function updateHtmlLang(l: Locale) {
  document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en';
}

// Set initial html lang
updateHtmlLang(locale.value);

watch(locale, (newLocale) => {
  localStorage.setItem(STORAGE_KEY, newLocale);
  updateHtmlLang(newLocale);
});

/**
 * Resolve a dotted key path like "nav.dashboard" from a nested object.
 */
function resolveKey(obj: any, path: string): string {
  const parts = path.split('.');
  let current: any = obj;
  for (const part of parts) {
    if (current === undefined || current === null) return path;
    current = current[part];
  }
  return current !== undefined ? String(current) : path;
}

/**
 * Translation function. Reads current locale reactively.
 * Works identically in template (t('key')) and script (t('key')).
 */
function t(key: string): string {
  const msg = messages[locale.value];
  return resolveKey(msg, key);
}

export function useI18n() {
  function setLocale(l: Locale) {
    locale.value = l;
  }

  function toggleLocale() {
    locale.value = locale.value === 'zh' ? 'en' : 'zh';
  }

  return {
    locale,
    t,
    setLocale,
    toggleLocale,
  };
}
