import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LieferantenModalComponent } from './lieferanten-modal.component';

describe('LieferantenModalComponent', () => {
  let component: LieferantenModalComponent;
  let fixture: ComponentFixture<LieferantenModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LieferantenModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LieferantenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
