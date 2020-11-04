import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfoliowatchcardComponent } from './portfoliowatchcard.component';

describe('PortfoliowatchcardComponent', () => {
  let component: PortfoliowatchcardComponent;
  let fixture: ComponentFixture<PortfoliowatchcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfoliowatchcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfoliowatchcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
