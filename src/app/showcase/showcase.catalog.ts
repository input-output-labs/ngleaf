import { Type } from '@angular/core';
import {
  AccountSettingsAccessTokensComponent,
  AccountSettingsAvatarComponent,
  AccountSettingsGeneralComponent,
  AccountSettingsPageComponent,
  AccountSettingsPasswordComponent,
  AccountSettingsProfileComponent,
  AdminSettingsAdministratorsComponent,
  AdminSettingsPageComponent,
  AdminSettingsUsersComponent,
  AdminSettingsWhitelistComponent,
  AvatarUpdateComponent,
  ConfirmDialogModel,
  CreditCardComponent,
  EmailVerificationComponent,
  EmailingCategoriesPageComponent,
  EmailingPageComponent,
  EmailingSendingPageComponent,
  GenericFormComponent,
  LeafAccountPopoverContentComponent,
  LeafAddressFormComponent,
  LeafConfirmDialogComponent,
  LeafCopyToClipboardComponent,
  LeafCreateServiceComponent,
  LeafCustomerDefaultPaymentCardComponent,
  LeafForbiddenComponent,
  LeafGenericDataDialogComponent,
  LeafHeaderAccountComponent,
  LeafIconInputComponent,
  LeafImageUploadComponent,
  LeafInvoicesListComponent,
  LeafLegalNoticeDialogComponent,
  LeafLoginComponent,
  LeafPasswordForgottenComponent,
  LeafPasswordForgottenVanillaComponent,
  LeafPasswordSecurityIndicatorComponent,
  LeafPlanInformationForAdminComponent,
  LeafPlanSelectorComponent,
  LeafPlanSelectorDialogComponent,
  LeafPlanViewerComponent,
  LeafRedirectionCreationBatchFormComponent,
  LeafRedirectionsListComponent,
  LeafRegisterComponent,
  LeafSelectedPaymentPlanComponent,
  LeafServiceItemComponent,
  LeafServicesListComponent,
  LoginPageComponent,
  MailingAuthorizationsPageComponent,
  NavigationComponent,
  NotificationsWidgetComponent,
  OdooContactSelectorComponent,
  OdooOpportunitySelectorComponent,
  OdooProductSelectorComponent,
  OrganizationCandidatureComponent,
  OrganizationCandidaturesComponent,
  OrganizationInvitationComponent,
  OrganizationInvitationsComponent,
  OrganizationMembersComponent,
  OrganizationPoliciesComponent,
  OrganizationSelectorComponent,
  PasswordUpdateComponent,
  PhoneNumberFormFieldComponent,
  ProfileUpdateComponent,
  PseudoUpdateComponent,
  RedirectionCreationBatchListComponent,
  RegisterPageComponent,
  RoomCreationFormComponent,
  SelectLanguageComponent,
  SponsoringCodeUpdateComponent,
  SponsoringCodeUpdateDialogComponent,
  SponsoringCodeUpdateWidgetComponent,
  SponsoringLinkComponent,
  SponsoringMyAffiliatesComponent,
  SponsoringMySponsorComponent,
  StatisticsPageComponent,
  StatisticsViewerComponent,
  UserSelectorComponent,
} from '@input-output-labs/ngleaf';
import { LeafAccountFlagsDialogComponent } from '@input-output-labs/ngleaf/components/admin/leaf-account-flags-dialog/leaf-account-flags-dialog.component';
import { NotificationItemComponent } from '@input-output-labs/ngleaf/components/notifications/notification-item/notification-item.component';

export interface ShowcaseEntry {
  id: string;
  group: string;
  component: Type<unknown>;
  role: string;
  dialogData?: unknown;
}

export interface ShowcaseGroup {
  id: string;
  label: string;
  icon: string;
  items: ShowcaseEntry[];
}

function entry(
  id: string,
  group: string,
  component: Type<unknown>,
  role: string,
  options?: { dialogData?: unknown },
): ShowcaseEntry {
  return { id, group, component, role, dialogData: options?.dialogData };
}

