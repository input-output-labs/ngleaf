import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LeafPasswordSecurityLevel } from './password-security.models';

@Injectable({
  providedIn: 'root'
})
export class LeafPasswordSecurityService {
  constructor(private translateService: TranslateService) {}

  /**
   * Calculate the security level of a password
   */
  calculatePasswordSecurityLevel(password: string): LeafPasswordSecurityLevel {
    if (!password || password.length === 0) {
      return 'weak';
    }

    const length = password.length;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[^a-zA-Z0-9]/.test(password);
    const hasMediumLength = length >= 8;
    const hasStrongLength = length >= 10;

    const criteriaCount = [hasLowercase, hasUppercase, hasNumbers, hasSpecialChars, hasMediumLength, hasStrongLength].filter(Boolean).length;

    if (criteriaCount >= 6) {
      return 'very-strong';
    } else if (criteriaCount >= 5 && hasMediumLength) {
      return 'strong';
    } else if (criteriaCount >= 3 && hasMediumLength) {
      return 'medium';
    } else {
      return 'weak';
    }
  }

  /**
   * Get numeric value for security level comparison
   */
  getSecurityLevelValue(level: LeafPasswordSecurityLevel): number {
    const levelValues: Record<LeafPasswordSecurityLevel, number> = {
      'weak': 1,
      'medium': 2,
      'strong': 3,
      'very-strong': 4
    };
    return levelValues[level];
  }

  /**
   * Create a validator function for minimum password security level
   */
  createPasswordSecurityValidator(minimumLevel: LeafPasswordSecurityLevel): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // Let required validator handle empty values
      }

      const currentLevel = this.calculatePasswordSecurityLevel(control.value);
      const currentLevelValue = this.getSecurityLevelValue(currentLevel);
      const minimumLevelValue = this.getSecurityLevelValue(minimumLevel);

      if (currentLevelValue < minimumLevelValue) {
        return {
          minimumPasswordSecurity: {
            required: minimumLevel,
            actual: currentLevel
          }
        };
      }

      return null;
    };
  }

  /**
   * Get security tips based on password and required level
   */
  getPasswordSecurityTips(password: string, requiredLevel: LeafPasswordSecurityLevel): string {
    const tips: string[] = [];
    const length = password.length;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[^a-zA-Z0-9]/.test(password);

    // Determine minimum requirements based on level
    const minLength = requiredLevel === 'very-strong' ? 10 : requiredLevel === 'strong' ? 8 : requiredLevel === 'medium' ? 6 : 4;
    const needsUppercase = requiredLevel === 'very-strong' || requiredLevel === 'strong';
    const needsSpecialChars = requiredLevel === 'very-strong' || requiredLevel === 'strong';
    const needsNumbers = requiredLevel !== 'weak';

    if (length < minLength) {
      tips.push(this.translateService.instant('leaf.register.passwordSecurity.tips.minLength', { count: minLength }));
    }
    if (needsUppercase && !hasUppercase) {
      tips.push(this.translateService.instant('leaf.register.passwordSecurity.tips.uppercase'));
    }
    if (needsNumbers && !hasNumbers) {
      tips.push(this.translateService.instant('leaf.register.passwordSecurity.tips.numbers'));
    }
    if (needsSpecialChars && !hasSpecialChars) {
      tips.push(this.translateService.instant('leaf.register.passwordSecurity.tips.specialChars'));
    }
    if (!hasLowercase) {
      tips.push(this.translateService.instant('leaf.register.passwordSecurity.tips.lowercase'));
    }

    return tips.length > 0 ? tips.join(', ') : '';
  }

  /**
   * Get error message for minimum password security requirement
   */
  getMinimumPasswordSecurityErrorMessage(
    password: string,
    requiredLevel: LeafPasswordSecurityLevel,
    actualLevel: LeafPasswordSecurityLevel
  ): string {
    const requiredKey = `leaf.register.passwordSecurity.${requiredLevel === 'very-strong' ? 'veryStrong' : requiredLevel}`;
    const actualKey = `leaf.register.passwordSecurity.${actualLevel === 'very-strong' ? 'veryStrong' : actualLevel}`;
    
    const required = this.translateService.instant(requiredKey);
    const actual = this.translateService.instant(actualKey);
    
    // Get tips based on what's missing
    const tips = this.getPasswordSecurityTips(password, requiredLevel);
    
    const messageKey = 'leaf.register.passwordSecurity.minimumRequired';
    const tipsPrefix = this.translateService.instant('leaf.register.passwordSecurity.tips.prefix');
    
    const tipsText = tips ? ` ${tipsPrefix} ${tips}` : '';
    
    return this.translateService.instant(messageKey, { required, actual, tips: tipsText });
  }
}

