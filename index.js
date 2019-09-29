let express = require("express");
let request = require("request");
let querystring = require("querystring");
let keys = require("./config/keys");
let cors = require("cors");
let app = express();

let access_token;

app.get("/api/auth/spotify", function(req, res) {
	res.redirect(
		"https://accounts.spotify.com/authorize?" +
			querystring.stringify({
				response_type: "code",
				client_id: keys.my_client_id,
				scope: keys.scopes,
				redirect_uri: keys.redirect_uri,
				state: "34fFs29kd09"
			})
	);
});

app.get("/callback", function(req, res) {
	let code = req.query.code;

	let authOptions = {
		url: "https://accounts.spotify.com/api/token",
		form: {
			grant_type: "authorization_code",
			code: code,
			redirect_uri: keys.redirect_uri
		},
		headers: {
			Authorization: "Basic " + keys.base64_auth
		},
		json: true
	};

	request.post(authOptions, function(err, httpResponse, body) {
		console.log("--------------");
		console.log("- AUTORIZED -");
		console.log("--------------");

		access_token = body.access_token;
		res.redirect("http://localhost:3000");
	});
});

app.get("/api/profile", function(req, res) {
	let options = {
		url: "https://api.spotify.com/v1/me",
		headers: { Authorization: "Bearer " + access_token },
		json: true
	};

	request.get(options, function(error, response, body) {
		console.log(body);
		res.send(body);
	});
});

app.listen(5000, function() {
	console.log("App listening on port 5000!");
});
