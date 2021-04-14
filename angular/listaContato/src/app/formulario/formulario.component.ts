import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,Optional
} from '@angular/core'
import { MatBottomSheetRef } from '@angular/material/bottom-sheet'
import { ListaComponent } from '../lista/lista.component'
import '../lista/lista.component.css'
import { UserData } from '../user-data'
import { AppComponent } from '../app.component'
import '../app.component.css'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { UsuarioServiceService } from '../usuario-service.service'
import { MatTable } from '@angular/material/table'

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null,
  ): boolean {
    const isSubmitted = form && form.submitted
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    )
  }
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  durationInSeconds = 5
  colorControl = new FormControl('primary')
  action:string;
  local_data:any;
  constructor(
    public dialogRef: MatDialogRef<FormularioComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UserData,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private usuarioServiceService: UsuarioServiceService

  ) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }
  errors: any = []
  users: any = []
  ids!: number;
  name!: string;
  email!: string;
  telefone!: string;

  @Output() user = new EventEmitter<any>()
  forms!: FormGroup
  matcher = new MyErrorStateMatcher()
  @Input() id?: number
  @ViewChild(MatTable, {static: true}) datable!: MatTable<any>;

  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  ngOnInit() {
    const edit = this.usuarioServiceService.editUser(this.data.id);
    if( this.data.id){
      this.forms = this.fb.group({
        nome: [edit?.name, Validators.required],
        email: [edit?.email],
        telefone: [edit?.telefone, Validators.required],
      })

    }else{
      console.log('data: ' + this.data.id)
      this.forms = this.fb.group({
        nome: [null, Validators.required],
        email: [null],
        telefone: [null, Validators.required],
      })

    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    })
  }
  onSubmit() {
    let id = Math.random();
    if (this.forms.valid) {
      if( this.data.id){
        this.usuarioServiceService.openSnackBar('Editado com sucesso! ', 'Sair')
        this.name = this.forms.value.nome;
        this.usuarioServiceService.editUserSave(
          {
            id: this.data.id,
            name: this.name,
            email: this.forms.value.email,
            telefone: this.forms.value.telefone,
          },
        );

      }else{
        this.usuarioServiceService.openSnackBar('Salvo com sucesso! ', 'Sair')
        this.name = this.forms.value.nome;
        this.usuarioServiceService.saveUser(
          {
            id: id,
            name: this.name,
            email: this.forms.value.email,
            telefone: this.forms.value.telefone,
          },
        );

      }


    } else {
      this.errors = []
      var errorRequired

      for (let error in this.forms.controls) {
        errorRequired = this.forms.controls[error].errors
        if (this.forms.controls[error].errors !== null) {
          this.errors.push({
            nome: error,
            errors: errorRequired,
          })
        }
      }
    }
  }
}
