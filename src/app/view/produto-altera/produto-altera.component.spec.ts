import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoAlteraComponent } from './produto-altera.component';

describe('ProdutoAlteraComponent', () => {
  let component: ProdutoAlteraComponent;
  let fixture: ComponentFixture<ProdutoAlteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdutoAlteraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoAlteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
