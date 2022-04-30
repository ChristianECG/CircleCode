import React, { useEffect, useState } from 'react';
import {
	generateToken,
	hasCode,
	hasToken,
	requestAuth,
	getUser,
} from '../utils/auth';

import styles from '../styles/index.module.css';

function inicio() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const auth = async () => {
			if (user) window.location.href = '/playground';

			const token = hasToken();
			const code = hasCode();
			if (token) setUser(await getUser());
			else if (code) await generateToken(code);
		};
		auth();
	}, [user]);

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<h1>Circle Code</h1>
				<p>
					The last tool that you will need to build awesome projects
				</p>
				<img src="./base.svg" alt="base" />
				<br />
				<button className="btn" onClick={() => requestAuth()}>
					<i className="fa-brands fa-github"></i> Login with Github
				</button>
			</div>
		</main>
	);
}

export default inicio;
