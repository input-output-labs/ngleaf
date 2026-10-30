import { Component, DestroyRef, Injector, OnInit, Provider, TemplateRef, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';
import { DemoUiConfigService } from '../ui-config/demo-ui-config.service';
import { ShowcaseEntry, findShowcaseEntry } from './showcase.catalog';
import {
  ShowcaseInputContext,
  ShowcaseInputField,
  SHOWCASE_INPUTS,
  cloneShowcaseFields,
  createShowcaseInputContext,
  resolveShowcaseInputs,
} from './showcase-inputs';

const dialogRefStub = {
  close: () => {},
  afterClosed: () => EMPTY,
  backdropClick: () => EMPTY,
  keydownEvents: () => EMPTY,
  updatePosition: () => {},
  updateSize: () => {},
  addPanelClass: () => {},
  removePanelClass: () => {},
};

@Component({
  standalone: false,
  selector: 'app-showcase-page',
  templateUrl: './showcase-page.component.html',
  styleUrls: ['./showcase-page.component.scss'],
})
export class ShowcasePageComponent implements OnInit {
  entry?: ShowcaseEntry;
  fields: ShowcaseInputField[] = [];
  context?: ShowcaseInputContext;
  renderedInputs: Record<string, unknown> = {};
  renderSlot = [0];
  outletInjector?: Injector;

  @ViewChild('sampleTpl') sampleTpl?: TemplateRef<unknown>;

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private injector: Injector,
    uiConfig: DemoUiConfigService,
  ) {
    uiConfig.changes$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.renderSlot = [this.renderSlot[0] + 1];
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.entry = findShowcaseEntry(params.get('group'), params.get('id'));
      this.fields = cloneShowcaseFields(this.entry ? SHOWCASE_INPUTS[this.entry.id] : undefined);
      this.context = createShowcaseInputContext(this.fields);
      this.context.sampleTemplate = this.sampleTpl;
      this.renderedInputs = resolveShowcaseInputs(this.fields, this.context);
      this.outletInjector = this.entry ? this.buildInjector(this.entry) : undefined;
      this.renderSlot = [this.renderSlot[0] + 1];
    });
  }

  onInputs(event: { inputs: Record<string, unknown>; recreate: boolean }): void {
    if (this.context) {
      this.context.sampleTemplate = this.sampleTpl;
    }
    this.renderedInputs = event.inputs;
    if (event.recreate) {
      this.renderSlot = [this.renderSlot[0] + 1];
    }
  }

  private buildInjector(entry: ShowcaseEntry): Injector {
    const providers: Provider[] = [
      { provide: MatDialogRef, useValue: dialogRefStub },
    ];
    if (entry.dialogData !== undefined) {
      providers.push({ provide: MAT_DIALOG_DATA, useValue: entry.dialogData });
    }
    return Injector.create({ providers, parent: this.injector });
  }
}
