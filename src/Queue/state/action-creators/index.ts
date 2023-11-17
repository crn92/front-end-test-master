import { Dispatch } from 'redux'

import { getQueueData } from 'mockApi'
import { QueueAction } from 'Queue/state/actions'
import { QueueActionType } from 'Queue/state/action-types'
import { sleep } from 'utils/generic'

export const fetchCustomersData = () => {
  return async (dispatch: Dispatch<QueueAction>) => {
    dispatch({
      type: QueueActionType.FETCH_CUSTOMERS,
    })

    try {
      const data = getQueueData()
      await sleep(400)
      dispatch({
        type: QueueActionType.FETCH_CUSTOMERS_SUCCESS,
        payload: data.queueData.queue.customersToday,
      })
    } catch (err) {
      let message = ''
      if (err instanceof Error) {
        message = err.message
      } else {
        message = String(err)
      }
      dispatch({ type: QueueActionType.FETCH_CUSTOMERS_ERROR, payload: message })
    }
  }
}
