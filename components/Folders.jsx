import React from 'react';
import File from './File';

const Folders = ({ _folders, _depth }) => {
	const folders = Object.entries(_folders);
	return folders.map((folder) => {
		const key = folder[0];
		const value = folder[1];

		if (key.includes('$_')) {
			return (
				<File
					name={value.name}
					_spacing={_depth}
					path={value.path}
					key={Date.now() * Math.random()}
				/>
			);
		}
		return (
			<>
				<File
					name={key}
					ext="folder"
					_spacing={_depth}
					key={Date.now() * Math.random()}
				/>
				<Folders _folders={value} _depth={_depth + 1} />
			</>
		);
	});
};

export default Folders;
