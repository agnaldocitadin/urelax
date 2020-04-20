import React from 'react'
import { Transition } from 'react-native-reanimated'

const Animations = () => {
    return (
        <Transition.Together>
            <Transition.Out type="fade" durationMs={2300} interpolation="easeIn"/>
            <Transition.In type="fade" durationMs={3300} interpolation="easeIn"/>
        </Transition.Together>
    )
}

export default Animations
