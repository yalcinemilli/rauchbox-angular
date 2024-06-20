import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-qrcode-modal',
  templateUrl: './qrcode-modal.component.html',
  styleUrls: ['./qrcode-modal.component.css']
})
export class QrcodeModalComponent implements OnInit {

  @Input() qrcode: string;
  save = new EventEmitter<boolean>();
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
   // this.qrCode = `otpauth://totp/2FA-Demo:${this.secretCode}?secret=${this.secretCode}&issuer=2FA-Demo`;
  }

  onSubmit() {
    this.save.emit(true);
    this.activeModal.close();
  }
}
