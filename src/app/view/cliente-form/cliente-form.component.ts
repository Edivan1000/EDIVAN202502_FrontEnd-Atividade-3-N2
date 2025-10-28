// src/app/view/cliente-form/cliente-form.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf, *ngFor, pipes
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Para [formGroup], ngValue
import { RouterModule } from '@angular/router'; // Para [routerLink]
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../service/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
  
  // 1. Confirma que é Standalone
  standalone: true, 

  // 2. CORREÇÃO ESSENCIAL: Adicionar todos os módulos
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Para [formGroup]
    RouterModule         // Para [routerLink]
  ]
})
export class ClienteFormComponent implements OnInit {

  clienteForm: FormGroup;
  isEditMode: boolean = false;
  clienteId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Inicializa o formulário com o modelo da entidade Cliente
    this.clienteForm = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['']
      // Note: ClienteConfig (1:1) pode ser adicionado aqui se necessário
    });
  }

  ngOnInit(): void {
    // Verifica se estamos em modo de edição (se houver um ID na URL)
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.clienteId = +id;
        this.carregarClienteParaEdicao(this.clienteId);
      }
    });
  }

  carregarClienteParaEdicao(id: number): void {
    this.clienteService.consultarCliente(id).subscribe(
      cliente => {
        // Preenche o formulário com os dados do cliente
        this.clienteForm.patchValue(cliente);
      },
      error => {
        console.error('Erro ao carregar cliente:', error);
        alert('Erro ao carregar dados do cliente.');
      }
    );
  }

  salvarCliente(): void {
    if (this.clienteForm.invalid) {
      alert('Por favor, preencha o nome e o e-mail corretamente.');
      return;
    }

    const clienteData = this.clienteForm.value;

    // POST (Novo) ou PUT (Edição) é gerenciado pelo Spring Boot se o ID estiver no payload
    this.clienteService.incluirCliente(clienteData).subscribe(
      response => {
        alert(`Cliente ${this.isEditMode ? 'atualizado' : 'salvo'} com sucesso!`);
        // Redireciona para a lista de clientes
        this.router.navigate(['/clientes']); 
      },
      error => {
        console.error('Erro ao salvar cliente:', error);
        alert('Erro ao salvar cliente. Verifique o console.');
      }
    );
  }
}