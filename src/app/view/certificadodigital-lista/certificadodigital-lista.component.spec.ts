import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadodigitalListaComponent } from './certificadodigital-lista.component';

describe('CertificadodigitalListaComponent', () => {
  let component: CertificadodigitalListaComponent;
  let fixture: ComponentFixture<CertificadodigitalListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertificadodigitalListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificadodigitalListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
