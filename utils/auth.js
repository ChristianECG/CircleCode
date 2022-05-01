const axios = require('axios');
const CONFIG = require('../env.config');

// Redirect to github login
const requestAuth = async () => {
	window.location.href = `https://github.com/login/oauth/authorize?client_id=${CONFIG.default.GITHUB_CLIENT_ID}&scope=user%20repo`;
};

// Verify if the URL has a code parameter
const hasCode = () => {
	const code = window.location.search.split('code=')[1];
	if (code) return code;
	return false;
};

// Generate a token with the code provided
const generateToken = async (code) => {
	const res = await axios.post('/api/token', { code }).catch(console.error);
	console.log(res);
	if (!res.data.error) localStorage.setItem('token', res.data.access_token);
};

// Verify if the user has a token
const hasToken = () => {
	const token = localStorage.getItem('token');
	if (token) return token;
	return false;
};

// Get the user from the token
const getUser = async () => {
	const token = hasToken();
	if (!token) return false;

	const res = await axios.get('https://api.github.com/user', {
		headers: { Authorization: `token ${token}` },
	});
	console.log(res);
	return res.data;
};

export { requestAuth, hasCode, generateToken, hasToken, getUser };
