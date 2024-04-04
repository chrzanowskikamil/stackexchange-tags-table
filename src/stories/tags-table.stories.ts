import type { Meta, StoryObj } from '@storybook/react';
import { TagsTable } from '../app/components/table/tags-table';

const meta = {
  title: 'TagsTable',
  component: TagsTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof TagsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
