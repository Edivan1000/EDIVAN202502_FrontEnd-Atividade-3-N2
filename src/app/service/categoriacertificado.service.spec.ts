import { TestBed } from '@angular/core/testing';

import { CategoriacertificadoService } from './categoriacertificado.service';

describe('CategoriacertificadoService', () => {
  let service: CategoriacertificadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriacertificadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
