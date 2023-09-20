/** @type { import('@storybook/svelte').Preview } */
import "../src/styles/app.scss";
import "../src/styles/custom.scss";
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
