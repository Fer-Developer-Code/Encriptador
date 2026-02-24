import { Component, signal, OnInit, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Crypto } from "./components/crypto/crypto";
import { Footer } from "./components/footer/footer";
import { FormsModule } from '@angular/forms';
import { Historial } from "./components/historial/historial";
import { TranslationService } from './Services/translation.service';
import { Title, Meta } from '@angular/platform-browser';
import { inject as vercelAnalytics } from '@vercel/analytics';

@Component({
  selector: 'app-root',
  imports: [Header, Crypto, Footer, FormsModule, Historial],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private translationService: TranslationService
  ) {
    // Escuchar cambios de idioma para actualizar SEO
    effect(() => {
      this.updateSEO();
    });
  }

  ngOnInit() {
    vercelAnalytics();
  }

  updateSEO() {
    const title = this.translationService.t('seo.title');
    const description = this.translationService.t('seo.description');
    const keywords = this.translationService.t('seo.keywords');

    this.titleService.setTitle(title);

    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: keywords });

    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
  }

  protected readonly title = signal('Matrix Crypt');
}
