# MatrixCrypt: Encriptador de Hill (Angular + TypeScript)

> Una implementación interactiva del Cifrado de Hill utilizando álgebra lineal y aritmética modular, construida con **Angular 17+**.

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Build Status](https://img.shields.io/badge/Status-Funcional-success)

## 📋 Descripción

Este proyecto es una aplicación web que permite cifrar y descifrar mensajes de texto utilizando matrices inversibles. A diferencia de los cifrados de sustitución simple, el **Cifrado de Hill** es un cifrado poligráfico basado en el álgebra lineal.

El objetivo principal de este proyecto fue implementar la lógica matemática "desde cero" (Vanilla TypeScript) sin depender de librerías externas como `math.js`, demostrando un manejo sólido de algoritmos, estructuras de datos y tipado estricto.

## 🚀 Funcionalidades Clave

* **Encriptación Matricial:** Utiliza una matriz clave de $3 \times 3$ (escalable dinámicamente) para transformar vectores de texto.
* **Aritmética Modular Personalizada:** Implementación de operaciones módulo 256 para manejar el set completo de caracteres ASCII extendido.
* **Salida en Base64:** Conversión automática del resultado binario a Base64 para garantizar que el texto cifrado sea legible y transportable.
* **Arquitectura SSR & Defer:** Uso de `@defer` de Angular 17 para optimizar la carga del componente criptográfico (Client-Side) sin bloquear el renderizado inicial del servidor (SSR).
* **Diseño Mobile First:** Interfaz limpia y responsiva.

## 🧠 Fundamento Matemático

El núcleo del sistema trata el texto como una secuencia de vectores numéricos.

### 1. Cifrado
El texto plano se convierte a sus valores ASCII y se agrupa en vectores de tamaño $n$ (donde $n$ es la dimensión de la matriz).

$$C = (K \cdot P) \pmod{256}$$

* $K$: Matriz Clave (Debe ser invertible en mod 256).
* $P$: Vector del texto plano.
* $C$: Vector del texto cifrado resultante.

### 2. Descifrado
Para recuperar el mensaje, multiplicamos el vector cifrado por la **Matriz Inversa Modular** de la clave.

$$P = (K^{-1} \cdot C) \pmod{256}$$

## 🛠️ Desafío Técnico: Módulo de Negativos

Durante el desarrollo, se resolvió un problema particular con el manejo de números negativos en JavaScript/TypeScript.
El operador `%` en JS no se comporta como el operador módulo matemático para números negativos (ej: `-2 % 256` devuelve `-2`).

**Solución implementada:**
Se aplicó una fórmula de corrección para garantizar residuos positivos necesarios para la criptografía:

```typescript

result[j] = ((sum % MOD) + MOD) % MOD;

## Matriz utilizada en el proyecto:
// Clave (Key)
[ 1, -2,  0]
[ 1,  0,  1]
[-1,  1, -1]

// Inversa Calculada (Inverse Key)
[ 1,  2,  2]
[ 0,  1,  1]
[-1, -1, -2]