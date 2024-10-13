import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { CategoryRequest, CategoryResponse, PageCategories } from '@src/app/shared/domain/interfaces/category';
import { environment } from '@src/environments/environment';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('saveCategory', () => {
    it('should call the POST API to save category', () => {
      const mockCategoryRequest: CategoryRequest = {
        name: 'Category 1',
        description: 'Description of category 1'
      };
      const mockCategoryResponse: CategoryResponse = {
        categoryId: 1,
        name: 'Category 1',
        description: 'Description of category 1'
      };

      service.saveCategory(mockCategoryRequest).subscribe((response) => {
        expect(response).toEqual(mockCategoryResponse);
      });

      const req = httpMock.expectOne(`${environment.BASE_URL}/category`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockCategoryRequest);
      req.flush(mockCategoryResponse);
    });
  });

  describe('getAllCategories', () => {
    it('should call the GET API to retrieve categories', () => {
      const page = 1;
      const size = 10;
      const sortOrder = 'asc';
      const mockPageCategories: PageCategories = {
        pageNumber: 0,
        pageSize: 10,
        totalElements: 2,
        totalPages: 1,
        content: [
          { categoryId: 1, name: 'Category 1', description: 'Description of category 1' },
          { categoryId: 2, name: 'Category 2', description: 'Description of category 2' }
        ]
      };

      service.getAllCategories(page, size, sortOrder).subscribe((response) => {
        expect(response).toEqual(mockPageCategories);
      });

      const req = httpMock.expectOne(`${environment.BASE_URL}/category?page=${page}&size=${size}&sortOrder=${sortOrder}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPageCategories);
    });
  });
});
