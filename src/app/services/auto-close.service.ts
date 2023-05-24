import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCloseSessionComponent } from '../dashboard/layout/modal-close-session/modal-close-session.component';

@Injectable({
  providedIn: 'root'
})
export class AutoCloseService {

  constructor(
    private modalService: NgbModal,

  ) { }


  // ngOnInit(): void {
  //   setTimeout(() => {
  //     const modalRef = this.modalService.open(ModalCloseSessionComponent);
  //     modalRef.componentInstance.name = 'autoclose';
  //   }, sessionEndMillesecnd);
  // }


}
