import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyConfirmComponent } from './journey-confirm.component';

describe('JourneyConfirmComponent', () => {
  let component: JourneyConfirmComponent;
  let fixture: ComponentFixture<JourneyConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JourneyConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
