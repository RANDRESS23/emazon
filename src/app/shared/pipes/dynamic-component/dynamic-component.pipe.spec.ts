import { HomeIconComponent } from '@atoms/icons/home-icon/home-icon.component';
import { DynamicComponentPipe } from './dynamic-component.pipe';
import { CategoryIconComponent } from '@atoms/icons/category-icon/category-icon.component';
import { BrandIconComponent } from '@atoms/icons/brand-icon/brand-icon.component';
import { ProductIconComponent } from '@atoms/icons/product-icon/product-icon.component';
import { AddUserIconComponent } from '@atoms/icons/add-user-icon/add-user-icon.component';
import { SupplyIconComponent } from '@atoms/icons/supply-icon/supply-icon.component';
import { AddBoxIconComponent } from '@atoms/icons/add-box-icon/add-box-icon.component';

describe('DynamicComponentPipe', () => {
  let pipe: DynamicComponentPipe;

  beforeEach(() => {
    pipe = new DynamicComponentPipe();
  });

  it('should return HomeIconComponent when iconName is "home"', () => {
    expect(pipe.transform('home')).toBe(HomeIconComponent);
  });

  it('should return CategoryIconComponent when iconName is "category"', () => {
    expect(pipe.transform('category')).toBe(CategoryIconComponent);
  });

  it('should return BrandIconComponent when iconName is "brand"', () => {
    expect(pipe.transform('brand')).toBe(BrandIconComponent);
  });

  it('should return ProductIconComponent when iconName is "product"', () => {
    expect(pipe.transform('product')).toBe(ProductIconComponent);
  });

  it('should return AddUserIconComponent when iconName is "addUser"', () => {
    expect(pipe.transform('addUser')).toBe(AddUserIconComponent);
  });

  it('should return SupplyIconComponent when iconName is "supply"', () => {
    expect(pipe.transform('supply')).toBe(SupplyIconComponent);
  });

  it('should return AddBoxIconComponent when iconName is "add"', () => {
    expect(pipe.transform('add')).toBe(AddBoxIconComponent);
  });

  it('should return null when iconName does not match any component', () => {
    expect(pipe.transform('unknown')).toBeNull();
  });
});
