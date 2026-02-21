import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Crypto } from "./components/crypto/crypto";
import { Footer } from "./components/footer/footer";
import { FormsModule } from '@angular/forms';
import { Historial } from "./historial/historial";
import { Title, Meta } from '@angular/platform-browser';
import { inject as vercelAnalytics } from '@vercel/analytics';

@Component({
  selector: 'app-root',
  imports: [Header, Crypto, Footer, FormsModule, Historial],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit() {
    vercelAnalytics(); 

    // Título de la pestaña y del buscador
    this.titleService.setTitle('Matrix Crypt - Encriptador de Cifrado de Hill');

    // Etiquetas SEO estándar
    this.metaService.addTags([
      { name: 'description', content: 'Herramienta online gratuita para encriptar y desencriptar textos utilizando el algoritmo matemático del Cifrado de Hill con matrices.' },
      { name: 'keywords', content: 'encriptador, cifrado de hill, criptografía, angular, matrices, seguridad' },
      { name: 'author', content: 'Tu Nombre o Usuario' },
      { name: 'robots', content: 'index, follow' } 
    ]);

    // Etiquetas Open Graph (Redes Sociales y WhatsApp)
    this.metaService.addTags([
      { property: 'og:title', content: 'Matrix Crypt - Encriptador de Cifrado de Hill' },
      { property: 'og:description', content: 'Herramienta online para encriptar textos mediante álgebra lineal.' },
      { property: 'og:type', content: 'website' },
      // Opcional: Si tienes una captura de pantalla de la app, súbela a tu carpeta assets y pon la ruta aquí
      // { property: 'og:image', content: 'https://tu-dominio.com/assets/preview.png' } 
    ]);
  }


  protected readonly title = signal('Encriptador');

  inputText: string = '';
  outputText: string = '';
  isEncrypting: boolean = true;

  toggleMode() {
    this.isEncrypting = !this.isEncrypting;
  }

  swapTexts() {
    const temp = this.inputText;
    this.inputText = this.outputText;
    this.outputText = temp;
  }

  process() {
    if (this.isEncrypting) {
      console.log('Cifrando...');
    } else {
      console.log('Descifrando...');
    }
  }
}
