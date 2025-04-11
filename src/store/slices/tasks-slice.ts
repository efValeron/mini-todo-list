import { Task } from '@/types/instances'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TasksState = Task[]

const STORAGE_KEY = 'tasks'

const loadState = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch (e) {
    return []
  }
}

const saveState = (state: TasksState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {}
}

const initialState: TasksState = loadState()

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.unshift(action.payload)
      saveState(state)
    },
    editTask: (state, action: PayloadAction<{ id: string; task: Omit<Task, 'id'> }>) => {
      const existingTask = state.find(task => task.id === action.payload.id)

      if (existingTask) {
        existingTask.text = action.payload.task.text
        existingTask.completed = action.payload.task.completed
        existingTask.priority = action.payload.task.priority
        saveState(state)
      }
    },
    deleteTask: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex(task => task.id === action.payload.id)

      if (index !== -1) {
        state.splice(index, 1)
        saveState(state)
      }
    },
  },
})

export const { addTask, editTask, deleteTask } = slice.actions
export const tasksReducer = slice.reducer
