import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from '../../model/empresa';
import { EnderecoEmpresa } from '../../model/enderecoempresa';
import { EmpresaService } from '../../service/empresa.service';

@Component({
  selector: 'app-empresa-consulta',
  standalone: false,
  templateUrl: './empresa-consulta.component.html',
  styleUrls: ['./empresa-consulta.component.css']
})
export class EmpresaConsultaComponent implements OnInit {

  empresa: Empresa = new Empresa();
  endereco: EnderecoEmpresa = new EnderecoEmpresa();

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
          console.error('Erro ao consultar empresa', err);
          alert('Erro ao carregar os dados da empresa.');
        }
      });
    }
  }

  voltar(): void {
    this.router.navigate(['empresa-lista']);
  }
}