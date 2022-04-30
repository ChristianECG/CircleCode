import axios from 'axios';
import CONFIG from '../../env.config';

export default async function handler(req, res) {
	const code = req.body.code;
	console.log(code);
	const response = await axios({
		method: 'post',
		url: 'https://github.com/login/oauth/access_token',
		data: {
			code,
			accept: 'json',
			client_id: CONFIG.GITHUB_CLIENT_ID,
			client_secret: CONFIG.GITHUB_CLIENT_SECRET,
		},
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});
	res.json(response.data);
}
