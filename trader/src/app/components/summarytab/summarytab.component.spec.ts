import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarytabComponent } from './summarytab.component';

describe('SummarytabComponent', () => {
  let component: SummarytabComponent;
  let fixture: ComponentFixture<SummarytabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummarytabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarytabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
