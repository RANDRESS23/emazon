import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListOfProductsSupplyComponent } from './list-of-products-supply.component';

describe('ListOfProductsSupplyComponent', () => {
  let component: ListOfProductsSupplyComponent;
  let fixture: ComponentFixture<ListOfProductsSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfProductsSupplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfProductsSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
