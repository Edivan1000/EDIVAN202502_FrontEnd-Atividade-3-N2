import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { CommonModule } from '@angular/common'; // REMOVIDO: Redundante se BrowserModule está presente
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InicioComponent } from './view/inicio/inicio.component';
import { CertificadodigitalAlteraComponent } from './view/certificadodigital-altera/certificadodigital-altera.component';
import { CertificadodigitalListaComponent } from './view/certificadodigital-lista/certificadodigital-lista.component';
import { CertificadodigitalConsultaComponent } from './view/certificadodigital-consulta/certificadodigital-consulta.component';
import { OrcamentoFormComponent } from './view/orcamento/orcamento-form/orcamento-form.component';
import { ClienteFormComponent } from './view/cliente-form/cliente-form.component';
import { ClienteListaComponent } from './view/cliente-lista/cliente-lista.component';
import { EmpresaFormComponent } from './view/empresa-form/empresa-form.component';
import { EmpresaListaComponent } from './view/empresa-lista/empresa-lista.component';

// Imports de Services
import { OrcamentoService } from './service/orcamento.service';
import { ProdutoService } from './service/produto.service';
import { ClienteService } from './service/cliente.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // CommonModule, // REMOVIDO
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [
    // Se seus services usam providedIn: 'root', listar aqui é opcional,
    // mas não causa erro e garante que eles serão injetados.
    OrcamentoService,
    ProdutoService,
    ClienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }