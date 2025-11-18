import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaCertificadoService } from '../../service/categoriacertificado.service';
import { CategoriaCertificado } from '../../model/categoriacertificado';

@Component({
  selector: 'app-categoria-consulta',
  standalone: false,
  templateUrl: './categoriacertificado-consulta.component.html',
  styleUrls: ['./categoriacertificado-consulta.component.css']
})
export class CategoriaCertificadoConsultaComponent implements OnInit {

  categoria!: CategoriaCertificado;
  codigo!: number;

  constructor(
    private categoriaService: CategoriaCertificadoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.codigo = Number(this.route.snapshot.paramMap.get('id'));
    this.categoria = new CategoriaCertificado();
    this.categoriaService.consultarCategoria(this.codigo).subscribe(data => {
      this.categoria = data;
    });
  }

  retornar() {
    this.router.navigate(['categoriacertificado-lista']);
  }

}
