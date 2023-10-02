import mongoose from 'mongoose'

export class MongoDBConnector implements DBConnector {
  public isConnected: boolean = false

  constructor(
    public dbUri: string,
    public dbName: string,
  ) {
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
