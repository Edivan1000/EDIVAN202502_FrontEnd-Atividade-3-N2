import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../../model/cliente';
import { EnderecoCliente } from '../../model/enderecocliente';
import { ClienteService } from '../../service/cliente.service';
import { NgForm } from '@angular/forms'; // ⬅️ IMPORTANTE: Importar o NgForm

@Component({
  selector: 'app-cliente-insere',
  standalone: false,
  templateUrl: './cliente-insere.component.html',
  styleUrls: ['./cliente-insere.component.css']
})
export class ClienteInsereComponent {

  cliente: Cliente = new Cliente();
  endereco: EnderecoCliente = new EnderecoCliente();
  semNumero: boolean = false;

permitirSomenteNumeros(event: KeyboardEvent): void {
  const charCode = event.charCode;
  // Permite apenas dígitos de 0 a 9
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }
}

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  salvarCliente(form: NgForm): void { // ⬅️ Recebe o formulário como argumento
        
        // 1. VERIFICAÇÃO DE VALIDADE
        if (form.invalid) {
            alert("Por favor, preencha todos os campos para cadastrar o cliente.");
            return; // Interrompe o método se o formulário não for válido
        }
        
        // 2. Lógica de Negócio (Se o formulário for válido)
        this.cliente.endereco = this.endereco;

        this.clienteService.incluirCliente(this.cliente).subscribe({
            next: () => {
                alert('Cliente cadastrado com sucesso!');
                this.router.navigate(['cliente-lista']);
            },
            error: (err) => {
                console.error('Erro ao cadastrar cliente', err);
                alert('Erro ao cadastrar cliente.');
            }
        });
    }

  cancelar(): void {
    this.router.navigate(['cliente-lista']);
  }
}