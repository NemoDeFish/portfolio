import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = () => {
    return (
        <div className="container">
            <div className="moon">
                <div className="crater crater1" />
                <div className="crater crater2" />
                <div className="crater crater3" />
                <div className="crater crater4" />
                <div className="crater crater5" />
                <div className="shadow" />
                <div className="eye eye-l" />
                <div className="eye eye-r" />
                <div className="mouth" />
                <div className="blush blush1" />
                <div className="blush blush2" />
            </div>
            <div className="orbit">
                <div className="rocket">
                    <div className="window" />
                    <div className="fire" />
                    <div className="gas" />
                    <div className="gas" />
                    <div className="gas" />
                    <div className="gas" />
                    <div className="gas" />
                    <div className="gas" />
                    <div className="gas" />
                </div>
            </div>
            <div className="curve">
                <svg viewBox="0 0 500 500">
                    <path
                        id="loading"
                        d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"
                    />
                    <text width={500}>
                        <textPath xlinkHref="#loading">...loading...</textPath>
                    </text>
                </svg>
            </div>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .container {
                    display: flex;
                    height: 370px;
                    width: 370px;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    flex-direction: column;
                }

                .moon {
                    background: linear-gradient(
                        135deg,
                        #fbbf24 0%,
                        #fcd34d 100%
                    );
                    height: 170px;
                    width: 170px;
                    border-radius: 50%;
                    position: absolute;
                    margin: auto;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    overflow: hidden;
                    box-shadow: 0 4px 30px rgba(251, 191, 36, 0.4);
                }

                .crater {
                    background-color: #f59e0b;
                    height: 30px;
                    width: 30px;
                    border-radius: 50%;
                    position: relative;
                }
                .crater:before {
                    content: "";
                    position: absolute;
                    height: 25px;
                    width: 25px;
                    border-radius: 50%;
                    box-shadow: -5px 0 0 2px #d97706;
                    top: 2px;
                    left: 7px;
                }
                .crater1 {
                    top: 27px;
                    left: 90px;
                    transform: scale(0.9);
                }
                .crater2 {
                    bottom: 15px;
                    left: 61px;
                    transform: scale(0.6);
                }
                .crater3 {
                    left: 15px;
                    transform: scale(0.75);
                }
                .crater4 {
                    left: 107px;
                    top: 32px;
                    transform: scale(1.18);
                }
                .crater5 {
                    left: 33px;
                    bottom: 4px;
                    transform: scale(0.65);
                }

                .shadow {
                    height: 190px;
                    width: 190px;
                    box-shadow: 21px 0 0 5px rgba(217, 119, 6, 0.2);
                    border-radius: 50%;
                    position: relative;
                    bottom: 157.5px;
                    right: 46px;
                }

                .eye {
                    background-color: #1f2937;
                    height: 12px;
                    width: 12px;
                    position: relative;
                    border-radius: 50%;
                }
                .eye-l {
                    bottom: 255px;
                    left: 59px;
                }
                .eye-r {
                    bottom: 267px;
                    left: 101px;
                }

                .mouth {
                    height: 5px;
                    width: 10px;
                    border: 3px solid #1f2937;
                    position: relative;
                    bottom: 262px;
                    left: 79px;
                    border-top: none;
                    border-radius: 0 0 10px 10px;
                }

                .blush {
                    background-color: #fb923c;
                    height: 7.5px;
                    width: 7.5px;
                    position: relative;
                    border-radius: 50%;
                }
                .blush1 {
                    bottom: 273px;
                    left: 50px;
                }
                .blush2 {
                    bottom: 281px;
                    left: 115px;
                }

                .orbit {
                    height: 280px;
                    width: 280px;
                    border-radius: 50%;
                    position: absolute;
                    margin: auto;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    animation: spin 10s infinite linear;
                }
                @keyframes spin {
                    100% {
                        transform: rotate(360deg);
                    }
                }

                .rocket {
                    background: linear-gradient(
                        180deg,
                        #f3f4f6 0%,
                        #e5e7eb 100%
                    );
                    height: 50px;
                    width: 25px;
                    border-radius: 50% 50% 0 0;
                    position: relative;
                    left: -11px;
                    top: 112px;
                    overflow: visible;
                    border: 2px solid #9ca3af;
                }

                .rocket:before {
                    content: "";
                    position: absolute;
                    background: linear-gradient(
                        180deg,
                        #d1d5db 0%,
                        #9ca3af 100%
                    );
                    height: 20px;
                    width: 55px;
                    border-radius: 50% 50% 0 0;
                    z-index: -1;
                    right: -15px;
                    bottom: 0;
                }

                .rocket:after {
                    content: "";
                    position: absolute;
                    background-color: #9ca3af;
                    height: 4px;
                    width: 15px;
                    border-radius: 0 0 2px 2px;
                    bottom: -4px;
                    left: 4.3px;
                }

                .rocket .fire {
                    position: absolute;
                    bottom: -20px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 12px;
                    height: 30px;
                    background: radial-gradient(
                        ellipse at center,
                        #fef3c7 0%,
                        #fde047 30%,
                        #fb923c 60%,
                        #f97316 85%,
                        rgba(0, 0, 0, 0) 100%
                    );
                    border-radius: 50%;
                    animation: flame 0.3s infinite alternate;
                    z-index: -1;
                }

                @keyframes flame {
                    0% {
                        transform: translateX(-50%) scaleY(1);
                        opacity: 0.9;
                    }
                    100% {
                        transform: translateX(-50%) scaleY(1.4);
                        opacity: 0.6;
                    }
                }

                .rocket .gas {
                    position: absolute;
                    bottom: -35px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 10px;
                    height: 10px;
                    background: rgba(251, 191, 36, 0.5);
                    border-radius: 50%;
                    animation: gas 1.5s infinite ease-out;
                }
                .rocket .gas:nth-child(3) {
                    animation-delay: 0.3s;
                    left: 40%;
                }
                .rocket .gas:nth-child(4) {
                    animation-delay: 0.6s;
                    left: 60%;
                }

                @keyframes gas {
                    0% {
                        transform: translateX(-50%) scale(0.5);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateX(-50%) translateY(40px) scale(1.8);
                        opacity: 0;
                    }
                }

                .window {
                    background-color: #1f2937;
                    height: 10px;
                    width: 10px;
                    border: 2px solid #e5e7eb;
                    border-radius: 50%;
                    position: relative;
                    top: 17px;
                    left: 5px;
                }

                .curve {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    animation: rotate 10s linear infinite;
                    fill: transparent;
                }
                @keyframes rotate {
                    0% {
                        transform: rotate(0deg);
                    }

                    100% {
                        transform: rotate(360deg);
                    }
                }

                .curve text {
                    letter-spacing: 20px;
                    text-transform: uppercase;
                    font: 1.5em "Fira Sans", sans-serif;
                    fill: #f59e0b;
                    stroke: rgba(217, 119, 6, 0.2);
                    stroke-width: 1px;
                    filter: drop-shadow(0 2px 10px rgba(251, 191, 36, 0.4));
                }
            `,
                }}
            />
        </div>
    );
};

const LoadingScreen = ({ onFinish }: { onFinish?: () => void }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            if (onFinish) onFinish();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -180 }}
                    transition={{ duration: 1.3, ease: "easeInOut" }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50 dark:bg-gray-950"
                >
                    <Loader />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
