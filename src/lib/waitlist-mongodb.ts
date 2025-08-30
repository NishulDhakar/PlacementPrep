import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI_WAITLIST!)
export const waitlistClientPromise = client.connect()
