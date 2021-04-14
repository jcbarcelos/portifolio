import { Component, Inject, OnInit } from '@angular/core'
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'
import { UsuarioServiceService } from 'src/app/usuario-service.service'

export interface DialogData {
  animal: string
  name: string
}

@Component({
  selector: 'app-snack-alert',
  templateUrl: './snack-alert.component.html',
  styleUrls: ['./snack-alert.component.css'],
})
export class SnackAlertComponent implements OnInit {
  mensagem!: string

  constructor(
    public dialogRef: MatDialogRef<SnackAlertComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.mensagem = data['mensagem']
  }

  onNoClick(status:any): void {
    this.dialogRef.close({data: status})
  }

  ngOnInit(): void {}
}
