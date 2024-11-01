import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpIconComponent } from './sign-up-icon.component';

describe('SignUpIconComponent', () => {
  let component: SignUpIconComponent;
  let fixture: ComponentFixture<SignUpIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
