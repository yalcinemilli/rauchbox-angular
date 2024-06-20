import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User, UserLevel, UserResponse } from 'src/app/open-api';

@Component({
  selector: 'app-users-details-modal',
  templateUrl: './users-details-modal.component.html',
  styleUrls: ['./users-details-modal.component.css']
})
export class UsersDetailsModalComponent implements OnInit {

  newForm: FormGroup;
  title: string = "Hinzufügen";
  @Input() userobj: UserResponse;
  @Input() userlevel: UserLevel[];
  user = new EventEmitter<User>();
  check2fa: boolean = false;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.newForm = new FormGroup({
      'Vorname': new FormControl(null, Validators.required),
      'Nachname': new FormControl(null, Validators.required),
      'Email': new FormControl(null, Validators.required),
      'Passwort': new FormControl(null, Validators.required),
      'UserLevel': new FormControl(null, Validators.required)
    });
    if (this.userobj) {
      this.title = "Bearbeiten";
      this.check2fa = this.int2bool(this.userobj.is2fa);
      this.newForm.setValue({ Vorname: this.userobj.vorname, Nachname: this.userobj.nachname, Email: this.userobj.email, Passwort: this.userobj.pwd, UserLevel: this.userobj.userlevel });
    }

  }
  
  onChange($event) {
    this.check2fa = $event;
  }

  int2bool(value: number): boolean {
    return value == 1 ? true : false;
  }

  bool2int(value: boolean): number {
    return value == true ? 1 : 0;
  }
  onSubmit() {
    if(this.userobj){
      this.userobj.vorname = this.newForm.value.Vorname;
      this.userobj.nachname = this.newForm.value.Nachname;
      this.userobj.email = this.newForm.value.Email;
      this.userobj.userlevel = this.newForm.value.UserLevel;
      this.userobj.is2fa = this.bool2int(this.check2fa);
      this.user.emit(this.userobj);

    } else {
      const newUser: User = {
        vorname: this.newForm.value.Vorname,
        nachname: this.newForm.value.Nachname,
        email: this.newForm.value.Email,
        pwd: this.newForm.value.Passwort,
        userlevel: this.newForm.value.UserLevel,
        is2fa: this.bool2int(this.check2fa)
      };
      this.user.emit(newUser);

    }
    
    this.activeModal.close();
  }


}
