import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrcamentoService } from '../../service/orcamento.service';
import { Orcamento } from '../../model/orcamento';

@Component({
  selector: 'app-orcamento-lista',
  standalone: false,
  templateUrl: './orcamento-lista.component.html',
  styleUrls: ['./orcamento-lista.component.css']
})
export class OrcamentoListaComponent implements OnInit {

  orcamentos: Orcamento[] = [];

  constructor(
    private orcamentoService: OrcamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarOrcamentos();
  }

  carregarOrcamentos(): void {
    this.orcamentoService.listarOrcamentos().subscribe({
      next: dados => this.orcamentos = dados,
      error: erro => console.error('Erro ao carregar orçamentos', erro)
    });
  }

  editarOrcamento(orcamento: Orcamento): void {
    this.router.navigate(['/orcamento-form', orcamento.codigo]);
  }

  inserirOrcamento(): void {
    this.router.navigate(['orcamento-form']);
  }

  excluirOrcamento(orcamento: Orcamento, event: MouseEvent): void {
  event.stopPropagation();

  const id = orcamento.codigo;
  if (id === undefined) {
    alert('Código do orçamento não encontrado.');
    return;
  }

  if (confirm(`Deseja realmente excluir o orçamento de código ${id}?`)) {
    this.orcamentoService.excluir(id).subscribe({
      next: () => {
        alert('Orçamento excluído com sucesso!');
        this.carregarOrcamentos();
      },
      error: (err) => {
        console.error('Erro ao excluir orçamento', err);
        alert('Erro ao excluir o orçamento.');
      }
    });
  }
}
}