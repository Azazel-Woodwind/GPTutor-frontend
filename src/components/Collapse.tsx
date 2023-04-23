import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

const CollapseContainer = styled.div`
    width: 100%;
    position: absolute;
    z-index: 100;
    background-color: ${props => props.theme.colours.highlight1};
    overflow: hidden;
    border-radius: 8px;
`;

export default function Collapse({ children, open }) {
    return (
        <CollapseContainer>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{
                            duration: 0.3,
                        }}>
                        {children}
                    </motion.section>
                )}
            </AnimatePresence>
        </CollapseContainer>
    );
}
