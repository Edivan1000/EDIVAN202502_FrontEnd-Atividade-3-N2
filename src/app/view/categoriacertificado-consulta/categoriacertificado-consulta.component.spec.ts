import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriacertificadoConsultaComponent } from './categoriacertificado-consulta.component';

describe('CategoriacertificadoConsultaComponent', () => {
  let component: CategoriacertificadoConsultaComponent;
  let fixture: ComponentFixture<CategoriacertificadoConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriacertificadoConsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriacertificadoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
