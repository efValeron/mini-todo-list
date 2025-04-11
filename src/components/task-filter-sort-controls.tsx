import React, { memo } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ArrowUpDown } from 'lucide-react'

export type FilterStatus = 'all' | 'active' | 'completed'
export type SortDirection = 'asc' | 'desc'

type TaskFilterSortControlsProps = {
  filterStatus: FilterStatus
  sortByPriority: SortDirection
  onFilterChange: (value: FilterStatus) => void
  onSortChange: (value: SortDirection) => void
}

export const TaskFilterSortControls = memo(
  ({ filterStatus, sortByPriority, onFilterChange, onSortChange }: TaskFilterSortControlsProps) => {
    return (
      <div className={'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'}>
        {/* Фильтр по статусу */}
        <div className={'flex items-center gap-2'}>
          <span className={'text-sm font-medium'}>Статус:</span>
          <ToggleGroup
            type={'single'}
            value={filterStatus}
            onValueChange={value => value && onFilterChange(value as FilterStatus)}
          >
            <ToggleGroupItem value={'all'}>Все</ToggleGroupItem>
            <ToggleGroupItem value={'active'}>Активные</ToggleGroupItem>
            <ToggleGroupItem value={'completed'}>Выполненные</ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Сортировка по приоритету */}
        <div className={'flex items-center gap-2'}>
          <span className={'text-sm font-medium'}>Сортировка:</span>
          <Select
            value={sortByPriority}
            onValueChange={value => onSortChange(value as SortDirection)}
          >
            <SelectTrigger className={'w-[300px]'}>
              <SelectValue placeholder={'Сортировка по приоритету'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={'desc'}>
                <div className={'flex items-center'}>
                  <ArrowUpDown className={'mr-2 h-4 w-4'} />
                  Высокий → Низкий приоритет
                </div>
              </SelectItem>
              <SelectItem value={'asc'}>
                <div className={'flex items-center'}>
                  <ArrowUpDown className={'mr-2 h-4 w-4'} />
                  Низкий → Высокий приоритет
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    )
  }
)
