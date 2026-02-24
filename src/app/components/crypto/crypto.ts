import { Component, ChangeDetectorRef } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Encryption } from '../../Services/encryption';
import { FormsModule } from '@angular/forms';
import { HistorialService } from '../../Services/HistorialServices';

@Component({
  selector: 'app-crypto',
  standalone: true,
  imports: [FormsModule, TranslatePipe],
  templateUrl: './crypto.html',
  styleUrl: './crypto.css',
})
export class Crypto {

  constructor(private cdr: ChangeDetectorRef, private historialService: HistorialService, private encryptionService: Encryption) { }

  textoCopiado: boolean = false;
  inputText: string = '';
  outputText: string = '';


  onEncrypt() {
    const resultadoCrudo = this.encryptionService.encrypt(this.inputText);
    this.outputText = btoa(resultadoCrudo);
    this.historialService.agregarRegistro({
      operacion: 'Encriptar',
      textoEntrada: this.inputText,
      textoSalida: this.outputText,
      fecha: new Date()
    });
  }

  onDecrypt() {
    if (!this.inputText) return;
    this.outputText = this.encryptionService.decrypt(this.inputText);
    this.historialService.agregarRegistro({
      operacion: 'Desencriptar',
      textoEntrada: this.inputText,
      textoSalida: this.outputText,
      fecha: new Date()
    });
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
