import { Injectable } from '@angular/core';

export interface RegistroHistorial {
    operacion: 'Encriptar' | 'Desencriptar';
    textoEntrada: string;
    textoSalida: string;
    fecha: Date;
}

@Injectable({
    providedIn: 'root'
})
export class HistorialService {
    public registros: RegistroHistorial[] = [];

    constructor() { }

    agregarRegistro(registro: RegistroHistorial) {
        this.registros.unshift(registro); // Agrega al principio de la lista
    }
}