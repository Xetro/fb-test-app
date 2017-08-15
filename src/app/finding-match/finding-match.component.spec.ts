import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingMatchComponent } from './finding-match.component';

describe('FindingMatchComponent', () => {
  let component: FindingMatchComponent;
  let fixture: ComponentFixture<FindingMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindingMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindingMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
