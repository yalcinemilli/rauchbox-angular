import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/open-api';
import { UserControllerService } from './../../open-api/api/userController.service';

@Component({
  selector: 'app-login2famodal',
  templateUrl: './login2famodal.component.html',
  styleUrls: ['./login2famodal.component.css']
})
export class Login2famodalComponent  implements OnInit {

  @Input() email: string;
  @Input() pwd: string;
  user = new EventEmitter<User>();

  otp!: string;

  public configOptions = {
    length: 6,
    inputClass: 'digit-otp',
    containerClass: 'd-flex justify-content-between'
  }

  constructor(public activeModal: NgbActiveModal,
    private userControllerService: UserControllerService) { }

  ngOnInit(): void {
  }
  

  onOtpChange(event: any) {
    this.otp = event;

    if(this.otp.length == this.configOptions.length) {
      this.userControllerService.loginwith2FA(this.email, this.pwd, this.otp).subscribe(
        (res) => {
          this.user.emit(res);
        }
      );
      this.activeModal.close();
    }
  }

}
