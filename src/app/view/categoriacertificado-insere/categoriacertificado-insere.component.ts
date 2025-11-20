import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaCertificado } from '../../model/categoriacertificado';
import { CategoriaCertificadoService } from '../../service/categoriacertificado.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categoriacertificado-insere',
  standalone: false,
  templateUrl: './categoriacertificado-insere.component.html',
  styleUrls: ['./categoriacertificado-insere.component.css']
})
export class CategoriaCertificadoInsereComponent implements OnInit {

  categoriacertificado: CategoriaCertificado = new CategoriaCertificado();

  constructor(
    private categoriaCertificadoService: CategoriaCertificadoService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  // Recebe o NgForm
  onSubmit(form: NgForm) {
    this.incluirCategoria(form);
  }

  incluirCategoria(form: NgForm) {

    // 1) Verificação do formulário + trim para evitar espaços
    if (!form.valid || !this.categoriacertificado.nome || this.categoriacertificado.nome.trim() === '') {
      alert("Por favor, preencha todos os campos antes de salvar.");
      return;
    }

    // 2) Envia ao backend
    this.categoriaCertificadoService.incluirCategoria(this.categoriacertificado).subscribe({
      next: () => {
        alert('Categoria cadastrada com sucesso!');
        this.listarCategoria();
      },
      error: (err) => {
        console.error('Erro ao cadastrar categoria', err);
        alert('Erro ao cadastrar categoria. Verifique os dados e tente novamente.');
      }
    });
  }

  listarCategoria() {
    this.router.navigate(['categoriacertificado-lista']);
  }
}
