import { Flag } from 'lucide-react'

export const PRIORITY_STYLES = {
  low: {
    cardBg: 'bg-blue-400',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: <Flag className={'h-4 w-4 text-blue-500'} />,
    text: 'text-blue-700',
    label: 'Низкий',
  },
  medium: {
    cardBg: 'bg-amber-400',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: <Flag className={'h-4 w-4 text-amber-500'} />,
    text: 'text-amber-700',
    label: 'Средний',
  },
  high: {
    cardBg: 'bg-rose-400',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    icon: <Flag className={'h-4 w-4 text-rose-500'} />,
    text: 'text-rose-700',
    label: 'Высокий',
  },
}
