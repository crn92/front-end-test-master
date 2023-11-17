import { QueueActionType } from 'Queue/state/action-types'
import { ICustomersToday } from 'Queue/QueueScreen'

interface FetchCustomersAction {
  type: QueueActionType.FETCH_CUSTOMERS
}

interface FetchCustomersSuccessAction {
  type: QueueActionType.FETCH_CUSTOMERS_SUCCESS
  payload: ICustomersToday[]
}

interface FetchCustomersErrorAction {
  type: QueueActionType.FETCH_CUSTOMERS_ERROR
  payload: string
}

export type QueueAction =
  | FetchCustomersAction
  | FetchCustomersSuccessAction
  | FetchCustomersErrorAction
