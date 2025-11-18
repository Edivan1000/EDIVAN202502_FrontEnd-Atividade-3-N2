import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Início
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

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,

    // Cliente
    ClienteListaComponent,
    ClienteInsereComponent,
    ClienteAlteraComponent,
    ClienteConsultaComponent,

    // Empresa
    EmpresaListaComponent,
    EmpresaInsereComponent,
    EmpresaAlteraComponent,
    EmpresaConsultaComponent,

    // Produto
    ProdutoListaComponent,
    ProdutoInsereComponent,
    ProdutoAlteraComponent,
    ProdutoConsultaComponent,

    // Categoria Certificado
    CategoriaCertificadoListaComponent,
    CategoriaCertificadoInsereComponent,
    CategoriaCertificadoAlteraComponent,
    CategoriaCertificadoConsultaComponent,

    // Orçamento
    OrcamentoListaComponent,
    OrcamentoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }