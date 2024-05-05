import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reloj',
  template: `
    <div class="reloj" style="font-family: 'Orbitron', sans-serif;">
      {{ hora }}
    </div>
  `,
  styleUrls: ['reloj.component.css']
})
export class RelojComponent implements OnInit {
  hora: string = '';

  ngOnInit() {
    this.actualizarHora();
    setInterval(() => {
      this.actualizarHora();
    }, 1000);
  }

  private actualizarHora() {
    const ahora = new Date();
    this.hora = ahora.toLocaleTimeString('es-ES', { hour12: false });
  }
}
