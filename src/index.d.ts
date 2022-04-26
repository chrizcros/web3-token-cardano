type Signer = (msg: string) => PromiseLike<string>

export function sign(signer: Signer, expires_in?: string | number, body?: Object): PromiseLike<string>

type VerifyResult = {
  address: string
  body: Object
}

export function verify(token: string): VerifyResult

declare const Web3Token: {
  sign: typeof sign
  verify: typeof verify
}

export default Web3Token
