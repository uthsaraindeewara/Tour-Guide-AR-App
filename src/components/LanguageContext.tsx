import React, { useEffect, useState, createContext, useContext } from 'react';

// Define available languages
export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja';

// Display names for languages
export const languageNames: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  zh: '中文',
  ja: '日本語',
};

// Context type
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation cache
const translationCache: Record<Language, Record<string, string>> = {
  en: {},
  es: {},
  fr: {},
  de: {},
  zh: {},
  ja: {},
};

// Common UI translations (navbar, buttons, stats, achievements)
const commonUI: Record<Language, Record<string, string>> = {
  en: {
    Profile: 'Profile',
    Map: 'Map',
    Discover: 'Discover',
    'AR View': 'AR View',
    Visited: 'Visited',
    Settings: 'Settings',
    About: 'About',
    Details: 'Details',
    'Start Tour': 'Start Tour',
    'View All': 'View All',
    'Places Visited': 'Places Visited',
    Cities: 'Cities',
    Favorites: 'Favorites',
    'Your Journey Stats': 'Your Journey Stats',
    'Your Timeline': 'Your Timeline',
    Explorer: 'Explorer',
    'Visited 5 locations': 'Visited 5 locations',
    'Museum Buff': 'Museum Buff',
    'Visited 3 museums': 'Visited 3 museums',
    'History Fan': 'History Fan',
    'Visited 5 historical sites': 'Visited 5 historical sites',
    'Visit Again': 'Visit Again',
  },
  es: {
    Profile: 'Perfil',
    Map: 'Mapa',
    Discover: 'Descubrir',
    'AR View': 'Vista RA',
    Visited: 'Visitado',
    Settings: 'Ajustes',
    About: 'Acerca de',
    Details: 'Detalles',
    'Start Tour': 'Iniciar Tour',
    'View All': 'Ver Todos',
    'Places Visited': 'Lugares Visitados',
    Cities: 'Ciudades',
    Favorites: 'Favoritos',
    'Your Journey Stats': 'Tus Estadísticas de Viaje',
    'Your Timeline': 'Tu Cronología',
    Explorer: 'Explorador',
    'Visited 5 locations': 'Visitó 5 lugares',
    'Museum Buff': 'Amante de Museos',
    'Visited 3 museums': 'Visitó 3 museos',
    'History Fan': 'Fanático de la Historia',
    'Visited 5 historical sites': 'Visitó 5 sitios históricos',
    'Visit Again': 'Visitar de Nuevo',
  },
  fr: {
    Profile: 'Profil',
    Map: 'Carte',
    Discover: 'Découvrir',
    'AR View': 'Vue RA',
    Visited: 'Visité',
    Settings: 'Paramètres',
    About: 'À propos',
    Details: 'Détails',
    'Start Tour': 'Démarrer la visite',
    'View All': 'Voir Tout',
    'Places Visited': 'Lieux Visit és',
    Cities: 'Villes',
    Favorites: 'Favoris',
    'Your Journey Stats': 'Statistiques de Votre Voyage',
    'Your Timeline': 'Votre Chronologie',
    Explorer: 'Explorateur',
    'Visited 5 locations': 'A visité 5 lieux',
    'Museum Buff': 'Amateur de Musées',
    'Visited 3 museums': 'A visité 3 musées',
    'History Fan': 'Fan d’Histoire',
    'Visited 5 historical sites': 'A visité 5 sites historiques',
    'Visit Again': 'Visiter à Nouveau',
  },
  de: {
    Profile: 'Profil',
    Map: 'Karte',
    Discover: 'Entdecken',
    'AR View': 'AR-Ansicht',
    Visited: 'Besucht',
    Settings: 'Einstellungen',
    About: 'Über',
    Details: 'Details',
    'Start Tour': 'Tour starten',
    'View All': 'Alle Anzeigen',
    'Places Visited': 'Besuchte Orte',
    Cities: 'Städte',
    Favorites: 'Favoriten',
    'Your Journey Stats': 'Deine Reise-Statistiken',
    'Your Timeline': 'Dein Zeitplan',
    Explorer: 'Entdecker',
    'Visited 5 locations': '5 Orte besucht',
    'Museum Buff': 'Museumsfreund',
    'Visited 3 museums': '3 Museen besucht',
    'History Fan': 'Geschichtsfan',
    'Visited 5 historical sites': '5 historische Orte besucht',
    'Visit Again': 'Nochmals besuchen',
  },
  zh: {
    Profile: '个人资料',
    Map: '地图',
    Discover: '发现',
    'AR View': 'AR视图',
    Visited: '已访问',
    Settings: '设置',
    About: '关于',
    Details: '详情',
    'Start Tour': '开始导览',
    'View All': '查看全部',
    'Places Visited': '访问的地方',
    Cities: '城市',
    Favorites: '收藏',
    'Your Journey Stats': '您的旅程统计',
    'Your Timeline': '您的时间线',
    Explorer: '探险家',
    'Visited 5 locations': '访问了5个地点',
    'Museum Buff': '博物馆爱好者',
    'Visited 3 museums': '访问了3个博物馆',
    'History Fan': '历史爱好者',
    'Visited 5 historical sites': '访问了5个历史景点',
    'Visit Again': '再次访问',
  },
  ja: {
    Profile: 'プロフィール',
    Map: '地図',
    Discover: '発見',
    'AR View': 'ARビュー',
    Visited: '訪問済み',
    Settings: '設定',
    About: '概要',
    Details: '詳細',
    'Start Tour': 'ツアーを開始',
    'View All': 'すべて表示',
    'Places Visited': '訪れた場所',
    Cities: '都市',
    Favorites: 'お気に入り',
    'Your Journey Stats': '旅行の統計',
    'Your Timeline': 'タイムライン',
    Explorer: '探検者',
    'Visited 5 locations': '5か所訪問',
    'Museum Buff': '博物館マニア',
    'Visited 3 museums': '3つの博物館を訪問',
    'History Fan': '歴史ファン',
    'Visited 5 historical sites': '5つの歴史的な場所を訪問',
    'Visit Again': '再訪する',
  },
};

