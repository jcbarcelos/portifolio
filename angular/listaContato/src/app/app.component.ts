import { UserData } from './user-data'
import { UsuarioServiceService } from './usuario-service.service'
import { ListaComponent } from './lista/lista.component'
import {
  Component,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  EventEmitter,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'Contato'
  constructor() {}
  @ViewChild(ListaComponent)
  private lista!: ListaComponent
  ngOnInit() {}
  openDialog(){
    this.lista.openDialog();
  }
}
