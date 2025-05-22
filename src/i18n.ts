import { createI18n } from "vue-i18n";
import Ru from "./locales/RU.json";
import En from "./locales/EN.json"
export const i18n = createI18n({
    locale: localStorage.getItem('lang') || 'ru',
    fallbackLocale: 'en',
    messages: {
        "ru": Ru,
        "en": En
    }
})