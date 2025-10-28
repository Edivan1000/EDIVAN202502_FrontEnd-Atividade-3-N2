import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadodigitalAlteraComponent } from './certificadodigital-altera.component';

describe('CertificadodigitalAlteraComponent', () => {
  let component: CertificadodigitalAlteraComponent;
  let fixture: ComponentFixture<CertificadodigitalAlteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertificadodigitalAlteraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificadodigitalAlteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
