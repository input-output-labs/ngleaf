# Analyse des Dialogs Material dans Ngleaf

## Liste complète des dialogs ouvertes

### 1. OrganizationInvitationsComponent
**Fichier**: `components/organizations/settings/organization-members/organization-members.component.ts`  
**Ligne**: 104  
**Configuration**: Aucune configuration de largeur spécifiée  
```typescript
this.dialog.open(OrganizationInvitationsComponent);
```
- **width**: Non spécifié (défaut Material)
- **maxWidth**: Non spécifié
- **minWidth**: Non spécifié

---

### 2. OrganizationCandidaturesComponent
**Fichier**: `components/organizations/settings/organization-members/organization-members.component.ts`  
**Ligne**: 108-112  
**Configuration**: 
```typescript
this.dialog.open(OrganizationCandidaturesComponent, {
  width: '600px',
  maxWidth: '90vw',
  maxHeight: '80vh'
});
```
- **width**: `600px`
- **maxWidth**: `90vw`
- **minWidth**: Non spécifié

---

### 3. LeafConfirmDialogComponent (Accept Candidature)
**Fichier**: `components/organizations/settings/organization-candidatures/organization-candidatures.component.ts`  
**Ligne**: 170-173  
**Configuration**:
```typescript
const dialogRef = this.dialog.open(LeafConfirmDialogComponent, {
  data: dialogData,
  width: '400px'
});
```
- **width**: `400px`
- **maxWidth**: Non spécifié
- **minWidth**: Non spécifié

---

### 4. LeafConfirmDialogComponent (Decline Candidature)
**Fichier**: `components/organizations/settings/organization-candidatures/organization-candidatures.component.ts`  
**Ligne**: 188-191  
**Configuration**:
```typescript
const dialogRef = this.dialog.open(LeafConfirmDialogComponent, {
  data: dialogData,
  width: '400px'
});
```
- **width**: `400px`
- **maxWidth**: Non spécifié
- **minWidth**: Non spécifié

---

### 5. SponsoringCodeUpdateDialogComponent
**Fichier**: `components/sponsoring/sponsoring-code-update/sponsoring-code-update-widget/sponsoring-code-update-widget.component.ts`  
**Ligne**: 22-27  
**Configuration**:
```typescript
const dialogRef = this.dialog.open(SponsoringCodeUpdateDialogComponent, {
  maxWidth: "400px",
  data: {
    account: this.account
  }
});
```
- **width**: Non spécifié
- **maxWidth**: `400px`
- **minWidth**: Non spécifié

---

### 6. LeafConfirmDialogComponent (Delete Service)
**Fichier**: `components/payment/leaf-service-item/leaf-service-item.component.ts`  
**Ligne**: 174-177  
**Configuration**:
```typescript
const dialogRef = this.dialog.open(LeafConfirmDialogComponent, {
  width: '400px',
  data: new ConfirmDialogModel(title, message)
});
```
- **width**: `400px`
- **maxWidth**: Non spécifié
- **minWidth**: Non spécifié

---

### 7. LeafPlanSelectorDialogComponent
**Fichier**: `components/payment/leaf-selected-payment-plan/leaf-selected-payment-plan.component.ts`  
**Ligne**: 62-64  
**Configuration**: Aucune configuration de largeur spécifiée
```typescript
const dialogRef = this.dialog.open(LeafPlanSelectorDialogComponent, {
  data: this.planViewerConfig
});
```
- **width**: Non spécifié (défaut Material)
- **maxWidth**: Non spécifié
- **minWidth**: Non spécifié

---

### 8. LeafConfirmDialogComponent (Update Plan Features)
**Fichier**: `components/payment/leaf-plan-information-for-admin/leaf-plan-information-for-admin.component.ts`  
**Ligne**: 91-97  
**Configuration**:
```typescript
const dialogRef = this.dialog.open(LeafConfirmDialogComponent, {
  maxWidth: "400px",
  data: new ConfirmDialogModel(
    "Update plan's features",
    "Are you sure you want to update the plan's features?"
  )
});
```
- **width**: Non spécifié
- **maxWidth**: `400px`
- **minWidth**: Non spécifié

---

### 9. LeafConfirmDialogComponent (Change Plan)
**Fichier**: `components/payment/leaf-plan-information-for-admin/leaf-plan-information-for-admin.component.ts`  
**Ligne**: 119-125  
**Configuration**:
```typescript
const dialogRef = this.dialog.open(LeafConfirmDialogComponent, {
  maxWidth: "400px",
  data: new ConfirmDialogModel(
    `Update Plan to ${event.value}`,
    "Are you sure you want to change the plan?"
  )
});
```
- **width**: Non spécifié
- **maxWidth**: `400px`
- **minWidth**: Non spécifié

---

### 10. LeafConfirmDialogComponent (Delete Account)
**Fichier**: `components/admin/admin-settings-page/admin-settings-users/admin-settings-users.component.ts`  
**Ligne**: 148-151  
**Configuration**:
```typescript
const dialogRef = this.dialog.open(LeafConfirmDialogComponent, {
  maxWidth: "400px",
  data: dialogData
});
```
- **width**: Non spécifié
- **maxWidth**: `400px`
- **minWidth**: Non spécifié

---

### 11. LeafGenericDataDialogComponent
**Fichier**: `components/admin/admin-settings-page/admin-settings-users/admin-settings-users.component.ts`  
**Ligne**: 166-173  
**Configuration**: Aucune configuration de largeur spécifiée
```typescript
const dialogRef = this.dialog.open(LeafGenericDataDialogComponent, {
  data: {
    genericData: element.genericData,
    targetType: "account",
    targetId: element.id,
    expectedGenericDataKeys: this.expectedGenericDataKeys,
  }
});
```
- **width**: Non spécifié (défaut Material)
- **maxWidth**: Non spécifié
- **minWidth**: Non spécifié

