// Login.stories.ts

import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { APP_BASE_HREF } from '@angular/common';
import { LoginComponent, LeafLoginModule } from '@input-output-labs/ngleaf';
import { LeafStorybookAppModule } from './leaf-storybook-app.module';
import { RouterModule } from '@angular/router';


export default {
  title: 'Account/Login',
  component: LoginComponent,
  decorators: [
    moduleMetadata({
      imports: [LeafStorybookAppModule, LeafLoginModule],
    })
  ]
} as Meta;

export const Default: Story = () => ({
  props: {},
});
