import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { wrap } from "popmotion";
import styled from "styled-components";
import CustomButton from "./Button";
import { ArrowBoldRight } from "@styled-icons/entypo/ArrowBoldRight";

const images = [
    "https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png",
    "https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png",
    "https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png",
];

//From framer motion documentation

const variants = {
    enter: (direction: number) => {
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
    exit: (direction: number) => {
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
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

const Gallery = (
    {
        /*images = []*/
    }
) => {
    const [[page, direction], setPage] = useState([0, 0]);

    // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
    // then wrap that within 0-2 to find our image ID in the array below. By passing an
    // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
    // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
    const imageIndex = wrap(0, images.length, page);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    const [dragging, setDragging] = useState(false);
    const [selected, setSelected] = useState(-1);

    // console.log(images);
    return (
        <LayoutGroup>
            <Container imageClicked={selected !== -1}>
                <AnimatePresence initial={false} custom={direction}>
                    <Image
                        key={page}
                        layoutId="gallery"
                        src={images[imageIndex]}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        layout
                        selected={selected === imageIndex}
                        onClick={() => {
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
            <AnimatePresence>
                {selected !== -1 && (
                    <SelectedImageContainer
                        onClick={() => setSelected(-1)}
                        key={selected}>
                        <Image
                            key={selected}
                            layoutId="gallery"
                            src={images[selected]}
                            onClick={() => setSelected(-1)}
                        />
                    </SelectedImageContainer>
                )}
            </AnimatePresence>
        </LayoutGroup>
    );
};

const SelectedImageContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100000;
    background: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
    position: relative;
    background: ${props => props.theme.colours.tertiary};
    overflow: hidden;
    display: flex;
    height: 100%;
    width: 100%;

    justify-content: center;
    align-items: center;
`;
const Image = styled(motion.img)`
    position: absolute;
    max-width: 100vw;
    cursor: pointer;
    /* z-index: 10; */
    /* ${props => props.selected && `left: -100px; z-index: 100000;`}; */
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
