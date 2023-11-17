import styled from 'styled-components'

export const PageHeading = styled.h1`
  font-size: 24px;
  color: var(--secondary-color);
`

export const ActionContainer = styled.div`
  display: flex;
  column-gap: 2em;
  margin: 32px 0 0 0;
`

export const CustomersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 2em;
  row-gap: 2em;
  margin: 2em 0 0 0;
`

export const SearchInput = styled.input`
  border: 1px solid lightgray;
  border-radius: 0.4em;
  padding: 8px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  &:disabled {
    cursor: not-allowed;
  }
`
export const RefreshButton = styled.button`
  padding: 8px 16px;
  color: var(--white);
  background-color: var(--secondary-color);
  border: 1px solid var(--secondary-color);
  border-radius: 0.4em;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    border: 1px solid gray;
    background-color: gray;
  }
`
