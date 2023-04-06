import React from "react";
import useX from "../hooks/useX/useX";
import { SocketContext } from "../context/SocketContext";
import styled from "styled-components";
import { Resizable } from "re-resizable";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { BiMicrophone } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import { useLocation } from "react-router-dom";

const introduction = `Welcome to XTutor!
This is X, your personal AI tutor.

Here are some examples of things you can ask X:
- Can you take me to the lessons page?
- How do I solve a linear equation?
`;

const XChat = () => {
    const {
        sendMessage,
        history,
        setHistory,
        loading,
        setLoading,
        currentMessage,
        streaming,
        speaking,
    } = useX({ channel: "chat" });

    const messageInput = React.useRef(undefined);
    const { Socket } = React.useContext(SocketContext);
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    const [heightScreen, setHeightScreen] = React.useState(0);

    React.useEffect(() => {
        Socket.emit("start_chat");
        const { innerWidth: width, innerHeight: height } = window;
        setHeightScreen(height);
        Socket.on("navigate", route => {
            setHistory(history => [
                ...history,
                {
                    role: "user",
                    notification: true,
                    content: "Navigated to route: " + route,
                },
            ]);
        });
    }, []);

    const onSubmit = e => {
        e.preventDefault();
        if (!messageInput.current) return;
        const message = messageInput.current.value;

        sendMessage(message, { route: location.pathname });
        messageInput.current.value = "";
    };

    return (
        <Footer>
            <Resizable
                enable={{
                    right: false,
                    bottom: false,
                    left: false,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false,
                    top: true,
                }}
                style={{
                    backgroundColor: "#040A1E ",
                    position: "absolute",
                }}
                size={{
                    width: "100%",
                    ...(isCollapsed && { height: 0 }),
                }}
                className={`
                    transition-all bottom-2 top-0
                    overflow-hidden
                    mt-auto md:max-w-[1100px] max-w-[400px] border
                    rounded-t-[30px] border-slate-500 border-b-0  md:px-8 px-2 pt-5 pb-${
                        isCollapsed ? 5 : 20
                    }
                    
                `}
                defaultSize={{
                    width: "100%",
                    height: 250,
                }}
                maxHeight={isCollapsed ? 0 : heightScreen - 110}>
                {/* maxHeight={heightScreen - 110} */}
                <span className="absolute top-2 left-[50%]">
                    {!isCollapsed ? (
                        <BsChevronDown
                            color="#898C97"
                            cursor="pointer"
                            size={20}
                            onClick={() => setIsCollapsed(true)}
                        />
                    ) : (
                        <BsChevronUp
                            color="#898C97"
                            cursor="pointer"
                            size={20}
                            onClick={() => setIsCollapsed(false)}
                        />
                    )}
                </span>
                {!isCollapsed && (
                    <>
                        <div
                            id="scroll"
                            className="h-full pr-2 overflow-y-scroll">
                            <Messages
                                message={introduction}
                                type={false}
                                notification={true}
                            />
                            {history.map((message, i) => {
                                return (
                                    <Messages
                                        key={i}
                                        message={message.content}
                                        notification={message.notification}
                                        type={message.role == "assistant"}
                                    />
                                );
                            })}
                            {currentMessage && (
                                <Messages
                                    message={currentMessage}
                                    type={true}
                                />
                            )}
                        </div>
                        <form onSubmit={onSubmit}>
                            <div className="flex items-center space-x-2 absolute md:left-8 md:right-8 left-2 right-2 bottom-2">
                                <div className="flex items-center space-x-4 border border-cyan-400 p-1  rounded-[16px] flex-1 mr-3">
                                    <button className="bg-gradient-to-r from-cyan-300 to-blue-600 w-[42px] h-[42px] rounded-[12px] flex items-center justify-center">
                                        <BiMicrophone color="#fff" size={24} />
                                    </button>
                                    <input
                                        ref={messageInput}
                                        type="text"
                                        className="flex-1 border-none outline-none h-full bg-transparent font-abel text-white text-lg"
                                    />
                                </div>
                                <button
                                    className="bg-gradient-to-r from-cyan-300 to-blue-600 w-[42px] h-[42px] rounded-[12px] flex items-center justify-center"
                                    onClick={onSubmit}>
                                    <IoMdSend color="#fff" size={24} />
                                </button>
                                <p className="bg-gradient-to-r from-cyan-300 to-blue-600 inline-block text-transparent bg-clip-text border-[2px] border-cyan-500 h-[42px] w-[42px] text-center pt-[2px] text-xl rounded-[12px] cursor-pointer">
                                    x
                                </p>
                            </div>
                        </form>
                    </>
                )}
            </Resizable>
        </Footer>
    );
};

const Footer = styled.div`
    position: fixed;
    bottom: 0px;
    display: flex;
    width: 100vw;
    justify-content: center;
`;

export default XChat;
