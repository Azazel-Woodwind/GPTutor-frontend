import styled from "styled-components";
import { motion } from "framer-motion";
import React from "react";
import { BaseButtonStyles } from "./Button.styles";

const FilledButtonStyle = styled(motion.button)`
    ${BaseButtonStyles}

    display: flex;
    justify-content: center;
    align-items: center;

    border: unset;
    outline: unset;

    color: white;
    z-index: 10;

    border-radius: 0.625rem;
    ${props =>
        props.disabled
            ? "background-color: rgb(0, 0, 0, 0.1); color: gray;"
            : `${
                  props.type === "error"
                      ? `background-color: ${props.theme.colours.error};`
                      : props.theme.gradient({
                            animationLength: 5,
                        })
              }; cursor: pointer;`}

    transition: all 0.2s;
    /* background: rgba(255, 255, 255, 0); */
    // how do i get this to work?
    /* background: ${props => props.theme.linearGradient}; */
    //  background: -moz-linear-gradient(
    //   45deg,/ shiieee
    // imagine doing css ngl couldnt be me
    // nyash job
    // lmaooo
    // common kei L?
    // HAHA as if you werent going on about the fucking 0.01% change in colou9r of the
    // mky bad if orgot youre colour blind and deaf somehow
    // OMG we need it to be purple not slight purple blue >:(((())))
    // mb forgot you didnt grow up with a father not your fault
    // mb forgot your forehead is thicker than your skull
    //mb just remembered oyu got HARD abused as a kid absolutrely your fault id abuse too tbh
    // just remember LMAO pls no more im crying rn sorry lil bro didnt mean to hurt your feelings
    // what's wrong baby bro? mad?
    // seething perhaps????
    // smaller bro acting up today
    // talking a lot for skinniest boi from jamaica
    // lit not allowed within 400m of any highschool for a good reasn
    // this is some r/reddit thread LMFAO

    // mb forgot you were negleceted as a child adn thrown in the attic
    // mb just remember you got HARD dicked down by your parents
    // living in the attic life??
    //HAHA bad?
    // baby bro talking a lot these days?
    // talking a lot for chonkiest kid in town, moving like you domnt break every weighing scale you stand on into
    // millions of subatomic particles
    // HAHAHA ;) I know that's not the part she got tired of HAHAHAHA def not in the way oyu mean :))
    // couldnt handle getting dicked down more than twice a day was moving mad
    // PLS bro im
    // aahhh
    //alhhhhh
    //a hhh
    /* /all -moz-outline-radius-topright: ::afterl

HAHHA shieeet */
    // oui;
    // oui
    // oui
    // oui

    // sure your ex didnt get tired of your fucking elephant mutumbu chonkiness beyond belief ? ? ? ? ?? ? ?
    // HAHAHA is it
    // anyw fucker let me test this shit.
    // i can tellays
    // calm down bro
    // desolé
`;

function FilledButton(props) {
    return <FilledButtonStyle {...props}>{props.children}</FilledButtonStyle>;
}

export default FilledButton;
