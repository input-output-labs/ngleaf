import {Component, EventEmitter, Inject, Input, OnInit, Optional, Output} from '@angular/core';
import {LanguageModel} from './language.model';
import {LANGUAGE_CODES, LeafLanguageService} from '../../../services';

@Component({
  selector: 'leaf-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss'],
})
export class SelectLanguageComponent implements OnInit {
  @Input()
  public languageCodesPerLangue: { [key: string]: LanguageModel } = {
    en: {
      languageCode: 'en',
      translationKey: 'English',
      iconPath: '/assets/i18n/en.png',
    },
    fr: {
      languageCode: 'fr',
      translationKey: 'Français',
      iconPath: '/assets/i18n/fr.png',
    },
  };

  @Input()
  public defaultLanguageCode = 'en';

  @Input()
  public useNavigatorLanguageAsDefault = true;

  @Input()
  public placeholderTranslationKeyMenu = 'leaf.select-language.menu';

  @Input()
  public reduced = false;

  @Input()
  public showSelectedFlagIcon = false;

  @Output()
  public languageSelectionChanged: EventEmitter<LanguageModel> = new EventEmitter();

  public availableLanguages: string[] = [];
  public selectedLanguage: LanguageModel | null = null;

  constructor(private languageService: LeafLanguageService,
              @Optional() @Inject(LANGUAGE_CODES) private languageCodesPerLangueInjection?: {[key: string]: LanguageModel}) {}

  ngOnInit() {
    this.languageCodesPerLangue = this.languageCodesPerLangueInjection ?? this.languageCodesPerLangue;
    this.languageService.initializeLanguage(
      this.languageCodesPerLangue,
      this.defaultLanguageCode,
      this.useNavigatorLanguageAsDefault
    );

    this.selectedLanguage = this.languageService.getCurrentLanguage();
    this.availableLanguages = Object.keys(this.languageCodesPerLangue).filter(
      (languageCode) => languageCode !== this.selectedLanguage?.languageCode
    );
  }

  changeLanguage(languageCode: string) {
    this.languageService.changeLanguage(languageCode, this.languageCodesPerLangue);
    this.selectedLanguage = this.languageService.getCurrentLanguage();
    this.availableLanguages = Object.keys(this.languageCodesPerLangue).filter(
      (langCode) => langCode !== this.selectedLanguage?.languageCode
    );
    this.languageSelectionChanged.emit(this.selectedLanguage);
  }
}
