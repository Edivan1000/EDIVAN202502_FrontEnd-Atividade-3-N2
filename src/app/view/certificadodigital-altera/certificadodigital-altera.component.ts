import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf, *ngFor
import { FormsModule } from '@angular/forms'; // ESSENCIAL PARA ngModel
import { RouterModule } from '@angular/router'; // Para [routerLink]
import { ActivatedRoute, Router } from '@angular/router';
import { CertificadoDigital } from '../../model/certificado-digital';
// 1. IMPORTANDO O SERVICE CORRETO (OrcamentoService)
import { OrcamentoService } from '../../service/orcamento.service'; // Ajuste o caminho se necessário (ex: ../../services/orcamento.service)

// Você também precisará importar o Orcamento, dependendo de como irá fazer a alteração.
// import { Orcamento } from '../../model/orcamento'; 

@Component({
  selector: 'app-certificadodigital-altera',
  templateUrl: './certificadodigital-altera.component.html',
  styleUrls: ['./certificadodigital-altera.component.css'],
  
  // 1. Confirma que é Standalone
  standalone: true, 

  // 2. CORREÇÃO ESSENCIAL: Adicionar os módulos
  imports: [
    CommonModule,  
    FormsModule,   // Resolve o erro de [ngModel]
    RouterModule   
  ]
})
export class CertificadodigitalAlteraComponent implements OnInit {

  // Código (ID) do certificado a ser alterado
  codigoCertificado!: number; 
  // O ID do Orçamento a que ele pertence (provavelmente necessário no Backend)
  // codigoOrcamento!: number; 
  
  // Dados do certificado
  certificadoDigital!: CertificadoDigital;

  constructor(
    // 2. CORREÇÃO: Usando o Service que existe
    private orcamentoService: OrcamentoService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Ao iniciar, carrega os dados do certificado
  ngOnInit(): void {
    // A lógica de consulta precisa ser alterada para consultar o Orçamento ou o item
    // Por enquanto, vamos manter a estrutura original para compilar.
    this.consultarCertificadoDigital(); 
  }

  // Envia os dados atualizados (esta lógica PRECISA ser refeita)
  onSubmit() {
    // 3. CORREÇÃO: Você não tem alteracao direto no Service.
    // O correto seria um PUT no Orcamento ou um endpoint específico:
    
    // TEMPORÁRIO PARA COMPILAR: APAGAR DEPOIS
    console.log('Lógica de alteração do certificado precisa ser implementada no OrcamentoService.');
    // FIM DO TEMPORÁRIO
    
    this.retornar();
  }

  // Consulta os dados atuais do certificado
  consultarCertificadoDigital() {
    // O código aqui está incorreto para o modelo Mestre-Detalhe, mas o Service está injetado.
    this.codigoCertificado = this.route.snapshot.params['codigo'];
    this.certificadoDigital = {} as CertificadoDigital; // Inicialização segura
    
    // 4. PROBLEMA DE LÓGICA: O OrcamentoService NÃO TEM consultarCertificadoDigital.
    // Ele tem consultarOrcamento.
    
    // TEMPORÁRIO PARA COMPILAR: APAGAR DEPOIS
    // Simula a consulta, já que o método real não existe no OrcamentoService
    // this.orcamentoService.consultarCertificadoDigital(this.codigoCertificado).subscribe(data => {
    //   this.certificadoDigital = data;
    // });
    // FIM DO TEMPORÁRIO
  }

  // Volta para a tela de listagem
  retornar() {
    this.router.navigate(['certificadodigital-lista']);
  }
}