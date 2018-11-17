import app from "./app";
const PORT = process.env.PORT || 8080;
//bro
app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})