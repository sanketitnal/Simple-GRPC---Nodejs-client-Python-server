// const readline = require("readline-sync");
const PROTO_PATH = "../";
/*Path of .proto file */

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync(PROTO_PATH + "\\auth.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const authPackage = grpcObject.authPackage;

// creating stub named client which can be used like an object
const client = new authPackage.AuthService(
	"localhost:50051",
	grpc.credentials.createInsecure()
);

client.validateCredentials(
	{
		username: "admin",
		password: "admin",
	},
	(err, response) => {
		if (response.status == 1) {
			console.log("Login Successful");
			breakLoop = true;
		} else {
			console.log("Login Failed, RETRY\n-----------------------------");
		}
	}
);
/*
breakLoop = false;
while (breakLoop == false) {
	let username, password;

	username = readline.question("Username: ");
	password = readline.question("Password: ", { hideEchoBack: true });

	console.log(username, password);
	// calling rpc validateCredentials with input and providing callback
	client.validateCredentials(
		{
			username: username,
			password: password,
		},
		(err, response) => {
			if (response.status == 1) {
				console.log("Login Successful");
				breakLoop = true;
			} else {
				console.log("Login Failed, RETRY\n-----------------------------");
			}
		}
	);
}*/
