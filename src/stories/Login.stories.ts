// Login.stories.ts

import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { AppModule } from '../app/app.module';
import { APP_BASE_HREF } from '@angular/common';
import { LoginComponent, LeafComponentsModule } from '@input-output-labs/ngleaf';


export default {
  title: 'Account/Login',
  component: LoginComponent,
  decorators: [
    moduleMetadata({
      imports: [AppModule, LeafComponentsModule],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    })
  ]
} as Meta;

export const Default: Story = () => ({
  props: {},
});
