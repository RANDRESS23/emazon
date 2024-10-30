import { TestBed } from '@angular/core/testing';
import { SupplyService } from './supply.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductSupplyRequest, ProductSupplyResponse } from '@utils/interfaces/supply';
import { environment } from '@src/environments/environment';

describe('SupplyService', () => {
  let service: SupplyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SupplyService]
    });

    service = TestBed.inject(SupplyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('saveSupply', () => {
    it('should make a POST request and return ProductSupplyResponse', () => {
      const mockRequest: ProductSupplyRequest = {
        productId: 1,
        quantity: 10,
        isAddProductQuantity: true
      };

      const mockResponse: ProductSupplyResponse = {
        supplyId: 1,
        productId: 1,
        extraQuantity: 10,
        auxBodegaId: 2,
        date: '2024-10-29',
        hour: '12:00',
        state: {
          stateId: 1,
          name: "APROBADO"
        },
        failureReason: ''
      };

      service.saveSupply(mockRequest).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.BASE_URL_TRANSACTION}/supply`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockRequest);
      req.flush(mockResponse);
    });

    it('should handle an error response', () => {
      const mockRequest: ProductSupplyRequest = {
        productId: 1,
        quantity: 10,
        isAddProductQuantity: true
      };

      const errorMessage = 'Internal Server Error';

      service.saveSupply(mockRequest).subscribe(
        () => fail('expected an error, not ProductSupplyResponse'),
        (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
        }
      );

      const req = httpMock.expectOne(`${environment.BASE_URL_TRANSACTION}/supply`);
      req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
    });
  });
});