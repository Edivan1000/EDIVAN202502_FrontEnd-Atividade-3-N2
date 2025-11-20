import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriacertificadoAlteraComponent } from './categoriacertificado-altera.component';

describe('CategoriacertificadoAlteraComponent', () => {
  let component: CategoriacertificadoAlteraComponent;
  let fixture: ComponentFixture<CategoriacertificadoAlteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriacertificadoAlteraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriacertificadoAlteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
