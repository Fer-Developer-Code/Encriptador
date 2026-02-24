import { Component } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationService, Language } from '../../Services/translation.service';

@Component({
  selector: 'app-header',
  imports: [TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(public translationService: TranslationService) { }

  changeLanguage(lang: Language) {
    this.translationService.setLanguage(lang);
  }
}
