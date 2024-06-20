import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeitstellenModalComponent } from './leitstellen-modal.component';

describe('LeitstellenModalComponent', () => {
  let component: LeitstellenModalComponent;
  let fixture: ComponentFixture<LeitstellenModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeitstellenModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeitstellenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
