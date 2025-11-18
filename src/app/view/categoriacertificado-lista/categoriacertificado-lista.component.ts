import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaCertificado } from '../../model/categoriacertificado';
import { CategoriaCertificadoService } from '../../service/categoriacertificado.service';

@Component({
  selector: 'app-categoriacertificado-lista',
  standalone: false,
  templateUrl: './categoriacertificado-lista.component.html',
  styleUrls: ['./categoriacertificado-lista.component.css']
})
export class CategoriaCertificadoListaComponent implements OnInit {

  categorias!: CategoriaCertificado[];

  constructor(
    private categoriaService: CategoriaCertificadoService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarCategorias();
  }

  private listarCategorias(){
    this.categoriaService.listarCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  alterarCategoria(codigo: number){
    this.router.navigate(['categoriacertificado-altera', codigo]);
  }

  consultarCategoria(codigo: number){
    this.router.navigate(['categoriacertificado-consulta', codigo]);
  }

  inserirCategoria(){
    this.router.navigate(['categoriacertificado-insere']);
  }

  excluirCategoria(codigo: number){
    if(confirm("Confirma a exclusão da Categoria de Certificado?")){
      this.categoriaService.excluirCategoria(codigo).subscribe(data => {
        console.log(data);
        this.listarCategorias();
      });
    }
  }
}
