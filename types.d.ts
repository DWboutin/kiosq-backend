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
}

interface IRepository {
  create: (data: any) => Promise<any>
}
