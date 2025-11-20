import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from '../../model/empresa';
import { EnderecoEmpresa } from '../../model/enderecoempresa';
import { EmpresaService } from '../../service/empresa.service';
import { NgForm } from '@angular/forms'; // ⬅️ Não se esqueça de importar NgForm!

@Component({
  selector: 'app-empresa-insere',
  standalone: false,
  templateUrl: './empresa-insere.component.html',
  styleUrls: ['./empresa-insere.component.css']
})
export class EmpresaInsereComponent {

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
    private router: Router
  ) {}

  // Altere a função para receber o objeto do formulário
salvarEmpresa(form: NgForm): void { 
    
    // 1. VERIFICAÇÃO DE VALIDADE
    if (form.invalid) {
        alert("Por favor, preencha todos os campos para cadastrar a empresa.");
        return; // Interrompe o método se o formulário não for válido
    }
    
    // 2. Lógica de Negócio (Se o formulário for válido)
    this.empresa.endereco = this.endereco;

    this.empresaService.incluirEmpresa(this.empresa).subscribe({
        next: () => {
            alert('Empresa cadastrada com sucesso!');
            this.router.navigate(['empresa-lista']);
        },
        error: (err) => {
            console.error('Erro ao cadastrar empresa', err);
            alert('Erro ao cadastrar empresa.');
        }
    });
}

  cancelar(): void {
    this.router.navigate(['empresa-lista']);
  }
}