---

## Classification par taille

### 🔵 SMALL (< 500px)

#### Dialogs avec width ou maxWidth < 500px

1. **LeafConfirmDialogComponent (Accept Candidature)**
   - width: `400px`
   - Fichier: `organization-candidatures.component.ts:170`

2. **LeafConfirmDialogComponent (Decline Candidature)**
   - width: `400px`
   - Fichier: `organization-candidatures.component.ts:188`

3. **SponsoringCodeUpdateDialogComponent**
   - maxWidth: `400px`
   - Fichier: `sponsoring-code-update-widget.component.ts:22`

4. **LeafConfirmDialogComponent (Delete Service)**
   - width: `400px`
   - Fichier: `leaf-service-item.component.ts:174`

5. **LeafConfirmDialogComponent (Update Plan Features)**
   - maxWidth: `400px`
   - Fichier: `leaf-plan-information-for-admin.component.ts:91`

6. **LeafConfirmDialogComponent (Change Plan)**
   - maxWidth: `400px`
   - Fichier: `leaf-plan-information-for-admin.component.ts:119`

7. **LeafConfirmDialogComponent (Delete Account)**
   - maxWidth: `400px`
   - Fichier: `admin-settings-users.component.ts:148`

**Total SMALL**: 7 dialogs

---

### 🟡 MEDIUM (500px - 800px)

#### Dialogs avec width entre 500px et 800px

1. **OrganizationCandidaturesComponent**
   - width: `600px`
   - maxWidth: `90vw`
   - Fichier: `organization-members.component.ts:108`

**Total MEDIUM**: 1 dialog

---

### 🟢 LARGE (> 800px ou sans configuration)

#### Dialogs sans configuration de largeur ou avec largeur par défaut

1. **OrganizationInvitationsComponent**
   - Aucune configuration (défaut Material ~500px)
   - Fichier: `organization-members.component.ts:104`

2. **LeafPlanSelectorDialogComponent**
   - Aucune configuration (défaut Material ~500px)
   - Fichier: `leaf-selected-payment-plan.component.ts:62`

3. **LeafGenericDataDialogComponent**
   - Aucune configuration (défaut Material ~500px)
   - Fichier: `admin-settings-users.component.ts:166`

**Total LARGE**: 3 dialogs

---

## Résumé statistique

| Catégorie | Nombre | Pourcentage |
|-----------|--------|-------------|
| **SMALL** (< 500px) | 7 | 63.6% |
| **MEDIUM** (500px - 800px) | 1 | 9.1% |
| **LARGE** (> 800px ou défaut) | 3 | 27.3% |
| **TOTAL** | **11** | **100%** |

---

## Observations

### Patterns identifiés

1. **LeafConfirmDialogComponent** est le composant le plus utilisé (6 occurrences)
   - Toutes configurées en SMALL (400px)
   - Utilisé pour les confirmations d'actions critiques

2. **Configuration inconsistante** :
   - Certaines utilisent `width: '400px'`
   - D'autres utilisent `maxWidth: "400px"` (sans width)
   - Cela peut créer des différences de comportement

3. **Dialogs sans configuration** :
   - 3 dialogs n'ont aucune configuration de largeur
   - Utilisent les valeurs par défaut de Material Dialog (~500px)

4. **Responsive design** :
   - Seule `OrganizationCandidaturesComponent` utilise `maxWidth: '90vw'` pour le responsive
   - Les autres dialogs SMALL pourraient bénéficier d'une configuration responsive

### Recommandations

1. **Standardiser les configurations** :
   - Utiliser soit `width` + `maxWidth`, soit seulement `maxWidth` de manière cohérente
   - Ajouter `maxWidth: '90vw'` ou `'95vw'` pour toutes les dialogs SMALL pour le responsive

2. **Documenter les tailles** :
   - Créer des constantes pour les tailles de dialogs :
     ```typescript
     export const DIALOG_SIZES = {
       SMALL: { width: '400px', maxWidth: '90vw' },
       MEDIUM: { width: '600px', maxWidth: '90vw' },
       LARGE: { width: '800px', maxWidth: '95vw' }
     };
     ```

3. **Configurer les dialogs sans configuration** :
   - Ajouter des configurations appropriées pour les 3 dialogs sans configuration
   - `OrganizationInvitationsComponent`: SMALL ou MEDIUM selon le contenu
   - `LeafPlanSelectorDialogComponent`: MEDIUM ou LARGE selon le contenu
   - `LeafGenericDataDialogComponent`: MEDIUM selon le contenu

---

## Détails par composant de dialog

### LeafConfirmDialogComponent
**Utilisé 6 fois** - Toutes en SMALL (400px)
- Accept Candidature
- Decline Candidature  
- Delete Service
- Update Plan Features
- Change Plan
- Delete Account

### OrganizationCandidaturesComponent
**Utilisé 1 fois** - MEDIUM (600px avec maxWidth 90vw)
- Gestion des candidatures d'organisation

### SponsoringCodeUpdateDialogComponent
**Utilisé 1 fois** - SMALL (maxWidth 400px)
- Mise à jour du code de parrainage

### OrganizationInvitationsComponent
**Utilisé 1 fois** - LARGE (défaut)
- Gestion des invitations d'organisation

### LeafPlanSelectorDialogComponent
**Utilisé 1 fois** - LARGE (défaut)
- Sélection de plan de paiement

### LeafGenericDataDialogComponent
**Utilisé 1 fois** - LARGE (défaut)
- Édition de données génériques
