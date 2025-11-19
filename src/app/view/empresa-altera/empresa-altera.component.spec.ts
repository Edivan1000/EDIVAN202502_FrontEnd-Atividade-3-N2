import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaAlteraComponent } from './empresa-altera.component';

describe('EmpresaAlteraComponent', () => {
  let component: EmpresaAlteraComponent;
  let fixture: ComponentFixture<EmpresaAlteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpresaAlteraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaAlteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
