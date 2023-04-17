import Centerer from "../styles/containers/Centerer";
import CustomButton from "../components/Button";
import RadioButton from "../components/RadioButton";
import RadioButtonsContainer from "../styles/containers/HorizontalRadioButtonContainer";
import useRadioButtons from "../hooks/useRadioButtons";
import DropdownList from "../components/DropdownList";
import { subjectOptions, subjects } from "../lib/FormData";
import React from "react";
import Textfield from "../components/Textfield";
import CenteredColumn from "../styles/containers/CenteredColumn";
import Checkbox from "../components/Checkbox";
import Resizable from "../components/Resizable";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import useDropdownList from "../hooks/useDropdownList";
import { Mic } from "@styled-icons/bootstrap/Mic";
import { Cross } from "@styled-icons/entypo/Cross";
import { Send } from "@styled-icons/boxicons-solid/Send";
import { MicSvgData } from "../lib/svgIconData";
import IconButton from "../components/IconButton";

function Test() {
    const form = useForm();
    return (
        <CenteredColumn fillparent>
            <form onSubmit={form.handleSubmit(data => console.log(data))}>
                <Controller
                    control={form.control}
                    name={"option"}
                    render={({ field }) => (
                        <RadioButtonsContainer gap="1.5em">
                            <RadioButton
                                label="Option 1"
                                checked={field.value === "option1"}
                                onChange={() => field.onChange("option1")}
                            />
                            <RadioButton
                                label="Option 2"
                                checked={field.value === "option2"}
                                onChange={() => field.onChange("option2")}
                            />
                            <RadioButton
                                label="Option 3"
                                checked={field.value === "option3"}
                                onChange={() => field.onChange("option3")}
                            />
                        </RadioButtonsContainer>
                    )}
                />
                <Checkbox
                    checkboxSize={31}
                    borderWidth={2}
                    fontSize="1.1em"
                    label="Publish this lesson"
                    {...form.register("publish")}
                />
                <Controller
                    control={form.control}
                    name={"dropdown"}
                    render={({ field }) => (
                        <DropdownList
                            label="Subject"
                            options={["Maths", "Science", "English"]}
                            selected={field.value}
                            setSelected={field.onChange}
                            required
                        />
                    )}
                />
                <input type="submit" />
            </form>
            <CustomButton outline>Hello there</CustomButton>
            <IconButton outline {...MicSvgData}></IconButton>
            {/* <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                focusable="false"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"></path>
                <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"></path>
            </svg> */}
            <Mic size={40} />
            <Mic size={50} />
            <Mic size={60} />
        </CenteredColumn>
    );
}

const ParentDiv = styled.div`
    width: 100vh;
    height: 100vh;
    border: 5px solid black;
    display: flex;
`;
const FixedDiv = styled.div`
    border: 5px solid red;
    flex: 1 1 200px;
    h1 {
        border: 3px solid #f3f3f3;
    }
`;

const GrowDiv = styled.div`
    border: 5px solid green;
    flex: 0 1 auto;
    width: 300px;
`;

export default Test;
