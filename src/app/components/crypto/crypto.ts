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
    if (!this.inputText) return;

    // 1. Encriptamos (obtenemos símbolos ASCII raros)
    const rawEncrypted = this.encryptionService.encrypt(this.inputText);

    // 2. Convertimos a Base64 para mostrar en pantalla
    // btoa() es una función nativa de JS: "Binary to ASCII" (Base64)
    this.outputText = btoa(rawEncrypted);

    console.log('Cifrado (Base64):', this.outputText);
  }

  onDecrypt() {
    if (!this.inputText) return;

    // El servicio espera Base64 y devuelve el texto original
    this.outputText = this.encryptionService.decrypt(this.inputText);
  }

  swapTexts() {
    this.inputText = this.outputText; // Pasamos el resultado arriba
    this.outputText = '';             // Limpiamos el resultado
  }

  // Método para limpiar (opcional, pero útil)
  clear() {
    this.inputText = '';
    this.outputText = '';
  }
}
