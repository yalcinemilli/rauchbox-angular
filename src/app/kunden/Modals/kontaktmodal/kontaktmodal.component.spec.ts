import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KontaktmodalComponent } from './kontaktmodal.component';

describe('KontaktmodalComponent', () => {
  let component: KontaktmodalComponent;
  let fixture: ComponentFixture<KontaktmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KontaktmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KontaktmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
