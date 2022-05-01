import React, { useEffect, useState } from 'react';
import FolderStructure from '../components/FolderStructure';
import TextEditor from '../components/TextEditor';
import styles from '../styles/playground.module.css';
import { requestAProject, hasProject, downloadProject } from '../utils/project';
import { getUser } from '../utils/auth';

function playground() {
	const [path, setPath] = useState(null);

	useEffect(() => {
		const generateProject = async () => {
			await requestAProject();
			if (hasProject()) await downloadProject();

			const user = await getUser();
			setPath(`${user.login}`);
		};
		generateProject();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.bar}>
				{path && <FolderStructure path={path} />}
			</div>
			<div className={styles.options}>
				<button className={styles.playButton}>
					<i className="fa fa-play" />
					&nbsp;&nbsp; Play
				</button>
				<button className={styles.openButton}>
					<i className="fa-solid fa-folder-open" />
					&nbsp;&nbsp; Open
				</button>
				<button className={styles.logoutButton}>
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
