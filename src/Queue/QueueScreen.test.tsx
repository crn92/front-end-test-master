import React from 'react'
import { Provider } from 'react-redux'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import QueueScreen from 'Queue/QueueScreen'
import { QueueActionType } from 'Queue/state/action-types'
import store from 'state/store'

const setup = () => {
  return { render: () => render(<Provider store={store}>{<QueueScreen />}</Provider>), store }
}

describe('QueueScreen component', () => {
  const customers = ['Fraser', 'Alex Forbes-Reed', 'Steve', 'John Smith']

  it('fetches customers data on mount', async () => {
    const { render } = setup()
    render()

    await waitFor(() => {
      const customersOnScreen = customers.map((customer) => screen.queryByText(customer))

      expect(customersOnScreen[0]).toBeInTheDocument()
      expect(customersOnScreen[1]).toBeInTheDocument()
      expect(customersOnScreen[2]).toBeInTheDocument()
      expect(customersOnScreen[3]).toBeInTheDocument()
    })
  })

  it('shows a single customer when using the search input with input set to Alex', async () => {
    const { render } = setup()
    render()

    const searchInput = screen.getByPlaceholderText('Search customers')

    await waitFor(() => {
      screen.getAllByTestId('customer-card')
    })

    fireEvent.input(searchInput, { target: { value: 'Alex' } })

    expect(screen.queryByText('Alex Forbes-Reed')).toBeInTheDocument()
    expect(screen.queryByText('Fraser')).not.toBeInTheDocument()
    expect(screen.queryByText('Steve')).not.toBeInTheDocument()
    expect(screen.queryByText('John Smith')).not.toBeInTheDocument()
  })

  it('shows no customers found message if search input does not match with an existing customer', async () => {
    const { render } = setup()
    render()

    const searchInput = screen.getByPlaceholderText('Search customers')

    await waitFor(() => {
      screen.getAllByTestId('customer-card')
    })

    const searchInputContent = 'Albert'
    fireEvent.input(searchInput, { target: { value: searchInputContent } })

    expect(
      screen.getByText(`No customers found with name '${searchInputContent}'`)
    ).toBeInTheDocument()
  })

  it('enables refresh button after 30 seconds from mounting', async () => {
    jest.useFakeTimers()
    const { render } = setup()
    render()

    const refreshButton = screen.getByRole('button')
    expect(refreshButton).toBeDisabled()

    await waitFor(() => {
      screen.getAllByTestId('customer-card')
    })

    act(() => {
      jest.runAllTimers()
    })

    expect(refreshButton).toBeEnabled()
  })

  it('disables refresh button after user click', async () => {
    jest.useFakeTimers()
    const { render } = setup()
    render()

    await waitFor(() => {
      screen.getAllByTestId('customer-card')
    })

    act(() => {
      jest.runAllTimers()
    })

    const refreshButton = screen.getByRole('button')

    fireEvent.click(refreshButton)

    expect(refreshButton).toBeDisabled()
  })

  it('clears search input when user clicks refresh button', async () => {
    jest.useFakeTimers()
    const { render } = setup()
    render()

    await waitFor(() => {
      screen.getAllByTestId('customer-card')
    })

    act(() => {
      jest.runAllTimers()
    })

    const refreshButton = screen.getByRole('button')
    const searchInput = screen.getByPlaceholderText('Search customers')

    fireEvent.input(searchInput, { target: { value: 'Fred' } })
    fireEvent.click(refreshButton)

    expect(refreshButton).toBeDisabled()
    expect(searchInput).toBeDisabled()
    expect(searchInput).toHaveValue('')
  })

  it('displays error message when error occurs fetching customers', async () => {
    const { render, store } = setup()
    render()

    act(() => {
      store.dispatch({
        type: QueueActionType.FETCH_CUSTOMERS_ERROR,
        payload: 'Network request failed!',
      })
    })

    expect(screen.getByText('An error occurred: Network request failed!')).toBeInTheDocument()
  })
})
