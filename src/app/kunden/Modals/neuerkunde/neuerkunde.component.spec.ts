import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeuerkundeComponent } from './neuerkunde.component';

describe('NeuerkundeComponent', () => {
  let component: NeuerkundeComponent;
  let fixture: ComponentFixture<NeuerkundeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeuerkundeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeuerkundeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
