import {Injectable, Inject, InjectionToken, Optional} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {LanguageModel} from '../../components';

export const LANGUAGE_CODES = new InjectionToken<{ [key: string]: LanguageModel }>('LANGUAGE_CODES');

@Injectable({
  providedIn: 'root',
})
export class LeafLanguageService {
  private selectedLanguage: LanguageModel | null = null;
  private readonly SESSION_STORAGE_KEY = 'selectedLanguageCode';

  constructor(
    private translateService: TranslateService,
    @Optional() @Inject(LANGUAGE_CODES) private languageCodesPerLangue?: {[key: string]: LanguageModel}
  ) {}

  public initializeLanguage(
    languageCodesPerLangue: { [key: string]: LanguageModel } | undefined,
    defaultLanguageCode: string,
    useNavigatorLanguageAsDefault: boolean,
  ) {

    const languageCodesPerLangueSource = this.languageCodesPerLangue ?? languageCodesPerLangue;
    let languageCodeToUse = this.getStoredLanguage() || defaultLanguageCode;
    const languageCodesDefined = Object.keys(languageCodesPerLangue ?? languageCodesPerLangueSource);

    if (!this.getStoredLanguage() && useNavigatorLanguageAsDefault) {
      const navigatorLanguageCode = navigator.language.split('-')[0].toLowerCase();
      if (languageCodesDefined.includes(navigatorLanguageCode)) {
        languageCodeToUse = navigatorLanguageCode;
      }
    }

    this.selectedLanguage = languageCodesPerLangueSource[languageCodeToUse];
    this.translateService.use(languageCodeToUse);
    this.storeLanguage(languageCodeToUse);
  }

  public getCurrentLanguage(): LanguageModel | null {
    return this.selectedLanguage;
  }

  public changeLanguage(languageCode: string, languageCodesPerLangue: { [key: string]: LanguageModel } | undefined) {
    const languageCodesPerLangueSource = this.languageCodesPerLangue ?? languageCodesPerLangue;
    if (languageCodesPerLangueSource[languageCode]) {
      this.selectedLanguage = languageCodesPerLangueSource[languageCode];
      this.translateService.use(this.selectedLanguage.languageCode);
      this.storeLanguage(languageCode);
    }
  }

  private getStoredLanguage(): string | null {
    return sessionStorage.getItem(this.SESSION_STORAGE_KEY);
  }

  private storeLanguage(languageCode: string) {
    sessionStorage.setItem(this.SESSION_STORAGE_KEY, languageCode);
  }
}
