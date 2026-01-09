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
    if (!this.inputText) return; // Validación básica

    // Llamamos al servicio con la matriz 4x4
    this.outputText = this.encryptionService.encrypt(this.inputText);

    console.log('Texto cifrado (ASCII):', this.outputText);
  }

  // Método para limpiar (opcional, pero útil)
  clear() {
    this.inputText = '';
    this.outputText = '';
  }
}
