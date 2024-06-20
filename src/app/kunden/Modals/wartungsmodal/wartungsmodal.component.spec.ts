import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WartungsmodalComponent } from './wartungsmodal.component';

describe('WartungsmodalComponent', () => {
  let component: WartungsmodalComponent;
  let fixture: ComponentFixture<WartungsmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WartungsmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WartungsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
