       
       
       
       
       
       
       
       
       
       
       
       
       // import mysql from 'mysql2/promise'

       //  let connection:any;
       //  export const createConnection = async () => {
       //  if(!connection){
       //  connection = await mysql.createConnection({
       //  host: process.env.DATABASE_HOST,
       //  user: process.env.DATABASE_USER,
       //  password: process.env.DATABASE_PASSWORD,
       //  database: process.env.DATABASE_NAME,
       //  })}
       //  return connection;
       //  }





//        import { Client } from 'pg';

// let client: Client | null = null;

// export const createConnection = async () => {
//   if (!client) {
//     client = new Client({
//       connectionString: process.env.DATABASE_URL, // Using the Supabase connection string
//     });

//     await client.connect();
//   }
//   return client;
// };
import { Client } from 'pg';

export default async function handler(req, res) {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL, // Ensure the environment variable is correctly set
    ssl: {
      rejectUnauthorized: false, // Enable SSL for Supabase connection
    },
  });

  try {
    await client.connect();
    res.status(200).json({ message: 'Successfully connected to the database' });
  } catch (error) {
    console.error('Connection error:', error.message);
    res.status(500).json({ error: 'Failed to connect to the database', details: error.message });
  } finally {
    await client.end();
  }
}
