import * as fs from "fs";

export const updateIdToken = async (idToken$: any) => {
  const envFilePath = ".env";

  try {
    // Read the existing content of the .env file
    let envContent = fs.readFileSync(envFilePath, "utf-8");

    // Check if the ID_TOKEN already exists in the .env file
    const idTokenIndex = envContent.indexOf("ID_TOKEN=");

    if (idTokenIndex !== -1) {
      // If it exists, update the existing ID_TOKEN
      const lineEndIndex = envContent.indexOf("\n", idTokenIndex);
      envContent =
        envContent.substring(0, idTokenIndex) +
        `ID_TOKEN=${idToken$}` +
        envContent.substring(lineEndIndex);
    } else {
      // If it doesn't exist, append a new line for ID_TOKEN
      envContent += `\nID_TOKEN=${idToken$}\n`;
    }

    // Write the updated content back to the .env file
    fs.writeFileSync(envFilePath, envContent, { flag: "w" });

    console.log("ID token updated successfully.");
  } catch (error) {
    console.error("Error updating ID token:", error);
  }
};
