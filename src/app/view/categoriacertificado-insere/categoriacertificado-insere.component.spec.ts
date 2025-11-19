import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriacertificadoInsereComponent } from './categoriacertificado-insere.component';

describe('CategoriacertificadoInsereComponent', () => {
  let component: CategoriacertificadoInsereComponent;
  let fixture: ComponentFixture<CategoriacertificadoInsereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriacertificadoInsereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriacertificadoInsereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
