import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import FormAuth from '.'

const meta: Meta<typeof FormAuth> = {
  component: FormAuth,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {
    credentials: { username: '', password: '', email: '' },
  },
  args: {
    credentials: {
      username: 'string',
      password: 'string',
      email: 'string',
    },
    handleSubmit: e => {
      e.preventDefault()
    },
    isSingUp: false,
    status: 'idle',
  },
}

export default meta
type Story = StoryObj<typeof FormAuth>

export const SignIn: Story = {
  args: {
    isSingUp: false,
    handleChangeForm: action('handleChangeForm'),
  },
}
export const SignUp: Story = {
  args: {
    isSingUp: true,
    handleChangeForm: action('handleChangeForm'),
  },
}
