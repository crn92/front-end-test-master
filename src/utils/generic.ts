import sha256 from 'crypto-js/sha256'

export const messageToSHA256 = (message: string) => {
  return sha256(message).toString()
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
