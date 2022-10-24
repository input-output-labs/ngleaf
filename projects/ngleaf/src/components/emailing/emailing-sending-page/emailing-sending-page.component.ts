import { Component, OnInit, ViewChild } from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";

import { MatAccordion } from "@angular/material/expansion";
import { combineLatest, filter, map, Observable, startWith, take } from "rxjs";
import {
  EmailingApiClientService,
  LeafEmailingCategory,
} from "../../../api";
import {
  AsyncType,
  selectEmailBatch,
  selectEmailingCategories,
  selectTestEmailBatch,
  setEmailBatchCall,
  setEmailingCategoriesCall,
  setTestEmailBatchCall,
} from "../../../store";
import {
  LeafBatchCreationAction,
  LeafBatchCreationTestingReport,
} from "../../../api/models/emailing/index";

@Component({
  selector: "leaf-emailing-sending-page",
  templateUrl: "./emailing-sending-page.component.html",
  styleUrls: ["./emailing-sending-page.component.scss"],
})
export class EmailingSendingPageComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  public targetFormGroup: FormGroup = this.formBuilder.group({
    target: ["", Validators.required],
  });

  public contentFormGroup: FormGroup = this.formBuilder.group({
    title: ["", Validators.required],
    sengridId: ["", Validators.required],
  });
  public batchFormGroup: FormGroup = this.formBuilder.group({
    emailsPerHour: [
      "",
      [
        Validators.required,
        Validators.pattern("[0-9]*"),
        Validators.min(1),
        Validators.max(100),
      ],
    ],
  });
  public testFormGroup: FormGroup = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
  });

  public emailingCategories$: Observable<LeafEmailingCategory[]>;

  public testEmailBatch$: Observable<
    LeafBatchCreationTestingReport & { batchCount: number }
  >;
  public testEmailBatchOk$: Observable<boolean>;
  public testEmailBatchPending$: Observable<boolean>;
  public createEmailBatchPending$: Observable<boolean>;

  public testingPanelOpened = false;
  public testedOk: boolean = false;

  public recap$: Observable<LeafBatchCreationAction>;
  public currentRecap?: LeafBatchCreationAction;
  public testEmailBatchOk?: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private emailingApiClientService: EmailingApiClientService
  ) {
    this.emailingCategories$ = store.pipe(
      select(selectEmailingCategories),
      filter(
        (asyncItem: AsyncType<LeafEmailingCategory[]>) =>
          asyncItem.status.success
      ),
      map((asyncItem) => asyncItem.data)
    );
    this.testEmailBatch$ = store.pipe(
      select(selectTestEmailBatch),
      filter(
        (asyncItem: AsyncType<LeafBatchCreationTestingReport>) =>
          asyncItem.status.success
      ),
      map((asyncItem) => asyncItem.data),
      map((report) => ({
        ...report,
        batchCount: Math.ceil(
          report.targetAccountsCount / report.input.emailsPerHour
        ),
      }))
    );
    this.testEmailBatchPending$ = store.pipe(
      select(selectTestEmailBatch),
      map((asyncItem) => asyncItem.status.pending)
    );
    this.createEmailBatchPending$ = store.pipe(
      select(selectEmailBatch),
      map((asyncItem) => asyncItem.status.pending)
    );

    this.recap$ = combineLatest([
      this.emailingCategories$,
      this.targetFormGroup.valueChanges,
      this.contentFormGroup.valueChanges,
      this.batchFormGroup.valueChanges,
      this.testFormGroup.valueChanges.pipe(startWith({ email: undefined })),
    ]).pipe(
      map(
        ([
          categories,
          targetValues,
          contentValues,
          batchValues,
          testValues,
        ]) => ({
          target: categories.find((cat) => cat.id === targetValues.target),
          title: contentValues.title,
          sengridId: contentValues.sengridId,
          emailsPerHour: batchValues.emailsPerHour,
          testingEmailTarget: testValues.email,
        })
      )
    );
    this.recap$.subscribe((recap) => (this.currentRecap = recap));

    this.testEmailBatchOk$ = combineLatest([
      this.recap$,
      this.testEmailBatch$,
    ]).pipe(
      map(
        ([recap, report]) =>
          this.isValidReport(report) &&
          JSON.stringify(recap) === JSON.stringify(report.input)
      )
    );
    this.testEmailBatchOk$?.subscribe((val) => (this.testEmailBatchOk = val));
  }

  ngOnInit(): void {
    this.refreshCategories();
  }

  private isValidReport(report) {
    return (
      !!report &&
      report.targetOk &&
      report.titleOk &&
      report.emailsPerHourOk &&
      report.sendgridIdOk &&
      report.testingEmailTargetOk &&
      report.targetAccountsCount > 1
    );
  }

  private refreshCategories() {
    this.store.dispatch(
      setEmailingCategoriesCall({
        call: this.emailingApiClientService.fetchCategories(),
      })
    );
  }

  public sendingTestEmail() {
    if (this.testingPanelOpened) {
      if (this.testFormGroup.valid) {
        this.store.dispatch(
          setTestEmailBatchCall({
            call: this.emailingApiClientService.testEmailBatch(
              this.currentRecap
            ),
          })
        );
      }
    } else {
      this.testingPanelOpened = true;
    }
  }

  public sendingEmails() {
    this.testEmailBatch$.pipe(take(1)).subscribe((report) => {
      if (this.testEmailBatchOk) {
        this.store.dispatch(
          setEmailBatchCall({
            call: this.emailingApiClientService.emailBatch(report.input),
          })
        );
      }
    });
  }
}
