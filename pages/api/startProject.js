import npm from 'npm';
import { exec } from 'child_process';

export default async function handler(req, res) {
	let { path } = req.query;

	const executor = async (command) => {
		return new Promise((resolve, reject) => {
			exec(command, (err, stdout, stderr) => {
				if (err) reject(err);
				else if (stderr) reject(stderr);
				else resolve(stdout);
			});
		});
	};

	try {
		const install = await executor(`cd ./tmp/${path} && npm install`);
		const start = await executor(`cd ./tmp/${path} && npm start`);
		res.json({ install, start });
	} catch (err) {
		res.status(500).send(err);
	}
}
