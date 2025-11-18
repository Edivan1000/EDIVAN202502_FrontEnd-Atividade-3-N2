import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../model/cliente';
import { EnderecoCliente } from '../../model/enderecocliente';
import { ClienteService } from '../../service/cliente.service';

@Component({
  selector: 'app-cliente-altera',
  standalone: false,
  templateUrl: './cliente-altera.component.html',
  styleUrls: ['./cliente-altera.component.css']
})
export class ClienteAlteraComponent implements OnInit {

  cliente: Cliente = new Cliente();
  endereco: EnderecoCliente = new EnderecoCliente();

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.clienteService.consultarCliente(id).subscribe({
        next: (dados) => {
          this.cliente = dados;
          this.endereco = dados.endereco || new EnderecoCliente();
        },
        error: (err) => {
          console.error('Erro ao carregar cliente', err);
          alert('Erro ao carregar os dados do cliente.');
        }
      });
    }
  }

  salvarAlteracoes(): void {
  this.cliente.endereco = this.endereco;
  // ❌ Remova ou comente a linha abaixo
  // this.endereco.cliente = this.cliente;

  this.clienteService.alterarCliente(this.cliente.id, this.cliente).subscribe({
    next: () => {
      alert('Cliente alterado com sucesso!');
      this.router.navigate(['cliente-lista']);
    },
    error: (err) => {
      console.error('Erro ao alterar cliente', err);
      alert('Erro ao alterar cliente.');
    }
  });
}

  cancelar(): void {
    this.router.navigate(['cliente-lista']);
  }
}