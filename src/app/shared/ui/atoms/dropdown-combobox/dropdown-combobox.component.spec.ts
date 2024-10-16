import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComboboxComponent } from './dropdown-combobox.component';

describe('DropdownComboboxComponent', () => {
  let component: DropdownComboboxComponent;
  let fixture: ComponentFixture<DropdownComboboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownComboboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownComboboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
