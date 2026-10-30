import { TemplateRef } from '@angular/core';
import { FormControl, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

export type ShowcaseInputKind =
  | 'boolean'
  | 'string'
  | 'number'
  | 'select'
  | 'json'
  | 'list'
  | 'validators'
  | 'control'
  | 'template'
  | 'trigger';

export interface ShowcaseInputOption {
  label: string;
  value: string;
}

export interface ShowcaseInputField {
  name: string;
  kind: ShowcaseInputKind;
  value?: unknown;
  options?: ShowcaseInputOption[];
  nullable?: boolean;
  optional?: boolean;
  wide?: boolean;
}

export interface ShowcaseInputContext {
  jsonText: Record<string, string>;
  jsonError: Record<string, string>;
  controls: Map<string, FormControl<string | null>>;
  triggers: Map<string, Subject<void>>;
  sampleTemplate?: TemplateRef<unknown>;
}

const appearance: ShowcaseInputOption[] = [
  { label: 'fill', value: 'fill' },
  { label: 'outline', value: 'outline' },
];

const security: ShowcaseInputOption[] = [
  { label: 'aucun', value: '' },
  { label: 'weak', value: 'weak' },
  { label: 'medium', value: 'medium' },
  { label: 'strong', value: 'strong' },
  { label: 'very-strong', value: 'very-strong' },
];

const validatorOptions: ShowcaseInputOption[] = [
  { label: 'requis', value: 'required' },
  { label: 'email', value: 'email' },
  { label: 'min 6', value: 'min6' },
  { label: 'aucun', value: 'none' },
];

const palette: ShowcaseInputOption[] = [
  { label: 'primary', value: 'primary' },
  { label: 'accent', value: 'accent' },
  { label: 'warn', value: 'warn' },
];

const variant: ShowcaseInputOption[] = [
  { label: 'material', value: 'material' },
  { label: 'vanilla', value: 'vanilla' },
];

const menuX: ShowcaseInputOption[] = [
  { label: 'before', value: 'before' },
  { label: 'after', value: 'after' },
];

const menuY: ShowcaseInputOption[] = [
  { label: 'above', value: 'above' },
  { label: 'below', value: 'below' },
];

const attachment: ShowcaseInputOption[] = [
  { label: 'ORGANIZATION', value: 'ORGANIZATION' },
  { label: 'USER', value: 'USER' },
];

const tooltip: ShowcaseInputOption[] = [
  { label: 'above', value: 'above' },
  { label: 'below', value: 'below' },
  { label: 'left', value: 'left' },
  { label: 'right', value: 'right' },
  { label: 'before', value: 'before' },
  { label: 'after', value: 'after' },
];

const datePosition: ShowcaseInputOption[] = [
  { label: 'topRight', value: 'topRight' },
  { label: 'topLeft', value: 'topLeft' },
  { label: 'bottomRight', value: 'bottomRight' },
  { label: 'bottomLeft', value: 'bottomLeft' },
];

const profileFields = 'companyName, username, avatarUrl, firstname, lastname, phoneNumber, billingEmail, address, corporate, registrationNumber, taxId';
const mandatoryFields = 'username, avatarUrl, firstname, lastname, phoneNumber, address';

const samplePlan = {
  name: 'pro',
  color: '#111111',
  available: true,
  defaultPlan: false,
  features: [{ name: 'seats', type: 'number', value: '5' }],
  descriptions: ['demo'],
  pricing: { price: 12, period: 'month', free: false, vatIncluded: true },
  suspended: false,
  trialDuration: 14,
  startedAt: new Date(),
  inTrial: false,
};

const sampleService = {
  attachmentType: 'USER',
  attachedTo: 'demo',
  key: 'seat',
  icon: 'person',
  unitPrice: 1200,
  quantity: 2,
  automaticQuantities: false,
  useSubscription: true,
};

const sampleNotification = {
  id: 'demo',
  code: 'info',
  targetAccountId: 'demo',
  creationDate: new Date(),
  payload: {},
  channelSendingStatus: { UI: 'CREATED', EMAIL: 'SKIP_NO_CONFIG', WS: 'SKIP_NO_CONFIG' },
};

const sampleAccount = {
  id: 'demo',
  email: 'demo@leaf.test',
  profile: { username: 'demo' },
  modules: { sponsoring: { sponsorCode: 'DEMO' } },
};

const planViewerConfig = {
  selectableWithButton: false,
  showFeatures: false,
  showDescription: true,
  showTrialDuration: true,
};

const genericConfig = {
  titleKey: 'Démo',
  inputs: [{ id: 'label', type: 'input', labelKey: 'Libellé', appearance: 'outline' }],
};

const languages = {
  en: { languageCode: 'en', translationKey: 'English', iconPath: '/assets/i18n/en.png' },
  fr: { languageCode: 'fr', translationKey: 'Français', iconPath: '/assets/i18n/fr.png' },
};

function input(
  name: string,
  kind: ShowcaseInputKind,
  value?: unknown,
  extra?: Partial<ShowcaseInputField>,
): ShowcaseInputField {
  return { name, kind, value, ...extra };
}

export const SHOWCASE_INPUTS: Record<string, ShowcaseInputField[]> = {
  'leaf-navigation': [
    input('title', 'string', 'Démo'),
    input('links', 'json', [{ link: '/demo/ui/leaf-navigation', label: 'Accueil' }], { wide: true }),
    input('headerTemplate', 'template', false),
    input('contentTemplate', 'template', false),
  ],
  'leaf-generic-form': [
    input('config', 'json', genericConfig, { wide: true }),
    input('formGroup', 'json', { label: 'Démo' }, { wide: true }),
  ],
  'leaf-icon-input': [
    input('fieldAppearance', 'select', 'fill', { options: appearance }),
    input('placeholder', 'string', 'Select an icon'),
    input('required', 'boolean', false),
  ],
  'leaf-address-form': [
    input('fieldAppearance', 'select', 'fill', { options: appearance }),
  ],
  'leaf-phone-number-form-field': [
    input('countryCodes', 'list', '', { nullable: true }),
    input('appearance', 'select', 'fill', { options: appearance }),
    input('alignHorizontally', 'boolean', true),
  ],
  'leaf-password-security-indicator': [
    input('passwordControl', 'control', 'S3cret-leaf'),
    input('minimumPasswordSecurity', 'select', '', { options: security, nullable: true }),
  ],
  'leaf-copy-to-clipboard': [
    input('valueToCopy', 'string', 'leaf'),
    input('icon', 'string', 'content_copy'),
    input('color', 'string', ''),
    input('tooltipPosition', 'select', 'below', { options: tooltip }),
  ],
  'leaf-select-language': [
    input('defaultLanguageCode', 'string', 'en'),
    input('useNavigatorLanguageAsDefault', 'boolean', true),
    input('reduced', 'boolean', false),
    input('placeholderTranslationKeyMenu', 'string', 'leaf.select-language.menu'),
    input('languageCodesPerLangue', 'json', languages, { wide: true }),
  ],

  'leaf-login': [
    input('variant', 'select', 'material', { options: variant }),
    input('color', 'select', 'primary', { options: palette }),
    input('loginInitialValue', 'string', ''),
    input('enablePasswordCheck', 'boolean', false),
    input('skipRedirect', 'boolean', false),
    input('loginValidators', 'validators', 'required', { options: validatorOptions }),
    input('passwordValidators', 'validators', 'required', { options: validatorOptions }),
    input('passwordCheckClasses', 'json', null, { optional: true, wide: true }),
  ],
  'leaf-register': [
    input('variant', 'select', 'material', { options: variant }),
    input('loginInitialValue', 'string', ''),
    input('passwordConfirmation', 'boolean', true),
    input('enablePasswordCheck', 'boolean', false),
    input('showPasswordSecurityLevel', 'boolean', true),
    input('minimumPasswordSecurity', 'select', 'strong', { options: security, nullable: true }),
    input('skipRedirect', 'boolean', false),
    input('loginValidators', 'validators', 'required', { options: validatorOptions }),
    input('passwordValidators', 'validators', 'required', { options: validatorOptions }),
    input('passwordCheckClasses', 'json', null, { optional: true, wide: true }),
  ],
  'leaf-password-forgotten': [
    input('color', 'select', 'primary', { options: palette }),
    input('emailInitialValue', 'string', ''),
    input('showPasswordSecurityLevel', 'boolean', true),
    input('minimumPasswordSecurity', 'select', 'medium', { options: security, nullable: true }),
    input('emailValidators', 'validators', 'required', { options: validatorOptions }),
    input('passwordValidators', 'validators', 'required', { options: validatorOptions }),
    input('passwordChangeKeyValidators', 'validators', 'required', { options: validatorOptions }),
  ],
  'leaf-password-forgotten-vanilla': [
    input('emailValidators', 'validators', 'required', { options: validatorOptions }),
    input('passwordValidators', 'validators', 'required', { options: validatorOptions }),
    input('passwordChangeKeyValidators', 'validators', 'required', { options: validatorOptions }),
  ],
  'leaf-password-update': [
    input('showPasswordSecurityLevel', 'boolean', true),
    input('minimumPasswordSecurity', 'select', 'medium', { options: security, nullable: true }),
  ],
  'leaf-email-verification': [
    input('submitTrigger$', 'trigger'),
  ],
  'leaf-profile-update': [
    input('target', 'select', 'account', {
      options: [
        { label: 'account', value: 'account' },
        { label: 'organization', value: 'organization' },
        { label: 'profil fourni', value: 'profile' },
      ],
    }),
    input('fieldAppearance', 'select', 'fill', { options: appearance }),
    input('separateColumnForAvatar', 'boolean', true),
    input('hideGroupTitles', 'boolean', false),
    input('fields', 'list', profileFields, { wide: true }),
    input('mandatoryFields', 'list', mandatoryFields, { wide: true }),
    input('countryCodes', 'list', '', { nullable: true }),
    input('submitTrigger$', 'trigger'),
  ],
  'leaf-account-popover-content': [
    input('username', 'string', 'demo'),
    input('avatarUrl', 'string', 'https://png.pngtree.com/svg/20161013/dpi_user_default_avatar_116868.png', { wide: true }),
  ],

  'leaf-organization-selector': [
    input('design', 'select', 'widget', {
      options: [
        { label: 'widget', value: 'widget' },
        { label: 'cards', value: 'cards' },
      ],
    }),
    input('reduced', 'boolean', true),
    input('hideWhenNotLoggedIn', 'boolean', false),
    input('fetchOnInit', 'boolean', false),
    input('menuXPosition', 'select', 'before', { options: menuX }),
    input('menuYPosition', 'select', 'above', { options: menuY }),
    input('adminCompleteMode', 'select', 'search', {
      options: [
        { label: 'always', value: 'always' },
        { label: 'search', value: 'search' },
        { label: 'never', value: 'never' },
      ],
    }),
  ],
  'leaf-organization-invitation': [
    input('organizationId', 'string', ''),
    input('email', 'string', ''),
  ],
  'leaf-organization-candidature': [
    input('organizationId', 'string', ''),
    input('role', 'string', ''),
  ],

  'leaf-admin-settings-users': [
    input('showGenericDataHelper', 'boolean', false),
    input('expectedGenericDataKeys', 'list', '', { optional: true, wide: true }),
    input('extraDataTemplate', 'template', false),
    input('extraActionTemplate', 'template', false),
  ],
  'leaf-user-selector': [
    input('placeholder', 'string', 'Username'),
    input('multiple', 'boolean', false),
  ],

  'leaf-plan-selector': [
    input('showSubmitButton', 'boolean', true),
    input('planViewerConfig', 'json', planViewerConfig, { wide: true }),
  ],
  'leaf-plan-viewer': [
    input('plan', 'json', samplePlan, { wide: true }),
    input('selected', 'boolean', false),
    input('selectable', 'boolean', true),
    input('selectableWithButton', 'boolean', true),
    input('flat', 'boolean', false),
    input('showFeatures', 'boolean', true),
    input('showDescription', 'boolean', true),
    input('showTrialDuration', 'boolean', true),
    input('disabled', 'boolean', false),
  ],
  'leaf-selected-payment-plan': [
    input('canChangePaymentPlan', 'boolean', true),
    input('planViewerConfig', 'json', {
      selectableWithButton: false,
      showFeatures: false,
      showDescription: true,
      showTrialDuration: false,
    }, { wide: true }),
  ],
  'app-leaf-plan-information-for-admin': [
    input('organizationId', 'string', ''),
  ],
  'leaf-services-list': [
    input('attachmentType', 'select', 'ORGANIZATION', { options: attachment }),
    input('attachedTo', 'string', '', { optional: true }),
  ],
  'leaf-service-item': [
    input('service', 'json', sampleService, { wide: true }),
  ],
  'leaf-create-service': [
    input('attachmentType', 'select', 'ORGANIZATION', { options: attachment }),
    input('attachedTo', 'string', ''),
  ],
  'leaf-invoices-list': [
    input('invoicesType', 'string', '', { nullable: true }),
  ],
  'leaf-credit-card': [
    input('paymentMethod', 'json', {
      brand: 'visa',
      funding: 'credit',
      last4: '4242',
      expirationMonth: '12',
      expirationYear: '28',
    }, { wide: true }),
  ],

  'leaf-sponsoring-link': [
    input('sponsoring', 'json', { sponsorCode: 'DEMO' }, { wide: true }),
  ],
  'leaf-sponsoring-code-update': [
    input('account', 'json', sampleAccount, { wide: true }),
  ],
  'leaf-sponsoring-code-update-widget': [
    input('account', 'json', sampleAccount, { wide: true }),
  ],

  'leaf-redirections-list': [
    input('batchId', 'string', ''),
    input('canLoad', 'boolean', false),
    input('highlightedRedirection', 'number', null, { nullable: true }),
  ],
  'leaf-redirection-creation-batch-form': [
    input('inline', 'boolean', true),
  ],

  'leaf-notifications-widget': [
    input('reduced', 'boolean', true),
    input('fetchOnInit', 'boolean', false),
    input('menuXPosition', 'select', 'before', { options: menuX }),
    input('menuYPosition', 'select', 'below', { options: menuY }),
  ],
  'leaf-notification-item': [
    input('notification', 'json', sampleNotification, { wide: true }),
    input('clickable', 'boolean', true),
  ],

  'leaf-statistics-viewer': [
    input('key', 'string', 'demo'),
    input('showDatePicker', 'boolean', true),
    input('datePickerPosition', 'select', 'topRight', { options: datePosition }),
  ],

  'leaf-odoo-contact-selector': [
    input('label', 'string', 'Contact Odoo'),
    input('placeholder', 'string', 'Rechercher un contact...'),
    input('limit', 'number', 200),
  ],
  'leaf-odoo-opportunity-selector': [
    input('label', 'string', 'Opportunité Odoo'),
    input('placeholder', 'string', 'Rechercher une opportunité...'),
    input('limit', 'number', null, { optional: true }),
  ],
  'leaf-odoo-product-selector': [
    input('label', 'string', 'Produit Odoo'),
    input('placeholder', 'string', 'Rechercher un produit...'),
    input('limit', 'number', 200),
  ],

  'leaf-image-upload': [
    input('color', 'string', '#1fb264'),
    input('imageFormat', 'string', 'webp'),
    input('compressionRate', 'number', 1),
    input('resizeWidth', 'number', null, { optional: true }),
    input('resizeHeight', 'number', null, { optional: true }),
  ],
};

export function cloneShowcaseFields(fields: ShowcaseInputField[] | undefined): ShowcaseInputField[] {
  return (fields ?? []).map((field) => ({
    ...field,
    options: field.options,
    value: field.value !== null && typeof field.value === 'object'
      ? structuredClone(field.value)
      : field.value,
  }));
}

export function createShowcaseInputContext(fields: ShowcaseInputField[]): ShowcaseInputContext {
  const jsonText: Record<string, string> = {};
  for (const field of fields) {
    if (field.kind === 'json') {
      jsonText[field.name] = field.value === undefined || field.value === null
        ? ''
        : JSON.stringify(field.value, null, 2);
    }
  }
  return {
    jsonText,
    jsonError: {},
    controls: new Map(),
    triggers: new Map(),
  };
}

export function resolveShowcaseInputs(
  fields: ShowcaseInputField[],
  context: ShowcaseInputContext,
): Record<string, unknown> {
  const inputs: Record<string, unknown> = {};
  for (const field of fields) {
    const value = resolveField(field, context);
    if (value !== undefined) {
      inputs[field.name] = value;
    }
  }
  return inputs;
}

function resolveField(field: ShowcaseInputField, context: ShowcaseInputContext): unknown {
  switch (field.kind) {
    case 'boolean':
    case 'string':
      if (field.kind === 'string' && field.nullable && field.value === '') {
        return null;
      }
      return field.value ?? '';
    case 'number': {
      if (field.value === null || field.value === '') {
        return field.nullable ? null : undefined;
      }
      const parsed = Number(field.value);
      return Number.isFinite(parsed) ? parsed : undefined;
    }
    case 'select':
      if (field.value === '' && field.nullable) {
        return null;
      }
      if (field.name === 'target' && field.value === 'profile') {
        return { profile: { username: 'demo', firstname: 'Ada' } };
      }
      return field.value;
    case 'list':
      return splitList(String(field.value ?? ''), field);
    case 'json':
      if (field.name === 'formGroup') {
        return toFormGroup(field.value);
      }
      return field.value === null && field.optional ? undefined : field.value;
    case 'validators':
      return validatorFns(String(field.value ?? 'required'));
    case 'control': {
      let control = context.controls.get(field.name);
      if (!control) {
        control = new FormControl(String(field.value ?? ''));
        context.controls.set(field.name, control);
      }
      return control;
    }
    case 'template':
      return field.value && context.sampleTemplate ? context.sampleTemplate : undefined;
    case 'trigger': {
      let trigger = context.triggers.get(field.name);
      if (!trigger) {
        trigger = new Subject<void>();
        context.triggers.set(field.name, trigger);
      }
      return trigger.asObservable();
    }
  }
}

function splitList(raw: string, field: ShowcaseInputField): unknown {
  const items = raw.split(',').map((item) => item.trim()).filter((item) => item.length > 0);
  if (items.length === 0) {
    if (field.nullable) {
      return null;
    }
    if (field.optional) {
      return undefined;
    }
  }
  return items;
}

function validatorFns(choice: string): ValidatorFn[] {
  if (choice === 'none') {
    return [];
  }
  if (choice === 'email') {
    return [Validators.required, Validators.email];
  }
  if (choice === 'min6') {
    return [Validators.required, Validators.minLength(6)];
  }
  return [Validators.required];
}

function toFormGroup(value: unknown): UntypedFormGroup {
  const data = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const controls: Record<string, UntypedFormControl> = {};
  for (const [key, item] of Object.entries(data)) {
    controls[key] = new UntypedFormControl(item);
  }
  return new UntypedFormGroup(controls);
}

export function parseShowcaseJson(text: string): unknown {
  const trimmed = text.trim();
  if (!trimmed) {
    return undefined;
  }
  return JSON.parse(trimmed, reviveDates);
}

function reviveDates(_key: string, value: unknown): unknown {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return date;
    }
  }
  return value;
}
