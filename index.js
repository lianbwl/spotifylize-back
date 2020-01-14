let express = require("express");
let cors = require("cors");
let app = express();

app.use(cors());

require("./routes/spotify")(app);

app.listen(5000, function() {
	console.log("App listening on port 5000!");
});