export const SHOWCASE_ENTRIES: ShowcaseEntry[] = [
  entry('leaf-navigation', 'ui', NavigationComponent, 'Coquille de page'),
  entry('leaf-forbidden', 'ui', LeafForbiddenComponent, 'Page d\'accès refusé'),
  entry('leaf-confirm-dialog', 'ui', LeafConfirmDialogComponent, 'Dialog de confirmation', {
    dialogData: new ConfirmDialogModel('Confirmer', 'Action de démonstration'),
  }),
  entry('leaf-generic-form', 'ui', GenericFormComponent, 'Formulaire généré'),
  entry('leaf-icon-input', 'ui', LeafIconInputComponent, 'Champ texte avec icône'),
  entry('leaf-address-form', 'ui', LeafAddressFormComponent, 'Champ d\'adresse'),
  entry('leaf-phone-number-form-field', 'ui', PhoneNumberFormFieldComponent, 'Champ téléphone'),
  entry('leaf-password-security-indicator', 'ui', LeafPasswordSecurityIndicatorComponent, 'Jauge de mot de passe'),
  entry('leaf-copy-to-clipboard', 'ui', LeafCopyToClipboardComponent, 'Bouton de copie'),
  entry('leaf-select-language', 'ui', SelectLanguageComponent, 'Langue de l\'interface'),

  entry('leaf-login', 'compte', LeafLoginComponent, 'Formulaire de connexion'),
  entry('leaf-login-page', 'compte', LoginPageComponent, 'Page de connexion'),
  entry('leaf-register', 'compte', LeafRegisterComponent, 'Formulaire d\'inscription'),
  entry('leaf-register-page', 'compte', RegisterPageComponent, 'Page d\'inscription'),
  entry('leaf-password-forgotten', 'compte', LeafPasswordForgottenComponent, 'Mot de passe oublié'),
  entry('leaf-password-forgotten-vanilla', 'compte', LeafPasswordForgottenVanillaComponent, 'Mot de passe oublié, sans Material'),
  entry('leaf-password-update', 'compte', PasswordUpdateComponent, 'Changement du mot de passe'),
  entry('leaf-email-verification', 'compte', EmailVerificationComponent, 'Vérification de l\'e-mail'),
  entry('leaf-profile-update', 'compte', ProfileUpdateComponent, 'Édition du profil'),
  entry('leaf-pseudo-update', 'compte', PseudoUpdateComponent, 'Édition du pseudo'),
  entry('leaf-avatar-update', 'compte', AvatarUpdateComponent, 'Édition de l\'avatar'),
  entry('leaf-account-settings-page', 'compte', AccountSettingsPageComponent, 'Page réglages du compte'),
  entry('leaf-account-settings-general', 'compte', AccountSettingsGeneralComponent, 'Onglet général'),
  entry('leaf-account-settings-profile', 'compte', AccountSettingsProfileComponent, 'Onglet profil'),
  entry('leaf-account-settings-password', 'compte', AccountSettingsPasswordComponent, 'Onglet mot de passe'),
  entry('leaf-account-settings-avatar', 'compte', AccountSettingsAvatarComponent, 'Onglet avatar'),
  entry('leaf-account-settings-access-tokens', 'compte', AccountSettingsAccessTokensComponent, 'Jetons d\'accès'),
  entry('leaf-header-account', 'compte', LeafHeaderAccountComponent, 'Compte dans le header'),
  entry('leaf-account-popover-content', 'compte', LeafAccountPopoverContentComponent, 'Popover du compte'),
  entry('leaf-legal-notice-dialog', 'compte', LeafLegalNoticeDialogComponent, 'Mentions légales', {
    dialogData: { legalNoticeLink: 'https://example.com/legal' },
  }),

  entry('leaf-organization-selector', 'organisation', OrganizationSelectorComponent, 'Sélecteur d\'organisation'),
  entry('leaf-organization-members', 'organisation', OrganizationMembersComponent, 'Membres et rôles'),
  entry('leaf-organization-invitations', 'organisation', OrganizationInvitationsComponent, 'Invitations émises'),
  entry('leaf-organization-invitation', 'organisation', OrganizationInvitationComponent, 'Réponse à une invitation'),
  entry('leaf-organization-candidatures', 'organisation', OrganizationCandidaturesComponent, 'Candidatures à traiter'),
  entry('leaf-organization-candidature', 'organisation', OrganizationCandidatureComponent, 'Dépôt d\'une candidature'),
  entry('app-organization-policies', 'organisation', OrganizationPoliciesComponent, 'Politiques et rôles'),

  entry('leaf-admin-settings-page', 'administration', AdminSettingsPageComponent, 'Page admin'),
  entry('leaf-admin-settings-users', 'administration', AdminSettingsUsersComponent, 'Recherche des comptes'),
  entry('leaf-admin-settings-administrators', 'administration', AdminSettingsAdministratorsComponent, 'Administrateurs'),
  entry('leaf-admin-settings-whitelist', 'administration', AdminSettingsWhitelistComponent, 'Liste blanche'),
  entry('leaf-user-selector', 'administration', UserSelectorComponent, 'Recherche d\'un compte'),
  entry('leaf-account-flags-dialog', 'administration', LeafAccountFlagsDialogComponent, 'Flags d\'un compte', {
    dialogData: { accountId: 'demo', email: 'demo@leaf.test', flags: ['beta'] },
  }),
  entry('app-leaf-generic-data-dialog', 'administration', LeafGenericDataDialogComponent, 'genericData', {
    dialogData: {
      genericData: { city: 'Lyon' },
      targetType: 'account',
      expectedGenericDataKeys: ['city', 'note'],
      targetId: 'demo',
    },
  }),

  entry('leaf-plan-selector', 'paiement', LeafPlanSelectorComponent, 'Choix d\'un plan'),
  entry('app-leaf-plan-selector-dialog', 'paiement', LeafPlanSelectorDialogComponent, 'Dialog du sélecteur de plan', {
    dialogData: { selectableWithButton: true, showFeatures: true, showDescription: true, showTrialDuration: true },
  }),
  entry('leaf-plan-viewer', 'paiement', LeafPlanViewerComponent, 'Carte d\'un plan'),
  entry('leaf-selected-payment-plan', 'paiement', LeafSelectedPaymentPlanComponent, 'Plan souscrit'),
  entry('app-leaf-plan-information-for-admin', 'paiement', LeafPlanInformationForAdminComponent, 'Détail d\'un plan, vue admin'),
  entry('leaf-services-list', 'paiement', LeafServicesListComponent, 'Liste des services'),
  entry('leaf-service-item', 'paiement', LeafServiceItemComponent, 'Ligne d\'un service'),
  entry('leaf-create-service', 'paiement', LeafCreateServiceComponent, 'Création d\'un service'),
  entry('leaf-invoices-list', 'paiement', LeafInvoicesListComponent, 'Factures'),
  entry('leaf-customer-default-payment-card', 'paiement', LeafCustomerDefaultPaymentCardComponent, 'Carte par défaut'),
  entry('leaf-credit-card', 'paiement', CreditCardComponent, 'Visuel d\'une carte'),

  entry('leaf-sponsoring-link', 'parrainage', SponsoringLinkComponent, 'Lien de parrainage'),
  entry('leaf-sponsoring-code-update', 'parrainage', SponsoringCodeUpdateComponent, 'Formulaire du code'),
  entry('leaf-sponsoring-code-update-widget', 'parrainage', SponsoringCodeUpdateWidgetComponent, 'Widget du code'),
  entry('app-sponsoring-code-update-dialog', 'parrainage', SponsoringCodeUpdateDialogComponent, 'Dialog du code', {
    dialogData: {
      account: {
        id: 'demo',
        email: 'demo@leaf.test',
        profile: { username: 'demo' },
        modules: { sponsoring: { sponsorCode: 'DEMO' } },
      },
    },
  }),
  entry('leaf-sponsoring-my-sponsor', 'parrainage', SponsoringMySponsorComponent, 'Parrain'),
  entry('leaf-sponsoring-my-affiliates', 'parrainage', SponsoringMyAffiliatesComponent, 'Filleuls'),

  entry('leaf-redirections-list', 'redirections', LeafRedirectionsListComponent, 'Liste des redirections'),
  entry('leaf-redirection-creation-batch-form', 'redirections', LeafRedirectionCreationBatchFormComponent, 'Création d\'un lot'),
  entry('leaf-redirection-creation-batch-list', 'redirections', RedirectionCreationBatchListComponent, 'Liste des lots'),

  entry('leaf-notifications-widget', 'notifications', NotificationsWidgetComponent, 'Cloche de notifications'),
  entry('leaf-notification-item', 'notifications', NotificationItemComponent, 'Une notification'),

  entry('leaf-room-creation-form', 'messagerie', RoomCreationFormComponent, 'Création d\'un salon'),

  entry('leaf-emailing-page', 'emailing', EmailingPageComponent, 'Page emailing'),
  entry('leaf-emailing-sending-page', 'emailing', EmailingSendingPageComponent, 'Envoi'),
  entry('leaf-emailing-categories-page', 'emailing', EmailingCategoriesPageComponent, 'Catégories'),
  entry('leaf-mailing-authorizations-page', 'emailing', MailingAuthorizationsPageComponent, 'Désinscription'),

  entry('leaf-statistics-page', 'statistiques', StatisticsPageComponent, 'Page de statistiques'),
  entry('leaf-statistics-viewer', 'statistiques', StatisticsViewerComponent, 'Graphique'),

  entry('leaf-odoo-contact-selector', 'odoo', OdooContactSelectorComponent, 'Sélecteur de contact'),
  entry('leaf-odoo-opportunity-selector', 'odoo', OdooOpportunitySelectorComponent, 'Sélecteur d\'opportunité'),
  entry('leaf-odoo-product-selector', 'odoo', OdooProductSelectorComponent, 'Sélecteur de produit'),

  entry('leaf-image-upload', 'fichiers', LeafImageUploadComponent, 'Upload d\'image'),
];

