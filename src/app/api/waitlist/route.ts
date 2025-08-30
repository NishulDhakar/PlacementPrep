import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI as string
const client = new MongoClient(uri)

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    await client.connect()
    const db = client.db("waitlistPlacementReady")
    const collection = db.collection("emails")

    const existing = await collection.findOne({ email })
    if (existing) {
      return NextResponse.json({ message: "Already in waitlist" }, { status: 200 })
    }

    await collection.insertOne({ email, createdAt: new Date() })
    return NextResponse.json({ message: "Added to waitlist!" })
  } catch (error) {
    console.error("Error saving email:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
