import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { combineLatest, filter, map, Observable, of, skip, take } from "rxjs";
import { EmailingApiClientService, LeafEmailingCategory } from "../../../api";
import { AsyncType, selectEmailingCategories, selectEmailingCategoryAction, setEmailingCategoriesCall, setEmailingCategoryActionCall } from "../../../store";
import { GenericFormConfig } from "../../common/generic-form/generic-form.component";

@Component({
  selector: "leaf-emailing-categories-page",
  templateUrl: "./emailing-categories-page.component.html",
  styleUrls: ["./emailing-categories-page.component.scss"],
})
export class EmailingCategoriesPageComponent implements OnInit{
  public formGroup: FormGroup;
  public formConfig: GenericFormConfig = {
    grid: {
      cols: 5,
      gutterSize: '1rem'
    },
    inputs: [
      {
        id: 'name',
        type: 'input',
        placeholderKey: 'Nom',
        colspan: 2
      },
      {
        id: 'description',
        type: 'input',
        placeholderKey: 'Description',
        colspan: 2
      }
    ],
    actions: [
      {
        id: 'submit',
        labelKey: 'Créer categorie',
        color: 'primary'
      }
    ]
  };
  displayedColumns: string[] = ['name', 'description', 'actions'];
  public emailingCategories$: Observable<LeafEmailingCategory[]>;
  public actionPending$: Observable<boolean>;

  constructor(formBuilder: FormBuilder, private store: Store, private emailingApiClientService: EmailingApiClientService) {
    this.formGroup = formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });
    this.emailingCategories$ = store.pipe(
      select(selectEmailingCategories),
      filter((asyncItem: AsyncType<LeafEmailingCategory[]>) => asyncItem.status.success),
      map((asyncItem) => asyncItem.data)
    );
    this.actionPending$ = combineLatest(
      [
        this.store.pipe(
          select(selectEmailingCategoryAction),
          map((asyncItem) => asyncItem.status.pending),
        ),
        this.store.pipe(
          select(selectEmailingCategories),
          map((asyncItem) => asyncItem.status.pending),
        )
      ],
      (refreshPending, actionPending) => refreshPending || actionPending
    );
  }

  ngOnInit(): void {
    this.refreshCategories();
  }

  private refreshCategories() {
    this.store.dispatch(setEmailingCategoriesCall({
      call: this.emailingApiClientService.fetchCategories()
    }));
  }

  public onActionClicked(action) {
    if (action && action.valid && action.actionId === 'submit') {
      const emailingCategory = this.formGroup.getRawValue();
      this.store.dispatch(setEmailingCategoryActionCall({
        call: this.emailingApiClientService.createCategory(emailingCategory)
      }));

      this.store.pipe(
        select(selectEmailingCategoryAction),
        skip(1),
        filter((asyncItem) => !asyncItem.status.pending),
        take(1)
      ).subscribe(() => this.refreshCategories());
    }
  }

  public deleteEmailingCategory(emailingCategory) {
    this.store.dispatch(setEmailingCategoryActionCall({
      call: this.emailingApiClientService.deleteCategory(emailingCategory.id)
    }));

    this.store.pipe(
      select(selectEmailingCategoryAction),
      skip(1),
      filter((asyncItem) => !asyncItem.status.pending),
      take(1)
    ).subscribe(() => this.refreshCategories());
  }
}
