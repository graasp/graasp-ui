import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    //👈 The a11y addon goes here
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
    '@storybook/experimental-addon-test'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  staticDirs: ['./public'],
  docs: {
    autodocs: true,
  },
};
export default config;
