import axios from 'axios';
import { getUser } from './auth';

export const openProject = () => {
	localStorage.removeItem('project');
	window.dispatchEvent(new Event('project:open'));
};

export const runProject = async () => {
	const user = getUser();
	await axios.post(`api/startProject?path=${user.login}`);
	window.dispatchEvent(new Event('project:run'));
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('project');
	window.dispatchEvent(new Event('project:logout'));
};
