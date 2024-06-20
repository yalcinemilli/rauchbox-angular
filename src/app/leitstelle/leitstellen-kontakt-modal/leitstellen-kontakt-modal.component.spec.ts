import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeitstellenKontaktModalComponent } from './leitstellen-kontakt-modal.component';

describe('LeitstellenKontaktModalComponent', () => {
  let component: LeitstellenKontaktModalComponent;
  let fixture: ComponentFixture<LeitstellenKontaktModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeitstellenKontaktModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeitstellenKontaktModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
