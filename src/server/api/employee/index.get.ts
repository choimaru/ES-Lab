import { and, eq } from 'drizzle-orm';
import { employees, generalCodes } from '../../db/drizzle/schema';
import { alias } from 'drizzle-orm/mysql-core';
import { defineEventHandler } from 'h3';
import {
  CATEGORY_AUTHORITY,
  CATEGORY_EMPLOYMENT_STATUS,
  CATEGORY_INCUMBENCY_STATUS,
  CATEGORY_POST,
} from '../../db/const';
import { db } from '../../db';

export default defineEventHandler(async () => {
  try {
    const m1 = alias(generalCodes, 'm1');
    const m2 = alias(generalCodes, 'm2');
    const m3 = alias(generalCodes, 'm3');
    const m4 = alias(generalCodes, 'm4');

    return await db
      .select({
        employeeCd: employees.employeeCd,
        employeeName: employees.employeeName,
        kana: employees.kana,
        email: employees.email,
        departmentCd: employees.departmentCd,
        post: m1.name,
        authority: m2.name,
        employmentStatus: m3.name,
        incumbencyStatus: m4.name,
        loginAt: employees.loginAt,
        lockedAt: employees.lockedAt,
      })
      .from(employees)
      .leftJoin(m1, and(eq(employees.post, m1.code), eq(m1.category, CATEGORY_POST)))
      .leftJoin(m2, and(eq(employees.authority, m2.code), eq(m2.category, CATEGORY_AUTHORITY)))
      .leftJoin(m3, and(eq(employees.employmentStatus, m3.code), eq(m3.category, CATEGORY_EMPLOYMENT_STATUS)))
      .leftJoin(m4, and(eq(employees.incumbencyStatus, m4.code), eq(m4.category, CATEGORY_INCUMBENCY_STATUS)))
      .orderBy(employees.employeeCd);
  } catch (error) {
    console.log(error);
  }
});
