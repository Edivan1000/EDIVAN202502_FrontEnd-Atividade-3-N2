import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriacertificadoListaComponent } from './categoriacertificado-lista.component';

describe('CategoriacertificadoListaComponent', () => {
  let component: CategoriacertificadoListaComponent;
  let fixture: ComponentFixture<CategoriacertificadoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriacertificadoListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriacertificadoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
