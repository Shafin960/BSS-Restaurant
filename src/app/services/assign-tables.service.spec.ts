import { TestBed } from '@angular/core/testing';

import { AssignTablesService } from './assign-tables.service';

describe('AssignTablesService', () => {
  let service: AssignTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
