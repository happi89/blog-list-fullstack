import React, { useState, forwardRef, useImperativeHandle } from 'react';

const Toggable = forwardRef((props, ref) => {
	const [visible, setVisible] = useState(true);

	const showWhenHidden = { display: visible ? 'none' : '' };
	const hideWhenShown = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	useImperativeHandle(ref, () => {
		return { toggleVisibility };
	});

	return (
		<div>
			<div style={hideWhenShown}>
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenHidden}>
				{props.children}
				<button onClick={toggleVisibility}>cancel</button>
			</div>
		</div>
	);
});

export default Toggable;
