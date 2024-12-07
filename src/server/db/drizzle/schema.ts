import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  varchar,
  datetime,
  tinyint,
  unique,
  int,
  bigint,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const employees = mysqlTable('employees', {
  employeeCd: varchar('employee_cd', { length: 12 }).notNull(),
  employeeName: varchar('employee_name', { length: 60 }).notNull(),
  kana: varchar('kana', { length: 60 }).notNull(),
  email: varchar('email', { length: 150 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  tel: varchar('tel', { length: 15 }).default('NULL'),
  departmentCd: varchar('department_cd', { length: 20 }).default('NULL'),
  post: varchar('post', { length: 50 }).default('NULL'),
  authority: varchar('authority', { length: 50 }).default('NULL'),
  employmentStatus: varchar('employment_status', { length: 50 }).default('NULL'),
  incumbencyStatus: varchar('incumbency_status', { length: 50 }).default('NULL'),
  loginAt: datetime('login_at', { mode: 'string' }).default('NULL'),
  failureCount: tinyint('failure_count').default('NULL'),
  lockedAt: datetime('locked_at', { mode: 'string' }).default('NULL'),
  createdEmployeeCd: varchar('created_employee_cd', { length: 12 }).default('NULL'),
  createdAt: datetime('created_at', { mode: 'string' }).default('NULL'),
  updatedEmployeeCd: varchar('updated_employee_cd', { length: 12 }).default('NULL'),
  updatedAt: datetime('updated_at', { mode: 'string' }).default('NULL'),
});

export const generalCodes = mysqlTable(
  'general_codes',
  {
    id: bigint('id', { mode: 'number' }).autoincrement().notNull(),
    category: varchar('category', { length: 50 }).notNull(),
    code: varchar('code', { length: 50 }).notNull(),
    name: varchar('name', { length: 100 }).notNull(),
    description: varchar('description', { length: 255 }).default('NULL'),
    sortKey: int('sort_key').default('NULL'),
    createdAt: datetime('created_at', { mode: 'string' }).default('NULL'),
    updatedAt: datetime('updated_at', { mode: 'string' }).default('NULL'),
  },
  (table) => {
    return {
      generalCodesCategoryCodeUnique: unique('general_codes_category_code_unique').on(
        table.category,
        table.code
      ),
    };
  }
);

export const migrations = mysqlTable('migrations', {
  id: int('id').autoincrement().notNull(),
  migration: varchar('migration', { length: 255 }).notNull(),
  batch: int('batch').notNull(),
});

export const personalDatas = mysqlTable('personal_datas', {
  employeeCd: varchar('employee_cd', { length: 8 }).notNull(),
  gender: tinyint('gender').default(0),
  birthday: varchar('birthday', { length: 10 }).default('NULL'),
  zipCode: varchar('zip_code', { length: 8 }).default('NULL'),
  prefecture: varchar('prefecture', { length: 10 }).default('NULL'),
  address: varchar('address', { length: 150 }).default('NULL'),
  building: varchar('building', { length: 50 }).default('NULL'),
  email: varchar('email', { length: 150 }).default('NULL'),
  tel: varchar('tel', { length: 15 }).default('NULL'),
  emergencyTel: varchar('emergency_tel', { length: 15 }).default('NULL'),
  entryDate: varchar('entry_date', { length: 10 }).default('NULL'),
  retirementDate: varchar('retirement_date', { length: 10 }).default('NULL'),
  retirementStatus: tinyint('retirement_status').default('NULL'),
  createdEmployee: varchar('created_employee', { length: 20 }).default('NULL'),
  createdAt: datetime('created_at', { mode: 'string' }).default('NULL'),
  updatedEmployee: varchar('updated_employee', { length: 20 }).default('NULL'),
  updatedAt: datetime('updated_at', { mode: 'string' }).default('NULL'),
});
