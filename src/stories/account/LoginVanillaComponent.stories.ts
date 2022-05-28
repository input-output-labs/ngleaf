// Login.stories.ts

import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { LeafLoginVanillaComponent, LeafLoginVanillaModule } from '@input-output-labs/ngleaf';
import { LeafStorybookAppModule } from '../leaf-storybook-app.module';


export default {
  title: 'Account/Login vanila component',
  component: LeafLoginVanillaComponent,
  decorators: [
    moduleMetadata({
      imports: [LeafStorybookAppModule, LeafLoginVanillaModule],
    })
  ]
} as Meta;

export const Default: Story = () => ({
  props: {},
});
