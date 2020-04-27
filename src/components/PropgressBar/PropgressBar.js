import React from 'react';
import { NProgress } from '@tanem/react-nprogress';
import Bar from './Bar';
import Container from './Container';
import PropTypes from "prop-types";

function ProgressBar(props) {
    return <NProgress
        animationDuration={200}
        incrementDuration={100}
        minimum={0.1}
        isAnimating={props.isAnimating} key={'loading'}>
        {({ isFinished, progress, animationDuration }) => (
            <Container
                isFinished={isFinished}
                animationDuration={animationDuration}
            >
                <Bar
                    progress={progress}
                    animationDuration={animationDuration}
                />
            </Container>
        )}
    </NProgress>
}

ProgressBar.propTypes = {
    isAnimating: PropTypes.bool.isRequired,
};

export default ProgressBar;