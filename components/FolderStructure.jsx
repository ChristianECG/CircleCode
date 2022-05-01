import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Folders from '../components/Folders';

function folderStructure({ path }) {
	const [files, setFiles] = useState([]);
	const [update, forceUpdate] = useState(0);

	useEffect(() => {
		async function getFolderStructure(path) {
			const foldersStructure = await axios.get(
				`/api/folderStructure?path=${path}`
			);
			setFiles(foldersStructure.data);
			console.log(files, '<folderStructure>');
		}
		if (path) getFolderStructure(path);
	}, [path, update]);

	window.addEventListener('project:downloaded', () => {
		forceUpdate(Date.now());
	});

	return <Folders _folders={files} _depth={0} />;
}

export default folderStructure;
