import { Component, OnInit } from '@angular/core';
// GARANTA QUE ESTES IMPORTS ESTEJAM CORRETOS (devem vir das bibliotecas do Angular):
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { OrcamentoService } from '../../../service/orcamento.service';
import { ProdutoService } from '../../../service/produto.service';
import { ClienteService } from '../../../service/cliente.service';
import { Orcamento } from '../../../model/orcamento';
import { ProdutoCatalogo } from '../../../model/produto-catalogo';
import { ProdutoOpcao } from '../../../model/produto-opcao';
import { Cliente } from '../../../model/cliente';
import { CertificadoDigital } from '../../../model/certificado-digital';
// IMPORTS RxJS NECESSÁRIOS PARA O ENCADEMENTO DE CHAMADAS
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs'; 

@Component({
  selector: 'app-orcamento-form',
  templateUrl: './orcamento-form.component.html',
  styleUrls: ['./orcamento-form.component.css'],

// 1. CONFIRME SE ESTA LINHA ESTÁ ATIVA:
  standalone: true, 

  // 2. CORREÇÃO ESSENCIAL: LISTA COMPLETA DE IMPORTS PARA O TEMPLATE
  imports: [
    CommonModule,        // Para *ngFor, *ngIf e o pipe 'number'
    FormsModule,         // Para [ngValue]
    ReactiveFormsModule  // Para [formGroup]
  ]
})

export class OrcamentoFormComponent implements OnInit {

  orcamentoForm: FormGroup;
  produtosCatalogo: ProdutoCatalogo[] = [];
  opcoesProdutoMap: Map<number, ProdutoOpcao[]> = new Map();

  constructor(
    private fb: FormBuilder,
    private orcamentoService: OrcamentoService,
    private produtoService: ProdutoService,
    private clienteService: ClienteService
  ) {
    this.orcamentoForm = this.fb.group({
      // Mestre: Informações do Cliente
      cliente: this.fb.group({
        id: [null],
        nome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefone: ['']
      }),
      // Detalhe: Array de Certificados Digitais
      itens: this.fb.array([]) 
    });
  }

  ngOnInit(): void {
    this.carregarCatalogoProdutos();
    this.adicionarItemCertificado(); 
  }
  
  // --- Métodos de Dados ---
  
  private carregarCatalogoProdutos(): void {
    this.produtoService.listarProdutosBase().subscribe(
      data => {
        this.produtosCatalogo = data;
        data.forEach(produto => {
          if (produto.id) {
            this.produtoService.buscarOpcoesPorProduto(produto.id).subscribe(
              opcoes => {
                // O operador '!' afirma que produto.id não é nulo aqui
                this.opcoesProdutoMap.set(produto.id!, opcoes); 
              },
              error => console.error(`Erro ao carregar opções para o produto ${produto.id}`, error)
            );
          }
        });
      },
      error => console.error('Erro ao carregar catálogo', error)
    );
  }
  
  // --- Métodos do Detalhe (FormArray) ---

  get itens(): FormArray {
    return this.orcamentoForm.get('itens') as FormArray;
  }

  private criarItemCertificado(): FormGroup {
    return this.fb.group({
      // Campos de Seleção (usados para mapeamento)
      produtoCatalogoId: ['', Validators.required],
      produtoOpcaoId: ['', Validators.required],
      
      // Campos de Dados (serão enviados ao backend)
      nomeProduto: [''],
      tipoPublico: ['PF', Validators.required],
      empresaCnpj: [''],
      validadeMeses: [0],
      preco: [0.0],
      ativo: [true]
    });
  }
  
  adicionarItemCertificado(): void {
    this.itens.push(this.criarItemCertificado());
  }

  removerItemCertificado(index: number): void {
    this.itens.removeAt(index);
  }
  
  // --- Lógica de Negócio do Frontend ---
  
  getOpcoesParaProduto(produtoId: number): ProdutoOpcao[] {
    return this.opcoesProdutoMap.get(produtoId) || [];
  }

  onProdutoChange(itemIndex: number): void {
    const itemForm = this.itens.at(itemIndex);
    // Reseta a opção e preço ao mudar o produto
    itemForm.patchValue({ 
      produtoOpcaoId: '', 
      preco: 0.0, 
      validadeMeses: 0, 
      nomeProduto: ''
    }); 
  }

  onOpcaoChange(itemIndex: number): void {
    const itemForm = this.itens.at(itemIndex);
    const produtoId = itemForm.get('produtoCatalogoId')?.value;
    const opcaoId = itemForm.get('produtoOpcaoId')?.value;

    if (produtoId && opcaoId) {
      const opcoes = this.opcoesProdutoMap.get(produtoId);
      // O '+' converte a string do formulário para number
      const opcaoSelecionada = opcoes?.find(op => op.id === +opcaoId); 
      
      if (opcaoSelecionada) {
        itemForm.patchValue({
          preco: opcaoSelecionada.preco,
          validadeMeses: opcaoSelecionada.validadeMeses,
          nomeProduto: this.produtosCatalogo.find(p => p.id === produtoId)?.nome || ''
        });
      }
    }
  }
  
  // --- Submissão do Formulário Mestre-Detalhe (Otimizado com RxJS) ---

  salvarOrcamento(): void {
    if (this.orcamentoForm.invalid || this.itens.length === 0) {
      alert('Por favor, preencha todos os campos obrigatórios e adicione pelo menos um item.');
      this.orcamentoForm.markAllAsTouched();
      return;
    }

    const formValue = this.orcamentoForm.value;
    
    // 1. Enviar o Cliente primeiro
    this.clienteService.incluirCliente(formValue.cliente).pipe(
      // 2. Usar switchMap para trocar o Observable de Cliente para Orcamento
      switchMap((clienteSalvo: Cliente) => {
          if (!clienteSalvo || !clienteSalvo.id) {
            console.error('Falha ao salvar o cliente. Orçamento abortado.');
            return of(null); // Retorna Observable nulo para interromper
          }
        
          // 3. Montar o objeto Orcamento (Payload)
          const orcamentoPayload: Orcamento = {
              cliente: clienteSalvo, 
              status: 'ENVIADO',
              // Mapeia os dados do FormArray para o modelo CertificadoDigital
              itens: formValue.itens.map((itemForm: any): CertificadoDigital => {
                  return {
                      id: undefined, 
                      nomeProduto: itemForm.nomeProduto || '',
                      tipoPublico: itemForm.tipoPublico,
                      validadeMeses: itemForm.validadeMeses,
                      preco: itemForm.preco,
                      ativo: itemForm.ativo,
                      // Os campos de relacionamento são preenchidos/ignorados pelo Backend
                  };
              })
          };
        
          // 4. Retorna o Observable para salvar o Orçamento
          return this.orcamentoService.salvarOrcamentoCompleto(orcamentoPayload);
      })
    ).subscribe(
      orcamentoSalvo => {
        if (orcamentoSalvo) {
          alert('Orçamento (Mestre-Detalhe) enviado com sucesso! ID: ' + orcamentoSalvo.id);
          this.orcamentoForm.reset();
          this.itens.clear();
          this.adicionarItemCertificado();
        }
      },
      error => {
        console.error('Erro ao salvar Orçamento Mestre-Detalhe', error);
        alert('Erro ao enviar o orçamento. Verifique o console.');
      }
    );
  }
}