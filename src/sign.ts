import { timeSpan } from './timespan'
const { Base64 } = require('js-base64')

/**
 *
 * @param {function} signer - The signer function, must return Promise<string>
 * @param {any} body - Body to add to the sign
 */
export const sign = async (signer: any, expiresIn: string = '1d', body = {}) => {
  const expiresInDate = timeSpan(expiresIn)

  validateInput(body)

  const data = {
    'Web3-Token-Version': 1,
    'Expire-Date': expiresInDate,
    ...body,
  }

  const msg = buildMessage(data)

  let COSESign1Message: any
  if (typeof signer === 'function') {
    COSESign1Message = await signer(msg)
  } else {
    throw new Error(
      '"signer" argument should be a function that returns a signature eg: "msg => web3.eth.personal.sign(msg, <YOUR_ADDRESS>)"',
    )
  }

  console.log(COSESign1Message)
  const { signature, key } = COSESign1Message

  if (typeof signature !== 'string') {
    throw new Error('"signature" argument should be a function that returns a signature string (Promise<string>)')
  }

  const token = Base64.encode(
    JSON.stringify({
      signature,
      key,
      body: msg,
    }),
  )

  return token
}

const validateInput = (body: any) => {
  for (const key in body) {
    const field = body[key]

    if (key === 'Expire-Date') {
      throw new Error('Please do not rewrite "Expire-Date" field')
    }

    if (key === 'Web3-Token-Version') {
      throw new Error('Please do not rewrite "Web3-Token-Version" field')
    }

    if (typeof field !== 'string') {
      throw new Error('Body can only contain string values')
    }
  }
}

const buildMessage = (data: any) => {
  const message = []
  for (const key in data) {
    message.push(`${key}: ${data[key]}`)
  }
  return message.join('\n')
}
