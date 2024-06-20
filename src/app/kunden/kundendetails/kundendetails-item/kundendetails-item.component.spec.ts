import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KundendetailsItemComponent } from './kundendetails-item.component';

describe('KundendetailsItemComponent', () => {
  let component: KundendetailsItemComponent;
  let fixture: ComponentFixture<KundendetailsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KundendetailsItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KundendetailsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
