import { Component } from '@angular/core';
import { Member } from 'src/modeles/Member';
import { MemberService } from 'src/services/member.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-moal-member',
  templateUrl: './modal-mem.component.html',
  styleUrls: ['./modal-mem.component.css']
})
export class MoalMemberComponent {
  foods: Member[] = [];
  selectedValue: string = "";

  constructor(
    private MS: MemberService,
    private dialogRef: MatDialogRef<MoalMemberComponent>
  ) {
    this.MS.GetAllMembers().subscribe((data) => {
      this.foods = data;
    });
  }

  valider() {
    this.dialogRef.close(this.selectedValue);
  }

  annuler() {
    this.dialogRef.close();
  }
}
