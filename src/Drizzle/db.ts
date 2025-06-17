//   import "dotenv/config"

//   import { drizzle } from "drizzle-orm/node-postgres"
//   import { Client } from "pg"
//   import * as schema from "./schema"

//   export const client = new Client({
//       connectionString: process.env.Database_URL as string
//   })

//   const main = async () => {
//       await client.connect()
//   }
//   main().then(() => {
//       console.log("Connected to the database")
//   }).catch((error) => {
//       console.error("Error connecting to the database:", error)
//   })


//   const db = drizzle(client, { schema, logger: true })

//   export default db

// import "dotenv/config";
// import { drizzle } from "drizzle-orm/node-postgres";
// import { Pool } from "pg";
// import * as schema from "./schema";

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL as string || "",
// });

// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL environment variable is not set");
// }

// const db = drizzle(pool, { schema, logger: true });

// export { pool }; 
// export default db; 
  import "dotenv/config"

  import { drizzle } from "drizzle-orm/node-postgres"
  import { Client } from "pg"
  import * as schema from "./schema"

  export const client = new Client({
      connectionString: process.env.Database_URL as string
  })

  const main = async () => {
      await client.connect()
  }
  main().then(() => {
      console.log("Connected to the database")
  }).catch((error) => {
      console.error("Error connecting to the database:", error)
  })


  const db = drizzle(client, { schema, logger: false })

  export default db