import { defineEventHandler } from 'h3';
import { generalCodes } from '../../db/drizzle/schema';
import { eq } from 'drizzle-orm';
import { db } from '../../db';

export default defineEventHandler(async (event) => {
  const category = event.context.params?.category;

  try {
    return await db
      .select({ code: generalCodes.code, name: generalCodes.name })
      .from(generalCodes)
      .where(eq(generalCodes.category, category))
      .orderBy(generalCodes.sortKey);
  } catch (error) {
    console.log(error);
  }
});
