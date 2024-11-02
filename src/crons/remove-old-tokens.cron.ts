import { CronJob } from "cron";

import { configs } from "../configs/config";
import { timeHelper } from "../helpers/time.helper";
// import {tokenRepository} from "../repositories/token.repository";

const handler = async () => {
  console.log(configs.JWT_REFRESH_EXPIRATION);

  const date = timeHelper.subtractByParams(1, "day");
  console.log(date);
  // await tokenRepository.deleteManyByParams()
};

export const removeOldTokensCronJob = new CronJob("* * * * *", handler);
