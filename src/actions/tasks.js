import * as types from '../constants/actionTypes'

export const addTask = todo => ({
  type: types.ADD_TASK,
  payload: todo,
})

export const removeTask = id => ({
  type: types.REMOVE_TASK,
  payload: { id },
})

export const completeTask = id => ({
  type: types.COMPLETE_TASK,
  payload: { id },
})
