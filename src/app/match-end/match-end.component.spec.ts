import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchEndComponent } from './match-end.component';

describe('MatchEndComponent', () => {
  let component: MatchEndComponent;
  let fixture: ComponentFixture<MatchEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchEndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
