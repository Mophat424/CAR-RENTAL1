// import "dotenv/config";
// import { migrate } from "drizzle-orm/node-postgres/migrator";
// import db, { client } from "./db"

// async function migration() {
//     console.log("......Migrations Started......");
//     await migrate(db, { migrationsFolder: __dirname + "/migrations" });
//     await client.end();
//     console.log("......Migrations Completed......");
//     process.exit(0); // 0 means success
// }

// migration().catch((error) => {
//     console.error("Migration failed:", error);
//     process.exit(1); // 1 means an error occurred
// });

// import "dotenv/config";
// import { migrate } from "drizzle-orm/node-postgres/migrator";
// import db, { pool } from "./db"; // Import pool instead of client

// async function migration() {
//     console.log("......Migrations Started......");
//     await migrate(db, { migrationsFolder: __dirname + "/migrations" });
//     await pool.end(); // Use pool.end() to close connections
//     console.log("......Migrations Completed......");
//     process.exit(0); // 0 means success
// }

// migration().catch((error) => {
//     console.error("Migration failed:", error);
//     process.exit(1); // 1 means an error occurred
// });



import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import db, { client } from "./db"

async function migration() {
    console.log("......Migrations Started......");
    await migrate(db, { migrationsFolder: __dirname + "/migrations" });
    await client.end();
    console.log("......Migrations Completed......");
    process.exit(0); // 0 means success
}

migration().catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1); // 1 means an error occurred
});