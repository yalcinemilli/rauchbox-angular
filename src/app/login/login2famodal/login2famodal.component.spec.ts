import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login2famodalComponent } from './login2famodal.component';

describe('Login2famodalComponent', () => {
  let component: Login2famodalComponent;
  let fixture: ComponentFixture<Login2famodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Login2famodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login2famodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
