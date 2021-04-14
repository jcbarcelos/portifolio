import {
  AfterViewChecked,
  InjectionToken,
  ViewChild,
  ChangeDetectorRef,
  Optional,
} from '@angular/core'
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Inject,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTable, MatTableDataSource } from '@angular/material/table'

import { FormularioComponent } from '../formulario/formulario.component'
import { UserData } from '../user-data'
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'
import { UsuarioServiceService } from '../usuario-service.service'
import './lista.component.css'
import { MatSnackBar } from '@angular/material/snack-bar'
import { SnackAlertComponent } from '../shared/snack-alert/snack-alert.component'
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit, AfterViewInit {
  @Output() showFiller = new EventEmitter<any>()
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatTable, { static: true }) datable!: MatTable<any>
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UserData,
    public dialog: MatDialog,
    private usuarioServiceService: UsuarioServiceService,
    private changeDetectorRefs: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
  ) {
    this.user
  }

  @Input() user!: UserData[]

  displayedColumns: string[] = ['id', 'name', 'email', 'telefone', 'acoes']
  dataSource = new MatTableDataSource<UserData>(this.user)

  ngOnInit(): void {
    this.user = this.usuarioServiceService.getUser()
    this.refresh()
  }
  openDialog(id?: number) {
    this.dialog
      .open(FormularioComponent, {
        height: '300px',
        width: '600px',
        data: {
          id: id,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        console.log(`Dialog result: ${result}`)
        this.refresh()
      })
  }
  refresh() {
    UsuarioServiceService.novoUserCriado.subscribe((user) => {
      this.dataSource.data = this.user
      this.datable.renderRows()
      this.changeDetectorRefs.detectChanges()
    })
  }

  delete(id: number) {
   this.usuarioServiceService.openAlert('Deseja excluir')
    this.usuarioServiceService.novoUser.subscribe((user) => {

      if (user['data']) {
        const edit = this.usuarioServiceService.editUser(id)
        this.usuarioServiceService.deleteUser(edit)
        this.refresh()
        this.usuarioServiceService.openSnackBar(
          'Excluido com sucesso! ',
          'Sair',
        )
      }
    })
  }
  async ngAfterViewInit() {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator

    for (let u in this.usuarioServiceService.users) {
      this.dataSource.data.push(this.user[u])
    }
    this.dataSource.sort = this.sort
    this.usuarioServiceService.novoUser.subscribe((u) => {
      return this.datable.renderRows()
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }
}
