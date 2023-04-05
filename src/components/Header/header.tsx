import { redirect, Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../api/configs/supabase";
import Logo from "../../assets/Logo";
import { useAuth } from "../../context/SessionContext";
import styled from "styled-components";

const LinkStyle = styled.a`
    color: white;
    font-size: 1.2em;
    margin: 0 1em;
    cursor: pointer;
`;

const LinkWrapper = props => {
    return (
        <LinkStyle {...props} as={Link}>
            {props.label}{" "}
        </LinkStyle>
    );
};

export default function header() {
    const { session, setLoading } = useAuth();
    const navigate = useNavigate();

    return (
        <Container>
            <LinkWrapper path="/lessons" label={"Lessons"} />
            <LinkWrapper path="/dashboard" label={"Dashboard"} />
            <LinkWrapper path="/hub" label={"Hub"} />
            <LinkWrapper path="/account" label={"Account"} />
            <LinkWrapper path="/lorem" label={"Lorem"} />
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    min-height: 2em;
    display: flex;
    color: white;
    align-items: center;
    justify-content: center;
    padding: 1em 4em;
    z-index: 10;
    margin-bottom: 4em;
    //background-color: rgb(255, 255, 255, 0.01);
`;
