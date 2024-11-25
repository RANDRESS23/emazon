import { TestBed } from '@angular/core/testing';
import { BrandService } from './brand.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrandRequest, BrandResponse, PageBrands } from '@src/app/shared/utils/interfaces/brand';
import { environment } from '@src/environments/environment';

describe('BrandService', () => {
  let service: BrandService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BrandService],
    });

    service = TestBed.inject(BrandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('saveBrand', () => {
    it('should call the POST API to save brand', () => {
      const mockBrandRequest: BrandRequest = {
        name: 'Brand 1',
        description: 'Description of brand 1'
      };
      const mockBrandResponse: BrandResponse = {
        brandId: 1,
        name: 'Brand 1',
        description: 'Description of brand 1'
      };

      service.saveBrand(mockBrandRequest).subscribe((response) => {
        expect(response).toEqual(mockBrandResponse);
      });

      const req = httpMock.expectOne(`${environment.BASE_URL_STOCK}/brand`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockBrandRequest);
      req.flush(mockBrandResponse);
    });
  });

  describe('getAllBrands', () => {
    it('should call the GET API to retrieve brands', () => {
      const page = 1;
      const size = 10;
      const sortOrder = 'asc';
      const mockPageBrands: PageBrands = {
        pageNumber: 0,
        pageSize: 10,
        totalElements: 2,
        totalPages: 1,
        content: [
          { brandId: 1, name: 'Brand 1', description: 'Description of brand 1' },
          { brandId: 2, name: 'Brand 2', description: 'Description of brand 2' }
        ]
      };

      service.getAllBrands(page, size, sortOrder).subscribe((response) => {
        expect(response).toEqual(mockPageBrands);
      });

      const req = httpMock.expectOne(`${environment.BASE_URL_STOCK}/brand?page=${page}&size=${size}&sortOrder=${sortOrder}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPageBrands);
    });
  });

  it('should retrieve all brands from the API via GET', () => {
    const dummyBrands: BrandResponse[] = [
      { name: 'Brand 1', brandId: 1, description: 'description' },
      { name: 'Brand 2', brandId: 2, description: 'description' },
    ];

    service.getTotalBrands().subscribe((brands) => {
      expect(brands.length).toBe(2);
      expect(brands).toEqual(dummyBrands);
    });

    const req = httpMock.expectOne(`${environment.BASE_URL_STOCK}/brand/all`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBrands); 
  });
});
