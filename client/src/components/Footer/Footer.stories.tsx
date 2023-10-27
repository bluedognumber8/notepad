import type { Meta, StoryObj } from "@storybook/react";
import Footer from ".";

const meta: Meta<typeof Footer> = {
  component: Footer,
  render: () => (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Footer />
    </div>
  ),
};
export default meta;
type Story = StoryObj<typeof Footer>;

export const WithProp: Story = {
  args: {},
};
