import simpleGit from 'simple-git';
import del from 'del';

export default async function handler(req, res) {
	let { clone_url } = req.query;
	let { user } = req.query;
	let { token } = req.query;

	clone_url = clone_url.replace('https://', '');
	clone_url = `https://${user}:${token}@${clone_url}`;

	try {
		await del([`./tmp/${user}`]);
		await simpleGit().clone(clone_url, `./tmp/${user}`);
		await del([`./tmp/${user}/.git`]);
	} catch (err) {
		res.status(500).send(err);
	}

	res.status(200).json({
		message: 'success',
	});
}
