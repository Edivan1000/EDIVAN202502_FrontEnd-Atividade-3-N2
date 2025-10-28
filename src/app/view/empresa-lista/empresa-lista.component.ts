// src/app/view/empresa-lista/empresa-lista.component.ts

import { Component, OnInit } from '@angular/core';
// CORREÇÃO 1: Importar a classe Router e outras dependências
import { Router, RouterModule } from '@angular/router'; // Corrigido para incluir RouterModule
import { CommonModule } from '@angular/common'; // Import necessário para *ngIf, *ngFor
import { EmpresaService } from '../../service/empresa.service'; // Ajuste o caminho conforme sua estrutura
import { Empresa } from '../../model/empresa'; // Ajuste o caminho conforme sua estrutura

@Component({
  selector: 'app-empresa-lista',
  templateUrl: './empresa-lista.component.html',
  styleUrls: ['./empresa-lista.component.css'],
  
  // 1. Confirma que é Standalone
  standalone: true, 

  // 2. CORREÇÃO ESSENCIAL: Adicionar os módulos
  imports: [
    RouterModule, // Resolve o erro de [routerLink]
    CommonModule  // Resolve os erros de *ngIf e *ngFor
  ]
})
export class EmpresaListaComponent implements OnInit {

  empresas: Empresa[] = [];

  constructor(
    // CORREÇÃO 2: A injeção deve ser declarada com private/public
    private router: Router, 
    private empresaService: EmpresaService
  ) { }

  ngOnInit(): void {
    this.carregarEmpresas();
  }

  carregarEmpresas(): void {
    this.empresaService.listarTodas().subscribe({
      // CORREÇÃO: Tipagem explícita (Empresa[])
      next: (data: Empresa[]) => { 
        this.empresas = data;
      },
      // CORREÇÃO: Tipagem explícita (any)
      error: (error: any) => { 
        console.error('Erro ao carregar empresas:', error);
        alert('Falha ao carregar a lista de empresas.');
      }
    });
  }

  editarEmpresa(id: number | undefined): void {
  // Adiciona uma verificação para evitar a navegação se o ID não existir
  if (id) {
    this.router.navigate(['/empresas/editar', id]); 
  } else {
    console.error('ID da empresa não encontrado para edição.');
    }
  }
}
