import { useMemo } from 'react'

import { Task } from '@/types/instances'

export type FilterStatus = 'all' | 'active' | 'completed'
export type SortDirection = 'asc' | 'desc'

export const useFilteredSortedTasks = (
  tasks: Task[],
  filterStatus: FilterStatus,
  sortByPriority: SortDirection
) => {
  return useMemo(() => {
    // Фильтрация задач по статусу
    const filtered = tasks.filter(task => {
      if (filterStatus === 'all') {
        return true
      }
      if (filterStatus === 'active') {
        return !task.completed
      }
      if (filterStatus === 'completed') {
        return task.completed
      }

      return true
    })

    // Сортировка задач по приоритету
    const priorityMap = { low: 1, medium: 2, high: 3 }

    return [...filtered].sort((a, b) => {
      const priorityA = priorityMap[a.priority]
      const priorityB = priorityMap[b.priority]

      return sortByPriority === 'desc' ? priorityB - priorityA : priorityA - priorityB
    })
  }, [tasks, filterStatus, sortByPriority])
}
