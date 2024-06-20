import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeitstellenKontaktViewComponent } from './leitstellen-kontakt-view.component';

describe('LeitstellenKontaktViewComponent', () => {
  let component: LeitstellenKontaktViewComponent;
  let fixture: ComponentFixture<LeitstellenKontaktViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeitstellenKontaktViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeitstellenKontaktViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
