import React from 'react';

const Notification = ({ message, type }) => {
	if (message === null) {
		return null;
	}

	return (
		<div className={`alert alert-${type} shadow-lg`}>
			<h1 id='notification'>{message}</h1>
		</div>
	);
};

export default Notification;
