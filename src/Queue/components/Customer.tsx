import ArrivalTime from 'Queue/components/ArrivalTime'
import Content from 'Queue/components/Content'
import CustomerCard from 'Queue/components/CustomerCard'
import Name from 'Queue/components/Name'
import ProfilePicture from 'Queue/components/ProfilePicture'

export interface ICustomer {
  name: string
  emailAddress?: string | null | undefined
}

export interface ICustomerProps {
  customer: ICustomer
  expectedTime: string
}

const Customer = ({ customer, expectedTime }: ICustomerProps) => {
  const parseArrivalTime = () => {
    const date = new Date(expectedTime)
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    return `${hours}:${minutes}`
  }

  return (
    <CustomerCard>
      <ProfilePicture emailAddress={customer?.emailAddress} />
      <Content>
        <Name>{customer.name}</Name>
        <ArrivalTime>Arrival time: {parseArrivalTime()}</ArrivalTime>
      </Content>
    </CustomerCard>
  )
}

export default Customer
