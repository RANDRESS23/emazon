import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseAssistantPanelComponent } from './warehouse-assistant-panel.component';

describe('WarehouseAssistantPanelComponent', () => {
  let component: WarehouseAssistantPanelComponent;
  let fixture: ComponentFixture<WarehouseAssistantPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseAssistantPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseAssistantPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
