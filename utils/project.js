import axios from 'axios';
import Swal from 'sweetalert2';
import { getUser, hasToken } from './auth';

const requestAProject = async () => {
	const repositories = await axios.get(`https://api.github.com/user/repos`, {
		headers: {
			Authorization: `token ${localStorage.getItem('token')}`,
		},
	});

	const structuredRepositories = {};
	repositories.data.forEach((repo) => {
		structuredRepositories[repo.name] = repo.name;
	});

	if (!localStorage.getItem('project')) {
		const project = await Swal.fire({
			title: 'No project selected',
			text: 'Please select a project first',
			icon: 'warning',
			input: 'select',
			inputOptions: structuredRepositories,
		});

		if (!project.value) return;

		const projectFind = repositories.data.find((repo) => {
			return repo.name === project.value;
		});

		localStorage.setItem('project', JSON.stringify(projectFind));
	}
};

const hasProject = () => {
	const project = localStorage.getItem('project');
	if (!project) return false;
	try {
		return JSON.parse(project);
	} catch (e) {
		localStorage.removeItem('project');
		return false;
	}
};

const downloadProject = async () => {
	const project = hasProject();
	if (!project) return;

	const user = await getUser();
	const token = await hasToken();

	await axios.get(
		`/api/downloadProject?clone_url=${project.clone_url}&user=${user.login}&token=${token}`
	);
};

export { requestAProject, hasProject, downloadProject };
