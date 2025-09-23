# Leaf Icon Input Component

A reusable Angular component that provides an input field with autocomplete functionality for selecting Material Design icons.

## Features

- **Form Integration**: Implements `ControlValueAccessor` for seamless integration with Angular reactive forms
- **Autocomplete**: Type-ahead functionality with 20 pre-configured Material Design icons
- **Icon Preview**: Shows the selected icon inside the input field
- **Clear Functionality**: Easy way to clear the selection
- **Accessibility**: Proper ARIA labels and keyboard navigation support

## Usage

### Basic Usage

```html
<leaf-icon-input [formControl]="myControl"></leaf-icon-input>
```

### With Additional Properties

```html
<leaf-icon-input 
  [formControl]="myControl"
  placeholder="Choose an icon"
  [required]="true"
  fieldAppearance="outline">
</leaf-icon-input>
```

### In a Form

```typescript
import { FormControl, FormGroup } from '@angular/forms';

export class MyComponent {
  myForm = new FormGroup({
    icon: new FormControl('')
  });
}
```

```html
<form [formGroup]="myForm">
  <leaf-icon-input formControlName="icon"></leaf-icon-input>
</form>
```

## Available Icons

The component includes 20 Material Design icons:
- home, search, favorite, star, settings
- person, email, phone, location_on, shopping_cart
- add, edit, delete, visibility, visibility_off
- lock, lock_open, notifications, menu, close

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `formControl` | `FormControl` | - | Angular form control for two-way binding |
| `placeholder` | `string` | 'Select an icon' | Placeholder text for the input |
| `required` | `boolean` | `false` | Whether the field is required |
| `fieldAppearance` | `MatFormFieldAppearance` | 'fill' | Material form field appearance |

## Module Import

Make sure to import the `LeafIconInputModule` in your module:

```typescript
import { LeafIconInputModule } from '@ngleaf/common';

@NgModule({
  imports: [
    LeafIconInputModule
  ]
})
export class MyModule { }
```
