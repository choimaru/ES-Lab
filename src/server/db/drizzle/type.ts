import { employees, personalDatas } from './schema';

export type Employees = typeof employees.$inferSelect;
export type PersonalDatas = typeof personalDatas.$inferSelect;
