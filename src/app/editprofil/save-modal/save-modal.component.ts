import { Component, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-save-modal',
  templateUrl: './save-modal.component.html',
  styleUrls: ['./save-modal.component.css']
})
export class SaveModalComponent {

  answer = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal) { }

  onSubmit() {
    this.answer.emit(true);
 
    this.activeModal.close();
  }


}
