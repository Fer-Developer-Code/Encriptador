import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

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
    private readonly STORAGE_KEY = 'historial_encriptador';

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            this.cargarHistorial();
        }
    }

    private cargarHistorial() {
        const guardado = localStorage.getItem(this.STORAGE_KEY);
        if (guardado) {
            try {
                const datosParseados = JSON.parse(guardado);
                const limiteDias = new Date();
                limiteDias.setDate(limiteDias.getDate() - 3);
                
                this.registros = datosParseados
                    .map((r: any) => ({ ...r, fecha: new Date(r.fecha) }))
                    .filter((r: RegistroHistorial) => r.fecha >= limiteDias);
                
                this.guardarHistorial();
            } catch (e) {
                console.error("Error cargando historial de localStorage:", e);
                this.registros = [];
            }
        }
    }

    private guardarHistorial() {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.registros));
        }
    }

    agregarRegistro(registro: RegistroHistorial) {
        this.registros.unshift(registro);
        this.guardarHistorial();
    }

    eliminarRegistro(index: number) {
        this.registros.splice(index, 1);
        this.guardarHistorial();
    }

    vaciarHistorial() {
        this.registros = [];
        this.guardarHistorial();
    }
}