import { employees } from '../../db/drizzle/schema';
import { defineEventHandler } from 'h3';

import { db } from '../../db';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const body: { employeeCd: string } = await readBody(event);
    await db.delete(employees).where(eq(employees.employeeCd, body.employeeCd));
  } catch (error) {
    throw createError('[DBError][File]api/employee/index.delete.ts [Message]' + error);
  }
});
