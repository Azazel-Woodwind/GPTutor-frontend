import {
    motion,
    animate,
    useDragControls,
    useMotionValue,
    useMotionValueEvent,
} from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";

import useScreensize from "../hooks/useScreensize";

import { useLocation, useNavigate } from "react-router-dom";
import { ChatContext } from "../context/ChatContext";

const options = {
    duration: 0.5,
};

const threshold = 0.8;

let resizableProportion;

const inClassroomRegex = /^\/lessons\/([^\/\?]+)\?id=([^\/\?]+)$/;

const Resizable = ({ number, children, min }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleContainerRef = React.useRef(null);

    const { draggable } = React.useContext(ChatContext);
    // console.log(draggable);

    const { width } = useScreensize(
        (oldWidth, oldHeight, newWidth, newHeight) => {}
    );

    const onChange = React.useCallback(
        latest => {
            resizableProportion = latest / width;
            // console.log(latest, width, resizableProportion);
        },
        [width]
    );

    React.useEffect(() => {
        resizableProportion = number.get() / width;
    }, []);

    React.useEffect(() => number.on("change", onChange), [onChange]);

    React.useEffect(() => {
        setNavigateThreshold(width * threshold);
        number.set(width * resizableProportion);
        // console.log(number.get(), width);
    }, [width]);

    // console.log(number.get(), width, resizableProportion);
    // console.log("rerender");

    const [navigateThreshold, setNavigateThreshold] = React.useState(
        width * threshold
    );

    const navigate = useNavigate();

    const uncollapse = () => {
        setIsCollapsed(false);
        animate(number, min + 10, options);
    };

    const collapse = () => {
        setIsCollapsed(true);
        animate(number, 0, { duration: 0.3 });
    };

    const location = useLocation();

    // if (number.get() > navigateThreshold) navigate("/hub");
    const handleDrag = React.useCallback(
        (event, info) => {
            const newWidth = number.get() - info.delta.x;
            // console.log(newWidth, navigateThreshold);

            if (
                newWidth > navigateThreshold &&
                !(location.pathname === "/hub")
            ) {
                console.log("navigate");
                return navigate("/hub");
            }

            number.set(newWidth);
            if (newWidth > min + 10 && info.delta.x <= 0) {
                setIsCollapsed(false);
            } else if (newWidth < min && info.delta.x > 0) {
                collapse();
            }
        },
        [navigateThreshold, location, draggable]
    );

    return (
        <Container width={number}>
            <motion.div
                style={{
                    width: number,
                }}>
                <HandleContainer ref={handleContainerRef}>
                    <Handle
                        as={motion.div}
                        drag="x"
                        onDoubleClick={() => {
                            if (isCollapsed) uncollapse();
                            else collapse();
                        }}
                        dragConstraints={handleContainerRef}
                        dragElastic={0}
                        dragMomentum={false}
                        onDrag={!(location.pathname === "/hub") && handleDrag}
                        onDragEnd={() => {
                            setIsDragging(false);
                        }}
                        onDragStart={() => {
                            setIsDragging(true);
                        }}
                        visible={
                            draggable
                            // !(
                            //     location.pathname === "/hub" ||
                            //     inClassroomRegex.test(
                            //         location.pathname + location.search
                            //     ) ||
                            //     location.pathname === "/activate"
                            // )
                        }
                    />
                </HandleContainer>

                {children}
            </motion.div>
        </Container>
    );
};

const HandleContainer = styled.div`
    width: 20px;
    height: 100px;
    position: absolute;
    top: calc(50% - 50px);
    left: -20px;
    z-index: 100;
`;

const Handle = styled.div`
    display: ${props => (props.hidden ? "none" : "block")};
    background-color: ${props => props.theme.colours.secondary};
    width: 100%;
    height: 100%;

    cursor: e-resize;
    visibility: ${props => (props.visible ? "visible" : "hidden")};
`;

const Container = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    height: fit-content;
    width: fit-content;

    ${props => props.width && `width: ${props.width};`}
    ${props => props.width && `max-width: ${props.width};`}

    flex: 0 1 auto;
`;

export default Resizable;
