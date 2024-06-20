import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LieferantenComponent } from './lieferanten.component';

describe('LieferantenComponent', () => {
  let component: LieferantenComponent;
  let fixture: ComponentFixture<LieferantenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LieferantenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LieferantenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
