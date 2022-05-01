const fs = require('fs');

export default async function handler(req, res) {
	const { path } = req.query;
	const file = await fs.promises.readFile(path, 'utf8');
	res.send(file);
}
