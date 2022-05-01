import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Folders from '../components/Folders';

function folderStructure({ path }) {
	const [files, setFiles] = useState([]);

	useEffect(() => {
		async function getFolderStructure(path) {
			const foldersStructure = await axios.get(
				`/api/folderStructure?path=${path}`
			);
			setFiles(foldersStructure.data);
		}
		if (path) getFolderStructure(path);
	}, [path]);

	return <Folders _folders={files} _depth={0} />;
}

export default folderStructure;
