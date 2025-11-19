import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../model/cliente';
import { EnderecoCliente } from '../../model/enderecocliente';
import { ClienteService } from '../../service/cliente.service';

@Component({
  selector: 'app-cliente-consulta',
  standalone: false,
  templateUrl: './cliente-consulta.component.html',
  styleUrls: ['./cliente-consulta.component.css']
})
export class ClienteConsultaComponent implements OnInit {

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
          console.error('Erro ao consultar cliente', err);
          alert('Erro ao carregar os dados do cliente.');
        }
      });
    }
  }

  voltar(): void {
    this.router.navigate(['cliente-lista']);
  }
}