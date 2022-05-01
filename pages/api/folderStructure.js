const fs = require('fs');

export default async function handler(req, res) {
	const { path } = req.query;

	function getFolderStructure(path) {
		const directory = fs.readdirSync(`${path}`);
		const folders = directory.filter((file) =>
			fs.lstatSync(`${path}/${file}`).isDirectory()
		);
		const files = directory.filter((file) =>
			fs.lstatSync(`${path}/${file}`).isFile()
		);
		const filesObject = [];
		files.forEach((file, index) => {
			filesObject[`$_${index}`] = {
				name: file,
				path: `${path}/${file}`,
			};
		});

		if (folders.length === 0) return { ...filesObject };
		else {
			const foldersStructured = {};
			folders.forEach((folder) => {
				foldersStructured[folder] = getFolderStructure(
					`${path}/${folder}`
				);
			});
			return {
				...foldersStructured,
				...filesObject,
			};
		}
	}

	res.json(getFolderStructure(`./tmp/${path}`));
}
