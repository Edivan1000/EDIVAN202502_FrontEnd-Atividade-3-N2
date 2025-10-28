import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { Inicio } from "./view/inicio/inicio";
import { CertificadodigitalListaComponent } from "./view/certificadodigital-lista/certificadodigital-lista.component";

export const routes: Routes = [

{path: '', redirectTo: 'inicio', pathMatch: 'full'},
{path: 'automovel-lista', component: CertificadodigitalListaComponent},
{path: 'inicio', component: Inicio}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}