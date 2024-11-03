import { CronJob } from "cron";

import { configs } from "../configs/config";
import { timeHelper } from "../helpers/time.helper";
import { tokenRepository } from "../repositories/token.repository";

const handler = async () => {
  const { value, unit } = timeHelper.parseConfigString(
    configs.JWT_REFRESH_EXPIRATION,
  );

  const date = timeHelper.subtractByParams(value, unit);
  await tokenRepository.deleteManyByParams(date);
};

export const removeOldTokensCronJob = new CronJob("* * * * *", handler);
