import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingBagIconComponent } from './shopping-bag-icon.component';

describe('ShoppingBagIconComponent', () => {
  let component: ShoppingBagIconComponent;
  let fixture: ComponentFixture<ShoppingBagIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingBagIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingBagIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
