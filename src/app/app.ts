import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Crypto } from "./components/crypto/crypto";
import { Footer } from "./components/footer/footer";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [Header, Crypto, Footer, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
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
