import { QueueAction } from 'Queue/state/actions'
import { QueueActionType } from 'Queue/state/action-types'
import { initialState, queueReducer } from 'Queue/state/reducers/queueReducer'

describe(`queueReducer`, () => {
  it(`should have the following initialState`, () => {
    expect(initialState).toHaveProperty('customers')
    expect(initialState.customers).toHaveProperty('length', 0)
  })

  it(`should return the initialState and set loading to true`, () => {
    // Given
    const action: QueueAction = {
      type: QueueActionType.FETCH_CUSTOMERS,
    }

    // When
    const result = queueReducer(initialState, action)

    // Then
    expect(result).toEqual({ ...initialState, loading: true })
  })

  it(`should return the customers payload and set loading to false`, () => {
    const payload = [
      { id: 1, customer: { name: 'Foo', emailAddress: 'foo@foo.com' }, expectedTime: '' },
      { id: 2, customer: { name: 'Bar', emailAddress: null }, expectedTime: '' },
    ]

    // Given
    const action: QueueAction = {
      type: QueueActionType.FETCH_CUSTOMERS_SUCCESS,
      payload,
    }

    // When
    const result = queueReducer(initialState, action)

    // Then
    expect(result).toEqual({ ...initialState, customers: payload, loading: false })
  })

  it(`should set error`, () => {
    const payload = 'An error occurred!'

    // Given
    const action: QueueAction = {
      type: QueueActionType.FETCH_CUSTOMERS_ERROR,
      payload,
    }

    // When
    const result = queueReducer(initialState, action)

    // Then
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: 'An error occurred!',
    })
  })
})
