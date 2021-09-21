import Logger from "./winston"

const getEnv = (variable: string, optional: boolean = false) => {
  if (!process.env[variable]) {
    if (optional) {
      Logger.warn(`[@env]: Environmental variable for ${variable} is not supplied.`)
    } else {
      throw new Error(`You must create an environment variable for ${variable}`)
    }
  }

  return process.env[variable]?.replace(/\\n/gm, '\n')
}

export const PORT = getEnv("PORT")!
export const DATABASE_NAME = getEnv("DATABASE_NAME")!
export const DATABASE_URL = getEnv("DATABASE_URL")!
  
export const env = {
  isDev: String(process.env.NODE_ENV).toLowerCase().includes('dev'),
  isTest: String(process.env.NODE_ENV).toLowerCase().includes('test'),
  isProd: String(process.env.NODE_ENV).toLowerCase().includes('prod'),
  isStaging: String(process.env.NODE_ENV).toLowerCase().includes('staging'),
  env: process.env.NODE_ENV,
};