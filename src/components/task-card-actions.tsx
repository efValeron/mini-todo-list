import React, { memo } from 'react'

import { AddEditTaskModal, DeleteTaskModal } from '@/components/modals'
import { Button } from '@/components/ui'
import { Task } from '@/types/instances'
import { PencilIcon, TrashIcon } from 'lucide-react'

type TaskCardActionsProps = {
  task: Task
}

export const TaskCardActions = memo(({ task }: TaskCardActionsProps) => {
  const buttonClasses =
    'rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10'

  return (
    <div className={'shadow-xs inline-flex -space-x-px rounded-md rtl:space-x-reverse'}>
      {/* Редактировать задачу */}
      <AddEditTaskModal
        editMode
        id={task.id}
        trigger={
          <Button
            className={buttonClasses}
            variant={'outline'}
            size={'icon'}
            aria-label={'Edit Task'}
          >
            <PencilIcon size={16} aria-hidden={'true'} />
          </Button>
        }
        initialData={{
          text: task.text,
          completed: task.completed,
          priority: task.priority,
        }}
      />
      {/* Удалить задачу */}
      <DeleteTaskModal
        id={task.id}
        trigger={
          <Button
            className={buttonClasses}
            variant={'outline'}
            size={'icon'}
            aria-label={'Delete Task'}
          >
            <TrashIcon size={16} aria-hidden={'true'} />
          </Button>
        }
      />
    </div>
  )
})
