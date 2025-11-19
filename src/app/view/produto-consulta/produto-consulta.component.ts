import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Produto } from '../../model/produto';
import { ProdutoService } from '../../service/produto.service';

@Component({
  selector: 'app-produto-consulta',
  standalone: false,
  templateUrl: './produto-consulta.component.html',
  styleUrl: './produto-consulta.component.css'
})
export class ProdutoConsultaComponent implements OnInit {

  produto!: Produto;
  codigo!: number;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.produtoService.consultarProduto(id).subscribe({
    next: (produto) => {
      this.produto = produto;
    },
    error: (err) => {
      console.error('Erro ao consultar produto', err);
      alert('Erro ao consultar produto.');
    }
  });
}

  retornar() {
    this.router.navigate(['produto-lista']);
  }

  consultarProduto() {
    this.codigo = this.route.snapshot.params['codigo'];
    this.produto = new Produto();
    this.produto.categoriaCertificado = { codigo: 0, nome: '' }; // evita erro antes do subscribe

    this.produtoService.consultarProduto(this.codigo).subscribe(data => {
      this.produto = data;
    });
  }

}
