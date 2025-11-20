import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
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
  @ViewChild('empresaForm') empresaForm!: NgForm;

  empresa: Empresa = new Empresa();
  endereco: EnderecoEmpresa = new EnderecoEmpresa();

  // Cópias originais para comparação
  originalEmpresa: Empresa = new Empresa();
  originalEndereco: EnderecoEmpresa = new EnderecoEmpresa();

  semNumero: boolean = false;

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

          // Guardar cópias originais
          this.originalEmpresa = { ...this.empresa };
          this.originalEndereco = { ...this.endereco };

          // Resetar formulário com todos os campos individuais
setTimeout(() => {
  if (this.empresaForm) {
    this.empresaForm.reset({
      // Dados da Empresa
      razaoSocial: this.empresa.razaoSocial,
      nomeFantasia: this.empresa.nomeFantasia,
      cnpj: this.empresa.cnpj,
      telefone: this.empresa.telefone,
      email: this.empresa.email,

      // Endereço
      cep: this.endereco.cep,
      logradouro: this.endereco.logradouro,
      numero: this.endereco.numero,
      bairro: this.endereco.bairro,
      cidade: this.endereco.cidade,
      estado: this.endereco.estado,

      // Checkbox S/N
      sn: this.semNumero
    });
    console.log("Formulário resetado com valores iniciais. Estado: PRISTINE.");
  }
});
        },
        error: (err) => {
          console.error('Erro ao carregar empresa', err);
          alert('Erro ao carregar os dados da empresa.');
        }
      });
    }
  }

  permitirSomenteNumeros(event: KeyboardEvent): void {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  salvarAlteracoes(form: NgForm): void {
    // Verifica se houve alteração real nos campos
    const empresaAlterada = JSON.stringify(this.empresa) !== JSON.stringify(this.originalEmpresa);
    const enderecoAlterado = JSON.stringify(this.endereco) !== JSON.stringify(this.originalEndereco);

    if (!empresaAlterada && !enderecoAlterado) {
      alert("Por favor, altere pelo menos um campo para salvar."); 
      return;
    }

    // Continua o salvamento normalmente
    this.empresa.endereco = this.endereco;

    this.empresaService.alterarEmpresa(this.empresa.id, this.empresa).subscribe({
      next: () => {
        alert('Empresa alterada com sucesso!');
        this.router.navigate(['empresa-lista']);
      },
      error: (err) => {
        console.error('Erro ao alterar empresa', err);
        alert('Erro ao alterar empresa. Verifique os dados e tente novamente.');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['empresa-lista']);
  }
}
