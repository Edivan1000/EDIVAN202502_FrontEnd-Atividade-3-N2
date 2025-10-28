// src/app/view/cliente-lista/cliente-lista.component.ts

import { Component, OnInit } from '@angular/core';
// NOVO IMPORT para roteamento e diretivas estruturais
import { Router, RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../service/cliente.service';
import { Cliente } from '../../model/cliente';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css'],
  
  // 1. Confirma que é Standalone
  standalone: true, 

  // 2. CORREÇÃO ESSENCIAL: Adicionar os módulos
  imports: [
    RouterModule, // Resolve o erro de [routerLink]
    CommonModule  // Resolve os erros de *ngIf e *ngFor
  ]
})
export class ClienteListaComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.clienteService.listarClientes().subscribe(
      (data: Cliente[]) => {
        this.clientes = data;
      },
      (error: any) => {
        console.error('Erro ao carregar lista de clientes:', error);
        alert('Erro ao carregar clientes. Verifique o backend.');
      }
    );
  }

  editarCliente(id: number | undefined): void {
    if (id !== undefined) {
      // Navega para a rota de edição que definimos: /clientes/editar/:id
      this.router.navigate(['/clientes/editar', id]); 
    }
  }

  // No backend, é bom ter um método DELETE
  // excluirCliente(id: number | undefined): void {
  //   if (id !== undefined && confirm('Tem certeza que deseja excluir este cliente?')) {
  //     this.clienteService.excluirCliente(id).subscribe(
  //       () => {
  //         alert('Cliente excluído com sucesso!');
  //         this.carregarClientes(); // Recarrega a lista
  //       },
  //       error => console.error('Erro ao excluir cliente:', error)
  //     );
  //   }
  // }
}