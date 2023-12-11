import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { ArrowBoldRight } from "@styled-icons/entypo/ArrowBoldRight";
import { formatImageSource } from "@/utils/string";

//From framer motion documentation

const variants = {
    slide: {
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
    },
    fade: {
        enter: direction => {
            return {
                zIndex: 0,
                opacity: 0,
            };
        },
        center: {
            zIndex: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
        exit: direction => {
            return {
                zIndex: 0,
                opacity: 0,
                transition: {
                    duration: 0,
                    delay: 0.5,
                },
            };
        },
    },
};

const transitions = {
    slide: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
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

const ImageCarousel = ({
    images = [],
    currentImageIndex,
    animationType = "slide",
}) => {
    const [[page, direction], setPage] = useState([0, 0]);
    const [dragging, setDragging] = useState(false);
    const [selected, setSelected] = useState(-1);

    const paginate = newDirection => {
        let newPage = page + newDirection;
        if (newPage < 0) {
            newPage += images.length;
        } else if (newPage > images.length - 1) {
            newPage -= images.length;
        }
        setPage([newPage, newDirection]);
    };

    // console.log("IMAGE INDEX", imageIndex);
    // console.log("PAGE", page);

    React.useEffect(() => {
        setSelected(-1);
        console.log(images.length, currentImageIndex, page);
        if (currentImageIndex - page > 0) {
            paginate(currentImageIndex - page);
        }
    }, [currentImageIndex, images]);

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
                <AnimatePresence custom={direction}>
                    <Image
                        key={page}
                        src={formatImageSource(images[page])}
                        custom={direction}
                        variants={variants[animationType]}
                        initial="enter"
                        animate="center"
                        layout
                        selected={selected === page}
                        onClick={e => {
                            e.stopPropagation();
                            if (dragging) return;
                            setSelected(selected === page ? -1 : page);
                        }}
                        exit="exit"
                        transition={transitions[animationType]}
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
            <Next
                onClick={() => paginate(1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}>
                <ArrowBoldRight size={22} />
            </Next>
            <Prev
                onClick={() => paginate(-1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                initial={false}
                animate={{ rotate: 180 }}>
                <ArrowBoldRight size={22} />
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

    display: flex;
    justify-content: center;
    align-items: center;
`;

const Image = styled(motion.img)`
    /* width: 100%; */
    position: absolute;
    object-fit: contain;
    /* max-width: 100vw; */
    cursor: pointer;
    /* border: 0.625rem solid green; */

    /* z-index: 10; */
    ${props => (props.selected ? `width: 70%; height: 70%;` : `width: 100%;`)}
`;

const ArrowContainer = styled(motion.div)`
    top: calc(50% - 1.5rem);
    position: absolute;
    ${props => props.theme.gradient({ animationLength: 5 })}
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
    font-weight: bold;
    font-size: 2.5rem;
    z-index: 2;
`;

const Prev = styled(ArrowContainer)`
    left: 0.625rem;
    transform: scale(-1);
`;

const Next = styled(ArrowContainer)`
    right: 0.625rem;
`;

function formPropsAreEqual(prevProps, nextProps) {
    return (
        prevProps.images === nextProps.images &&
        prevProps.currentImageIndex === nextProps.currentImageIndex &&
        prevProps.animationType === nextProps.animationType
    );
}

export default React.memo(ImageCarousel, formPropsAreEqual);
