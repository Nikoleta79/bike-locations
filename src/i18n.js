import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    welcome: 'Welcome to Bike Track Location',
    startJourney: 'Start Your Journey',
    exploreMap: 'Explore Map',
    settings: 'Settings',
    keyFeatures: 'Key Features',
    interactiveMaps: 'Interactive Maps',
    trackProgress: 'Track Progress',
    realTimeUpdates: 'Real-Time Updates',
    madeWithLove: 'Made with ❤️ by me',
    exploreWorld: 'Explore the world with the app! Discover amazing locations, track your progress, and more.',
  },
  sq: {
    welcome: 'Mirësevini në Bike Track Location',
    startJourney: 'Filloni Udhëtimin Tuaj',
    exploreMap: 'Eksploroni Hartën',
    settings: 'Cilësimet',
    keyFeatures: 'Karakteristikat Kryesore',
    interactiveMaps: 'Harta Interaktive',
    trackProgress: 'Gjurmimi i Progresit',
    realTimeUpdates: 'Përditësime në Kohë Reale',
    madeWithLove: 'Krijuar me ❤️ nga unë',
    exploreWorld: 'Eksploroni botën me aplikacionin! Zbuloni vende të mahnitshme, gjurmioni progresin tuaj, dhe më shumë.',
  },
  nl: {
    welcome: 'Welkom bij Bike Track Location',
    startJourney: 'Start Je Reis',
    exploreMap: 'Verken Kaart',
    settings: 'Instellingen',
    keyFeatures: 'Belangrijke Kenmerken',
    interactiveMaps: 'Interactieve Kaarten',
    trackProgress: 'Voortgang Volgen',
    realTimeUpdates: 'Real-Time Updates',
    madeWithLove: 'Gemaakt met ❤️ door mij',
    exploreWorld: 'Verken de wereld met de app! Ontdek geweldige locaties, volg je voortgang en meer.',
  },
  el: {
    welcome: 'Καλώς ήρθατε στο Bike Track Location',
    startJourney: 'Ξεκινήστε το Ταξίδι σας',
    exploreMap: 'Εξερευνήστε τον Χάρτη',
    settings: 'Ρυθμίσεις',
    keyFeatures: 'Κύρια Χαρακτηριστικά',
    interactiveMaps: 'Διαδραστικοί Χάρτες',
    trackProgress: 'Παρακολούθηση Προόδου',
    realTimeUpdates: 'Ενημερώσεις σε Πραγματικό Χρόνο',
    madeWithLove: 'Φτιαγμένο με ❤️ από εμένα',
    exploreWorld: 'Εξερευνήστε τον κόσμο με την εφαρμογή! Ανακαλύψτε καταπληκτικές τοποθεσίες, παρακολουθήστε την πρόοδό σας και άλλα.',
  },
};

const i18n = createI18n({
  locale: 'en', 
  fallbackLocale: 'en', 
  messages,
});

export default i18n;