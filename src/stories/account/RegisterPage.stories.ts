// Register.stories.ts

import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { RegisterPageComponent, LeafRegisterPageModule } from '@input-output-labs/ngleaf';
import { LeafStorybookAppModule } from '../leaf-storybook-app.module';


export default {
  title: 'Account/Register page',
  component: RegisterPageComponent,
  decorators: [
    moduleMetadata({
      imports: [LeafStorybookAppModule, LeafRegisterPageModule],
    })
  ]
} as Meta;

export const Default: Story = () => ({
  props: {},
});
