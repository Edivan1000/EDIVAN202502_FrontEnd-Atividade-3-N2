// src/app/view/inicio/inicio.component.ts

import { Component, OnInit } from '@angular/core';

// NOVO IMPORT ESSENCIAL:
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common'; // Para garantir que *ngIf, *ngFor funcionem

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  
  // Confirmação de que o componente é Standalone (por isso o erro)
  standalone: true, 
  
  // ADICIONAR O MODULE AQUI:
  imports: [
    RouterModule, // <--- Este resolve o [routerLink]
    CommonModule  // Para garantir que diretivas básicas funcionem
  ]
})
export class InicioComponent implements OnInit {
  // CORREÇÃO ESSENCIAL: Adicionar o método ngOnInit
  ngOnInit(): void {
    // Você pode deixar o corpo vazio, a não ser que precise carregar dados aqui.
  }

  // ... o restante da sua classe
}