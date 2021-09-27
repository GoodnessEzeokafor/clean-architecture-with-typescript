import { client as redisClient} from "repository/redis/redis.repository";
import apicache from "apicache"
export const routeCache = apicache.options({ redisClient: redisClient }).middleware
