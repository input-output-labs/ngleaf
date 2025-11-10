import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { MatTooltip } from "@angular/material/tooltip";
import { interval, take } from "rxjs";

import { copyToClipboard } from "./copy-to-clipboard.helper";

@Component({
  standalone: false,
  selector: "leaf-copy-to-clipboard",
  templateUrl: "./copy-to-clipboard.component.html",
  styleUrls: ["./copy-to-clipboard.component.scss"],
})
export class LeafCopyToClipboardComponent {
  @Input()
  public color: string;

  @Input()
  public icon = "clipboard_copy";

  @Input()
  public valueToCopy: any;

  @Input()
  public tooltipPosition: string = "below";

  @Output()
  public copySucceeded: EventEmitter<void> = new EventEmitter();

  @Output()
  public copyFailed: EventEmitter<any> = new EventEmitter();

  @ViewChild("tooltip")
  public tooltip: MatTooltip;

  public copiedSuccessfully: boolean = false;
  private copyToClipboardTranslationKey = "leaf.copy-to-clipboard";
  public tooltipContent: string =
    this.copyToClipboardTranslationKey + ".clickToCopy";
  public matTooltipHideDelay = 3000;

  async copy() {
    if (this.valueToCopy) {
      try {
        const copied = await copyToClipboard(this.valueToCopy);
        if (copied) {
          this.copiedSuccessfully = true;
          this.tooltipContent = this.copyToClipboardTranslationKey + ".copied";
          this.tooltip.show();
          this.copySucceeded.emit();
          interval(this.matTooltipHideDelay)
            .pipe(take(1))
            .subscribe(() => {
              this.tooltipContent =
                this.copyToClipboardTranslationKey + ".clickToCopy";
            });
        }
      } catch (error: any) {
        this.tooltipContent = this.copyToClipboardTranslationKey + ".error";
        this.tooltip.show();
        this.copyFailed.emit(error);
      }
    }
  }
}
