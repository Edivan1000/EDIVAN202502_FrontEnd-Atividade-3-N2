import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaCertificadoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // cria o objeto antes do bind
    this.produto.categoriaCertificado = new CategoriaCertificado();
    this.listarCategorias();
  }

  private listarCategorias() {
    this.categoriaService.listarCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  // Recebe o NgForm do template
  onSubmit(form: NgForm) {
    this.inserirProduto(form);
  }

  inserirProduto(form: NgForm) {
    // 1) validação do formulário (campos required)
    if (!form.valid) {
      alert("Por favor, preencha todos os campos antes de salvar.");
      return;
    }

    // 2) validação da categoria: produto.categoriaCertificado deve ser um objeto com código
    if (!this.produto.categoriaCertificado || !this.produto.categoriaCertificado.codigo) {
      alert("Selecione uma categoria de certificado");
      return;
    }

    // 3) envio ao backend
    this.produtoService.inserirProduto(this.produto).subscribe({
      next: () => {
        alert('Produto cadastrado com sucesso!');
        this.retornar();
      },
      error: (err) => {
        console.error('Erro ao cadastrar produto', err);
        alert('Erro ao cadastrar produto. Verifique os dados e tente novamente.');
      }
    });
  }

  retornar() {
    this.router.navigate(['produto-lista']);
  }

  // suas funções de máscara / permissões de teclas permanecem iguais
  permitirSomenteNumeros(event: KeyboardEvent): void {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  permitirSomenteNumerosComPonto(event: KeyboardEvent): void {
    const charCode = event.charCode;
    const charStr = String.fromCharCode(charCode);
    if (!charStr.match(/[0-9.]/)) {
      event.preventDefault();
    }
  }
}
