export type Lang = "he" | "en" | "es" | "fr" | "de" | "ar" | "ru";

const common = {
  he: { dashboard: "דשבורד", profile: "פרופיל", medications: "תרופות", supplements: "תוספים", routines: "שגרות", metrics: "מדדי גוף", documents: "מסמכים", onboarding: "אונבורדינג", save: "שמירה", logout: "התנתקות", login: "כניסה", signup: "הרשמה" },
  en: { dashboard: "Dashboard", profile: "Profile", medications: "Medications", supplements: "Supplements", routines: "Routines", metrics: "Body Metrics", documents: "Documents", onboarding: "Onboarding", save: "Save", logout: "Logout", login: "Login", signup: "Sign up" }
};

export function t(lang: string, key: keyof (typeof common)["en"]) {
  const selected = (common as Record<string, Record<string, string>>)[lang] ?? common.en;
  return selected[key] ?? common.en[key];
}
