import * as Sequelize from "sequelize";

export default function calculateDates(dateParam: string): {
  startDate: Date;
  endDate: Date;
} {
  const today = new Date();

  switch (dateParam) {
    case "last_day":
      return {
        startDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 1
        ),
        endDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        ),
      };
    case "last_month":
      return {
        startDate: new Date(today.getFullYear(), today.getMonth() - 1, 1),
        endDate: new Date(today.getFullYear(), today.getMonth(), 0), // Last day of previous month
      };
    case "last_year":
      return {
        startDate: new Date(today.getFullYear() - 1, 0, 1), // First day of previous year
        endDate: new Date(today.getFullYear() - 1, 11, 31), // Last day of previous year
      };
    case "all_time":
      return { startDate: new Date(), endDate: new Date() }; // No need to set dates
    default:
      throw new Error(`Invalid dateParam: ${dateParam}`);
  }
}
