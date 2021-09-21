
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "config/config"
import redis from "redis"


// redis config type
type IRedisConfigType = {
  retry_strategy: any
  port: number
  host: string
  auth_pass?: string
}
// redis retry strategy config
const config:IRedisConfigType =   {
  retry_strategy: function (options: any) {
    // End reconnecting on a specific error and flush all commands with
    // a individual error
    if (options.error && options.error.code === "ECONNREFUSED") return new Error("The server refused the connection")
    // End reconnecting after a specific timeout and flush all commands
    // with a individual error
    if (options.total_retry_time > 1000 * 60 * 60) return new Error("Retry time exhausted")
    // End reconnecting with built in error    
    if (options.attempt > 10) return undefined
    // reconnect after
    return Math.min(options.attempt * 100, 3000)
  },
  port: Number(REDIS_PORT),
  host: REDIS_HOST, 
  auth_pass: String(REDIS_PASSWORD)
}
// initialize redis client
export const client = redis.createClient(config)
// console.log(client)
// listens to error
client.on("connect", function () {
  console.log("REDIS CONNECTED")
});
client.watch("signupcode", function (watchError) {
  if (watchError) throw watchError;
})
client.on("error", function(error) {
  console.error(error)
})

// const methods
// const hashRedisSet = (key: string, value: string | Record<string, any>) => {
//   return Promise.resolve(client.hmset(key, value));
// };

/** redis set */
const redisSetEx = (key: string, value: any, expiry: number) => {
  return new Promise((resolve, reject) => {
    client.set(key, value, 'EX', expiry, (error: any) => {
      if (error) {
        return reject(error);
      }
      resolve({ value, expiry });
    });
  });
};

/** redis get */
type voidFn = (value: unknown) => void;
const promiser = (resolve: voidFn, reject: voidFn) => {
  return (err: any, data: any) => {
    if (err) reject(err);
    resolve(data);
  };
};
const redisGet = async (key: any) => {
  return new Promise((resolve, reject) => {
    client.get(key, promiser(resolve, reject));
  });
};

/** redis delete */
const redisDelete = async (key: string) => {
  try {
      await client.del(key)
  } catch (e) {
    return Promise.reject(e)
  }
}

const redisRepository = {
  
}
console.log("-------silence typescript error----------")
console.log(redisSetEx,redisDelete,redisGet)
console.log("-------silence typescript error----------")


export default redisRepository