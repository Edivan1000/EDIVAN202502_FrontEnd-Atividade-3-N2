import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoListaComponent } from './orcamento-lista.component';

describe('OrcamentoListaComponent', () => {
  let component: OrcamentoListaComponent;
  let fixture: ComponentFixture<OrcamentoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrcamentoListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrcamentoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
