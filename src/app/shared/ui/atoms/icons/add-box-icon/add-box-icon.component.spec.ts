import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoxIconComponent } from './add-box-icon.component';

describe('AddBoxIconComponent', () => {
  let component: AddBoxIconComponent;
  let fixture: ComponentFixture<AddBoxIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBoxIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBoxIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
