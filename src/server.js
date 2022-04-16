import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT;

app.listen(PORT, (error) => {

    if (error) console.log("Error");

    console.log(`Listen port: ${PORT}.`)
});