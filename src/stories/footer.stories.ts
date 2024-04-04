import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from '../app/components/footer';

const meta = {
  title: 'Footer',
  component: Footer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
