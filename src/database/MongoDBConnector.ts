import { EnvVariableGetter } from '@/utils/EnvVariableGetter'
import mongoose from 'mongoose'

export class MongoDBConnector implements DBConnector {
  public isConnected: boolean = false
  public dbUri: string
  public dbName: string

  constructor() {
    this.dbUri = EnvVariableGetter.get('MONGODB_URI')
    this.dbName = EnvVariableGetter.get('MONGODB_NAME')

    mongoose.set('strictQuery', true)
  }

  public async initConnection() {
    try {
      await mongoose.connect(this.dbUri, {
        dbName: this.dbName,
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
