import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrcamentoService } from '../../service/orcamento.service';
import { ProdutoService } from '../../service/produto.service';
import { Orcamento } from '../../model/orcamento';
import { ItensOrcamento } from '../../model/itensorcamento';
import { Produto } from '../../model/produto';

@Component({
  selector: 'app-orcamento-form',
  standalone: false,
  templateUrl: './orcamento-form.component.html',
  styleUrls: ['./orcamento-form.component.css']
})
export class OrcamentoFormComponent implements OnInit {

  produtos: Produto[] = [];
  orcamento: Orcamento = new Orcamento();

  private orcamentoId?: number;

  constructor(
    private orcamentoService: OrcamentoService,
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
  // Carrega produtos primeiro
  this.produtoService.listarProdutos().subscribe({
    next: (produtos) => {
      this.produtos = produtos;

      // Depois que os produtos chegarem, carregue o orçamento
      this.orcamentoId = this.route.snapshot.params['id'];
      if (this.orcamentoId) {
        this.carregarOrcamento(this.orcamentoId);
      } else {
        this.orcamento.dataOrcamento = new Date().toISOString().split('T')[0];
      }
    },
    error: (erro) => console.error('Erro ao carregar produtos:', erro)
  });
}


  carregarOrcamento(id: number): void {
  this.orcamentoService.buscarOrcamentoPorId(id).subscribe({
    next: (o) => {
      this.orcamento = o;

      this.orcamento.itens = o.itens.map(i => ({
        quantidade: i.quantidade,
        produto: this.produtos.find(p => p.codigo === i.produto.codigo)!, // agora NÃO será undefined
        orcamento: this.orcamento
      }));

      this.calcularTotal();
    },
    error: (err) => console.error('Erro ao carregar orçamento', err)
  });
}




  adicionarItem(produtoId: number, quantidade: number): void {
    const produto = this.produtos.find(p => p.codigo === produtoId);
    if (produto && quantidade > 0) {
      const item = {
        quantidade,
        produto
      } as ItensOrcamento;

      this.orcamento.itens.push(item);
      this.calcularTotal();
    }
  }

  removerItem(index: number): void {
    this.orcamento.itens.splice(index, 1);
    this.calcularTotal();
  }

  calcularTotal(): void {
    this.orcamento.totalOrcamento = this.orcamento.itens.reduce(
      (soma, item) => soma + (item.produto.preco * item.quantidade),
      0
    );
  }

  salvarOrcamento(): void {
    if (this.orcamento.itens.length === 0) {
      alert('Adicione pelo menos um item ao orçamento.');
      return;
    }

    if (this.orcamentoId) {
      this.orcamentoService.alterarOrcamento(this.orcamentoId, this.orcamento).subscribe({
        next: () => {
          alert('Orçamento atualizado com sucesso!');
          this.router.navigate(['/orcamento-lista']);
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao atualizar orçamento!');
        }
      });
    } else {
      this.orcamentoService.incluirOrcamento(this.orcamento).subscribe({
        next: () => {
          alert('Orçamento cadastrado com sucesso!');
          this.router.navigate(['orcamento-lista']);
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao salvar orçamento!');
        }
      });
    }
  }

  retornar() {
    this.router.navigate(['orcamento-lista']);
  }
}