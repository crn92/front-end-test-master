import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { messageToSHA256 } from 'utils/generic'

const DEFAULT_IMAGE_SIZE = 290

const Container = styled.div`
  height: ${DEFAULT_IMAGE_SIZE}px;
  width: ${DEFAULT_IMAGE_SIZE}px;
  background-color: grey;
`

interface IProfilePictureProps {
  emailAddress?: string | null
}

const ProfilePicture = ({ emailAddress }: IProfilePictureProps) => {
  const [customerProfilePicture, setCustomerProfilePicture] = useState<null | string>(null)

  const getProfilePicture = (emailAddress: string) => {
    const emailHex = messageToSHA256(emailAddress)
    setCustomerProfilePicture(`https://gravatar.com/avatar/${emailHex}?s=${DEFAULT_IMAGE_SIZE}`)
  }

  useEffect(() => {
    if (emailAddress) getProfilePicture(emailAddress)
  }, [emailAddress])

  return (
    <Container>
      {customerProfilePicture ? (
        <img alt="Customer profile avatar" src={customerProfilePicture} draggable="false" />
      ) : null}
    </Container>
  )
}

export default ProfilePicture
