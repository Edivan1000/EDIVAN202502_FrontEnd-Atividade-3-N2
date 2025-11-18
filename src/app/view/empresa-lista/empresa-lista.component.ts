import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from '../../service/empresa.service';
import { Empresa } from '../../model/empresa';

@Component({
  selector: 'app-empresa-lista',
  standalone: false,
  templateUrl: './empresa-lista.component.html',
  styleUrls: ['./empresa-lista.component.css']
})
export class EmpresaListaComponent implements OnInit {

  empresas: Empresa[] = [];

  constructor(
    private empresaService: EmpresaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarEmpresas();
  }

  carregarEmpresas(): void {
    this.empresaService.listarEmpresas().subscribe({
      next: dados => this.empresas = dados,
      error: erro => console.error('Erro ao carregar empresas', erro)
    });
  }

  inserirEmpresa(): void {
    this.router.navigate(['empresa-insere']);
  }

  alterarEmpresa(empresa: Empresa): void {
    this.router.navigate(['empresa-altera', empresa.id]);
  }

  consultarEmpresa(empresa: Empresa): void {
    this.router.navigate(['empresa-consulta', empresa.id]);
  }

  excluirEmpresa(empresa: Empresa, event: MouseEvent): void {
    event.stopPropagation();

    if (empresa.id === undefined) {
      alert('ID da empresa não encontrado.');
      return;
    }

    if (confirm(`Deseja realmente excluir a empresa de código ${empresa.id}?`)) {
      this.empresaService.excluirEmpresa(empresa.id).subscribe({
        next: () => {
          alert('Empresa excluída com sucesso!');
          this.carregarEmpresas();
        },
        error: (err) => {
          console.error('Erro ao excluir empresa', err);
          alert('Erro ao excluir a empresa.');
        }
      });
    }
  }
}