import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaCertificado } from '../../model/categoriacertificado';
import { CategoriaCertificadoService } from '../../service/categoriacertificado.service';

@Component({
  selector: 'app-categoriacertificado-altera',
  standalone: false,
  templateUrl: './categoriacertificado-altera.component.html',
  styleUrls: ['./categoriacertificado-altera.component.css']
})
export class CategoriaCertificadoAlteraComponent implements OnInit {

  codigo!: number;
  categoriacertificado!: CategoriaCertificado;

  constructor(
    private categoriaService: CategoriaCertificadoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.codigo = Number(this.route.snapshot.paramMap.get('id'));
    this.categoriacertificado = new CategoriaCertificado();
    this.categoriaService.consultarCategoria(this.codigo).subscribe(data => {
      this.categoriacertificado = data;
    });
  }

  onSubmit() {
    this.categoriaService.alterarCategoria(this.codigo, this.categoriacertificado).subscribe(data => {
      console.log(data);
      this.listarCategoria();
    });
  }

  listarCategoria() {
    this.router.navigate(['categoriacertificado-lista']);
  }
}
