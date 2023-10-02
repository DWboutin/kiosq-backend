declare module 'bun' {
  interface Env {
    MONGODB_USERNAME: string
    MONGODB_PASSWORD: string
    MONGODB_DB_NAME: string
    MONGODB_URI: string
  }
}

interface DBConnector {
  isConnected: boolean
  dbUri: string
  dbName: string
  initConnection: () => Promise<void>
  disconnect: () => Promise<void>
}

interface IRepository {
  create: (data: any) => Promise<any>
  findAll: () => Promise<any>
  findById: (id: string) => Promise<any | null>
  update: (id: string, data: any) => Promise<any>
  delete: (id: string) => Promise<any>
}
