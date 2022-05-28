// Login.stories.ts

import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { LoginPageComponent, LeafLoginPageModule } from '@input-output-labs/ngleaf';
import { LeafStorybookAppModule } from '../leaf-storybook-app.module';


export default {
  title: 'Account/Login page',
  component: LoginPageComponent,
  decorators: [
    moduleMetadata({
      imports: [LeafStorybookAppModule, LeafLoginPageModule],
    })
  ]
} as Meta;

export const Default: Story = () => ({
  props: {},
});
