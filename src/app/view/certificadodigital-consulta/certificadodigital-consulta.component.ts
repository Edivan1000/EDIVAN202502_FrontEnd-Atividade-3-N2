// src/app/view/certificadodigital-consulta/certificadodigital-consulta.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router'; // Adicionando RouterModule
import { CommonModule } from '@angular/common'; // Adicionando CommonModule
// Importa o serviço de rotas para pegar o ID da URL
import { OrcamentoService } from '../../service/orcamento.service';
import { Orcamento } from '../../model/orcamento';

@Component({
  selector: 'app-certificadodigital-consulta', 
  templateUrl: './certificadodigital-consulta.component.html',
  styleUrls: ['./certificadodigital-consulta.component.css'],
  
  // 1. Confirma que é Standalone
  standalone: true, 

  // 2. CORREÇÃO ESSENCIAL: Adicionar os módulos
  imports: [
    CommonModule,  // Resolve o *ngIf, *ngFor, e pipes (number, date, etc.)
    RouterModule   // Resolve o [routerLink]
  ]
})
export class CertificadodigitalConsultaComponent implements OnInit {

  orcamento: Orcamento | undefined;
  orcamentoId: number | null = null;

  constructor(
    private route: ActivatedRoute, // Para acessar parâmetros da URL
    private orcamentoService: OrcamentoService
  ) { }

  ngOnInit(): void {
    // 1. Pega o ID da rota (o ID do Mestre)
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.orcamentoId = +id; // Converte string para número
        this.carregarOrcamento(this.orcamentoId);
      }
    });
  }

  carregarOrcamento(id: number): void {
    // 2. Chama o método que busca o Mestre E os Detalhes aninhados
    this.orcamentoService.consultarOrcamento(id).subscribe(
      (data: Orcamento) => {
        this.orcamento = data;
      },
      (error:any) => {
        console.error('Erro ao carregar detalhes do Orçamento:', error);
        alert('Erro ao carregar orçamento. Verifique se o backend está rodando.');
      }
    );
  }

  // Novo método para calcular o total geral
  calcularTotal(): number {
    if (!this.orcamento || !this.orcamento.itens) {
      return 0;
    }
    // Soma o preço de todos os itens do detalhe
    return this.orcamento.itens.reduce((sum, item) => sum + (item.preco || 0), 0);
  }
}