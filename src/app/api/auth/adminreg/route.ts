


// import { NextResponse } from "next/server";
// import { hash } from "bcrypt";
// import jwt from "jsonwebtoken";
// import { createConnection } from "../../../../../lib/db";

// export async function POST(request: Request) {
//   try {
//     const { name, email, password, isAdmin } = await request.json();
//     const db = await createConnection();

   
//     const [existingUser] = await db.execute(
//       'SELECT * FROM users WHERE email = ?',
//       [email]
//     );

//     if (existingUser.length > 0) {
//       return NextResponse.json(
//         { error: "Email is already registered." },
//         { status: 400 }
//       );
//     }

  
//     const hashedPassword = await hash(password, 10);

    
//     const role = isAdmin ? 'admin' : 'user';

   
//     const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
//     const values = [name, email, hashedPassword, role];
//     await db.execute(sql, values);

//     const token = jwt.sign(
//       { email, role },
//       process.env.JWT_SECRET_KEY!,
//       { expiresIn: '1h' } 
//     );

//     return NextResponse.json({
//       message: "User created successfully",
//       token, 
//       user: {
//         name,
//         email,
//         role
//       }
//     });
//   } catch (e) {
//     console.error("Error during registration:", e);
//     return NextResponse.json(
//       { error: "An unexpected error occurred. Please try again." },
//       { status: 500 }
//     );
//   }
// }






import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { createConnection } from "../../../../../lib/db";

export async function POST(request: Request) {
  try {
    const { name, email, password, isAdmin } = await request.json();
    const db = await createConnection();

    // Check if the email already exists in the database (PostgreSQL query syntax)
    const sqlCheckUser = 'SELECT * FROM users WHERE email = $1';
    const valuesCheckUser = [email];
    const result = await db.query(sqlCheckUser, valuesCheckUser);

    if (result.rows.length > 0) {
      return NextResponse.json(
        { error: "Email is already registered." },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Define the user role
    const role = isAdmin ? 'admin' : 'user';

    // Insert the new user into the database
    const sqlInsertUser = 'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)';
    const valuesInsertUser = [name, email, hashedPassword, role];
    await db.query(sqlInsertUser, valuesInsertUser);

    // Create a JWT token
    const token = jwt.sign(
      { email, role },
      process.env.JWT_SECRET_KEY!,  // Make sure to set JWT_SECRET_KEY in your environment
      { expiresIn: '1h' }
    );

    return NextResponse.json({
      message: "User created successfully",
      token,
      user: {
        name,
        email,
        role,
      },
    });
  } catch (e) {
    console.error("Error during registration:", e);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