// VisitedPlaces-specific translations (titles, notes, etc.)
const visitedPlacesTexts: Record<Language, Record<string, string>> = {
  en: {
    'Sigiriya Rock Fortress': 'Sigiriya Rock Fortress',
    'Climbed the Lion Rock and loved the view!': 'Climbed the Lion Rock and loved the view!',
    'Temple of the Tooth (Kandy)': 'Temple of the Tooth (Kandy)',
    'Beautiful sacred temple, very peaceful.': 'Beautiful sacred temple, very peaceful.',
    'Galle Fort': 'Galle Fort',
    'Historic Dutch fort with amazing ocean views.': 'Historic Dutch fort with amazing ocean views.',
    "Adam's Peak (Sri Pada)": "Adam's Peak (Sri Pada)",
    'Challenging climb but the sunrise view was unforgettable!': 'Challenging climb but the sunrise view was unforgettable!',
  },
  es: {
    'Sigiriya Rock Fortress': 'Fortaleza de Sigiriya',
    'Climbed the Lion Rock and loved the view!': '¡Escalé la Roca del León y me encantó la vista!',
    'Temple of the Tooth (Kandy)': 'Templo del Diente (Kandy)',
    'Beautiful sacred temple, very peaceful.': 'Hermoso templo sagrado, muy tranquilo.',
    'Galle Fort': 'Fuerte de Galle',
    'Historic Dutch fort with amazing ocean views.': 'Fuerte holandés histórico con increíbles vistas al océano.',
    "Adam's Peak (Sri Pada)": 'Pico de Adán (Sri Pada)',
    'Challenging climb but the sunrise view was unforgettable!': 'Subida desafiante pero la vista del amanecer fue inolvidable!',
  },
  fr: {
    'Sigiriya Rock Fortress': 'Forteresse de Sigiriya',
    'Climbed the Lion Rock and loved the view!': 'Gravi le Rocher du Lion et adoré la vue !',
    'Temple of the Tooth (Kandy)': 'Temple de la Dent (Kandy)',
    'Beautiful sacred temple, very peaceful.': 'Magnifique temple sacré, très paisible.',
    'Galle Fort': 'Fort de Galle',
    'Historic Dutch fort with amazing ocean views.': 'Fort hollandais historique avec une vue imprenable sur l’océan.',
    "Adam's Peak (Sri Pada)": "Pic d'Adam (Sri Pada)",
    'Challenging climb but the sunrise view was unforgettable!': 'Ascension difficile mais le lever de soleil était inoubliable !',
  },
  de: {
    'Sigiriya Rock Fortress': 'Sigiriya Felsenfestung',
    'Climbed the Lion Rock and loved the view!': 'Den Löwenfelsen erklommen und die Aussicht geliebt!',
    'Temple of the Tooth (Kandy)': 'Zahntempel (Kandy)',
    'Beautiful sacred temple, very peaceful.': 'Schöner heiliger Tempel, sehr friedlich.',
    'Galle Fort': 'Galle Fort',
    'Historic Dutch fort with amazing ocean views.': 'Historisches holländisches Fort mit atemberaubender Aussicht auf den Ozean.',
    "Adam's Peak (Sri Pada)": "Adams Peak (Sri Pada)",
    'Challenging climb but the sunrise view was unforgettable!': 'Herausfordernder Aufstieg, aber der Sonnenaufgang war unvergesslich!',
  },
  zh: {
    'Sigiriya Rock Fortress': '狮子岩堡垒',
    'Climbed the Lion Rock and loved the view!': '爬上狮子岩，景色令人喜爱！',
    'Temple of the Tooth (Kandy)': '牙庙（康提）',
    'Beautiful sacred temple, very peaceful.': '美丽的神圣寺庙，非常宁静。',
    'Galle Fort': '加勒堡',
    'Historic Dutch fort with amazing ocean views.': '历史悠久的荷兰堡垒，拥有壮丽的海景。',
    "Adam's Peak (Sri Pada)": '亚当峰（斯里帕达）',
    'Challenging climb but the sunrise view was unforgettable!': '攀登具有挑战性，但日出景色令人难忘！',
  },
  ja: {
    'Sigiriya Rock Fortress': 'シギリヤ・ロック・フォートレス',
    'Climbed the Lion Rock and loved the view!': 'ライオンロックに登って景色を楽しんだ！',
    'Temple of the Tooth (Kandy)': '歯の寺（キャンディ）',
    'Beautiful sacred temple, very peaceful.': '美しい神聖な寺院、とても平和。',
    'Galle Fort': 'ガール要塞',
    'Historic Dutch fort with amazing ocean views.': '歴史的なオランダの要塞、素晴らしい海の景色。',
    "Adam's Peak (Sri Pada)": 'アダムズピーク（スリパダ）',
    'Challenging climb but the sunrise view was unforgettable!': '挑戦的な登山ですが、日の出の景色は忘れられません！',
  },
};

