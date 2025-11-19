import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Produto } from '../../model/produto';
import { ProdutoService } from '../../service/produto.service';

import { CategoriaCertificado } from '../../model/categoriacertificado';
import { CategoriaCertificadoService } from '../../service/categoriacertificado.service';

@Component({
  selector: 'app-produto-altera',
  standalone: false,
  templateUrl: './produto-altera.component.html',
  styleUrls: ['./produto-altera.component.css']
})
export class ProdutoAlteraComponent implements OnInit {

  codigo!: number;
  produto!: Produto;
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.codigo = Number(this.route.snapshot.paramMap.get('id'));

    this.produto = new Produto();
    this.produto.categoriaCertificado = new CategoriaCertificado();

    this.produtoService.consultarProduto(this.codigo).subscribe(data => {
      this.produto = data;
    });

    this.listarCategorias();
  }

  onSubmit() {
    this.produtoService.alterarProduto(this.codigo, this.produto).subscribe(data => {
      console.log(data);
      this.retornar();
    });
  }

  private listarCategorias() {
    this.categoriaService.listarCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  retornar() {
    this.router.navigate(['produto-lista']);
  }

}
