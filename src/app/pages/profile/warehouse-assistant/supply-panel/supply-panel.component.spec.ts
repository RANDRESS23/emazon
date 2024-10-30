import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyPanelComponent } from './supply-panel.component';

describe('SupplyPanelComponent', () => {
  let component: SupplyPanelComponent;
  let fixture: ComponentFixture<SupplyPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplyPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplyPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
