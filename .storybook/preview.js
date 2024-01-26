/** @type { import('@storybook/svelte').Preview } */
import  '../src/styles/appBaseStyles.scss';
document.body.style.padding = '0';
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
