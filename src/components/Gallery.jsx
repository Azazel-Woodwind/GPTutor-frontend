import React from "react";
import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { wrap } from "popmotion";
import styled from "styled-components";
import CustomButton from "./Button";
import { ArrowBoldRight } from "@styled-icons/entypo/ArrowBoldRight";
import { formatImageSource } from "../lib/stringUtils";

//From framer motion documentation

const variants = {
    enter: direction => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        // transition: {
        //     bounce: 0,
        // },
    },
    exit: direction => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        };
    },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};

const Gallery = ({ images = [], currentImageIndex }) => {
    const [[page, direction], setPage] = useState([0, 0]);

    // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
    // then wrap that within 0-2 to find our image ID in the array below. By passing an
    // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
    // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
    const imageIndex = wrap(0, images.length, page);

    const paginate = newDirection => {
        setPage([page + newDirection, newDirection]);
    };

    const [dragging, setDragging] = useState(false);
    const [selected, setSelected] = useState(-1);

    React.useEffect(() => {
        setSelected(-1);
        if (currentImageIndex - imageIndex > 0) {
            paginate(currentImageIndex - imageIndex);
        }
    }, [currentImageIndex]);

    // console.log(images);
    return (
        // <LayoutGroup>
        <Container>
            <ImageContainer
                onClick={() => {
                    if (dragging) return;
                    setSelected(-1);
                }}
                imageClicked={selected !== -1}>
                <AnimatePresence initial={false} custom={direction}>
                    <Image
                        key={page}
                        src={formatImageSource(images[imageIndex])}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        layout
                        selected={selected === imageIndex}
                        onClick={e => {
                            e.stopPropagation();
                            if (dragging) return;
                            setSelected(
                                selected === imageIndex ? -1 : imageIndex
                            );
                        }}
                        exit="exit"
                        transition={{
                            x: {
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            },
                            opacity: { duration: 0.2 },
                        }}
                        drag="x"
                        onDragStart={() => setDragging(true)}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            setDragging(false);
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                    />
                </AnimatePresence>
            </ImageContainer>
            <Next onClick={() => paginate(1)}>
                <CustomButton
                    style={{ padding: "10px", borderRadius: "50%" }}
                    whileHoverScale={1.1}>
                    <ArrowBoldRight size={22} />
                </CustomButton>
            </Next>
            <Prev onClick={() => paginate(-1)}>
                <CustomButton
                    style={{ padding: "10px", borderRadius: "50%" }}
                    whileHoverScale={1.1}>
                    <ArrowBoldRight size={22} />
                </CustomButton>
            </Prev>
        </Container>
    );
};

const ImageContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    ${props =>
        props.imageClicked &&
        `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10000;
    `}
`;

const Container = styled.div`
    position: relative;
    overflow: ${props => (props.imageClicked ? "visible" : "hidden")};

    height: 100%;
    width: 100%;
`;

const Image = styled(motion.img)`
    /* width: 100%; */
    position: absolute;
    object-fit: contain;
    /* max-width: 100vw; */
    cursor: pointer;
    /* border: 10px solid green; */

    /* z-index: 10; */
    ${props => (props.selected ? `width: 70%; height: 70%;` : `width: 100%;`)}
`;

const Button = styled.div`
    top: calc(50% - 20px);
    position: absolute;
    ${props => props.theme.gradient({ animationLength: 5 })}
    border-radius: 30px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
    font-weight: bold;
    font-size: 40px;
    z-index: 2;
`;

const Prev = styled(Button)`
    left: 10px;
    transform: scale(-1);
`;

const Next = styled(Button)`
    right: 10px;
`;

export default Gallery;
