import { employees } from '../../db/drizzle/schema';
import { defineEventHandler } from 'h3';

import { db } from '../../db';
import { Detail } from '~/pages/employee/[employeeCd].vue';
import { Employees } from '~/server/db/drizzle/type';
import { DUMMY_PASSWORD, EMPTY_DATETIME } from '~/server/db/const';
import { sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const body: Detail = await readBody(event);
    const employeeData: Employees = {
      employeeCd: body.employeeCd,
      employeeName: body.employeeName,
      kana: body.kana,
      email: body.email,
      password: body.password,
      tel: body.tel,
      departmentCd: body.departmentCd,
      post: body.post,
      authority: body.authority,
      employmentStatus: body.employmentStatus,
      incumbencyStatus: body.incumbencyStatus,
      loginAt: body.loginAt === EMPTY_DATETIME ? null : body.loginAt,
      failureCount: body.failureCount,
      lockedAt: body.lockedAt === EMPTY_DATETIME ? null : body.lockedAt,
      createdEmployee: body.createdEmployee,
      createdAt: null,
      updatedEmployee: body.updatedEmployee,
      updatedAt: null,
    };

    await db
      .insert(employees)
      .values({
        ...employeeData,
        createdAt: sql`current_timestamp`,
        updatedAt: sql`current_timestamp`,
      })
      .onDuplicateKeyUpdate({
        set: {
          ...employeeData,
          password:
            employeeData.password === DUMMY_PASSWORD
              ? sql`${employees.password}`
              : employeeData.password,
          createdAt: sql`${employees.createdAt}`,
          updatedAt: sql`current_timestamp`,
        },
      });
  } catch (error) {
    throw createError('[DBError][File]api/employee/index.post.ts [Message]' + error);
  }
});
