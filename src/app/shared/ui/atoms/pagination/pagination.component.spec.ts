import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { SimpleChange, SimpleChanges } from '@angular/core';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.pageNumber).toBe(0);
    expect(component.totalPages).toBe(0);
    expect(component.pages.length).toBe(0);
    expect(component.pagesActives.length).toBe(0);
    expect(component.showArrowLeft).toBe(false);
    expect(component.showArrowRight).toBe(false);
  });

  it('should update pages and arrows when totalPages changes', () => {
    component.totalPages = 10;
    const changes: SimpleChanges = {
      totalPages: new SimpleChange(null, component.totalPages, true)
    };
    component.ngOnChanges(changes);
    
    expect(component.pages.length).toBe(10);
    expect(component.pagesActives.length).toBe(5);
    expect(component.showArrowRight).toBe(true);
    expect(component.showArrowLeft).toBe(false);
  });

  it('should change to a specific page when changePage is called', () => {
    component.totalPages = 5;
    const changes: SimpleChanges = {
      totalPages: new SimpleChange(null, component.totalPages, true)
    };
    component.ngOnChanges(changes);
    
    const mockEvent = {
      srcElement: { innerText: '3' }
    };
    const emitSpy = jest.spyOn(component.pageNumberChange, 'emit');
    
    component.changePage(mockEvent);
    expect(component.pageNumber).toBe(2);
    expect(emitSpy).toHaveBeenCalledWith(2);
  });

  it('should go to the next page and update active pages and arrows', () => {
    component.totalPages = 10;
    component.pageNumber = 4;
    component.pageMin = 1;
    component.pageMax = 10;
    component.pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    component.pagesActives = [1, 2, 3, 4, 5];
    
    const emitSpy = jest.spyOn(component.pageNumberChange, 'emit');
    
    component.nextPage();
    
    expect(component.pageNumber).toBe(5);
    expect(component.pagesActives).toEqual([2, 3, 4, 5, 6]);
    expect(emitSpy).toHaveBeenCalledWith(5);
    expect(component.showArrowLeft).toBe(true);
    expect(component.showArrowRight).toBe(true);
  });

  it('should go to the previous page and update active pages and arrows', () => {
    component.totalPages = 10;
    component.pageNumber = 5;
    component.pageMin = 1;
    component.pageMax = 10;
    component.pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    component.pagesActives = [3, 4, 5, 6, 7];
    
    const emitSpy = jest.spyOn(component.pageNumberChange, 'emit');
    
    component.previousPage();

    expect(component.pageNumber).toBe(4);
    expect(component.pagesActives).toEqual([3, 4, 5, 6, 7]);
    expect(emitSpy).toHaveBeenCalledWith(4);
    expect(component.showArrowLeft).toBe(true);
    expect(component.showArrowRight).toBe(true);
  });

  it('should not show left arrow on first page', () => {
    component.totalPages = 10;
    component.pageNumber = 1;
    component.pageMin = 1;
    component.pageMax = 10;
    component.pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    component.pagesActives = [2, 3, 4, 5, 6];
    
    component.previousPage();
    
    expect(component.showArrowRight).toBe(true);
    expect(component.showArrowLeft).toBe(false);
  });

  it('should hide right arrow when on the last page', () => {
    component.totalPages = 10;
    component.pageNumber = 9;
    component.pageMin = 1;
    component.pageMax = 10;
    component.pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    component.pagesActives = [5, 6, 7, 8, 9];
    
    component.nextPage();

    expect(component.showArrowRight).toBe(false);
    expect(component.showArrowLeft).toBe(true);
  });

  it('should set showArrowLeft to false if pagesActives contains pageMin in nextPage', () => {
    component.pageMin = 1;
    component.pageNumber = 1;
    component.pages = [1, 2, 3, 4, 5];
    component.pagesActives = [1, 2, 3, 4, 5]; 
  
    component.nextPage();
  
    expect(component.showArrowLeft).toBe(false);
  });
  
  it('should set showArrowRight to false if pagesActives contains pageMax in nextPage', () => {
    component.pageMax = 5;
    component.pageNumber = 4;
    component.pages = [1, 2, 3, 4, 5];
    component.pagesActives = [1, 2, 3, 4, 5]; 
  
    component.nextPage();
  
    expect(component.showArrowRight).toBe(false);
  });
  
  it('should set showArrowLeft to false if pagesActives contains pageMin in previousPage', () => {
    component.pageMin = 1;
    component.pageNumber = 2;
    component.pages = [1, 2, 3, 4, 5];
    component.pagesActives = [1, 2, 3, 4, 5]; 
  
    component.previousPage();
  
    expect(component.showArrowLeft).toBe(false);
  });
  
  it('should set showArrowRight to false if pagesActives contains pageMax in previousPage', () => {
    component.pageMax = 5;
    component.pageNumber = 3;
    component.pages = [1, 2, 3, 4, 5];
    component.pagesActives = [1, 2, 3, 4, 5]; 
  
    component.previousPage();
  
    expect(component.showArrowRight).toBe(false);
  });  
});