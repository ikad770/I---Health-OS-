export type SupportedLanguage = "he" | "en" | "es" | "fr" | "de" | "ar" | "ru";

export const languageMeta: Record<SupportedLanguage, { label: string; dir: "rtl" | "ltr" }> = {
  he: { label: "עברית", dir: "rtl" },
  en: { label: "English", dir: "ltr" },
  es: { label: "Español", dir: "ltr" },
  fr: { label: "Français", dir: "ltr" },
  de: { label: "Deutsch", dir: "ltr" },
  ar: { label: "العربية", dir: "rtl" },
  ru: { label: "Русский", dir: "ltr" }
};

type Copy = {
  tagline: string;
  heading: string;
  subheading: string;
  ctaPrimary: string;
  ctaSecondary: string;
  sections: string[];
};

export const copy: Record<SupportedLanguage, Copy> = {
  he: {
    tagline: "I — מערכת ההפעלה האישית לבריאות שלך",
    heading: "I",
    subheading: "הבינו את הגוף שלכם. עקבו אחר הבריאות. אופטימיזציה לחיים.",
    ctaPrimary: "התחלת הדגמה",
    ctaSecondary: "כניסה לדשבורד",
    sections: ["סקירת מוצר", "תובנות בריאות", "עוזר AI", "ניתוח בדיקות", "ניהול שגרות", "פרטיות ואבטחה"]
  },
  en: {
    tagline: "I — Your Personal Health OS",
    heading: "I",
    subheading: "Understand your body. Track your health. Optimize your life.",
    ctaPrimary: "Start demo",
    ctaSecondary: "Open dashboard",
    sections: ["Product overview", "Health insights", "AI assistant", "Lab analysis", "Routine management", "Security & privacy"]
  },
  es: {
    tagline: "I — Tu Sistema Operativo de Salud Personal",
    heading: "I",
    subheading: "Comprende tu cuerpo. Sigue tu salud. Optimiza tu vida.",
    ctaPrimary: "Iniciar demo",
    ctaSecondary: "Abrir panel",
    sections: ["Resumen", "Insights", "Asistente IA", "Laboratorio", "Rutinas", "Privacidad"]
  },
  fr: {
    tagline: "I — Votre OS Santé Personnel",
    heading: "I",
    subheading: "Comprenez votre corps. Suivez votre santé. Optimisez votre vie.",
    ctaPrimary: "Démarrer la démo",
    ctaSecondary: "Ouvrir le tableau de bord",
    sections: ["Vue produit", "Insights", "Assistant IA", "Analyses", "Routines", "Sécurité"]
  },
  de: {
    tagline: "I — Ihr persönliches Health OS",
    heading: "I",
    subheading: "Verstehen Sie Ihren Körper. Verfolgen Sie Ihre Gesundheit. Optimieren Sie Ihr Leben.",
    ctaPrimary: "Demo starten",
    ctaSecondary: "Dashboard öffnen",
    sections: ["Überblick", "Gesundheits-Insights", "KI-Assistent", "Laboranalyse", "Routinen", "Sicherheit"]
  },
  ar: {
    tagline: "I — نظام التشغيل الصحي الشخصي",
    heading: "I",
    subheading: "افهم جسمك. تتبع صحتك. حسّن حياتك.",
    ctaPrimary: "ابدأ العرض",
    ctaSecondary: "افتح لوحة التحكم",
    sections: ["نظرة عامة", "رؤى صحية", "مساعد الذكاء الاصطناعي", "تحليل المختبر", "الروتين", "الأمان"]
  },
  ru: {
    tagline: "I — Ваша персональная Health OS",
    heading: "I",
    subheading: "Понимайте свое тело. Отслеживайте здоровье. Оптимизируйте жизнь.",
    ctaPrimary: "Запустить демо",
    ctaSecondary: "Открыть панель",
    sections: ["Обзор", "Инсайты", "ИИ-ассистент", "Лаборатория", "Рутины", "Безопасность"]
  }
};
