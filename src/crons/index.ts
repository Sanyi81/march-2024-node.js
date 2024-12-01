import { removeOldPasswordsCronJob } from "./remove-old-passwords.cron";
import { removeOldTokensCronJob } from "./remove-old-tokens.cron";
import { testCronJob } from "./test.crons";

export const cronRunner = () => {
  testCronJob.start();
  removeOldTokensCronJob.start();
  removeOldPasswordsCronJob.start();
};
