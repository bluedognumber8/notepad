import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from '.'
import { ArgTypes } from '@storybook/blocks'

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {
    color: { control: 'color' },
    children: {
      control: 'text',
    },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Button',
    size: 'medium',
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {},
}

export const Small: Story = {
  args: {
    size: 'small',
  },
}
