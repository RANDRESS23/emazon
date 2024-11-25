import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIconComponent } from './product-icon.component';

describe('ProductIconComponent', () => {
  let component: ProductIconComponent;
  let fixture: ComponentFixture<ProductIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
