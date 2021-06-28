import { validate } from 'class-validator'

export const validation = async <T>(arg: T): Promise<T> => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const errors = await validate((arg as unknown) as object)

  if (errors.length > 0) {
    // Need to change this
    throw new Error('validation error')
  }

  return arg
}
