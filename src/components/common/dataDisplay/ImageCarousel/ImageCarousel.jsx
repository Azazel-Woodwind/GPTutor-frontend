import React from "react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowBoldRight } from "@styled-icons/entypo/ArrowBoldRight";
import { formatImageSource } from "@/utils/string";
import {
    Container,
    Image,
    ImageContainer,
    Next,
    Prev,
} from "./ImageCarousel.styles";
import {
    swipeConfidenceThreshold,
    swipePower,
    transitions,
    variants,
} from "./utils";

/**
 * ImageCarousel - A component for displaying a series of images in a carousel format.
 * It allows users to navigate through images using swipe gestures or navigation arrows.
 *
 *
 * @param {Object} props - The component props.
 * @param {Array} props.images - An array of image URLs to display in the carousel.
 * @param {number} props.currentImageIndex - The index of the initially displayed image.
 * @param {string} [props.animationType="slide"] - The type of animation for transitioning images. Can be "slide" or "fade".
 * @returns {React.Component} A carousel component for navigating through images.
 *
 * @link https://codesandbox.io/p/sandbox/framer-motion-image-gallery-pqvx3?file=%2Fsrc%2Findex.tsx
 */
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

export default ImageCarousel;
