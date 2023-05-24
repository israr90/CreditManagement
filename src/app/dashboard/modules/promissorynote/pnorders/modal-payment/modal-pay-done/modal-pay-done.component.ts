import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-pay-done',
  templateUrl: './modal-pay-done.component.html',
  styleUrls: ['./modal-pay-done.component.scss'],
})
export class ModalPayDoneComponent implements OnInit {
  @Input() name;
  @Input() errors;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    if (this.name == 'ok') {
      console.log(this.name);
      setTimeout(() => {
        console.log(this.name);
        this.modalService.dismissAll();
        this.router.navigateByUrl('/collect');
        window.location.reload()
      }, 4000);
    } else if (this.name == 'remain') {
      setTimeout(() => {
        // this.modalService.dismissAll();
      }, 4000);
    } else {
      setTimeout(() => {
        // this.modalService.dismissAll();
      }, 4000);
    }
  }
}
