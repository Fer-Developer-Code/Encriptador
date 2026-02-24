import { Component } from '@angular/core';
import { HistorialService } from '../Services/HistorialServices';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-historial',
  imports: [DatePipe],
  templateUrl: './historial.html',
  styleUrl: './historial.css',
})
export class Historial {
  constructor(public historialService: HistorialService) { }

  eliminar(index: number) {
    this.historialService.eliminarRegistro(index);
  }

  vaciar() {
    this.historialService.vaciarHistorial();
  }
}
