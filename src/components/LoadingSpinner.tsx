import React from 'react'
import styled from 'styled-components'

const Spinner = styled.div`
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  &:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60px;
    height: 60px;
    margin-top: -15px;
    margin-left: -15px;
    border-radius: 50%;
    border: 1px solid #ccc;
    border-top-color: var(--primary-color);
    animation: spinner 0.6s linear infinite;
  }
`

const LoadingSpinner = () => {
  return <Spinner />
}

export default LoadingSpinner
