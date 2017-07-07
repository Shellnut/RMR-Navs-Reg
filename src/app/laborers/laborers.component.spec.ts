import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborersComponent } from './laborers.component';

describe('LaborersComponent', () => {
  let component: LaborersComponent;
  let fixture: ComponentFixture<LaborersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaborersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
