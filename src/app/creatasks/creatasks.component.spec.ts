import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatasksComponent } from './creatasks.component';

describe('CreatasksComponent', () => {
  let component: CreatasksComponent;
  let fixture: ComponentFixture<CreatasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
