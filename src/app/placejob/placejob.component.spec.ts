import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacejobComponent } from './placejob.component';

describe('PlacejobComponent', () => {
  let component: PlacejobComponent;
  let fixture: ComponentFixture<PlacejobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacejobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacejobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
