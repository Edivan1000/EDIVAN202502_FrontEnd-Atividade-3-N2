import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from '../../model/empresa';
import { EnderecoEmpresa } from '../../model/enderecoempresa';
import { EmpresaService } from '../../service/empresa.service';

@Component({
  selector: 'app-empresa-altera',
  standalone: false,
  templateUrl: './empresa-altera.component.html',
  styleUrls: ['./empresa-altera.component.css']
})
export class EmpresaAlteraComponent implements OnInit {

  empresa: Empresa = new Empresa();
  endereco: EnderecoEmpresa = new EnderecoEmpresa();
  semNumero: boolean = false;

permitirSomenteNumeros(event: KeyboardEvent): void {
  const charCode = event.charCode;
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }
}

  constructor(
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.empresaService.consultarEmpresa(id).subscribe({
        next: (dados) => {
          this.empresa = dados;
          this.endereco = dados.endereco || new EnderecoEmpresa();
        },
        error: (err) => {
          console.error('Erro ao carregar empresa', err);
          alert('Erro ao carregar os dados da empresa.');
        }
      });
    }
  }

  salvarAlteracoes(): void {
  this.empresa.endereco = this.endereco;
  // ❌ Remova ou comente a linha abaixo
  // this.endereco.empresa = this.empresa;

  this.empresaService.alterarEmpresa(this.empresa.id, this.empresa).subscribe({
    next: () => {
      alert('Empresa alterada com sucesso!');
      this.router.navigate(['empresa-lista']);
    },
    error: (err) => {
      console.error('Erro ao alterar empresa', err);
      alert('Erro ao alterar empresa.');
    }
  });
}

  cancelar(): void {
    this.router.navigate(['empresa-lista']);
  }
}