import { defineEventHandler } from 'h3';
import { employees, personalDatas } from '../../db/drizzle/schema';
import { eq, sql } from 'drizzle-orm';
import { db } from '../../db';
import { alias } from 'drizzle-orm/mysql-core';
import { DUMMY_PASSWORD } from '~/server/db/const';

export default defineEventHandler(async (event) => {
  const employeeCd = event.context.params?.employeeCd as string;

  try {
    const m1 = alias(personalDatas, 'm1');

    const result = await db
      .select({
        employeeCd: employees.employeeCd,
        employeeName: employees.employeeName,
        kana: employees.kana,
        email: employees.email,
        password: sql<string>`${DUMMY_PASSWORD}`,
        tel: employees.tel,
        departmentCd: employees.departmentCd,
        post: employees.post,
        authority: employees.authority,
        employmentStatus: employees.employmentStatus,
        incumbencyStatus: employees.incumbencyStatus,
        loginAt: employees.loginAt,
        failureCount: employees.failureCount,
        lockedAt: employees.lockedAt,
        createdEmployee: employees.createdEmployee,
        createdAt: employees.createdAt,
        updatedEmployee: employees.updatedEmployee,
        updatedAt: employees.updatedAt,
        gender: m1.gender,
        birthday: m1.birthday,
        zipCode: m1.zipCode,
        prefecture: m1.prefecture,
        address: m1.address,
        building: m1.building,
        emailPersonal: m1.email,
        telPersonal: m1.tel,
        emergencyTel: m1.emergencyTel,
        entryDate: m1.entryDate,
        retirementDate: m1.retirementDate,
        retirementStatus: m1.retirementStatus,
      })
      .from(employees)
      .leftJoin(m1, eq(employees.employeeCd, m1.employeeCd))
      .where(eq(employees.employeeCd, employeeCd));

    return result;
  } catch (error) {
    throw createError('[DBError][File]api/employee/[employeeCd].get.ts [Message]' + error);
  }
});
