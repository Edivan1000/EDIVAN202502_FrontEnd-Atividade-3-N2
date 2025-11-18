import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../../model/cliente';
import { EnderecoCliente } from '../../model/enderecocliente';
import { ClienteService } from '../../service/cliente.service';

@Component({
  selector: 'app-cliente-insere',
  standalone: false,
  templateUrl: './cliente-insere.component.html',
  styleUrls: ['./cliente-insere.component.css']
})
export class ClienteInsereComponent {

  cliente: Cliente = new Cliente();
  endereco: EnderecoCliente = new EnderecoCliente();

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  salvarCliente(): void {
  this.cliente.endereco = this.endereco;
  // Remova a linha abaixo para evitar referência circular
  // this.endereco.cliente = this.cliente;

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