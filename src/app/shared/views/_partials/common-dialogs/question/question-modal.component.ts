import {Component} from '@angular/core';
import {MDBModalRef} from 'ng-uikit-pro-standard';
import {Subject} from 'rxjs';

@Component({
  selector: 'question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.scss']
})
export class QuestionModalComponent {
  title: string;
  message: string;
  yesButtonColor: string = 'btn-primary';
  noButtonColor: string = 'secondary';
  public yesButtonClicked: Subject<any> = new Subject<any>();

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

  doYes() {
    this.yesButtonClicked.next();
    this.modalRef.hide();
  }
}
