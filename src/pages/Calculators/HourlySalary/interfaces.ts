export interface HourlySalaryForm {
  workingDays: number;
  hoursPerWeek: number;
  salary: number;
}

export interface SalaryResults {
  yearlySalary: string;
  monthlySalary: string;
  weeklySalary: string;
  dailySalary: string;
  hourlySalary: string;
}
