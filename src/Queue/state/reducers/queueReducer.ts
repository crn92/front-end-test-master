import { QueueAction } from 'Queue/state/actions'
import { QueueActionType } from 'Queue/state/action-types'
import { ICustomersToday } from 'Queue/QueueScreen'

export interface QueueState {
  customers: ICustomersToday[]
  loading: boolean
  error: string | null
}

export const initialState: QueueState = {
  customers: [],
  loading: false,
  error: null,
}

export const queueReducer = (state: QueueState = initialState, action: QueueAction): QueueState => {
  switch (action.type) {
    case QueueActionType.FETCH_CUSTOMERS:
      return { ...state, loading: true }
    case QueueActionType.FETCH_CUSTOMERS_SUCCESS:
      return { ...state, customers: action.payload, loading: false }
    case QueueActionType.FETCH_CUSTOMERS_ERROR:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
