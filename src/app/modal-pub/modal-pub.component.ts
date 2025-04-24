import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-pub',
  templateUrl: './modal-pub.component.html',
  styleUrls: ['./modal-pub.component.css']
})
export class ModalPubComponent {
  form: FormGroup;

  types = [
    { value: 'Conf', viewValue: 'Conférence' },
    { value: 'Journal', viewValue: 'Journal' },
    { value: 'Magazine', viewValue: 'Magazine' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalPubComponent>
  ) {
    this.form = this.fb.group({
      titre: ['', Validators.required],
      type: ['', Validators.required],
      date: ['', Validators.required],
      lien: ['', Validators.required],
      sourcePdf: ['', Validators.required]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
