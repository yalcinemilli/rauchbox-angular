import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjektmodalComponent } from './objektmodal.component';

describe('ObjektmodalComponent', () => {
  let component: ObjektmodalComponent;
  let fixture: ComponentFixture<ObjektmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjektmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjektmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
