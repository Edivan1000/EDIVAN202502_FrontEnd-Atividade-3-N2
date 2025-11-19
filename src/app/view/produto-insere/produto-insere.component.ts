import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Produto } from '../../model/produto';
import { ProdutoService } from '../../service/produto.service';

import { CategoriaCertificado } from '../../model/categoriacertificado';
import { CategoriaCertificadoService } from '../../service/categoriacertificado.service';

@Component({
  selector: 'app-produto-insere',
  standalone: false,
  templateUrl: './produto-insere.component.html',
  styleUrls: ['./produto-insere.component.css']
})
export class ProdutoInsereComponent implements OnInit {

  produto: Produto = new Produto();
  categorias!: CategoriaCertificado[];
  modalidadesDisponiveis: string[] = ['Arquivo', 'Token', 'Cartão'];
  permitirSomenteNumeros(event: KeyboardEvent): void {
  const charCode = event.charCode;
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }
}

permitirSomenteNumerosComPonto(event: KeyboardEvent): void {
  const charCode = event.charCode;
  const charStr = String.fromCharCode(charCode);
  // Permite dígitos e ponto (.)
  if (!charStr.match(/[0-9.]/)) {
    event.preventDefault();
  }
}

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaCertificadoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // IMPORTANTE → criar o objeto interno antes de usar ngModel no select
    this.produto.categoriaCertificado = new CategoriaCertificado();

    this.listarCategorias();
  }

  private listarCategorias() {
    this.categoriaService.listarCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  onSubmit() {
    this.inserirProduto();
  }

  inserirProduto() {

    if (!this.produto.categoriaCertificado || !this.produto.categoriaCertificado.codigo) {
      alert("Selecione uma categoria de certificado");
      return;
    }

    this.produtoService.inserirProduto(this.produto).subscribe(data => {
      console.log(data);
      this.retornar();
    });
  }

  retornar() {
    this.router.navigate(['produto-lista']);
  }
}
