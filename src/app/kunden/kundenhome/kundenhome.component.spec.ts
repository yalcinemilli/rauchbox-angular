import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KundenhomeComponent } from './kundenhome.component';

describe('KundenhomeComponent', () => {
  let component: KundenhomeComponent;
  let fixture: ComponentFixture<KundenhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KundenhomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KundenhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
