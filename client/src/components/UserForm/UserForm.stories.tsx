import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import UserForm from ".";

const meta: Meta<typeof UserForm> = {
  component: UserForm,
  render: ({ ...args }) => <UserForm {...args}></UserForm>,
};

export default meta;
type Story = StoryObj<typeof UserForm>;

export const WithProp: Story = {
  args: {
    form: "signIn",
    status: "error",
    children: "",
    action: action("clicked"),
  },
};