const recommendationTexts: Record<Language, Record<string, string>> = {
  en: {
    Discover: "Discover",
    "Search landmarks and places": "Search landmarks and places",
    All: "All",
    Museum: "Museum",
    Park: "Park",
    Historic: "Historic",
    Restaurant: "Restaurant",
    Nearby: "Nearby",
    "View All": "View All",
    Popular: "Popular",
    // Landmark data
    "Sigiriya Rock Fortress": "Sigiriya Rock Fortress",
    "Climbed the Lion Rock and loved the view!":
      "Climbed the Lion Rock and loved the view!",
    "Temple of the Tooth (Kandy)": "Temple of the Tooth (Kandy)",
    "Beautiful sacred temple, very peaceful.":
      "Beautiful sacred temple, very peaceful.",
    "Galle Fort": "Galle Fort",
    "Historic Dutch fort with amazing ocean views.":
      "Historic Dutch fort with amazing ocean views.",
    "Adam's Peak (Sri Pada)": "Adam's Peak (Sri Pada)",
    "Challenging climb but the sunrise view was unforgettable!":
      "Challenging climb but the sunrise view was unforgettable!",
  },
  es: {
    Discover: "Descubrir",
    "Search landmarks and places": "Buscar lugares y monumentos",
    All: "Todos",
    Museum: "Museo",
    Park: "Parque",
    Historic: "Histórico",
    Restaurant: "Restaurante",
    Nearby: "Cercanos",
    "View All": "Ver todo",
    Popular: "Popular",
    "Sigiriya Rock Fortress": "Fortaleza de Sigiriya",
    "Climbed the Lion Rock and loved the view!":
      "¡Escalé la Roca del León y me encantó la vista!",
    "Temple of the Tooth (Kandy)": "Templo del Diente (Kandy)",
    "Beautiful sacred temple, very peaceful.":
      "Hermoso templo sagrado, muy tranquilo.",
    "Galle Fort": "Fuerte de Galle",
    "Historic Dutch fort with amazing ocean views.":
      "Fuerte holandés histórico con increíbles vistas al océano.",
    "Adam's Peak (Sri Pada)": "Pico de Adán (Sri Pada)",
    "Challenging climb but the sunrise view was unforgettable!":
      "Subida desafiante pero la vista del amanecer fue inolvidable!",
  },
  fr: {
    Discover: "Découvrir",
    "Search landmarks and places": "Rechercher des lieux et monuments",
    All: "Tous",
    Museum: "Musée",
    Park: "Parc",
    Historic: "Historique",
    Restaurant: "Restaurant",
    Nearby: "À proximité",
    "View All": "Voir tout",
    Popular: "Populaire",
    "Sigiriya Rock Fortress": "Forteresse de Sigiriya",
    "Climbed the Lion Rock and loved the view!":
      "Gravi le Rocher du Lion et adoré la vue !",
    "Temple of the Tooth (Kandy)": "Temple de la Dent (Kandy)",
    "Beautiful sacred temple, very peaceful.":
      "Magnifique temple sacré, très paisible.",
    "Galle Fort": "Fort de Galle",
    "Historic Dutch fort with amazing ocean views.":
      "Fort hollandais historique avec une vue imprenable sur l’océan.",
    "Adam's Peak (Sri Pada)": "Pic d'Adam (Sri Pada)",
    "Challenging climb but the sunrise view was unforgettable!":
      "Ascension difficile mais le lever de soleil était inoubliable !",
  },
  de: {
    Discover: "Entdecken",
    "Search landmarks and places": "Sehenswürdigkeiten und Orte suchen",
    All: "Alle",
    Museum: "Museum",
    Park: "Park",
    Historic: "Historisch",
    Restaurant: "Restaurant",
    Nearby: "In der Nähe",
    "View All": "Alle ansehen",
    Popular: "Beliebt",
    "Sigiriya Rock Fortress": "Sigiriya Felsenfestung",
    "Climbed the Lion Rock and loved the view!":
      "Den Löwenfelsen erklommen und die Aussicht geliebt!",
    "Temple of the Tooth (Kandy)": "Zahntempel (Kandy)",
    "Beautiful sacred temple, very peaceful.":
      "Schöner heiliger Tempel, sehr friedlich.",
    "Galle Fort": "Galle Fort",
    "Historic Dutch fort with amazing ocean views.":
      "Historisches holländisches Fort mit atemberaubender Aussicht auf den Ozean.",
    "Adam's Peak (Sri Pada)": "Adams Peak (Sri Pada)",
    "Challenging climb but the sunrise view was unforgettable!":
      "Herausfordernder Aufstieg, aber der Sonnenaufgang war unvergesslich!",
  },
  zh: {
    Discover: "发现",
    "Search landmarks and places": "搜索地标和地点",
    All: "全部",
    Museum: "博物馆",
    Park: "公园",
    Historic: "历史",
    Restaurant: "餐厅",
    Nearby: "附近",
    "View All": "查看全部",
    Popular: "热门",
    "Sigiriya Rock Fortress": "狮子岩堡垒",
    "Climbed the Lion Rock and loved the view!": "爬上狮子岩，景色令人喜爱！",
    "Temple of the Tooth (Kandy)": "牙庙（康提）",
    "Beautiful sacred temple, very peaceful.": "美丽的神圣寺庙，非常宁静。",
    "Galle Fort": "加勒堡",
    "Historic Dutch fort with amazing ocean views.": "历史悠久的荷兰堡垒，拥有壮丽的海景。",
    "Adam's Peak (Sri Pada)": "亚当峰（斯里帕达）",
    "Challenging climb but the sunrise view was unforgettable!":
      "攀登具有挑战性，但日出景色令人难忘！",
  },
  ja: {
    Discover: "発見",
    "Search landmarks and places": "ランドマークや場所を検索",
    All: "すべて",
    Museum: "博物館",
    Park: "公園",
    Historic: "歴史的",
    Restaurant: "レストラン",
    Nearby: "近く",
    "View All": "すべて見る",
    Popular: "人気",
    "Sigiriya Rock Fortress": "シギリヤ・ロック・フォートレス",
    "Climbed the Lion Rock and loved the view!":
      "ライオンロックに登って景色を楽しんだ！",
    "Temple of the Tooth (Kandy)": "歯の寺（キャンディ）",
    "Beautiful sacred temple, very peaceful.":
      "美しい神聖な寺院、とても平和。",
    "Galle Fort": "ガール要塞",
    "Historic Dutch fort with amazing ocean views.":
      "歴史的なオランダの要塞、素晴らしい海の景色。",
    "Adam's Peak (Sri Pada)": "アダムズピーク（スリパダ）",
    "Challenging climb but the sunrise view was unforgettable!":
      "挑戦的な登山ですが、日の出の景色は忘れられません！",
  },
};

