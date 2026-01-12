import { Component, inject } from '@angular/core';
import { Encryption } from '../../Services/encryption';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crypto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crypto.html',
  styleUrl: './crypto.css',
})
export class Crypto {
  private encryptionService = inject(Encryption);

  inputText: string = '';
  outputText: string = '';

  onEncrypt() {
    const resultadoCrudo = this.encryptionService.encrypt(this.inputText);
    this.outputText = btoa(resultadoCrudo);
  }

  onDecrypt() {
    if (!this.inputText) return;
    this.outputText = this.encryptionService.decrypt(this.inputText);
  }

  swapTexts() {
    this.inputText = this.outputText;
    this.outputText = ''
  }

  clear() {
    this.inputText = '';
    this.outputText = '';
  }
}
