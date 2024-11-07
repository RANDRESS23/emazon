import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfProductsToBuyComponent } from './list-of-products-to-buy.component';

describe('ListOfProductsToBuyComponent', () => {
  let component: ListOfProductsToBuyComponent;
  let fixture: ComponentFixture<ListOfProductsToBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfProductsToBuyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfProductsToBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
