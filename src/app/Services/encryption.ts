import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Encryption {
  private readonly MOD = 256;

  // Es una matriz 4x4 fija. 
  private readonly KEY_MATRIX: number[][] = [
    [15, 3, 7, 9],
    [5, 6, 7, 8],
    [9, 11, 12, 13],
    [14, 15, 17, 18]
  ];


  private readonly INVERSE_KEY_MATRIX: number[][] = [
    [1, 254, 243, 237],
    [0, 1, 251, 245],
    [0, 0, 1, 249],
    [0, 0, 0, 1]
  ];
  constructor() { }

  encrypt(text: string): string {
    // 1. Convertir texto a array de números (ASCII)
    let vector = text.split('').map(char => char.charCodeAt(0));

    // 2. Rellenar con ceros (Padding) si no es múltiplo de 4
    // Si el resto es 0, no entra. Si es 1, agrega 3 ceros, etc.
    while (vector.length % 4 !== 0) {
      vector.push(0);
    }

    let encryptedText = '';

    // 3. Recorrer el vector de 4 en 4 (Procesar por filas)
    for (let i = 0; i < vector.length; i += 4) {
      // Extraemos la fila actual [v1, v2, v3, v4]
      const row = [vector[i], vector[i + 1], vector[i + 2], vector[i + 3]];

      // Multiplicamos esta fila por la Matriz Clave
      const resultRow = this.multiplyRowByMatrix(row, this.KEY_MATRIX);

      // Convertimos los números resultantes a caracteres y concatenamos
      encryptedText += String.fromCharCode(...resultRow);
    }

    return encryptedText;
  }

  // Función auxiliar de álgebra lineal: Vector(1x4) * Matriz(4x4)
  private multiplyRowByMatrix(row: number[], matrix: number[][]): number[] {
    let result = [0, 0, 0, 0];

    // Para cada columna de la matriz (j)
    for (let j = 0; j < 4; j++) {
      let sum = 0;
      // Multiplicamos fila del vector (k) por columna de la matriz
      for (let k = 0; k < 4; k++) {
        sum += row[k] * matrix[k][j];
      }
      // Aplicamos el módulo 256 al final de la suma
      result[j] = sum % this.MOD;
    }

    return result;
  }

  decrypt(encryptedTextInBase64: string): string {
    try {
      // 1. Convertir de Base64 a símbolos ASCII (Inverso de btoa)
      const rawText = atob(encryptedTextInBase64);

      // 2. Convertir a vector de números
      const vector = rawText.split('').map(char => char.charCodeAt(0));
      let decryptedText = '';

      // 3. Procesar de 4 en 4 usando la MATRIZ INVERSA
      for (let i = 0; i < vector.length; i += 4) {
        const row = [vector[i], vector[i + 1], vector[i + 2], vector[i + 3]];

        // Usamos la misma lógica de multiplicación, pero con la inversa
        const resultRow = this.multiplyRowByMatrix(row, this.INVERSE_KEY_MATRIX);

        decryptedText += String.fromCharCode(...resultRow);
      }

      // 4. Limpiar los ceros (nulls) de relleno al final
      return decryptedText.replace(/\0/g, '');

    } catch (e) {
      console.error('Error al desencriptar. Probablemente no sea Base64 válido.');
      return 'Error: Texto inválido';
    }
  }
} 