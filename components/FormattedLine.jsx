import React from 'react';
import SupportedLanguages from '../config/SupportedLanguages';

function FormattedLine({ line, lang }) {
	const reservedWords = [];

	SupportedLanguages.forEach((language) => {
		if (language.name !== lang) return;
		reservedWords.push(...language.reservedWords);
	});

	line = line.split(' ');

	return (
		<>
			{line.map((word, idx) => {
				const testedWord = word.replace(/\W/g, '');
				const isAReservedWord = reservedWords.includes(testedWord);
				if (!isAReservedWord) return word + '\u00A0';
				return (
					<span className="reserved" key={idx}>
						{word.replace(
							/\t/g,
							'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'
						) + '\u00A0'}
					</span>
				);
			})}
		</>
	);
}

export default FormattedLine;
