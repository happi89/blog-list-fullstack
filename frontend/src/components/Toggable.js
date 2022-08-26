import React, { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

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
				<button
					onClick={toggleVisibility}
					className='btn btn-primary btn-sm m-4'>
					{props.buttonLabel}
				</button>
			</div>
			<div style={showWhenHidden} className='toggableContent'>
				{props.children}
				<button onClick={toggleVisibility} className='btn btn-wide btn-sm my-3'>
					cancel
				</button>
			</div>
		</div>
	);
});

Toggable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
};

Toggable.displayName = 'Togglable';

export default Toggable;
