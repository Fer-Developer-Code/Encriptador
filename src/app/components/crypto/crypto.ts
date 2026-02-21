import { Component, inject, ChangeDetectorRef } from '@angular/core';
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
  constructor(private cdr: ChangeDetectorRef) { }

  textoCopiado: boolean = false;
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

  downloadText() {
    if (this.outputText) {
      const blob = new Blob([this.outputText], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resultado_matrix_crypt.txt';
      a.click();
      window.URL.revokeObjectURL(url); // Limpiamos la memoria
    }
  }

  copyText() {
    if (this.outputText) {
      navigator.clipboard.writeText(this.outputText).then(() => {
        this.textoCopiado = true;
        this.cdr.detectChanges();
        setTimeout(() => {
          this.textoCopiado = false;
          this.cdr.detectChanges();
        }, 5000);
      }).catch(err => {
        console.error('Error al copiar: ', err);
      });
    }
  }
}
