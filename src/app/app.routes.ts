import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Inicio } from './view/inicio/inicio';
import { ProdutoListaComponent } from "./view/produto-lista/produto-lista.component";

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'produto-lista', component: ProdutoListaComponent },
  { path: 'inicio', component: Inicio }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}