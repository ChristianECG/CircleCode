import React from 'react';

function File({ name, ext, path, _spacing }) {
	const icons = {
		folder: 'fa fa-folder',
		file: 'fa fa-file',
		js: 'fa-brands fa-js',
		jsx: 'fa-brands fa-react',
		html: 'fa-brands fa-html5',
		css: 'fa-brands fa-css3-alt',
	};

	let spacing = '';
	for (let i = 0; i < _spacing; i++) {
		spacing += '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0';
	}

	if (!ext) ext = name.split('.').pop();
	const icon = icons[ext] || 'fa fa-file';

	const handleClick = () => {
		if (!path) return;
		window.dispatchEvent(
			new CustomEvent('fileClicked', { detail: { path, name } })
		);
	};

	return (
		<p onClick={handleClick} style={{ cursor: 'pointer' }}>
			{spacing} <i className={icon}></i> {name}
		</p>
	);
}

export default File;
