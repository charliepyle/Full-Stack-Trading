import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockwatchcardComponent } from './stockwatchcard.component';

describe('StockwatchcardComponent', () => {
  let component: StockwatchcardComponent;
  let fixture: ComponentFixture<StockwatchcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockwatchcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockwatchcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
