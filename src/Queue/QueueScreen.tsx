import React, { useEffect, useState } from 'react'

import Customer, { ICustomer } from 'Queue/components/Customer'
import {
  ActionContainer,
  CustomersContainer,
  PageHeading,
  RefreshButton,
  SearchInput,
} from 'Queue/QueueScreen.styled'
import { useActions } from 'hooks/useActions'
import { useAppSelector } from 'hooks/useAppSelector'
import LoadingSpinner from 'components/LoadingSpinner'

const DEFAULT_REFRESH_TIMER = 30 // in seconds

export interface ICustomersToday {
  id: number
  customer: ICustomer
  expectedTime: string
}

const QueueScreen = () => {
  const [searchInput, setSearchInput] = useState('')
  const [refreshCountDown, setRefreshCountdown] = useState(DEFAULT_REFRESH_TIMER)

  const { fetchCustomersData } = useActions()

  const { customers, loading, error } = useAppSelector((state) => state.queue)

  useEffect(() => {
    fetchCustomersData()
  }, [fetchCustomersData])

  useEffect(() => {
    const refreshCounter = setTimeout(() => {
      if (refreshCountDown > 0) {
        setRefreshCountdown((prev) => prev - 1)
      }
    }, 1000)
    return () => clearTimeout(refreshCounter)
  }, [refreshCountDown])

  if (error) {
    return <div>An error occurred: {error}</div>
  }

  const handleSearchInputValue = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSearchInput(e.target.value)

  const filterCustomerList = (
    customersList: ICustomersToday[],
    searchText: string
  ): ICustomersToday[] => {
    return customersList.filter(({ customer }) =>
      searchText
        .toLowerCase()
        .split(' ')
        .every((el) => customer.name.toLowerCase().includes(el))
    )
  }

  const handleRefreshList = () => {
    fetchCustomersData()
    setRefreshCountdown(DEFAULT_REFRESH_TIMER)
  }

  return (
    <>
      <PageHeading>Current Queue</PageHeading>
      <ActionContainer>
        <SearchInput
          placeholder="Search customers"
          value={searchInput}
          onChange={handleSearchInputValue}
          disabled={loading}
        />
        <RefreshButton disabled={!!refreshCountDown || loading} onClick={handleRefreshList}>
          {refreshCountDown > 0 ? `Refresh in ${refreshCountDown}` : 'Refresh'}
        </RefreshButton>
      </ActionContainer>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <CustomersContainer>
          {filterCustomerList(customers, searchInput).length ? (
            filterCustomerList(customers, searchInput).map(({ id, customer, expectedTime }) => (
              <Customer key={id} customer={customer} expectedTime={expectedTime} />
            ))
          ) : (
            <div>No customers found with name &apos;{searchInput}&apos;</div>
          )}
        </CustomersContainer>
      )}
    </>
  )
}

export default QueueScreen
