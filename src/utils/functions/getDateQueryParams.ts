import * as Sequelize from "sequelize";

export default function getDateQueryParam(queryParam: string) {
  const { Op } = Sequelize;

  const today = new Date();
  const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);

  // Use switch statement to build query dynamically
  const query = {
    where: {
      createdAt: {},
    },
    attributes: ["createAt"],
  };

  switch (queryParam) {
    case "last_day":
      // Same logic as before for yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      query.where.createdAt = {
        [Op.gte]: yesterday.toISOString(),
        [Op.lt]: new Date().toISOString(),
      };
      break;
    case "last_month":
      query.where.createdAt = {
        [Op.gte]: lastMonthStart.toISOString(),
        [Op.lt]: today.toISOString(),
      };
      break;
    case "last_year":
      query.where.createdAt = {
        [Op.gte]: new Date(today.getFullYear() - 1, 0, 1).toISOString(),
        [Op.lt]: today.toISOString(),
      };
      break;
    case "all_time":
      // No need for filtering, leave query.where empty
      break;
    default:
      throw new Error(`Invalid dateParam: ${queryParam}`);
  }

  return query;
}
