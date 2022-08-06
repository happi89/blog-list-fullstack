import React from 'react';

const Notification = ({ message, color }) => {
	if (message === null) {
		return null;
	}

	return (
		<div
			style={{
				border: `3px solid ${color}`,
				borderRadius: '15px',
				textAlign: 'center',
				color: `${color}`,
			}}>
			<h1>{message}</h1>
		</div>
	);
};

export default Notification;
