import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBottomsheetComponent } from './chart-bottomsheet.component';

describe('ChartBottomsheetComponent', () => {
  let component: ChartBottomsheetComponent;
  let fixture: ComponentFixture<ChartBottomsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartBottomsheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartBottomsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
