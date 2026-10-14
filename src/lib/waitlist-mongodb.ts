import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI_WAITLIST || process.env.MONGODB_URI;

const client = uri ? new MongoClient(uri) : null;

export const waitlistClientPromise = client ? client.connect() : Promise.resolve(null);
