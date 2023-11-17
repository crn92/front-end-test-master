import { render, screen } from '@testing-library/react'

import Customer, { ICustomerProps } from 'Queue/components/Customer'

describe('Customer', () => {
  it('should display a valid arrival time when expectedTime is passed as ISO string', () => {
    const mockPropData: ICustomerProps = {
      customer: { name: 'Foo Bar' },
      expectedTime: new Date('2020-10-10').toISOString(),
    }
    render(<Customer {...mockPropData} />)

    const arrivalTimeElement = screen.queryByText('Arrival time:', { exact: false })

    expect(arrivalTimeElement).toBeInTheDocument()
    expect(arrivalTimeElement).toHaveTextContent('Arrival time: 01:00')
  })
})
