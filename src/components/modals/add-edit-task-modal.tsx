'use client'
import React, { ReactNode, useId } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { PRIORITY_STYLES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useAppDispatch } from '@/store'
import { addTask, editTask } from '@/store/slices'
import { zodResolver } from '@hookform/resolvers/zod'
import { v4 } from 'uuid'
import { z } from 'zod'

const formSchema = z.object({
  text: z.string().min(1, 'Task description is required'),
  completed: z.boolean(),
  priority: z.enum(['low', 'medium', 'high'], {
    required_error: 'Please select a priority level',
  }),
})

type FormValues = z.infer<typeof formSchema>

type TaskFormDialogProps = {
  id?: string
  trigger: ReactNode
  initialData?: FormValues
  editMode?: boolean
}

export const AddEditTaskModal = ({ id, trigger, initialData, editMode }: TaskFormDialogProps) => {
  const dispatch = useAppDispatch()
  const radioId = useId()
  const isEditMode = !!initialData

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      text: '',
      completed: false,
      priority: 'medium',
    },
  })

  const [open, setOpen] = React.useState(false)

  const onSubmit = (data: FormValues) => {
    if (editMode && id) {
      dispatch(editTask({ id, task: { ...data } }))
    } else {
      dispatch(addTask({ id: v4(), ...data }))
    }

    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={'sm:max-w-md'}>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Редактировать задачу' : 'Создать новую задачу'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Измените существующую задачу.' : 'Добавьте новую задачу в список.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-6 py-4'}>
            {/* Текст */}
            <FormField
              control={form.control}
              name={'text'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание задачи</FormLabel>
                  <FormControl>
                    <Input placeholder={'Введите описание задачи'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Завершено ли уже */}
            <FormField
              control={form.control}
              name={'completed'}
              render={({ field }) => (
                <FormItem
                  className={'flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'}
                >
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className={'space-y-1 leading-none'}>
                    <FormLabel>Завершено</FormLabel>
                    <FormDescription>Отметьте, если эта задача уже выполнена</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {/* Приоритет */}
            <FormField
              control={form.control}
              name={'priority'}
              render={({ field }) => (
                <FormItem className={'space-y-3'}>
                  <FormLabel>Приоритет</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className={'grid grid-cols-3 gap-2'}
                    >
                      {/* Низкий приоритет */}
                      <div
                        className={cn(
                          'relative flex cursor-pointer flex-col items-center gap-2 rounded-md border px-2 py-3 text-center shadow-sm outline-none transition-all',
                          'hover:border-blue-400 hover:bg-blue-50',
                          field.value === 'low' && 'border-blue-500/50 bg-blue-50'
                        )}
                      >
                        <RadioGroupItem id={`${radioId}-low`} value={'low'} className={'sr-only'} />
                        {PRIORITY_STYLES.low.icon}
                        <label
                          htmlFor={`${radioId}-low`}
                          className={
                            'cursor-pointer text-xs font-medium leading-none after:absolute after:inset-0'
                          }
                        >
                          {PRIORITY_STYLES.low.label}
                        </label>
                      </div>

                      {/* Средний приоритет */}
                      <div
                        className={cn(
                          'relative flex cursor-pointer flex-col items-center gap-2 rounded-md border px-2 py-3 text-center shadow-sm outline-none transition-all',
                          'hover:border-amber-400 hover:bg-amber-50',
                          field.value === 'medium' && 'border-amber-500/50 bg-amber-50'
                        )}
                      >
                        <RadioGroupItem
                          id={`${radioId}-medium`}
                          value={'medium'}
                          className={'sr-only'}
                        />
                        {PRIORITY_STYLES.medium.icon}
                        <label
                          htmlFor={`${radioId}-medium`}
                          className={
                            'cursor-pointer text-xs font-medium leading-none after:absolute after:inset-0'
                          }
                        >
                          {PRIORITY_STYLES.medium.label}
                        </label>
                      </div>

                      {/* Высокий приоритет */}
                      <div
                        className={cn(
                          'relative flex cursor-pointer flex-col items-center gap-2 rounded-md border px-2 py-3 text-center shadow-sm outline-none transition-all',
                          'hover:border-rose-400 hover:bg-rose-50',
                          field.value === 'high' && 'border-rose-500/50 bg-rose-50'
                        )}
                      >
                        <RadioGroupItem
                          id={`${radioId}-high`}
                          value={'high'}
                          className={'sr-only'}
                        />
                        {PRIORITY_STYLES.high.icon}
                        <label
                          htmlFor={`${radioId}-high`}
                          className={
                            'cursor-pointer text-xs font-medium leading-none after:absolute after:inset-0'
                          }
                        >
                          {PRIORITY_STYLES.high.label}
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type={'submit'} className={'w-full'}>
                {isEditMode ? 'Изменить задачу' : 'Создать задачу'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
