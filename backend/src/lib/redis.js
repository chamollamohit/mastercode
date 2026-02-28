import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

redis.on("connect", () => console.log("Redis Connexted"));
redis.on("error", (error) => console.log("Redis Error", error));

export default redis;
