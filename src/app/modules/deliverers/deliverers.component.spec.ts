import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverersComponent } from './deliverers.component';

describe('DeliverersComponent', () => {
  let component: DeliverersComponent;
  let fixture: ComponentFixture<DeliverersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliverersComponent]
    });
    fixture = TestBed.createComponent(DeliverersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
