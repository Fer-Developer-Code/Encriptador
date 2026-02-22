# Matrix Crypt: Encriptador de Hill

> Una implementación interactiva del Cifrado de Hill utilizando álgebra lineal y aritmética modular, construida desde cero con **Angular 17+** y **TypeScript**.

[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

 **Prueba la aplicación en vivo:** [Matrix Crypt en Vercel](https://encriptador-silk.vercel.app/)


##  Descripción

Este proyecto es una aplicación web responsiva que permite cifrar y descifrar mensajes de texto utilizando matrices inversibles. A diferencia de los cifrados de sustitución simple, el **Cifrado de Hill** es un cifrado poligráfico basado en el álgebra lineal.

El objetivo principal de este proyecto fue implementar la lógica matemática "desde cero" (Vanilla TypeScript) sin depender de librerías externas de cálculo, demostrando un manejo sólido de algoritmos, estructuras de datos y tipado estricto, acompañado de una interfaz moderna.

## Funcionalidades Clave

* **Motor Criptográfico Propio:** Encriptación matricial utilizando una clave de $3 \times 3$ para transformar vectores de texto, con soporte para el set de caracteres ASCII extendido mediante aritmética modular base 256.
* **Codificación Segura:** Salida automática en Base64 para garantizar que el texto cifrado sea legible, transportable y no pierda caracteres especiales.
* **Historial de Sesión:** Implementación de un panel lateral (Offcanvas) para registrar y revisar las conversiones realizadas durante la sesión en tiempo real.
* **Herramientas de Usuario:** Integración con la API del Portapapeles (`Clipboard API`) y generación de archivos `.txt` mediante `Blob` para descargar resultados sin servidor.
* **Arquitectura y Rendimiento:** Uso de bloques `@defer` de Angular para optimización de carga (Lazy Loading) y Server-Side Rendering (SSR) con etiquetas meta dinámicas para SEO.
* **Diseño Mobile-First:** Interfaz construida con Bootstrap 5, completamente adaptable a dispositivos móviles.

## Fundamento Matemático

El núcleo del sistema trata el texto como una secuencia de vectores numéricos. El texto plano se convierte a sus valores numéricos y se agrupa en vectores de tamaño $n$ (donde $n$ es la dimensión de la matriz).

### 1. Cifrado
Para cifrar, multiplicamos la Matriz Clave por el vector del texto plano y aplicamos el módulo:

$$C = (K \cdot P) \pmod{256}$$

* $K$: Matriz Clave (Invertible en módulo 256).
* $P$: Vector del texto plano.
* $C$: Vector del texto cifrado resultante.

### 2. Descifrado
Para recuperar el mensaje original, multiplicamos el vector cifrado por la **Matriz Inversa Modular** de la clave:

$$P = (K^{-1} \cdot C) \pmod{256}$$

### Matrices utilizadas en el proyecto

```text
Clave (Key):                 Inversa Calculada (Inverse Key):
[  1, -2,  0 ]               [  1,  2,  2 ]
[  1,  0,  1 ]               [  0,  1,  1 ]
[ -1,  1, -1 ]               [ -1, -1, -2 ]
```
### Desafío Técnico: Módulo de Negativos en JavaScript
Durante el desarrollo del algoritmo, surgió una particularidad con el manejo de números negativos en JavaScript/TypeScript. El operador % nativo calcula el resto, no el módulo matemático estricto (ej: -2 % 256 devuelve -2, cuando en criptografía necesitamos el equivalente positivo 254).

Solución implementada:
Se diseñó una fórmula de corrección algebraica para garantizar residuos siempre positivos, asegurando la integridad del cifrado y descifrado:

TypeScript

result[j] = ((sum % MOD) + MOD) % MOD;

## Instalación Local
Si deseas correr este proyecto en tu entorno local:

Clona el repositorio: git clone https://github.com/Fer-Developer-Code/Encriptador.git

Instala las dependencias: npm install

Inicia el servidor de desarrollo: npm start o ng serve

Abre http://localhost:4200 en tu navegador.
