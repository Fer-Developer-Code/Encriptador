import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Encryption {
  private readonly MOD = 256;

  private readonly KEY_MATRIX: number[][] = [
    [1, -2, 0],
    [1, 0, 1],
    [-1, 1, -1]
  ];

  private readonly INVERSE_KEY_MATRIX: number[][] = [
    [1, 2, 2],
    [0, 1, 1],
    [-1, -1, -2]
  ];

  private get N(): number {
    return this.KEY_MATRIX.length;
  }

  constructor() { }

  encrypt(text: string): string {
    let vector = text.split('').map(char => char.charCodeAt(0));

    while (vector.length % this.N !== 0) {
      vector.push(0);
    }

    let encryptedText = '';

    for (let i = 0; i < vector.length; i += this.N) {
      const row = vector.slice(i, i + this.N);

      const resultRow = this.multiplyRowByMatrix(row, this.KEY_MATRIX);
      encryptedText += String.fromCharCode(...resultRow);
    }

    return encryptedText;
  }

  decrypt(encryptedTextInBase64: string): string {
    try {
      const rawText = atob(encryptedTextInBase64);
      const vector = rawText.split('').map(char => char.charCodeAt(0));
      let decryptedText = '';

      for (let i = 0; i < vector.length; i += this.N) {
        const row = vector.slice(i, i + this.N);
        const resultRow = this.multiplyRowByMatrix(row, this.INVERSE_KEY_MATRIX);
        decryptedText += String.fromCharCode(...resultRow);
      }

      return decryptedText.replace(/\0/g, '');
    } catch (e) {
      console.error(e);
      return 'Error';
    }
  }

  private multiplyRowByMatrix(row: number[], matrix: number[][]): number[] {
  
    const size = matrix.length;
    let result = new Array(size).fill(0);

    for (let j = 0; j < size; j++) {
      let sum = 0;
      for (let k = 0; k < size; k++) {
        sum += row[k] * matrix[k][j];
      }
      result[j] = ((sum % this.MOD) + this.MOD) % this.MOD;
    }
    return result;
  }
}