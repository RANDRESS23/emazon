import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormBasicComponent } from './modal-form-basic.component';

describe('ModalFormBasicComponent', () => {
  let component: ModalFormBasicComponent;
  let fixture: ComponentFixture<ModalFormBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFormBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
