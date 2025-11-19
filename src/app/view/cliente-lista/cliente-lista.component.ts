import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../service/cliente.service';
import { Cliente } from '../../model/cliente';

@Component({
  selector: 'app-cliente-lista',
  standalone: false,
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.clienteService.listarClientes().subscribe({
      next: dados => this.clientes = dados,
      error: erro => console.error('Erro ao carregar clientes', erro)
    });
  }

  inserirCliente(): void {
    this.router.navigate(['cliente-insere']);
  }

  alterarCliente(cliente: Cliente): void {
    this.router.navigate(['cliente-altera', cliente.id]);
  }

  consultarCliente(id: number): void {
  this.router.navigate(['cliente-consulta', id]);
}



  excluirCliente(cliente: Cliente, event: MouseEvent): void {
    event.stopPropagation();

    if (!cliente.id) {
      alert('ID do cliente não encontrado.');
      return;
    }

    if (confirm(`Deseja realmente excluir o cliente de código ${cliente.id}?`)) {
      this.clienteService.excluirCliente(cliente.id).subscribe({
        next: () => {
          alert('Cliente excluído com sucesso!');
          this.carregarClientes();
        },
        error: (err) => {
          console.error('Erro ao excluir cliente', err);
          alert('Erro ao excluir o cliente.');
        }
      });
    }
  }
}
