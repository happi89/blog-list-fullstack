import React from 'react';

const Notification = ({ message, type }) => {
	if (message === null || type === null) {
		return null;
	}

	return (
		<div className={`alert alert-${type} shadow-lg`}>
			{console.log(type)}
			<h1 id='notification'>{message}</h1>
		</div>
	);
};

export default Notification;
