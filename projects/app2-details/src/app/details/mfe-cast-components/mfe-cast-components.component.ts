import { loadRemoteModule } from '@angular-architects/module-federation';
import {
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { Cast } from 'shared-lib';

@Component({
  selector: 'app-mfe-cast-components',
  templateUrl: './mfe-cast-components.component.html',
  styleUrls: ['./mfe-cast-components.component.scss'],
})
export class MfeCastComponentsComponent implements OnInit, OnDestroy {
  @ViewChild('placeHolder', { read: ViewContainerRef })
  viewContainer!: ViewContainerRef;

  stop$: Subject<void> = new Subject<void>();

  @Input() cast: Cast[] = [];
  @Output() actor: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.load();
  }

  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }

  async load(): Promise<void> {
    const m = await loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4203/remoteEntry.js',
      exposedModule: './Component',
    });

    const ref: ComponentRef<{ cast: Cast[]; actor: Observable<string> }> =
      this.viewContainer.createComponent(m.CastComponent);
    const compInstance = ref.instance;
    compInstance.cast = this.cast;
    compInstance.actor
      .pipe(takeUntil(this.stop$))
      .subscribe((value) => this.actor.emit(value));
  }
}
