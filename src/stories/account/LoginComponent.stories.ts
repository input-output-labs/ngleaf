// Login.stories.ts

import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { LoginComponent, LeafLoginModule } from '@input-output-labs/ngleaf';
import { LeafStorybookAppModule } from '../leaf-storybook-app.module';


export default {
  title: 'Account/Login component',
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
