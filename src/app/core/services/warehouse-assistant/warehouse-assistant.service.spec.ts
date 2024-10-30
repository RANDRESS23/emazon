import { TestBed } from '@angular/core/testing';

import { WarehouseAssistantService } from './warehouse-assistant.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PageWarehouseAssistants, WarehouseAssistantRequest, WarehouseAssistantResponse } from '@utils/interfaces/warehouse-assistant';
import { environment } from '@src/environments/environment';

describe('WarehouseAssistantService', () => {
  let service: WarehouseAssistantService;
  let httpMock: HttpTestingController;

  const mockWarehouseAssistantRequest: WarehouseAssistantRequest = {
    name: 'John',
    lastName: 'Doe',
    document: '123456789',
    phone: '1234567890',
    birthdate: '1990-01-01',
    email: 'john.doe@example.com',
    password: 'password123'
  };

  const mockWarehouseAssistantResponse: WarehouseAssistantResponse = {
    ...mockWarehouseAssistantRequest,
    userId: '1',
    role: {
      roleId: '1',
      name: 'Aux Bodega',
      description: 'Auxiliar de bodega',
      permissionList: []
    }
  };

  const mockPageWarehouseAssistants: PageWarehouseAssistants = {
    pageNumber: 0,
    pageSize: 10,
    totalElements: 1,
    totalPages: 1,
    content: [mockWarehouseAssistantResponse]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WarehouseAssistantService]
    });

    service = TestBed.inject(WarehouseAssistantService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('saveWarehouseAssistant', () => {
    it('should save a warehouse assistant and return the response', () => {
      service.saveWarehouseAssistant(mockWarehouseAssistantRequest).subscribe((response) => {
        expect(response).toEqual(mockWarehouseAssistantResponse);
      });

      const req = httpMock.expectOne(`${environment.BASE_URL_USER}/user/aux-bodega-user`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockWarehouseAssistantRequest);

      req.flush(mockWarehouseAssistantResponse);
    });

    it('should handle error when saveWarehouseAssistant fails', () => {
      const errorMsg = 'Failed to save warehouse assistant';

      service.saveWarehouseAssistant(mockWarehouseAssistantRequest).subscribe({
        next: () => fail('Expected error, but got success'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.error).toBe(errorMsg);
        }
      });

      const req = httpMock.expectOne(`${environment.BASE_URL_USER}/user/aux-bodega-user`);
      expect(req.request.method).toBe('POST');

      req.flush(errorMsg, { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getAllWarehouseAssistants', () => {
    it('should retrieve all warehouse assistants with pagination', () => {
      const page = 0;
      const size = 10;
      const sortOrder = 'asc';
      const sortBy = 'name';

      service.getAllWarehouseAssistants(page, size, sortOrder, sortBy).subscribe((response) => {
        expect(response).toEqual(mockPageWarehouseAssistants);
      });

      const req = httpMock.expectOne(`${environment.BASE_URL_USER}/user/aux-bodega-user?page=${page}&size=${size}&sortOrder=${sortOrder}&sortBy=${sortBy}`);
      expect(req.request.method).toBe('GET');

      req.flush(mockPageWarehouseAssistants);
    });

    it('should handle error when getAllWarehouseAssistants fails', () => {
      const page = 0;
      const size = 10;
      const sortOrder = 'asc';
      const sortBy = 'name';
      const errorMsg = 'Failed to retrieve warehouse assistants';

      service.getAllWarehouseAssistants(page, size, sortOrder, sortBy).subscribe({
        next: () => fail('Expected error, but got success'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.error).toBe(errorMsg);
        }
      });

      const req = httpMock.expectOne(`${environment.BASE_URL_USER}/user/aux-bodega-user?page=${page}&size=${size}&sortOrder=${sortOrder}&sortBy=${sortBy}`);
      expect(req.request.method).toBe('GET');

      req.flush(errorMsg, { status: 500, statusText: 'Server Error' });
    });
  });
});
