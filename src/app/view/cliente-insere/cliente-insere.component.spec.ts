import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteInsereComponent } from './cliente-insere.component';

describe('ClienteInsereComponent', () => {
  let component: ClienteInsereComponent;
  let fixture: ComponentFixture<ClienteInsereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClienteInsereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteInsereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
