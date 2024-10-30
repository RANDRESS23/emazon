import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioWarehouseAssistantComponent } from './inicio.component';

describe('InicioWarehouseAssistantComponent', () => {
  let component: InicioWarehouseAssistantComponent;
  let fixture: ComponentFixture<InicioWarehouseAssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioWarehouseAssistantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioWarehouseAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
