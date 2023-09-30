import { EnvVariableGetter } from '@/utils/EnvVariableGetter'
import mongoose from 'mongoose'

export class MongoDBConnector implements DBConnector {
  public isConnected: boolean = false

  constructor() {
    mongoose.set('strictQuery', true)

    this.initConnection(this.getDBUri())
  }

  public getDBUri() {
    const dbUri = EnvVariableGetter.get('MONGODB_URI')

    return dbUri
  }

  public async initConnection(uri: string) {
    try {
      await mongoose.connect(uri, {
        dbName: 'kiosq',
      })

      this.isConnected = true
      console.debug('MongoDB connected')
    } catch (error) {
      console.error('MongoDB connection error:', error)
    }
  }

  public async disconnect() {
    await mongoose.disconnect()

    console.debug('MongoDB disconnected')

    this.isConnected = false
  }
}
