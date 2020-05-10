import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NtmComponent } from './ntm.component';

describe('NtmComponent', () => {
  let component: NtmComponent;
  let fixture: ComponentFixture<NtmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NtmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
