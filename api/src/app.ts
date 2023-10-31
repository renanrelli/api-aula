import db from "./db";
import server from "./server";

async function main(): Promise<void> {
  await db.initialize();

  server.start();
}

main();
