import { Injectable, signal, computed, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ES } from '../i18n/es';
import { EN } from '../i18n/en';

export type Language = 'es' | 'en';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    private currentLangSignal = signal<Language>('es');
    private translations: Record<Language, any> = { es: ES, en: EN };

    public currentLang = computed(() => this.currentLangSignal());

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            const savedLang = localStorage.getItem('app_lang') as Language;
            if (savedLang && this.translations[savedLang]) {
                this.currentLangSignal.set(savedLang);
            } else {
                const browserLang = navigator.language.split('-')[0] as Language;
                if (this.translations[browserLang]) {
                    this.setLanguage(browserLang);
                }
            }
        }
    }

    setLanguage(lang: Language) {
        this.currentLangSignal.set(lang);
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('app_lang', lang);
            document.documentElement.lang = lang;
        }
    }

    t(path: string): string {
        const lang = this.currentLangSignal();
        const keys = path.split('.');
        let result = this.translations[lang];

        for (const key of keys) {
            if (result && result[key]) {
                result = result[key];
            } else {
                return path; // Retorna el path si no encuentra la traducción
            }
        }

        return result;
    }
}
