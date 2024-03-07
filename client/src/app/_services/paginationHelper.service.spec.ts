/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PaginationHelperService } from './paginationHelper.service';

describe('Service: PaginationHelper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginationHelperService]
    });
  });

  it('should ...', inject([PaginationHelperService], (service: PaginationHelperService) => {
    expect(service).toBeTruthy();
  }));
});
