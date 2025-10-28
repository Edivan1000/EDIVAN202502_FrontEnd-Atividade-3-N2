// src/app/view/certificadodigital-lista/certificadodigital-lista.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // NOVO IMPORT ESSENCIAL
// Mude a importação da Model antiga para a nova (Orcamento)
import { Orcamento } from '../../model/orcamento'; 
// Mude o Service que será usado (OrcamentoService)
import { OrcamentoService } from '../../service/orcamento.service';
import { Router } from '@angular/router'; // Necessário para navegação

@Component({
  selector: 'app-certificadodigital-lista',
  templateUrl: './certificadodigital-lista.component.html',
  styleUrls: ['./certificadodigital-lista.component.css'],
  
  // 1. Confirma que é Standalone
  standalone: true, 

  // 2. CORREÇÃO ESSENCIAL: Adicionar os módulos
  imports: [
    CommonModule,  // Resolve o *ngFor e o pipe 'date'
  ]
})
export class CertificadodigitalListaComponent implements OnInit {

  // Mude o tipo da lista: agora lista ORÇAMENTOS (o MESTRE)
  orcamentos: Orcamento[] = [];

  constructor(
    private orcamentoService: OrcamentoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarOrcamentos();
  }

  carregarOrcamentos(): void {
    // Chame o método do novo serviço
    this.orcamentoService.listarOrcamentos().subscribe(
      (data: Orcamento[]) => {
        this.orcamentos = data;
      },
      (error:any) => {
        console.error('Erro ao carregar lista de Orçamentos:', error);
        // Exemplo: tratar erro ou notificar o usuário
      }
    );
  }

  // Novo método para navegar para a tela de consulta/detalhe
  consultarDetalhe(id: number | undefined): void {
    if (id !== undefined) {
      // Navega para a rota de consulta que definiremos no app-routing
      this.router.navigate(['/orcamento/consulta', id]); 
    }
  }

  // Você pode manter os métodos de 'alterar' ou 'excluir' se já existirem, 
  // adaptando-os para usar o OrcamentoService.
}