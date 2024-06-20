import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeitstelleComponent } from './leitstelle.component';

describe('LeitstelleComponent', () => {
  let component: LeitstelleComponent;
  let fixture: ComponentFixture<LeitstelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeitstelleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeitstelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
