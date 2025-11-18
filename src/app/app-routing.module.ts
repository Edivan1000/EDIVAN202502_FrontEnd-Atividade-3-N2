import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './view/inicio/inicio.component';

// Cliente
import { ClienteListaComponent } from './view/cliente-lista/cliente-lista.component';
import { ClienteInsereComponent } from './view/cliente-insere/cliente-insere.component';
import { ClienteAlteraComponent } from './view/cliente-altera/cliente-altera.component';
import { ClienteConsultaComponent } from './view/cliente-consulta/cliente-consulta.component';

// Empresa
import { EmpresaListaComponent } from './view/empresa-lista/empresa-lista.component';
import { EmpresaInsereComponent } from './view/empresa-insere/empresa-insere.component';
import { EmpresaAlteraComponent } from './view/empresa-altera/empresa-altera.component';
import { EmpresaConsultaComponent } from './view/empresa-consulta/empresa-consulta.component';

// Produto
import { ProdutoListaComponent } from './view/produto-lista/produto-lista.component';
import { ProdutoInsereComponent } from './view/produto-insere/produto-insere.component';
import { ProdutoAlteraComponent } from './view/produto-altera/produto-altera.component';
import { ProdutoConsultaComponent } from './view/produto-consulta/produto-consulta.component';

// Categoria Certificado
import { CategoriaCertificadoListaComponent } from './view/categoriacertificado-lista/categoriacertificado-lista.component';
import { CategoriaCertificadoInsereComponent } from './view/categoriacertificado-insere/categoriacertificado-insere.component';
import { CategoriaCertificadoAlteraComponent } from './view/categoriacertificado-altera/categoriacertificado-altera.component';
import { CategoriaCertificadoConsultaComponent } from './view/categoriacertificado-consulta/categoriacertificado-consulta.component';

// Orçamento
import { OrcamentoListaComponent } from './view/orcamento-lista/orcamento-lista.component';
import { OrcamentoFormComponent } from './view/orcamento-form/orcamento-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },

  // Cliente
  { path: 'cliente-lista', component: ClienteListaComponent },
  { path: 'cliente-insere', component: ClienteInsereComponent },
  { path: 'cliente-altera/:id', component: ClienteAlteraComponent },
  { path: 'cliente-consulta/:id', component: ClienteConsultaComponent },

  // Empresa
  { path: 'empresa-lista', component: EmpresaListaComponent },
  { path: 'empresa-insere', component: EmpresaInsereComponent },
  { path: 'empresa-altera/:id', component: EmpresaAlteraComponent },
  { path: 'empresa-consulta/:id', component: EmpresaConsultaComponent },

  // Produto
  { path: 'produto-lista', component: ProdutoListaComponent },
  { path: 'produto-insere', component: ProdutoInsereComponent },
  { path: 'produto-altera/:id', component: ProdutoAlteraComponent },
  { path: 'produto-consulta/:id', component: ProdutoConsultaComponent },

  // Categoria Certificado
  { path: 'categoriacertificado-lista', component: CategoriaCertificadoListaComponent },
  { path: 'categoriacertificado-insere', component: CategoriaCertificadoInsereComponent },
  { path: 'categoriacertificado-altera/:id', component: CategoriaCertificadoAlteraComponent },
  { path: 'categoriacertificado-consulta/:id', component: CategoriaCertificadoConsultaComponent },

  // Orçamento
  { path: 'orcamento-lista', component: OrcamentoListaComponent },
  { path: 'orcamento-form', component: OrcamentoFormComponent },
  { path: 'orcamento-form/:id', component: OrcamentoFormComponent } // edição
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}