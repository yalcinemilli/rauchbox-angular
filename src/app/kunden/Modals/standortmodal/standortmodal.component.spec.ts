import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandortmodalComponent } from './standortmodal.component';

describe('StandortmodalComponent', () => {
  let component: StandortmodalComponent;
  let fixture: ComponentFixture<StandortmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandortmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandortmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
