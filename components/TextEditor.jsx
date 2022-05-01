import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormattedLine from './FormattedLine';
import style from '../styles/TextEditor.module.css';

function TextEditor() {
	const [sourceCode, setSourceCode] = useState('');
	useEffect(() => {
		window.addEventListener('fileClicked', async (ev) => {
			const file = await axios.get(`/api/getFile?path=${ev.detail.path}`);
			setSourceCode(file.data);
		});
	}, []);

	return (
		<div className={style.text_editor}>
			{sourceCode.split('\n').map((line, index) => {
				const lineNumber = index + 1;
				return (
					<section key={lineNumber} className={style.line_container}>
						<span className={style.line_number}>{lineNumber}</span>
						<span className={style.line_content}>
							<FormattedLine
								line={line}
								lang="Javascript"
								key={lineNumber}
							/>
						</span>
					</section>
				);
			})}
		</div>
	);
}

export default TextEditor;
