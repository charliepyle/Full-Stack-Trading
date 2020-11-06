import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfclosingalertComponent } from './selfclosingalert.component';

describe('SelfclosingalertComponent', () => {
  let component: SelfclosingalertComponent;
  let fixture: ComponentFixture<SelfclosingalertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfclosingalertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfclosingalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
