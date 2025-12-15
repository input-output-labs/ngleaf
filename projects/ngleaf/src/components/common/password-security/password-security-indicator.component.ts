import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LeafPasswordSecurityLevel } from './password-security.models';
import { LeafPasswordSecurityService } from './password-security.service';

@Component({
  standalone: false,
  selector: 'leaf-password-security-indicator',
  templateUrl: './password-security-indicator.component.html',
  styleUrls: ['./password-security-indicator.component.scss']
})
export class LeafPasswordSecurityIndicatorComponent implements OnChanges, OnDestroy {
  @Input()
  public passwordControl?: AbstractControl | null;

  @Input()
  public minimumPasswordSecurity: LeafPasswordSecurityLevel | null = null;

  public passwordSecurityLevel: LeafPasswordSecurityLevel = 'weak';

  private subscription?: Subscription;

  constructor(private passwordSecurityService: LeafPasswordSecurityService) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Unsubscribe from previous subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.passwordControl) {
      // Subscribe to value changes
      this.subscription = this.passwordControl.valueChanges.subscribe((password: string) => {
        this.updateSecurityLevel(password || '');
      });
      
      // Initial update
      this.updateSecurityLevel(this.passwordControl.value || '');
    } else {
      this.passwordSecurityLevel = 'weak';
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private updateSecurityLevel(password: string): void {
    this.passwordSecurityLevel = this.passwordSecurityService.calculatePasswordSecurityLevel(password);
  }

  getPasswordSecurityLevelClass(): string {
    return this.passwordSecurityLevel;
  }

  isSecuritySegmentActive(segmentIndex: number): boolean {
    const levels: LeafPasswordSecurityLevel[] = ['weak', 'medium', 'strong', 'very-strong'];
    const currentLevelIndex = levels.indexOf(this.passwordSecurityLevel);
    return segmentIndex <= currentLevelIndex;
  }
}

