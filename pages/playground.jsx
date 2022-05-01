import React, { useEffect, useState } from 'react';
import FolderStructure from '../components/FolderStructure';
import TextEditor from '../components/TextEditor';
import styles from '../styles/playground.module.css';
import { requestAProject, hasProject, downloadProject } from '../utils/project';
import { getUser, hasToken } from '../utils/auth';
import { openProject, logout, runProject } from '../utils/editor';

function playground() {
	const [path, setPath] = useState(null);
	const [update, forceUpdate] = useState(0);

	useEffect(() => {
		const generateProject = async () => {
			const token = await hasToken();
			if (!token) window.location.href = '/';
			await requestAProject();
			if (hasProject()) await downloadProject();

			const user = await getUser();
			setPath(`${user.login}`);
		};
		generateProject();

		window.addEventListener('project:logout', () => {
			window.location.href = '/';
		});
	}, [update]);

	return (
		<div className={styles.container}>
			<div className={styles.bar}>
				{path && <FolderStructure path={path} />}
			</div>
			<div className={styles.options}>
				<button
					className={styles.playButton}
					onClick={async () => {
						await runProject();
						forceUpdate(Date.now());
					}}
				>
					<i className="fa fa-play" />
					&nbsp;&nbsp; Play
				</button>
				<button
					className={styles.openButton}
					onClick={async () => {
						await openProject();
						forceUpdate(Date.now());
					}}
				>
					<i className="fa-solid fa-folder-open" />
					&nbsp;&nbsp; Open
				</button>
				<button
					className={styles.logoutButton}
					onClick={async () => {
						await logout();
						forceUpdate(Date.now());
					}}
				>
					<i className="fa-solid fa-right-from-bracket" />
					&nbsp;&nbsp; Logout
				</button>
			</div>
			<div className={styles.editor}>
				<TextEditor />
			</div>
		</div>
	);
}

export default playground;
