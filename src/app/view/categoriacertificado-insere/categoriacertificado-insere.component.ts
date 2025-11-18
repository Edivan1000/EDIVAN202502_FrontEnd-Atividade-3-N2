import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaCertificado } from '../../model/categoriacertificado';
import { CategoriaCertificadoService } from '../../service/categoriacertificado.service';

@Component({
  selector: 'app-categoriacertificado-insere',
  standalone: false,
  templateUrl: './categoriacertificado-insere.component.html',
  styleUrls: ['./categoriacertificado-insere.component.css']
})
export class CategoriaCertificadoInsereComponent implements OnInit {

  categoriacertificado: CategoriaCertificado = new CategoriaCertificado();

  constructor(private categoriaCertificadoService: CategoriaCertificadoService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.incluirCategoria();
  }

  incluirCategoria(){
    this.categoriaCertificadoService.incluirCategoria(this.categoriacertificado).subscribe(data => {
      console.log(data);
      this.listarCategoria();
    });
  }

  listarCategoria(){
    this.router.navigate(['categoriacertificado-lista']);
  }
}
