import { loadRemoteModule } from '@angular-architects/module-federation';
import {
  Component,
  ComponentRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Cast } from 'shared-lib';

@Component({
  selector: 'app-mfe-cast-components',
  templateUrl: './mfe-cast-components.component.html',
  styleUrls: ['./mfe-cast-components.component.scss'],
})
export class MfeCastComponentsComponent implements OnInit {
  @ViewChild('placeHolder', { read: ViewContainerRef })
  viewContainer!: ViewContainerRef;

  @Input() cast: Cast[] = [];
  constructor() {}

  ngOnInit(): void {
    this.load();
  }

  async load(): Promise<void> {
    const m = await loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4203/remoteEntry.js',
      exposedModule: './Component',
    });

    const ref: ComponentRef<{ cast: Cast[] }> =
      this.viewContainer.createComponent(m.CastComponent);
    const compInstance = ref.instance;
    compInstance.cast = this.cast;
  }
}
