// Register.stories.ts

import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { LeafRegisterVanillaComponent, LeafRegisterVanillaModule } from '@input-output-labs/ngleaf';
import { LeafStorybookAppModule } from '../leaf-storybook-app.module';


export default {
  title: 'Account/Register vanilla component',
  component: LeafRegisterVanillaComponent,
  decorators: [
    moduleMetadata({
      imports: [LeafStorybookAppModule, LeafRegisterVanillaModule],
    })
  ]
} as Meta;

export const Default: Story = () => ({
  props: {},
});