const GROUP_META: { id: string; label: string; icon: string }[] = [
  { id: 'ui', label: 'UI', icon: 'widgets' },
  { id: 'compte', label: 'Compte', icon: 'person' },
  { id: 'organisation', label: 'Organisation', icon: 'storefront' },
  { id: 'administration', label: 'Administration', icon: 'admin_panel_settings' },
  { id: 'paiement', label: 'Paiement', icon: 'credit_card' },
  { id: 'parrainage', label: 'Parrainage', icon: 'share' },
  { id: 'redirections', label: 'Redirections', icon: 'alt_route' },
  { id: 'notifications', label: 'Notifications', icon: 'notifications' },
  { id: 'messagerie', label: 'Messagerie', icon: 'forum' },
  { id: 'emailing', label: 'Emailing', icon: 'mail' },
  { id: 'statistiques', label: 'Statistiques', icon: 'bar_chart' },
  { id: 'odoo', label: 'Odoo', icon: 'hub' },
  { id: 'fichiers', label: 'Fichiers', icon: 'image' },
];

export const SHOWCASE_GROUPS: ShowcaseGroup[] = GROUP_META.map((group) => ({
  ...group,
  items: SHOWCASE_ENTRIES.filter((item) => item.group === group.id),
}));

export function showcaseLink(entry: ShowcaseEntry): string {
  return `/demo/${entry.group}/${entry.id}`;
}

export function findShowcaseEntry(group: string | null, id: string | null): ShowcaseEntry | undefined {
  return SHOWCASE_ENTRIES.find((item) => item.group === group && item.id === id);
}

export const SHOWCASE_HOME = showcaseLink(SHOWCASE_ENTRIES[0]);
