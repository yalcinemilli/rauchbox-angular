import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User, UserResponse } from 'src/app/open-api';

@Component({
  selector: 'app-password-change-modal',
  templateUrl: './password-change-modal.component.html',
  styleUrls: ['./password-change-modal.component.css']
})
export class PasswordChangeModalComponent implements OnInit {

  newForm: FormGroup;
  @Input() userobj: UserResponse;
  user = new EventEmitter<User>();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.newForm = new FormGroup({
      'Passwort': new FormControl(null, Validators.required)
    });
      this.newForm.setValue({ Passwort: this.userobj.pwd });

  }
  
  onSubmit() {
    this.userobj.pwd = this.newForm.value.Passwort;
    this.user.emit(this.userobj);
    this.activeModal.close();
  }


}
