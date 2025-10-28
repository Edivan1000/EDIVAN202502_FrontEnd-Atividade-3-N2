import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadodigitalConsultaComponent } from './certificadodigital-consulta.component';

describe('CertificadodigitalConsultaComponent', () => {
  let component: CertificadodigitalConsultaComponent;
  let fixture: ComponentFixture<CertificadodigitalConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertificadodigitalConsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificadodigitalConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
