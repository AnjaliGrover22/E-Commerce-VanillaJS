import mydisplaycards from "./ui.js";

export default async function storageData() {
  try {
    await mydisplaycards();
    console.log("start storing Data here");
  } catch (error) {
    console.error("Error in start:", error);
  }
}

storageData();
