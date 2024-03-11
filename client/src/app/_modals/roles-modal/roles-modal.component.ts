import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css'],
  standalone: true,
  imports: [ModalModule, CommonModule, FormsModule]
})
export class RolesModalComponent implements OnInit {
  username = '';
  availableRoles: any[] = [];
  selectedRoles: any = [];

  public bsModalRef = inject(BsModalRef);

  constructor() { }

  ngOnInit() {
  }

  updatedChecked(checkedValue: string){
    const index = this.selectedRoles.indexOf(checkedValue);

    index !== -1 ? this.selectedRoles.splice(index, 1) : this.selectedRoles.push(checkedValue);
  }

}
