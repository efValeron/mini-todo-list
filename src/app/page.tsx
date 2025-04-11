import { TaskList } from '@/components'
import { AddEditTaskModal } from '@/components/modals'
import { Button } from '@/components/ui'
import { PlusIcon } from 'lucide-react'

export default function Home() {
  return (
    <main className={'min-h-screen p-4 md:p-8'}>
      <div className={'mx-auto max-w-5xl'}>
        <div className={'mb-8 flex items-center justify-between'}>
          <h1 className={'text-2xl font-bold'}>Мои задачи</h1>
          <AddEditTaskModal
            trigger={
              <Button>
                <PlusIcon className={'mr-2 h-4 w-4'} />
                Создать новую задачу
              </Button>
            }
          />
        </div>

        <TaskList />
      </div>
    </main>
  )
}
