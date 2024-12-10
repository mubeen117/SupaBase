




// import { NextResponse } from "next/server";
// import { compare } from "bcrypt";
// import { createConnection } from "../../../../../lib/db"; 
// import jwt from "jsonwebtoken";

// export async function POST(request: Request) {
//   try {
//     const { email, password } = await request.json();
//     const db = await createConnection();

 
//     const [user] = await db.execute(
//       'SELECT * FROM users WHERE email = ?',
//       [email]
//     );

//     if (!user || user.length === 0) {
//       return NextResponse.json(
//         { error: "Invalid email or password" },
//         { status: 401 }
//       );
//     }

//     const dbUser = user[0];

   
//     const isPasswordCorrect = await compare(password, dbUser.password);

//     if (!isPasswordCorrect) {
//       return NextResponse.json(
//         { error: "Invalid email or password" },
//         { status: 401 }
//       );
//     }

    
//     const token = jwt.sign(
//       { userId: dbUser.id, email: dbUser.email, role: dbUser.role },
//       process.env.JWT_SECRET_KEY!, 
//       { expiresIn: '1h' }
//     );

//     return NextResponse.json({
//       message: "Login successful",
//       token, 
//       user: {
//         id: dbUser.id,
//         name: dbUser.name,
//         email: dbUser.email,
//         role: dbUser.role
//       }
//     });
//   } catch (e) {
//     console.error("Error during login:", e);
//     return NextResponse.json(
//       { error: "An unexpected error occurred. Please try again." },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import { createConnection } from "../../../../../lib/db"; 
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const db = await createConnection();

    // Use PostgreSQL query syntax
    const sql = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    
    const result = await db.query(sql, values);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const dbUser = result.rows[0];

    // Compare the password using bcrypt
    const isPasswordCorrect = await compare(password, dbUser.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: dbUser.id, email: dbUser.email, role: dbUser.role },
      process.env.JWT_SECRET_KEY!,  // Make sure JWT_SECRET_KEY is set in your environment
      { expiresIn: '1h' }
    );

    return NextResponse.json({
      message: "Login successful",
      token, 
      user: {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role
      }
    });
  } catch (e) {
    console.error("Error during login:", e);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}





