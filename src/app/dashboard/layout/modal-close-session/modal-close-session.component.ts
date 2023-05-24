import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal-close-session',
  templateUrl: './modal-close-session.component.html',
  styleUrls: ['./modal-close-session.component.scss'],
})
export class ModalCloseSessionComponent {
  @Input() type;
  @Input() minute;

  @Output() semdToConfirm = new EventEmitter<string>();

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private router: Router
  ) {}

  confirm() {
    this.semdToConfirm.emit();
  }

  closeSession() {
    localStorage.setItem('closeSession', 'yes');
    this.modalService.dismissAll();
    this.router.navigateByUrl('/close-register');
    window.location.reload();
  }
}