export const landmarkTexts: Record<Language, Record<string, string>> = {
  en: {
    // Landmark Titles & Descriptions
    "Sigiriya Rock Fortress": "Sigiriya Rock Fortress",
    "Climbed the Lion Rock and loved the view!": "Climbed the Lion Rock and loved the view!",
    "Temple of the Tooth (Kandy)": "Temple of the Tooth (Kandy)",
    "Beautiful sacred temple, very peaceful.": "Beautiful sacred temple, very peaceful.",
    "Galle Fort": "Galle Fort",
    "Historic Dutch fort with amazing ocean views.": "Historic Dutch fort with amazing ocean views.",
    "Adam's Peak (Sri Pada)": "Adam's Peak (Sri Pada)",
    "Challenging climb but the sunrise view was unforgettable!": "Challenging climb but the sunrise view was unforgettable!",

    // Categories
    "Historic": "Historic",
    "Religious": "Religious",
    "Nature": "Nature",

    // Tabs
    "Overview": "Overview",
    "History": "History",
    "Fun Facts": "Fun Facts",

    // Buttons
    "Start AR Tour": "Start AR Tour",
    "Share": "Share",
    "Save": "Save",
  },
  es: {
    "Sigiriya Rock Fortress": "Fortaleza de Sigiriya",
    "Climbed the Lion Rock and loved the view!": "¡Escalé la Roca del León y me encantó la vista!",
    "Temple of the Tooth (Kandy)": "Templo del Diente (Kandy)",
    "Beautiful sacred temple, very peaceful.": "Hermoso templo sagrado, muy tranquilo.",
    "Galle Fort": "Fuerte de Galle",
    "Historic Dutch fort with amazing ocean views.": "Fuerte holandés histórico con increíbles vistas al océano.",
    "Adam's Peak (Sri Pada)": "Pico de Adán (Sri Pada)",
    "Challenging climb but the sunrise view was unforgettable!": "Subida desafiante pero la vista del amanecer fue inolvidable!",

    "Historic": "Histórico",
    "Religious": "Religioso",
    "Nature": "Naturaleza",

    "Overview": "Descripción",
    "History": "Historia",
    "Fun Facts": "Datos curiosos",

    "Start AR Tour": "Iniciar recorrido AR",
    "Share": "Compartir",
    "Save": "Guardar",
  },
  fr: {
    "Sigiriya Rock Fortress": "Forteresse de Sigiriya",
    "Climbed the Lion Rock and loved the view!": "Gravi le Rocher du Lion et adoré la vue !",
    "Temple of the Tooth (Kandy)": "Temple de la Dent (Kandy)",
    "Beautiful sacred temple, very peaceful.": "Magnifique temple sacré, très paisible.",
    "Galle Fort": "Fort de Galle",
    "Historic Dutch fort with amazing ocean views.": "Fort hollandais historique avec une vue imprenable sur l’océan.",
    "Adam's Peak (Sri Pada)": "Pic d'Adam (Sri Pada)",
    "Challenging climb but the sunrise view was unforgettable!": "Ascension difficile mais le lever de soleil était inoubliable !",

    "Historic": "Historique",
    "Religious": "Religieux",
    "Nature": "Nature",

    "Overview": "Aperçu",
    "History": "Histoire",
    "Fun Facts": "Faits amusants",

    "Start AR Tour": "Commencer la visite AR",
    "Share": "Partager",
    "Save": "Sauvegarder",
  },
  de: {
    "Sigiriya Rock Fortress": "Sigiriya Felsenfestung",
    "Climbed the Lion Rock and loved the view!": "Den Löwenfelsen erklommen und die Aussicht geliebt!",
    "Temple of the Tooth (Kandy)": "Zahntempel (Kandy)",
    "Beautiful sacred temple, very peaceful.": "Schöner heiliger Tempel, sehr friedlich.",
    "Galle Fort": "Galle Fort",
    "Historic Dutch fort with amazing ocean views.": "Historisches holländisches Fort mit atemberaubender Aussicht auf den Ozean.",
    "Adam's Peak (Sri Pada)": "Adams Peak (Sri Pada)",
    "Challenging climb but the sunrise view was unforgettable!": "Herausfordernder Aufstieg, aber der Sonnenaufgang war unvergesslich!",

    "Historic": "Historisch",
    "Religious": "Religiös",
    "Nature": "Natur",

    "Overview": "Übersicht",
    "History": "Geschichte",
    "Fun Facts": "Interessante Fakten",

    "Start AR Tour": "AR-Tour starten",
    "Share": "Teilen",
    "Save": "Speichern",
  },
  zh: {
    "Sigiriya Rock Fortress": "狮子岩堡垒",
    "Climbed the Lion Rock and loved the view!": "爬上狮子岩，景色令人喜爱！",
    "Temple of the Tooth (Kandy)": "牙庙（康提）",
    "Beautiful sacred temple, very peaceful.": "美丽的神圣寺庙，非常宁静。",
    "Galle Fort": "加勒堡",
    "Historic Dutch fort with amazing ocean views.": "历史悠久的荷兰堡垒，拥有壮丽的海景。",
    "Adam's Peak (Sri Pada)": "亚当峰（斯里帕达）",
    "Challenging climb but the sunrise view was unforgettable!": "攀登具有挑战性，但日出景色令人难忘！",

    "Historic": "历史",
    "Religious": "宗教",
    "Nature": "自然",

    "Overview": "概览",
    "History": "历史",
    "Fun Facts": "趣闻",

    "Start AR Tour": "开始 AR 之旅",
    "Share": "分享",
    "Save": "保存",
  },
  ja: {
    "Sigiriya Rock Fortress": "シギリヤ・ロック・フォートレス",
    "Climbed the Lion Rock and loved the view!": "ライオンロックに登って景色を楽しんだ！",
    "Temple of the Tooth (Kandy)": "歯の寺（キャンディ）",
    "Beautiful sacred temple, very peaceful.": "美しい神聖な寺院、とても平和。",
    "Galle Fort": "ガール要塞",
    "Historic Dutch fort with amazing ocean views.": "歴史的なオランダの要塞、素晴らしい海の景色。",
    "Adam's Peak (Sri Pada)": "アダムズピーク（スリパダ）",
    "Challenging climb but the sunrise view was unforgettable!": "挑戦的な登山ですが、日の出の景色は忘れられません！",

    "Historic": "歴史",
    "Religious": "宗教",
    "Nature": "自然",

    "Overview": "概要",
    "History": "歴史",
    "Fun Facts": "豆知識",

    "Start AR Tour": "ARツアーを開始",
    "Share": "共有",
    "Save": "保存",
  },
};

// Merge commonUI + VisitedPlaces texts into translationCache
(Object.keys(commonUI) as Language[]).forEach(lang => {
  translationCache[lang] = { 
    ...commonUI[lang], 
    ...visitedPlacesTexts[lang],      // visited places translations
    ...recommendationTexts[lang],     // recommendation page translations
    ...landmarkTexts[lang]            // landmark details translations
  };
});

// LanguageProvider
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(
    () => (localStorage.getItem('language') as Language) || 'en'
  );
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const setLanguage = (newLanguage: Language) => {
    localStorage.setItem('language', newLanguage);
    setLanguageState(newLanguage);
  };

  useEffect(() => {
    if (language === 'en') {
      setTranslations({});
      return;
    }
    if (translationCache[language]) {
      setTranslations(translationCache[language]);
      return;
    }

    setIsLoading(true);
    const mockTranslate = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      translationCache[language] = {};
      setTranslations({});
      setIsLoading(false);
    };
    mockTranslate();
  }, [language]);

  const t = (key: string) => (language === 'en' ? key : translations[key] || key);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};