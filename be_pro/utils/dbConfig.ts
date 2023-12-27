import { connect } from "mongoose";

const URL: string = "mongodb://127.0.0.1:27017/proDB";
export const dbConfig = () => {
  connect(URL)
    .then(() => {
      console.log();
      console.log("DB connected");
    })
    .catch((error: Error) => {
      console.log("Error: ", error);
    });
};
