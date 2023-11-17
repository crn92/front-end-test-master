import { AnyAction } from 'redux'
import configureMockStore from 'redux-mock-store'
import thunk, { ThunkDispatch } from 'redux-thunk'

import * as mockApi from 'mockApi'
import { QueueAction } from 'Queue/state/actions'
import { QueueActionType } from 'Queue/state/action-types'
import { fetchCustomersData } from 'Queue/state/action-creators'
import { initialState, QueueState } from 'Queue/state/reducers/queueReducer'

type DispatchExts = ThunkDispatch<QueueState, void, AnyAction>

const mockStore = configureMockStore<QueueState, DispatchExts>([thunk])

describe('queueActionCreators', () => {
  describe('fetchCustomerData', () => {
    it(`should call ${QueueActionType.FETCH_CUSTOMERS_SUCCESS} after ${QueueActionType.FETCH_CUSTOMERS} on successful request`, async () => {
      const mockedDate = new Date('2023-10-14')
      const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockedDate)
      const store = mockStore(initialState)

      const expectedActions: QueueAction[] = [
        { type: QueueActionType.FETCH_CUSTOMERS },
        {
          type: QueueActionType.FETCH_CUSTOMERS_SUCCESS,
          payload: mockApi.getQueueData().queueData.queue.customersToday,
        },
      ]

      await store.dispatch(fetchCustomersData())

      expect(store.getActions()).toEqual(expectedActions)
      spy.mockRestore()
    })

    it(`should call ${QueueActionType.FETCH_CUSTOMERS_ERROR} after ${QueueActionType.FETCH_CUSTOMERS} on request failure`, async () => {
      const store = mockStore(initialState)
      const mockGetQueueData = jest.spyOn(mockApi, 'getQueueData')
      mockGetQueueData.mockReturnValue(undefined as any)

      const expectedActions: QueueAction[] = [
        { type: QueueActionType.FETCH_CUSTOMERS },
        {
          type: QueueActionType.FETCH_CUSTOMERS_ERROR,
          payload: "Cannot read properties of undefined (reading 'queueData')",
        },
      ]

      await store.dispatch(fetchCustomersData())

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
