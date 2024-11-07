import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInIconComponent } from './sign-in-icon.component';

describe('SignInIconComponent', () => {
  let component: SignInIconComponent;
  let fixture: ComponentFixture<SignInIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
