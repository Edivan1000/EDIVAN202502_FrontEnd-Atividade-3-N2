import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaCertificado } from '../../model/categoriacertificado';
import { CategoriaCertificadoService } from '../../service/categoriacertificado.service';

@Component({
  selector: 'app-categoriacertificado-altera',
  standalone: false,
  templateUrl: './categoriacertificado-altera.component.html',
  styleUrls: ['./categoriacertificado-altera.component.css']
})
export class CategoriaCertificadoAlteraComponent implements OnInit {

  @ViewChild('categoriaForm') categoriaForm!: NgForm;

  codigo!: number;
  categoriacertificado: CategoriaCertificado = new CategoriaCertificado();
  categoriaOriginal: CategoriaCertificado = new CategoriaCertificado();

  constructor(
    private categoriaService: CategoriaCertificadoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.codigo = Number(this.route.snapshot.paramMap.get('id'));

    this.categoriacertificado = new CategoriaCertificado();

    this.categoriaService.consultarCategoria(this.codigo).subscribe(data => {
      this.categoriacertificado = data;
      this.categoriaOriginal = { ...data };  // guarda cópia para comparação

      // reset no form igual ao produto
      setTimeout(() => {
        if (this.categoriaForm) {
          this.categoriaForm.reset({
            codigo: this.categoriacertificado.codigo,
            nome: this.categoriacertificado.nome
          });
        }
      });
    });
  }

  onSubmit() {
    // valida campo obrigatório
    if (!this.categoriacertificado.nome || this.categoriacertificado.nome.trim() === '') {
      alert("Por favor, preencha o nome antes de salvar.");
      return;
    }

    // valida se houve alteração
    if (JSON.stringify(this.categoriacertificado) === JSON.stringify(this.categoriaOriginal)) {
      alert("Altere pelo menos um campo para salvar.");
      return;
    }

    // envia alteração
    this.categoriaService.alterarCategoria(this.codigo, this.categoriacertificado).subscribe({
      next: () => {
        alert("Categoria alterada com sucesso!");
        this.listarCategoria();
      },
      error: (err) => {
        console.error("Erro ao alterar categoria", err);
        alert("Erro ao alterar categoria. Tente novamente.");
      }
    });
  }

  listarCategoria() {
    this.router.navigate(['categoriacertificado-lista']);
  }
}
