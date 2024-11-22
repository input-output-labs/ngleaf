import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LanguageModel } from "./language.model";

@Component({
  selector: "leaf-select-language",
  templateUrl: "./select-language.component.html",
  styleUrls: ["./select-language.component.scss"],
})
export class SelectLanguageComponent {
  /**
   * Language codes to use should be official language codes (second column "Set 1"): https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes
   **/
  @Input()
  public languageCodesPerLangue: { [key: string]: LanguageModel } = {
    en: {
      languageCode: "en",
      translationKey: "English",
      iconPath: "/assets/i18n/en.png",
    },
    fr: {
      languageCode: "fr",
      translationKey: "Français",
      iconPath: "/assets/i18n/fr.png",
    },
  };

  @Input()
  public defaultLanguageCode = "en";

  @Input()
  public useNavigatorLanguageAsDefault = true;

  @Input()
  public placeholderTranslationKeyMenu = "leaf.select-language.menu";

  @Input()
  public reduced = false;

  @Output()
  public languageSelectionChanged: EventEmitter<LanguageModel> = new EventEmitter();

  public selectedLanguage: LanguageModel | null = null;

  public availableLanguages: string[] = [];

  constructor(private translateService: TranslateService) {
    this.initializeAvailableLanguages();
  }

  initializeAvailableLanguages() {
    let languageCodeToUse = this.defaultLanguageCode;
    const languageCodesDefined = Object.keys(this.languageCodesPerLangue);
    if (this.useNavigatorLanguageAsDefault) {
      /**
       * navigator.language returns string in the format :  en-US
       * en for language code
       * US for country code
       * By default, we use the language code.
       */
      let navigatorLanguageCode = navigator.language
        .split("-")[0]
        .toLocaleLowerCase();
      if (languageCodesDefined.findIndex((code) => code === navigatorLanguageCode) !== -1) {
        languageCodeToUse = navigatorLanguageCode;
      }
    }
    this.availableLanguages = languageCodesDefined.filter(
      (languageCode) => languageCode !== languageCodeToUse
    );

    this.translateService.use(languageCodeToUse);
  }

  changeLanguage(languageCode: string) {
    if (this.languageCodesPerLangue[languageCode]) {
      this.selectedLanguage = this.languageCodesPerLangue[languageCode];
      this.availableLanguages = Object.keys(this.languageCodesPerLangue).filter(
        (languageCode) => languageCode !== this.selectedLanguage.languageCode
      );
      this.translateService.use(this.selectedLanguage.languageCode);
    }
  }
}
