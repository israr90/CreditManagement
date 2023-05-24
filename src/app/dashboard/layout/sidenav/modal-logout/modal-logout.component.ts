import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal-logout',
  templateUrl: './modal-logout.component.html',
  styleUrls: ['./modal-logout.component.scss'],
})
export class ModalLogoutComponent {

  @Input() name;
  @Output() semdToConfirm = new EventEmitter<string>();

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private router: Router
  ) {}

  confirm() {
    this.semdToConfirm.emit();
  }
}
