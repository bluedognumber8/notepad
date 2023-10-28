import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import FormAuth from ".";

const meta: Meta<typeof FormAuth> = {
  component: FormAuth,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormAuth>;

export const SignIn: Story = {
  args: {
    handleSubmit: (e) => {
      e.preventDefault();
    },
    isSingUp: false,
    status: "idle",
    handleChangeForm: action("handleChangeForm"),
    credentials: { username: "", password: "", email: "" },
  },
};
export const SignUp: Story = {
  args: {
    handleSubmit: (e) => {
      e.preventDefault();
    },
    isSingUp: true,
    status: "idle",
    handleChangeForm: action("handleChangeForm"),
    credentials: { username: "", password: "", email: "" },
  },
};
