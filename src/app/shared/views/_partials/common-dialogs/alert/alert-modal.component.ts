import {Component} from '@angular/core';
import {MDBModalRef} from 'ng-uikit-pro-standard';
import {Subject} from 'rxjs';

@Component({
  selector: 'alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent {
  title: string;
  message: string;
  yesButtonColor: string = 'primary';
  public yesButtonClicked: Subject<any> = new Subject<any>();

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

  doYes() {
    this.yesButtonClicked.next();
    this.modalRef.hide();
  }
}
