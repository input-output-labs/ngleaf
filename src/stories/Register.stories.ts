// Register.stories.ts

import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { RegisterComponent, LeafRegisterModule } from '@input-output-labs/ngleaf';
import { LeafStorybookAppModule } from './leaf-storybook-app.module';


export default {
  title: 'Account/Register',
  component: RegisterComponent,
  decorators: [
    moduleMetadata({
      imports: [LeafStorybookAppModule, LeafRegisterModule],
    })
  ]
} as Meta;

export const Default: Story = () => ({
  props: {},
});
