import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal-reset',
  templateUrl: './modal-reset.component.html',
  styleUrls: ['./modal-reset.component.scss'],
})
export class ModalResetComponent {
  @Input() name;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private router: Router
  ) {}
  ngOnInit(): void {
    console.log(this.name);

    // setTimeout(() => {
    //   this.modalService.dismissAll();
    //   this.router.navigateByUrl('/login');
    // }, 5000);
  }

  login() {
    this.modalService.dismissAll();
    this.router.navigateByUrl('/login');
  }
}
