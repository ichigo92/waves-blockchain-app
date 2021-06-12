const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname + "/build"));

app.get('/', (req, res) => {
	res.sendFile('index.html', { root: __dirname+"/build" });
});

app.listen(PORT, () => {
	console.log(__dirname);
	console.log('Server listening on port ', PORT);
});