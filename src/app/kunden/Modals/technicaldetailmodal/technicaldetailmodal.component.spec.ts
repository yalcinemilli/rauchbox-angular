import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicaldetailmodalComponent } from './technicaldetailmodal.component';

describe('TechnicaldetailmodalComponent', () => {
  let component: TechnicaldetailmodalComponent;
  let fixture: ComponentFixture<TechnicaldetailmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicaldetailmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicaldetailmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
