import { render, screen } from '@testing-library/react'

import ProfilePicture from 'Queue/components/ProfilePicture'
import * as genericUtils from 'utils/generic'

describe('ProfilePicture', () => {
  it('displays an image when an emailAddress is provided', () => {
    const mockImageHex = '0123456789'
    const expectedImgUrl = `https://gravatar.com/avatar/${mockImageHex}?s=290`

    const messageToSHA256Mock = jest.spyOn(genericUtils, 'messageToSHA256')
    messageToSHA256Mock.mockImplementation(() => mockImageHex)

    render(<ProfilePicture emailAddress="foo@bar.com" />)

    const imgElement = screen.queryByRole('img')

    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute('src', expectedImgUrl)
  })

  it('does not render image element if no emailAddress is passed to component', () => {
    render(<ProfilePicture />)

    const imgElement = screen.queryByRole('img')

    expect(imgElement).not.toBeInTheDocument()
  })
})
