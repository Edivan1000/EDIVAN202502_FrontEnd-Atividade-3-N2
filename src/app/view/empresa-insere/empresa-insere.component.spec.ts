import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaInsereComponent } from './empresa-insere.component';

describe('EmpresaInsereComponent', () => {
  let component: EmpresaInsereComponent;
  let fixture: ComponentFixture<EmpresaInsereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpresaInsereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaInsereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
