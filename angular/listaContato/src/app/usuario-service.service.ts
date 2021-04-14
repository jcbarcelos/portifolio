import { EventEmitter, Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { UserData } from './user-data'
import { SnackAlertComponent } from './shared/snack-alert/snack-alert.component'

@Injectable({
  providedIn: 'root',
})
export class UsuarioServiceService {
  novoUser = new EventEmitter<any>()
  static novoUserCriado = new EventEmitter<any>()
  users: any[] = [
    {
      id: 1,
      name: 'Hydron',
      email: 'hydron@email.com',
      telefone: '21991173820',
    },
    {
      id: 2,
      name: 'Hydron2',
      email: 'hydro2n@email.com',
      telefone: '21991173829',
    },
  ]
  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog) {
    this.users
  }

  public getUser(): UserData[] {
    return this.users
  }
  public saveUser(data: any) {
    let user = data
    this.users.push(user)
    this.novoUser.emit(user)
    UsuarioServiceService.novoUserCriado.emit(user)
  }
  public editUser(id: number) {
    return this.users.find((u) => u.id == id)
  }
  public editUserSave(data: any) {
    let user
    this.users.filter((u, i) =>
      u.id === data.id ? (this.users[i] = data) : null,
    )
    user = this.users
    UsuarioServiceService.novoUserCriado.emit(user)
  }
  public deleteUser(data: any) {
    let user

    this.users.find((c, i) => {
      if (c !== undefined) {
        if (c.id === data.id) {
          console.log('c ' + c)
          console.log('i ' + i)
          this.users.splice(i, 1)
        }
      }
    })

    user = this.users
    this.novoUser.emit(user)
    UsuarioServiceService.novoUserCriado.emit(user)
  }
  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['snackBar'],
    })
  }

  public openAlert(mensagem: string) {
    const dialogRef = this.dialog.open(SnackAlertComponent, {
      width: '250px',
      data: {
        mensagem: mensagem,
      },
    })

    dialogRef.afterClosed().subscribe((result) => this.novoUser.emit(result))
  }
}
