import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

// Define the expected shape of the decoded token
interface DecodedToken {
  id: string;
  [key: string]: unknown;
}

export function getUserToken(request: NextRequest) {
  try {
    // Get token from cookies, provide fallback to empty string
    const token = request.cookies.get("token")?.value ?? "";
    
    // Check if token exists
    if (!token) {
      return NextResponse.json(
        { error: "No token provided" },
        { status: 401 }
      );
    }

    // Verify token with secret key
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }

    const decodedToken = jwt.verify(token, secretKey) as DecodedToken;
    
    // Return user ID
    return decodedToken.id;
  } catch (error) {
    // Handle specific JWT errors
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}