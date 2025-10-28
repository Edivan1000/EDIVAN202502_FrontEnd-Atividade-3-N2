// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 1. Componentes do Menu/Início
import { InicioComponent } from './view/inicio/inicio.component';

// 2. Componentes Adaptados para Orçamento (Mestre-Detalhe)
// (Ajuste o caminho se sua pasta orcamento estiver em outro lugar dentro de view)
import { OrcamentoFormComponent } from './view/orcamento/orcamento-form/orcamento-form.component'; 
import { CertificadodigitalListaComponent } from './view/certificadodigital-lista/certificadodigital-lista.component';
import { CertificadodigitalConsultaComponent } from './view/certificadodigital-consulta/certificadodigital-consulta.component';

// 3. Componentes CRUD de Apoio (N Formulários CRUD)
// Você deve ter criado estes ou adaptado seus antigos
import { ClienteListaComponent } from './view/cliente-lista/cliente-lista.component';
import { ClienteFormComponent } from './view/cliente-form/cliente-form.component';
import { EmpresaListaComponent } from './view/empresa-lista/empresa-lista.component'; 
// import { EmpresaFormComponent } from './view/empresa-form/empresa-form.component';

const routes: Routes = [
    // Rota padrão (Home)
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: 'inicio', component: InicioComponent },

    // ==============================================
    // ROTAS MESTRE-DETALHE (O Formulário Principal)
    // ==============================================

    // Inserção do Mestre-Detalhe
    { path: 'orcamento/novo', component: OrcamentoFormComponent },

    // Lista de Orçamentos (Mestre) - Reutiliza o antigo componente de lista
    { path: 'orcamentos', component: CertificadodigitalListaComponent },
    
    // Consulta do Orçamento (Mestre + Detalhes)
    { path: 'orcamento/consulta/:id', component: CertificadodigitalConsultaComponent },


    // ==============================================
    // ROTAS N FORMULÁRIOS CRUD (Requisito de Apoio)
    // ==============================================

    // CRUD: Cliente
    { path: 'clientes', component: ClienteListaComponent }, 
    { path: 'clientes/novo', component: ClienteFormComponent }, 
    { path: 'clientes/editar/:id', component: ClienteFormComponent },

    // CRUD: Empresa
    { path: 'empresas', component: EmpresaListaComponent }, 
    // { path: 'empresas/novo', component: EmpresaFormComponent }, 

    // Rota 404 (para qualquer outra URL)
    { path: '**', redirectTo: '/inicio' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }