import React from "react";
import styled from "styled-components";

const Avatar = ({ size, hasLogo }) => {
    return (
        <AvatarWrapper size={size}>
            <Ring />
            <Ring delay={"2000"} />
            <Ring delay={"4000"} />
            <Ring delay={"6000"} />
            <X size={size}>
                {hasLogo && (
                    <>
                        <svg
                            width={1.7 * size}
                            height="100"
                            viewBox="0 0 476 114"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_197_143)">
                                <path
                                    d="M15.3295 104.767C12.0105 104.767 9.33391 103.91 7.29969 102.197C5.37253 100.484 4.40895 98.2892 4.40895 95.6126C4.40895 93.043 5.21193 90.9553 6.8179 89.3493C8.42386 87.7433 10.244 86.9403 12.2782 86.9403C14.7407 86.9403 16.4537 87.6898 17.4173 89.1887C18.4879 90.5805 19.1303 91.9724 19.3444 93.3642C21.8069 93.3642 24.5371 91.0623 27.5349 86.4586C30.5327 81.8548 33.9587 73.8785 37.813 62.5297C35.7788 57.2835 34.1193 52.7868 32.8345 49.0395C31.5498 45.1852 30.265 41.8662 28.9802 39.0826C27.9096 36.7271 26.8925 35.0676 25.9289 34.1041C24.9653 33.0334 23.8411 32.4981 22.5564 32.4981C20.7363 32.391 19.0768 33.3546 17.5779 35.3888C16.079 37.316 15.1154 41.1703 14.6871 46.9518L8.58446 46.6306C8.69152 44.3822 9.01272 41.8127 9.54804 38.922C10.1904 36.0312 11.2075 33.2476 12.5994 30.5709C13.9912 27.7873 15.9184 25.4854 18.3809 23.6653C20.8433 21.8452 24.0017 20.9351 27.8561 20.9351C31.8174 20.9351 34.8152 22.1129 36.8495 24.4683C38.9907 26.7166 40.8644 29.875 42.4703 33.9435C43.3269 36.0848 44.1834 38.4937 45.0399 41.1703C45.8964 43.7399 46.9135 46.7912 48.0912 50.3243C50.7678 43.7934 53.3374 38.5472 55.7999 34.5859C58.3694 30.6245 60.7783 27.6802 63.0267 25.753C65.2751 23.8259 67.3628 22.5411 69.29 21.8987C71.3242 21.2563 73.0372 20.9351 74.4291 20.9351C77.641 20.9351 80.0499 21.7917 81.6559 23.5047C83.2619 25.2177 84.0649 27.3055 84.0649 29.768C84.0649 31.9092 83.2619 33.7829 81.6559 35.3888C80.157 36.9948 78.3369 37.7978 76.1956 37.7978C74.0543 37.7978 72.3948 37.2625 71.2171 36.1918C70.1465 35.1212 69.3435 34.2111 68.8082 33.4617C67.4163 33.8899 65.9174 34.9606 64.3115 36.6736C62.7055 38.2796 60.8319 40.9027 58.6906 44.5428C56.6564 48.183 54.301 53.3221 51.6243 59.9601C53.6586 65.3133 55.5322 70.0777 57.2452 74.2532C59.0653 78.3217 60.7248 81.8013 62.2237 84.692C63.8297 87.4757 65.3286 89.617 66.7204 91.1159C68.1123 92.5077 69.4506 93.2036 70.7353 93.2036C72.4484 93.2036 73.9473 92.2936 75.232 90.4735C76.5168 88.5463 77.4804 85.3344 78.1228 80.8377L84.2254 81.6407C83.9043 84.2102 83.3689 86.8868 82.6195 89.6705C81.87 92.3471 80.7994 94.8631 79.4076 97.2185C78.1228 99.4669 76.3562 101.287 74.1079 102.679C71.9666 104.071 69.29 104.767 66.078 104.767C63.4014 104.767 61.0995 104.338 59.1724 103.482C57.2452 102.625 55.4251 101.073 53.7121 98.8245C52.1061 96.4691 50.3396 93.2036 48.4124 89.0281C46.4853 84.8526 44.1834 79.4458 41.5068 72.8078H41.3462C38.8837 79.9812 36.4747 85.7091 34.1193 89.9917C31.871 94.2743 29.6761 97.4862 27.5349 99.6275C25.3936 101.769 23.3058 103.161 21.2716 103.803C19.2374 104.445 17.2567 104.767 15.3295 104.767ZM126.614 105.57C124.152 105.57 121.636 105.195 119.066 104.445C116.497 103.803 114.088 102.465 111.839 100.43C109.698 98.3962 107.985 95.452 106.7 91.5976C105.415 87.6363 104.773 82.4436 104.773 76.0198L105.094 29.4468L92.7283 29.6074V22.7017C95.512 22.5946 98.3492 21.5775 101.24 19.6504C104.131 17.6161 106.7 14.886 108.949 11.4599C111.304 8.03388 112.91 4.28663 113.766 0.218186H119.227V22.7017H146.207V28.965L119.227 29.2862L118.906 73.932C118.906 78.7499 119.28 82.8719 120.03 86.298C120.886 89.617 122.225 92.133 124.045 93.846C125.865 95.559 128.22 96.4155 131.111 96.4155C134.109 96.4155 136.892 95.559 139.462 93.846C142.138 92.133 144.494 89.7775 146.528 86.7797L150.864 90.3129C148.509 93.846 146.153 96.6297 143.798 98.6639C141.55 100.698 139.355 102.197 137.214 103.161C135.072 104.231 133.092 104.874 131.271 105.088C129.451 105.409 127.899 105.57 126.614 105.57ZM192.414 105.57C186.632 105.57 181.761 104.499 177.799 102.358C173.945 100.216 171.001 96.5761 168.966 91.437C167.039 86.298 166.076 79.3388 166.076 70.5595V41.9733C166.076 40.2603 166.076 38.5472 166.076 36.8342C166.183 35.1212 166.397 33.3546 166.718 31.5345C164.898 31.6416 163.024 31.7486 161.097 31.8557C159.277 31.8557 157.457 31.9092 155.637 32.0163V25.4319H160.615C165.219 25.4319 168.538 25.0036 170.572 24.1471C172.714 23.1835 174.373 22.1664 175.551 21.0957H180.208V70.0777C180.208 79.2852 181.493 86.1909 184.063 90.7947C186.739 95.2914 191.236 97.4862 197.553 97.3791C201.621 97.2721 205.475 96.0408 209.116 93.6854C212.863 91.2229 215.861 88.3322 218.109 85.0132V43.7399C218.109 41.1703 218.163 38.9755 218.27 37.1554C218.377 35.2282 218.591 33.3546 218.912 31.5345C216.985 31.6416 215.058 31.7486 213.131 31.8557C211.203 31.8557 209.276 31.9092 207.349 32.0163V25.4319H212.328C216.931 25.4319 220.25 25.0036 222.285 24.1471C224.426 23.1835 226.085 22.1664 227.263 21.0957H231.92L231.76 81.8013C231.76 83.5143 231.706 85.9232 231.599 89.0281C231.492 92.133 231.331 94.756 231.117 96.8973C233.045 96.7903 234.972 96.6832 236.899 96.5761C238.826 96.4691 240.753 96.362 242.68 96.2549V103H219.715C219.394 101.18 219.126 99.4669 218.912 97.8609C218.805 96.2549 218.698 94.756 218.591 93.3642C215.272 96.6832 211.257 99.5739 206.546 102.036C201.835 104.392 197.124 105.57 192.414 105.57ZM284.545 105.57C282.082 105.57 279.566 105.195 276.997 104.445C274.427 103.803 272.018 102.465 269.77 100.43C267.628 98.3962 265.915 95.452 264.631 91.5976C263.346 87.6363 262.703 82.4436 262.703 76.0198L263.025 29.4468L250.659 29.6074V22.7017C253.442 22.5946 256.28 21.5775 259.17 19.6504C262.061 17.6161 264.631 14.886 266.879 11.4599C269.234 8.03388 270.84 4.28663 271.697 0.218186H277.157V22.7017H304.137V28.965L277.157 29.2862L276.836 73.932C276.836 78.7499 277.211 82.8719 277.96 86.298C278.817 89.617 280.155 92.133 281.975 93.846C283.795 95.559 286.151 96.4155 289.041 96.4155C292.039 96.4155 294.823 95.559 297.392 93.846C300.069 92.133 302.424 89.7775 304.459 86.7797L308.795 90.3129C306.439 93.846 304.084 96.6297 301.728 98.6639C299.48 100.698 297.285 102.197 295.144 103.161C293.003 104.231 291.022 104.874 289.202 105.088C287.382 105.409 285.829 105.57 284.545 105.57ZM356.286 105.57C348.792 105.57 341.993 103.857 335.89 100.43C329.788 96.8973 324.916 92.0794 321.276 85.9768C317.743 79.767 315.976 72.7008 315.976 64.778C315.976 56.3199 317.743 48.7184 321.276 41.9733C324.809 35.2282 329.627 29.9286 335.73 26.0742C341.832 22.1129 348.685 20.1322 356.286 20.1322C363.781 20.1322 370.579 21.9523 376.682 25.5924C382.785 29.1256 387.656 33.9435 391.296 40.0461C394.936 46.1488 396.756 53.108 396.756 60.9237C396.756 69.1677 394.936 76.7157 391.296 83.5678C387.763 90.3129 382.945 95.6661 376.842 99.6275C370.74 103.589 363.888 105.57 356.286 105.57ZM357.571 99.1457C363.245 99.1457 367.742 97.5397 371.061 94.3278C374.38 91.1159 376.735 86.9403 378.127 81.8013C379.626 76.6622 380.376 71.2554 380.376 65.581C380.376 60.7631 379.894 56.0523 378.93 51.4485C378.074 46.7377 376.682 42.5086 374.755 38.7614C372.828 34.9071 370.312 31.8557 367.207 29.6074C364.209 27.359 360.569 26.2348 356.286 26.2348C350.719 26.2348 346.168 27.8408 342.635 31.0527C339.102 34.2647 336.479 38.4402 334.766 43.5793C333.16 48.7184 332.357 54.2322 332.357 60.1207C332.357 66.7587 333.267 73.0755 335.087 79.0711C336.907 84.9597 339.691 89.7775 343.438 93.5248C347.186 97.2721 351.896 99.1457 357.571 99.1457ZM410.401 98.1821C413.72 98.1821 416.022 97.3791 417.306 95.7732C418.591 94.0601 419.341 91.7582 419.555 88.8675C419.769 85.8697 419.876 82.4436 419.876 78.5893V41.9733C419.876 40.2603 419.876 38.5472 419.876 36.8342C419.983 35.1212 420.197 33.3546 420.518 31.5345C418.591 31.6416 416.664 31.7486 414.737 31.8557C412.917 31.8557 411.043 31.9092 409.116 32.0163V25.4319H414.095C418.698 25.4319 421.857 25.0036 423.57 24.1471C425.39 23.1835 426.889 22.1664 428.066 21.0957H432.724C432.938 22.8088 433.098 24.9501 433.206 27.5196C433.313 29.9821 433.42 33.1405 433.527 36.9948C435.133 34.3182 437.328 31.6951 440.111 29.1256C442.895 26.556 446 24.4147 449.426 22.7017C452.959 20.9887 456.653 20.1322 460.507 20.1322C463.505 20.1322 466.128 20.9351 468.376 22.5411C470.625 24.1471 471.749 26.7166 471.749 30.2498C471.749 31.1063 471.481 32.1769 470.946 33.4617C470.41 34.6394 469.554 35.71 468.376 36.6736C467.199 37.5301 465.646 37.9584 463.719 37.9584C461.363 37.8513 459.49 36.9413 458.098 35.2282C456.706 33.4081 456.171 31.3204 456.492 28.965C453.815 28.8579 451.032 29.5538 448.141 31.0527C445.357 32.5516 442.734 34.6394 440.272 37.316C437.809 39.8855 435.615 42.9369 433.687 46.47L433.848 85.9768C433.848 88.1181 433.794 90.0452 433.687 91.7582C433.687 93.3642 433.527 95.0772 433.206 96.8973C434.919 96.7903 436.578 96.7367 438.184 96.7367C439.897 96.6297 441.61 96.5226 443.323 96.4155V103H410.401V98.1821Z"
                                    fill="white"
                                />
                            </g>
                            <defs>
                                <filter
                                    id="filter0_d_197_143"
                                    x="0.346192"
                                    y="0.218201"
                                    width="475.465"
                                    height="113.477"
                                    filterUnits="userSpaceOnUse"
                                    color-interpolation-filters="sRGB">
                                    <feFlood
                                        flood-opacity="0"
                                        result="BackgroundImageFix"
                                    />
                                    <feColorMatrix
                                        in="SourceAlpha"
                                        type="matrix"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                        result="hardAlpha"
                                    />
                                    <feOffset dy="4.06274" />
                                    <feGaussianBlur stdDeviation="2.03137" />
                                    <feComposite
                                        in2="hardAlpha"
                                        operator="out"
                                    />
                                    <feColorMatrix
                                        type="matrix"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                    />
                                    <feBlend
                                        mode="normal"
                                        in2="BackgroundImageFix"
                                        result="effect1_dropShadow_197_143"
                                    />
                                    <feBlend
                                        mode="normal"
                                        in="SourceGraphic"
                                        in2="effect1_dropShadow_197_143"
                                        result="shape"
                                    />
                                </filter>
                            </defs>
                        </svg>
                        <div> Tutor Liberation Front </div>
                    </>
                )}
            </X>
        </AvatarWrapper>
    );
};

const X = styled.span`
    position: relative;
    border-radius: 50%;
    background-color: #344161;
    width: ${props => props.size * 0.8}px;
    height: ${props => props.size * 0.8}px;
    z-index: 1;
    border: 1px solid rgb(255, 255, 255, 0.05);

    div {
        position: absolute;
        width: 20rem;
        text-align: center;
        font-size: 1.5em;
        top: 74%;
        left: 25%;
    }
    svg {
        /* border: 5px solid red; */
        position: absolute;
        left: 29%;
        top: 13%;
        width: auto;
    }
`;

const Ring = styled.span`
    position: absolute;
    border-radius: 50%;
    top: 0;
    left: 0;
    ${props => props.theme.utils.fillParent}
    z-index: 1;
    animation: pulse 8s ease-out infinite;
    animation-delay: ${props => props.delay}ms;
`;

const AvatarWrapper = styled.div`
    ${props => props.theme.utils.centeredRow}
    position: relative;

    width: ${props => props.size}px;
    height: ${props => props.size}px;
    /* border: 5px solid blue; */
`;

export default Avatar;
