import type { Meta, StoryObj } from "@storybook/react";
import Header from ".";

const meta: Meta<typeof Header> = {
  parameters: {
    isFullscreen: true,
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
  component: Header,
  render: () => <Header />,
};
export default meta;
type Story = StoryObj<typeof Header>;

export const WithProp: Story = {
  args: {},
};
