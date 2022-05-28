
import { setCompodocJson } from "@storybook/addon-docs/angular";
import { componentWrapperDecorator } from "@storybook/angular";

import docJson from "../documentation.json";
setCompodocJson(docJson);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
}
export const decorators = [
  componentWrapperDecorator((story) => `<div style="margin: 0.5em">${story}</div>`)
];
