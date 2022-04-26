const ms = require('ms')

export const timeSpan = (val: string | number) => {
  const errStr =
    '"expires_in" argument should be a number of milliseconds or a string representing a timespan eg: "1d", "20h", 60'

  if (typeof val === 'string') {
    const milliseconds = ms(val)

    if (typeof milliseconds === 'undefined') {
      throw new Error(errStr)
    }

    return new Date(Date.now() + milliseconds).toUTCString()
  } else if (typeof val === 'number') {
    return new Date(Date.now() + val).toUTCString()
  } else {
    throw new Error(errStr)
  }
}
