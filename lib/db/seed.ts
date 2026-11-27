/**
 * Seeds the demo "College Project" workspace and makes an existing user its owner.
 *
 *   1. Register an account through your app first (Better Auth creates the user).
 *   2. pnpm db:seed                       -> uses the oldest real user
 *      SEED_USER_EMAIL=you@x.com pnpm db:seed   -> uses that user
 *
 * Run with: tsx --env-file=.env.local lib/db/seed.ts
 */
import { asc, eq, notLike } from "drizzle-orm";

import { db } from "./index";
import { user } from "./schema";
import { seedDemoWorkspace } from "./seed-data";

async function main() {
  const email = process.env.SEED_USER_EMAIL;

  const [owner] = email
    ? await db.select().from(user).where(eq(user.email, email)).limit(1)
    : await db
        .select()
        .from(user)
        // Skip the fake teammates this script creates.
        .where(notLike(user.id, "seed-%"))
        .orderBy(asc(user.createdAt))
        .limit(1);

  if (!owner) {
    console.error(
      email
        ? `No user with email ${email}. Register that account first.`
        : "No users yet. Register an account in the app first, then run the seed again.",
    );
    process.exit(1);
  }

  console.log(`Seeding "College Project" with ${owner.email} as owner...`);
  const summary = await seedDemoWorkspace(db, owner);
  console.log("Done:", summary);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
