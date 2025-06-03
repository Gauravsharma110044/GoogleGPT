import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const db = (await connectDB()).connection.db;
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json({
      id: user.insertedId,
      name,
      email
    });
  } catch (error) {
    console.error("[REGISTER_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request){
    try {
        const user = await prisma.user.findMany()
        if(process.env.NODE_ENV === "production"){
            return NextResponse.json({'message': 'Restricted Access'})
        }
        return NextResponse.json(user, {status: 201})
    } catch (error) {
        return NextResponse.json({message: 'Error creating user'}, {status: 500})
    }
}

