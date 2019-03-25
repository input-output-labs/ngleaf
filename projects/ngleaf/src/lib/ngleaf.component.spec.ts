import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgleafComponent } from './ngleaf.component';

describe('NgleafComponent', () => {
  let component: NgleafComponent;
  let fixture: ComponentFixture<NgleafComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgleafComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgleafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
