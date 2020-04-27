import PropTypes from 'prop-types'
import React from 'react'

const Bar = ({ progress, animationDuration }) => (
    <div
        style={{
            background: 'linear-gradient(178.37deg, #73DFE7 6.95%, #0063F7 93.05%)',
            height: 2,
            left: 0,
            marginLeft: `${(-1 + progress) * 100}%`,
            position: 'fixed',
            top: 0,
            transition: `margin-left ${animationDuration}ms ease-in`,
            width: '100%',
            zIndex: 1031,
        }}
    >
        <div
            style={{
                backgroundImage: 'linear-gradient(178.37deg, #73DFE7 6.95%, #0063F7 93.05%),',
                display: 'block',
                height: '100%',
                opacity: 1,
                position: 'absolute',
                right: 0,
                width: 100,
            }}
        />
    </div>
);

Bar.propTypes = {
    animationDuration: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
};

export default Bar
