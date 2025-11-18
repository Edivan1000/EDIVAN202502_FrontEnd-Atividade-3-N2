import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoInsereComponent } from './produto-insere.component';

describe('ProdutoInsereComponent', () => {
  let component: ProdutoInsereComponent;
  let fixture: ComponentFixture<ProdutoInsereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdutoInsereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoInsereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
