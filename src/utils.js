import { Platform } from 'react-native'

export const isAndroid = Platform.OS === 'android'

export const getCompleted = tasks => tasks.filter(t => t.completed)
export const getUncompleted = tasks => tasks.filter(t=> !t.completed)
