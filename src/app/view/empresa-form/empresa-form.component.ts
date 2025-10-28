// src/app/view/empresa-form/empresa-form.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // NOVO IMPORT
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // NOVO IMPORT
import { RouterModule } from '@angular/router'; // NOVO IMPORT
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../service/empresa.service'; // Você precisará criar este serviço!

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css'],
  
  // 1. Confirma que é Standalone
  standalone: true, 

  // 2. CORREÇÃO ESSENCIAL: Adicionar todos os módulos de template
  imports: [
    CommonModule,        // Para *ngIf, *ngFor
    FormsModule,         
    ReactiveFormsModule, // Para [formGroup]
    RouterModule         // Para [routerLink]
  ]
})
export class EmpresaFormComponent implements OnInit {

  empresaForm: FormGroup;
  isEditMode: boolean = false;
  empresaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService, // **CRIAR ESTE SERVIÇO**
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.empresaForm = this.fb.group({
      id: [null],
      razaoSocial: ['', Validators.required],
      cnpj: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]] // Validação simples para CNPJ
    });
  }

  ngOnInit(): void {
    // Lógica para modo de Edição (se houver ID na URL)
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.empresaId = +id;
        this.carregarEmpresaParaEdicao(this.empresaId);
      }
    });
  }

  carregarEmpresaParaEdicao(id: number): void {
    this.empresaService.consultarEmpresa(id).subscribe(
      empresa => {
        this.empresaForm.patchValue(empresa);
      },
      error => console.error('Erro ao carregar empresa:', error)
    );
  }

  salvarEmpresa(): void {
    if (this.empresaForm.invalid) {
      alert('Preencha a Razão Social e o CNPJ corretamente (14 dígitos).');
      return;
    }

    const empresaData = this.empresaForm.value;

    this.empresaService.incluirEmpresa(empresaData).subscribe(
      response => {
        alert(`Empresa ${this.isEditMode ? 'atualizada' : 'salva'} com sucesso!`);
        this.router.navigate(['/empresas']); 
      },
      error => console.error('Erro ao salvar empresa:', error)
    );
  }
}