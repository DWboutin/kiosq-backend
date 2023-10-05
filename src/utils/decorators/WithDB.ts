import { MongoDBRequestException } from '@/exceptions/MongoDBRequestException'

export function WithDB(target: any) {
  const originalMethods = Object.getOwnPropertyNames(target.prototype)

  originalMethods.forEach((methodName) => {
    const originalMethod = target.prototype[methodName]

    target.prototype[methodName] = async function (...args: any[]) {
      try {
        await this.dbConnector.initConnection()
        const result = await originalMethod.apply(this, args)
        return result
      } catch (err: any) {
        throw new MongoDBRequestException(err)
      } finally {
        await this.dbConnector.disconnect()
      }
    }
  })

  return target
}
