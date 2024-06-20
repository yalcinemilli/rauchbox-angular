import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KundendetailsComponent } from './kundendetails.component';

describe('KundendetailsComponent', () => {
  let component: KundendetailsComponent;
  let fixture: ComponentFixture<KundendetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KundendetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KundendetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
