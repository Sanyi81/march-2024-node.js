import { CronJob } from "cron";
//
// class TestCron {
//   public static run() {
//     console.log("TestCron is running");
//   }
// }
// export const testCronJob = new CronJob("* * * * *", TestCron.run);

const handler = () => {
  console.log("TestCron is running");
};

export const testCronJob = new CronJob("* * * * *", handler);
