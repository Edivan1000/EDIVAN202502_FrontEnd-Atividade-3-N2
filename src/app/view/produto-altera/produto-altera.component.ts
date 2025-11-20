import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  @ViewChild('produtoForm') produtoForm!: NgForm;

  codigo!: number;
  produto: Produto = new Produto();
  produtoOriginal: Produto = new Produto();
  categorias!: CategoriaCertificado[];
  modalidadesDisponiveis: string[] = ['Arquivo', 'Token', 'Cartão'];

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaCertificadoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.codigo = Number(this.route.snapshot.paramMap.get('id'));

    // Inicializa para ngModel não quebrar
    this.produto = new Produto();
    this.produto.categoriaCertificado = new CategoriaCertificado();

    this.produtoService.consultarProduto(this.codigo).subscribe(data => {
      this.produto = data;
      this.produtoOriginal = { ...data }; // salva cópia original para comparação

      // Resetar formulário com valores originais
      setTimeout(() => {
        if (this.produtoForm) {
          this.produtoForm.reset({
            codigo: this.produto.codigo,
            nome: this.produto.nome,
            categoria: this.produto.categoriaCertificado,
            modalidade: this.produto.modalidade,
            tipoPessoa: this.produto.tipoPessoa,
            validadeMeses: this.produto.validadeMeses,
            preco: this.produto.preco,
            quantidade: this.produto.quantidade,
            disponivel: this.produto.disponivel,
            descricao: this.produto.descricao
          });
        }
      });
    });

    this.listarCategorias();
  }

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
  
  onSubmit() {
    console.log("PAYLOAD:", JSON.stringify(this.produto));

    // Verifica se houve alteração comparando com produtoOriginal
    if (JSON.stringify(this.produto) === JSON.stringify(this.produtoOriginal)) {
      alert("Altere pelo menos um campo para salvar.");
      return;
    }

    this.produtoService.alterarProduto(this.codigo, this.produto).subscribe({
      next: () => {
        alert('Produto alterado com sucesso!');
        this.retornar();
      },
      error: (err) => {
        console.error('Erro ao alterar produto', err);
        alert('Erro ao alterar produto. Verifique os dados e tente novamente.');
      }
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
