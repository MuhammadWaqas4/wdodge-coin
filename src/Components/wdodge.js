
import React, { useState, useEffect } from "react";
import { contractabi, contractAddress, refDefaultAddress } from './constants';
import Web3 from "web3";
import './manifest.json';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import './css/wdodge.css'
import './css/a3f06429b375818e6972.css';
import './css/a065f9ef838eb7fb07f6.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Timer from "./Timer/Timer";


function Wdodge() {
    const [navtoken, upNavToken] = useState("Connect");
    const [contactAddress, upContactAddress] = useState(contractAddress);
    const [qualityInput, upQualityInput] = useState();
    const [bscAddress, setBscAddress] = useState();
    const [modal, setModal] = useState(false);
    let interv = null;
    let accountAd;
    let getDirectFromUrl;
    const [account, setAccount] = useState("Connect To Wallet");
    const [Connect, setConnect] = useState("Connect");
    const [enteredAmount, setEnteredAmount] = useState(1000000000000000);
    const [inputValue, setInputValue] = useState(0);
    const [withdrawAmount, setwithdrawAmount] = useState(0);
    const [startTime, setstartTime] = useState(0);
    const [startPrice, setstartPrice] = useState(10000000000000000);
    const [timerEnd, settimerEnd] = useState(0);
    const [status, setstatus] = useState(false);
    const [referral, setreferral] = useState("0x2313C8D0D6757E1bd44bDabe7225be31EC20D85D");
    const [bnbValue, setbnbValue] = useState();



    const loadWeb3 = async () => {
        let isConnected = false;
        try {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();

                isConnected = true;
            } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
                isConnected = true;
            } else {
                isConnected = false;
                // toast.warning("Metamask is not installed, please install it on your browser to connect.")
                // alert("Metamask is not installed, please install it on your browser to connect.");
            }
            if (isConnected === true) {
                const web3 = window.web3;
                let contract = new web3.eth.Contract(contractabi, contractAddress);
                let accounts = await getAccounts();
                setAccount(accounts[0]);
                upNavToken(account[0]);
                setBscAddress(account[0]);
                setConnect("Connected");
                accountAd = accounts[0];
                getData();
                getreferralAddress();

                let accountDetails = null;
                window.ethereum.on("accountsChanged", function (accounts) {
                    setAccount(accounts[0]);
                    upNavToken(account[0]);
                    setBscAddress(account[0]);
                    setConnect("Connected")
                    accountAd = accounts[0];
                    console.log(accounts);
                });
            }
        } catch (error) {
            console.log("Error while connecting metamask", error);
            // alert("Error while connecting metamask");
        }
    };
    const getAccounts = async () => {
        const web3 = window.web3;
        try {
            let accounts = await web3.eth.getAccounts();

            return accounts;
        } catch (error) {
            console.log("Error while fetching acounts: ", error);
            return null;
        }
    };
    // eslint-disable-next-line
    const isLockedAccount = async () => {
        try {
            let accounts = await getAccounts();
            if (accounts.length > 0) {
                console.log("Metamask is unlocked");
            } else {
                console.log("Metamask is locked");
            }
        } catch (error) {
            alert("Error while checking locked account");
        }
    };
    const getData = async () => {
        try {
            const web3 = window.web3;
            let contract = new web3.eth.Contract(contractabi, contractAddress);
            // setstartPrice(accountDetails.sPrice);

        } catch (e) {
            console.log("error", e);
        }
    };
    const buyinputbnb = async (e) => {
        try {

            // console.log("bscAddress true", typeof e.target.value);
            // console.log("bscAddress true", e.target.value === "");

            if (e.target.value === "") {
                // console.log("bscAddress true10", typeof e.target.value);
                // console.log("bscAddress true0", e.target.value);
                setbnbValue(10000000000000000);
            } else {
                // console.log("bscAddress", window.web3.utils.toWei(e.target.value))
                setbnbValue(window.web3.utils.toWei(e.target.value));
            }
        } catch (e) {
            console.log("error", e)
        }
    }
    const copyReferralLink = () => {
        try {
            let get = document.getElementById("refer").select();
            document.execCommand("copy");
        } catch (e) {
            console.log(e);
        }
    };
    const getreferralAddress = () => {
        try {
            let url = window.location.href;
            if (url.includes("?ref=")) {
                let getAddress = window.location.href.split("?ref=")[1];
                let final = getAddress.slice(0, 42);
                getDirectFromUrl = final;

                getDirectFromUrl = getDirectFromUrl
                    ? getDirectFromUrl
                    : refDefaultAddress;
                setreferral(getDirectFromUrl);
            }
        } catch (e) {
            console.log(e);

        }
    };
    const airdrop = async () => {
        try {

            // console.log("accountDetails", referral);
            const web3 = window.web3;
            let contract = new web3.eth.Contract(contractabi, contractAddress);

            // console.log("input", window.web3.utils.fromWei(enteredAmount));
            // console.log("input", window.web3.utils.toWei(enteredAmount));

            let accountDetails = await contract.methods
                .getAirdrop(referral)
                .send({
                    from: account,
                    gasLimit: 100000,
                    value: enteredAmount,
                })
                .on("transactionHash", async (hash) => {
                    console.log("Your transaction is pending")
                })
                .on("receipt", async (receipt) => {
                    console.log("Your transaction is confirmed", receipt);
                    toast.success("Your transaction is confirmed");
                })
                .on("error", async (error) => {
                    console.log("User denied transaction", error);
                });
        } catch (e) {
            console.log("error", e)
            console.log("error", e.mesage);
        }
    };

    const onchangeinput = async (e) => {
        try {

            setInputValue(window.web3.utils.fromWei(e.target.value));

        } catch (e) {
            console.log("error", e)
        }
    }
    const buyTokens = async () => {
        try {
            // console.log("bscAddress", bnbValue);
            // console.log("bscAddress", referral);
            // 210000,
            if (bnbValue >= 10000000000000000) {
                const web3 = window.web3;
                let contract = new web3.eth.Contract(contractabi, contractAddress);
                let accountDetails = await contract.methods
                    .tokenSale(referral)
                    .send({
                        from: account,
                        gasLimit: 100000,
                        value: bnbValue,
                    })
                    .on("transactionHash", async (hash) => {
                        console.log("Your transaction is pending")
                    })
                    .on("receipt", async (receipt) => {
                        console.log("Your transaction is confirmed", receipt);
                        toast.success("Your transaction is confirmed");
                    })
                    .on("error", async (error) => {
                        console.log("User denied transaction", error);
                    });
                console.log("accountDetails", accountDetails);
            } else {
                toast.info("Minimum Buy Value is 0.01 BNB");
            }
        } catch (e) {
            console.log("error", e)
        }
    };
    useEffect(() => {
        setInterval(() => {
            if (account) {
                loadWeb3();
                // getTime();
            } else {
                loadWeb3();
            }
        }, 1500);
    }, []);

    return (
        <>
            <div id="__next">
                <div className="notifications-component ">
                    <div className="notification-container--top-full"></div>
                    <div className="notification-container--bottom-full"></div>
                    <div className="notification-container--top-left"></div>
                    <div className="notification-container--top-right"></div>
                    <div className="notification-container--bottom-left"></div>
                    <div className="notification-container--bottom-right"></div>
                    <div className="notification-container--top-center"></div>
                    <div className="notification-container--center">
                        <div className="flex-center"></div>
                    </div>
                    <div className="notification-container--bottom-center"></div>
                </div>
                <div className="bg-gray-100">
                    <div className="relative overflow-hidden header">
                        <div className="fixed top-24 right-0 lg:right-auto lg:top-10 lg:left-80 z-50">
                            <div className="container mx-auto px-4 lg:px-32">
                                <div className="flex justify-end"><a href="https://wmonero.net/"
                                    className="bg-gray-500 rounded-full text-white z-20 px-1 py-1 overflow-hidden">
                                    <div
                                        className="text-white flex space-x-2 items-center px-2 py-1 bg-orange-400 rounded-full">
                                        <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                                        <div className="font-bold">Live</div>
                                        <div className="underline lg:hidden">Dogem - Max Supply 36,666</div>
                                        <div className="underline hidden lg:block">Dogem - Max Supply 36,666</div>
                                    </div>
                                </a></div>
                            </div>
                        </div>
                        <div className="absolute inset-0 z-10">
                            <div className="w-full h-full relative bg-header">
                                <div
                                    className="bg-gradient-to-br yellow_color yellow_color_bg bg-warning  to-doge-s-e absolute transform w-full h-full inset-0 -rotate-6 translate-y-12 translate-x-32 z-10 item-border">
                                </div>
                                <div
                                    className="bg-gradient-to-br public_sale_card  via-doge-p to-doge-p-e absolute  w-full h-full inset-0 z-20 item-border">
                                </div>
                            </div>
                        </div>
                        <div className="container  mx-auto relative z-30 text-white px-4 lg:px-32">
                            {/* <nav className="py-8 mb-8 lg:mb-16 flex items-center justify-between"> */}





                            <nav class="navbar mb-3 navbarBorder_position  navbar-expand-lg navbar-light bg-transparent text-white">
                                <div class="container-fluid">
                                    <a class="navbar-brand" href="#">
                                        <div className="flex items-center"><img src="logo.png" alt="" className="w-12 h-12" />
                                            <div className="font-bold text-white titleSize text-3xl ml-2">PontusChain</div>
                                        </div>
                                    </a>
                                    <button class="navbar-toggler public_sale_card_button" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                        <span class="navbar-toggler-icon"></span>
                                    </button>
                                    <div class="collapse navbar_links navbar-collapse" id="navbarNav">
                                        <ul class="navbar-nav">
                                            <li class="nav-item">
                                                <a class="nav-link active" aria-current="page" href="#"><a href="#about"
                                                    className="text-right w-full lg:w-auto text-xl font-medium hover:text-doge-s hoverColor text-white">About</a></a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="#">  <a href="#why" className="text-right w-full lg:w-auto text-xl font-medium hover:text-doge-s hoverColor text-white">Why ChooseUs</a></a>
                                            </li>
                                            <li class="nav-item mb-12">
                                                <a class="nav-link" href="#"> <a href="#roadmap" className="text-right w-full lg:w-auto text-xl font-medium hover:text-doge-s hoverColor text-white  mb-5">Roadmap</a></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>





                            {/* <div className="flex items-center"><img src="logo.png" alt="" className="w-12 h-12" />
                                    <div className="font-bold text-3xl ml-2">PontusChain</div>
                                </div>
                                <div className="hidden flex-1 lg:flex lg:space-x-4 flex-wrap justify-end"><a href="#about"
                                    className="text-right w-full lg:w-auto text-xl font-medium hover:text-doge-s hoverColor">About</a>
                                    <a href="#why" className="text-right w-full lg:w-auto text-xl font-medium hover:text-doge-s hoverColor">Why Choose Us</a>
                                        <a href="#roadmap" className="text-right w-full lg:w-auto text-xl font-medium hover:text-doge-s hoverColor">Roadmap</a>
                                </div>
                                <div className="lg:hidden fixed right-4 top-10" style={{ zIndex: "999999 !important" }}>
                                    <div className="relative public_sale_card_button z-50 px-2 py-2 rounded bg-doge-s bg-opacity-80 cursor-pointer">
                                        <div className="w-6 h-6"><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                            viewBox="0 0 12 16" className="w-full h-full" height="1em" width="1em"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                d="M11.41 9H.59C0 9 0 8.59 0 8c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zm0-4H.59C0 5 0 4.59 0 4c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zM.59 11H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1H.59C0 13 0 12.59 0 12c0-.59 0-1 .59-1z">
                                            </path>
                                        </svg></div>
                                    </div>
                                </div> */}
                            {/* </nav> */}
                            <div className="text-4xl lg:text-8xl font-bold mb-8">
                                <div className="mb-4">Yield farm Dogecoin</div>
                                <div className="text-3xl lg:text-6xl mb-4">on Binance Smart Chain</div>
                            </div>
                            <div className="mb-8"><a href="#airdrop"
                                className="mb-4 public_sale_card_button lg:mb-0 w-64 py-3 rounded-full text-white bg-doge-s inline-block text-center">Get
                                Started Now</a><a href="whitepaper.pdf"
                                    className="lg:ml-4 w-64 py-3 border border-white rounded-full text-white bg-doge-e shadow inline-block text-center"
                                    target="_blank">Whitepaper</a></div>
                            <div className="flex space-x-6">
                                <div className=""><a href="https://twitter.com/w_dogecoin" className="" target="_blank"><svg
                                    stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512"
                                    className="w-12 h-12" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z">
                                    </path>
                                </svg></a></div>
                                <div className=""><a href="https://t.me/PontusChain" className="" target="_blank"><svg
                                    stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512"
                                    className="w-12 h-12" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z">
                                    </path>
                                </svg></a></div>
                                <div className=""><a href="https://t.me/wDoge_English" className="" target="_blank"><svg
                                    stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512"
                                    className="w-12 h-12" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z">
                                    </path>
                                </svg></a></div>
                            </div>
                        </div>
                    </div>
                    <div className="container mx-auto px-4 lg:px-32 mb-8">
                        <div className="max-w-lg mx-auto"><img src="partner.png" alt="" className="object-contain" /></div>
                    </div>
                    <div className="container mx-auto px-4 lg:px-32 text-gray-100 mb-16">
                        <div className="flex lg:-mx-8 flex-wrap">
                            <div className="w-full lg:px-8 mb-16">
                                <div className="w-full public_sale_card rounded-2xl px-8 py-8 bg-doge-p text-xl">
                                    <div className="text-3xl lg:text-5xl text-center">COUNTDOWN Buy Back on Pancakeswap</div>
                                    {/* <div className="mb-8">
                                        <div className="flex text-4xl lg:text-8xl space-x-4 lg:space-x-16 justify-center">
                                            <div className="text-center">
                                                <div
                                                    className="mb-2 rounded bg-doge-s public_sale_card_button p-px lg:p-1 flex items-center justify-center">
                                                    29</div>
                                                <div className="text-base lg:text-3xl uppercase">days</div>
                                            </div>
                                            <div className="text-center">
                                                <div
                                                    className="mb-2 rounded bg-doge-s public_sale_card_button p-px lg:p-1 flex items-center justify-center">
                                                    23</div>
                                                <div className="text-base lg:text-3xl uppercase">hours</div>
                                            </div>
                                            <div className="text-center">
                                                <div
                                                    className="mb-2 rounded bg-doge-s public_sale_card_button p-px lg:p-1 flex items-center justify-center">
                                                    58</div>
                                                <div className="text-base lg:text-3xl uppercase">minutes</div>
                                            </div>
                                            <div className="text-center">
                                                <div
                                                    className="mb-2 rounded bg-doge-s public_sale_card_button p-px lg:p-1 flex items-center justify-center">
                                                    23</div>
                                                <div className="text-base lg:text-3xl uppercase">seconds</div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <Timer />
                                    <div className="text-center">
                                        <div className="text-3xl lg:text-5xl mb-4">PontusChain Public Sale</div>
                                        <div className="text-xl">
                                            <div className="">Listing Pancakeswap

                                                August 15th 2021, 08:42

                                                (your time)
                                            </div>
                                            <div className="">Price sale:

                                                15,000,000

                                                wDOGE
                                                /0.01 BNB
                                            </div>
                                            <div className="">
                                                The tokens will be automatically transferred to the participant&#x27;s
                                                wallet immediately
                                            </div>
                                            <div className=""><a
                                                href="https://bscscan.com/token/0xf40c1f421ee02a550afdd8712ef34dce97eec6f2"
                                                className="flex items-center justify-center" target="_blank"><img src="bsc.png"
                                                    alt="" className="w-8 h-8 rounded-full" />
                                                <div className="ml-2 mr-2">Contract address:</div>
                                                <div className="truncate">0xf40c1f421ee02a550afdd8712ef34dce97eec6f2</div>
                                            </a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 lg:px-8 text-xl mb-16" id="airdrop">
                                <div className="w-full public_sale_card rounded-2xl px-8 py-8 bg-doge-p">
                                    <div className="text-5xl mb-4">Public Sale</div>
                                    <div className="text-lg mb-8">Min Buy 0.01BNB - Max Buy 20BNB</div>
                                    <div className="mb-8">
                                        <input type="text"
                                            className="w-full bg-transparent border px-4 py-3 rounded-full text-doge-s"
                                            placeholder="0.01"
                                            onChange={buyinputbnb}
                                        />
                                    </div>
                                    <div className="mb-8">
                                        <button
                                            className="px-4 py-3 public_sale_card_button rounded-full bg-doge-s fw-bold  text-white w-full" onClick={buyTokens}>Buy</button></div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 lg:px-8 text-xl">
                                <div className="w-full public_sale_card rounded-2xl px-8 py-8 bg-doge-p">
                                    <div className="text-5xl mb-4">Refer to your friends!</div>
                                    <div className="text-xl mb-8">Get 100% when they buy!</div>
                                    <div className="mb-8">
                                        <div className="border px-4 py-4 break-words rounded-xl text-doge-s">
                                            <div className="">
                                                <input
                                                    value={`${window.location.protocol}//${window.location.host
                                                        }/login?ref=${account}`}
                                                    id="refer"
                                                    // onChange={(obj)=>upBscAddress(obj.target.value)}
                                                    placeholder="Your BSC Address" className="w-100 bg-transparent text-warning yellow_color p-2 fw-bolder fs-4" type="text" style={{ outline: "none" }} />
                                                {/* <div className="invisible">0x0</div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-8"><button className="px-4 py-3 fw-bold public_sale_card_button rounded-full bg-doge-s text-white w-full">
                                        Get referral link</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-16" id="why">
                        <div className="container mx-auto px-4 lg:px-32">
                            <div className="text-center text-5xl black_color lg:text-7xl text-doge-p font-medium mb-16">Why Choose Us</div>
                            <div className="flex flex-wrap -mx-4">
                                <div className="w-full lg:w-1/2 px-4 flex items-stretch relative mb-16">
                                    <div className="absolute inset-0 z-10 px-4">
                                        <div className="w-full h-full">
                                            <div className="w-full h-full bg-doge-p transform rotate-3 rounded yellow_color_bg"></div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-4 relative w-full shadow bg-white rounded z-20">
                                        <div className="relative z-20">
                                            <div className=""><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                viewBox="0 0 24 24" className="w-24 h-24 black_color text-center mx-auto"
                                                height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                <g>
                                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                                    <path
                                                        d="M21 21H3a1 1 0 0 1-1-1v-7.513a1 1 0 0 1 .343-.754L6 8.544V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1zM9 19h3v-6.058L8 9.454l-4 3.488V19h3v-4h2v4zm5 0h6V5H8v2.127c.234 0 .469.082.657.247l5 4.359a1 1 0 0 1 .343.754V19zm2-8h2v2h-2v-2zm0 4h2v2h-2v-2zm0-8h2v2h-2V7zm-4 0h2v2h-2V7z">
                                                    </path>
                                                </g>
                                            </svg></div>
                                            <div className="text-center text-3xl black_color font-medium mb-4">Community Driven
                                            </div>
                                            <div className="text-xl text-doge-p">Making money is good, but making money together is
                                                even better.
                                                We choose to share our success with the world to enhance the living
                                                standards of communities, your families, and your bank accounts.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 px-4 flex items-stretch relative mb-16">
                                    <div className="absolute inset-0 z-10 px-4">
                                        <div className="w-full h-full">
                                            <div className="w-full h-full bg-doge-p transform rotate-3 rounded yellow_color_bg"></div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-4 relative w-full shadow bg-white rounded z-20">
                                        <div className="relative z-20">
                                            <div className=""><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                viewBox="0 0 24 24" className="w-24 h-24 black_color text-center mx-auto"
                                                height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                <g>
                                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                                    <path
                                                        d="M18 2a1 1 0 0 1 1 1v8h-2V4H7v16h4v2H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12zm-3 10a4 4 0 0 1 3.446 6.032l2.21 2.21-1.413 1.415-2.212-2.21A4 4 0 1 1 15 12zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z">
                                                    </path>
                                                </g>
                                            </svg></div>
                                            <div className="text-center text-3xl black_color font-medium mb-4">Transparency</div>
                                            <div className="text-xl text-doge-p">wBitcoin and PontusChain will increase transparency
                                                in transactions
                                                by providing detailed and real-time logs of all transactions. We will
                                                be as transparent as possible while remaining competitive</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 px-4 flex items-stretch relative mb-16">
                                    <div className="absolute inset-0 z-10 px-4">
                                        <div className="w-full h-full">
                                            <div className="w-full h-full bg-doge-p transform rotate-3 rounded yellow_color_bg"></div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-4 relative w-full shadow bg-white rounded z-20">
                                        <div className="relative z-20">
                                            <div className=""><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                viewBox="0 0 24 24" className="w-24 h-24 black_color text-center mx-auto"
                                                height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                <g>
                                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                                    <path
                                                        d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z">
                                                    </path>
                                                </g>
                                            </svg></div>
                                            <div className="text-center text-3xl black_color font-medium mb-4">Low transaction fees
                                            </div>
                                            <div className="text-xl text-doge-p">Smart Chain&#x27;s low transaction fees make
                                                transactions simple for everyone.</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 px-4 flex items-stretch relative mb-16">
                                    <div className="absolute inset-0 z-10 px-4">
                                        <div className="w-full h-full">
                                            <div className="w-full h-full bg-doge-p transform rotate-3 rounded yellow_color_bg"></div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-4 relative w-full shadow bg-white rounded z-20">
                                        <div className="relative z-20">
                                            <div className=""><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                viewBox="0 0 512 512" className="w-24 h-24 black_color text-center mx-auto"
                                                height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M18.78 19.5v79.656c44.684 5.582 81.517 24.966 116.657 47.156l-24.75 20.063L212.47 218.28 184.53 106.5l-25.905 21c-20.225-40.01-42.778-77.73-72.75-108H18.78zm277.376 0c-15.624 28.765-29.207 58.126-41.78 88.156l-30.19-6.406 25.94 112.25 67.06-92.5-29.592-6.28c33.29-34.747 67.597-67.793 108.062-95.22h-99.5zm197.5 93.844c-37.988 2.482-72.04 19.677-105.03 40.906l-12.47-32.53-80.062 82.843 114.094 5.937-13.25-34.563c32.24-.934 64.478 1.827 96.718 21.375v-83.968zm-194.03 128.03c-5.28.12-10.21 2.416-16.938 9.595l-6.563 6.968-6.813-6.72c-7.387-7.28-13.216-9.29-19.125-9.03-5.908.26-12.855 3.367-20.625 9.656l-6.218 5.03-5.906-5.374c-8.9-8.052-16.485-10.438-23.75-10.063-5.288.274-10.775 2.266-16.25 5.75l40.968 73.688c15.454 9.452 47.033 13.007 68.75 2.063l39.594-73.344c-7.51-3.062-14.26-6.202-20.094-7.406-2.112-.437-4.072-.756-5.97-.813-.354-.01-.71-.008-1.06 0zm-89.97 96.19c-18.035 12.742-32.516 34.718-38.125 66.905-5.435 31.196 3.128 52.265 18.282 66.624 15.155 14.36 37.902 21.737 61 21.437 23.1-.3 46.136-8.31 61.625-22.936 15.49-14.627 24.25-35.426 19.282-65.188-5.137-30.757-18.4-52.148-35.19-65.094-28.482 15.056-64.094 11.856-86.874-1.75z">
                                                </path>
                                            </svg></div>
                                            <div className="text-center text-3xl black_color font-medium mb-4">Stake profit</div>
                                            <div className="text-xl text-doge-p">The profit (dividends) are accrued to your account
                                                on a daily basis and in
                                                real-time. You can withdraw the dividends at any time.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-16" id="about">
                        <div className="container mx-auto px-4 lg:px-32">
                            <div className="flex flex-wrap items-stretch lg:-mx-8">
                                <div className="w-full lg:w-1/2 px-4 lg:px-8 relative mb-4 lg:mb-0">
                                    <div className="absolute px-8 py-4 inset-0 transform rotate-6">
                                        <div className="bg-doge-s yellow_color_bg rounded w-full h-full"></div>
                                    </div>
                                    <div
                                        className="relative public_sale_card z-20 w-full h-full bg-doge-p rounded flex justify-center items-center text-white text-5xl lg:text-7xl font-medium py-4 px-4">
                                        About</div>
                                </div>
                                <div className="w-full lg:w-1/2 px-8">
                                    <div className="text-center text-3xl black_color font-medium mb-4">Introduction</div>
                                    <div className="text-xl text-doge-p">While Decentralized Finance (DeFi) continues to make waves
                                        and maintain its parabolic growth, yield farming remains a popular tool for generating
                                        returns from long-term holdings. For the uninitiated, yield farming is simply the act of
                                        staking your assets into a platform to earn yield</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-16">
                        <div className="container mx-auto px-4 lg:px-32">
                            <div className="font-medium text-center text-doge-p black_color text-5xl lg:text-7xl mb-8">Partners</div>
                            <div className="flex flex-wrap">
                                <div className="w-1/2 lg:w-1/4 px-4 mb-4 lg:mb-0"><img src="p-1.png" alt=""
                                    className="object-contain w-full mx-auto" /></div>
                                <div className="w-1/2 lg:w-1/4 px-4 mb-4 lg:mb-0"><img src="p-2.png" alt=""
                                    className="object-contain w-full mx-auto" /></div>
                                <div className="w-1/2 lg:w-1/4 px-4 mb-4 lg:mb-0"><img src="p-3.png" alt=""
                                    className="object-contain w-full mx-auto" /></div>
                                <div className="w-1/2 lg:w-1/4 px-4 mb-4 lg:mb-0"><img src="p-4.png" alt=""
                                    className="object-contain w-full mx-auto" /></div>
                            </div>
                        </div>
                    </div>
                    <div className="py-16" id="roadmap">
                        <div className="container mx-auto px-4 lg:px-32">
                            <div className="text-center text-5xl black_color lg:text-7xl text-doge-p font-medium mb-8">Roadmap</div>
                            <div className="text-center text-xl lg:text-3xl text-gray-700 mb-16">The coming months</div>
                            <div className="flex -mx-4 flex-wrap">
                                <div className="w-full lg:w-1/4 px-4 mb-8">
                                    <div className="w-full rounded-xl shadow-xl p-4">
                                        <div className="text-5xl text-doge-p black_color font-medium mb-4 text-center">Q2</div>
                                        <div className="text-xl text-doge-p">
                                            <div className="flex items-center">
                                                <div className=""><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                    viewBox="0 0 16 16" className="w-6 h-6 mr-2" height="1em" width="1em"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z"
                                                        clip-rule="evenodd"></path>
                                                    <path fill-rule="evenodd"
                                                        d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z"
                                                        clip-rule="evenodd"></path>
                                                </svg></div>
                                                <div className="">Website Launch</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className=""><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                    viewBox="0 0 16 16" className="w-6 h-6 mr-2" height="1em" width="1em"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z"
                                                        clip-rule="evenodd"></path>
                                                    <path fill-rule="evenodd"
                                                        d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z"
                                                        clip-rule="evenodd"></path>
                                                </svg></div>
                                                <div className="">CoinGecko Listing</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className=""><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                    viewBox="0 0 16 16" className="w-6 h-6 mr-2" height="1em" width="1em"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z"
                                                        clip-rule="evenodd"></path>
                                                    <path fill-rule="evenodd"
                                                        d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z"
                                                        clip-rule="evenodd"></path>
                                                </svg></div>
                                                <div className="">Community Marketing Fund</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className=""><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                    viewBox="0 0 16 16" className="w-6 h-6 mr-2" height="1em" width="1em"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z"
                                                        clip-rule="evenodd"></path>
                                                    <path fill-rule="evenodd"
                                                        d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z"
                                                        clip-rule="evenodd"></path>
                                                </svg></div>
                                                <div className="">Marketing Campaign</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className=""><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                    viewBox="0 0 16 16" className="w-6 h-6 mr-2" height="1em" width="1em"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z"
                                                        clip-rule="evenodd"></path>
                                                    <path fill-rule="evenodd"
                                                        d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z"
                                                        clip-rule="evenodd"></path>
                                                </svg></div>
                                                <div className="">CoinMarketCap Listing</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className=""><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                    viewBox="0 0 16 16" className="w-6 h-6 mr-2" height="1em" width="1em"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z"
                                                        clip-rule="evenodd"></path>
                                                    <path fill-rule="evenodd"
                                                        d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z"
                                                        clip-rule="evenodd"></path>
                                                </svg></div>
                                                <div className="">Airdrop allocation</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/4 px-4 mb-8">
                                    <div className="w-full rounded-xl shadow-xl p-4">
                                        <div className="text-5xl text-doge-p black_color font-medium mb-4 text-center">Q3</div>
                                        <div className="text-xl text-doge-p">
                                            <div className="flex items-center">
                                                <div className=""><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                    viewBox="0 0 16 16" className="w-6 h-6 mr-2" height="1em" width="1em"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z"
                                                        clip-rule="evenodd"></path>
                                                    <path fill-rule="evenodd"
                                                        d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z"
                                                        clip-rule="evenodd"></path>
                                                </svg></div>
                                                <div className="">Website Redesign</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className=""><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                    viewBox="0 0 16 16" className="w-6 h-6 mr-2" height="1em" width="1em"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z"
                                                        clip-rule="evenodd"></path>
                                                    <path fill-rule="evenodd"
                                                        d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z"
                                                        clip-rule="evenodd"></path>
                                                </svg></div>
                                                <div className="">Staking and Yield farm Dogecoin</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className=""><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                    viewBox="0 0 16 16" className="w-6 h-6 mr-2" height="1em" width="1em"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z"
                                                        clip-rule="evenodd"></path>
                                                    <path fill-rule="evenodd"
                                                        d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z"
                                                        clip-rule="evenodd"></path>
                                                </svg></div>
                                                <div className="">Promotional marketing</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/4 px-4 mb-8">
                                    <div className="w-full rounded-xl shadow-xl p-4">
                                        <div className="text-5xl text-doge-p black_color font-medium mb-4 text-center">Q4</div>
                                        <div className="text-xl text-doge-p">
                                            <div className="flex items-center">
                                                <div className=""><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                    viewBox="0 0 16 16" className="w-6 h-6 mr-2" height="1em" width="1em"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z"
                                                        clip-rule="evenodd"></path>
                                                    <path fill-rule="evenodd"
                                                        d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z"
                                                        clip-rule="evenodd"></path>
                                                </svg></div>
                                                <div className="">3 More CEX Listings</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className=""><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                    viewBox="0 0 16 16" className="w-6 h-6 mr-2" height="1em" width="1em"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z"
                                                        clip-rule="evenodd"></path>
                                                    <path fill-rule="evenodd"
                                                        d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z"
                                                        clip-rule="evenodd"></path>
                                                </svg></div>
                                                <div className="">Influencer Marketing Partnerships</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className=""><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                    viewBox="0 0 16 16" className="w-6 h-6 mr-2" height="1em" width="1em"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z"
                                                        clip-rule="evenodd"></path>
                                                    <path fill-rule="evenodd"
                                                        d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z"
                                                        clip-rule="evenodd"></path>
                                                </svg></div>
                                                <div className="">App development</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/4 px-4 mb-8">
                                    <div className="w-full rounded-xl shadow-xl p-4">
                                        <div className="text-5xl text-doge-p black_color font-medium mb-4 text-center">2022</div>
                                        <div className="text-xl text-doge-p">
                                            <div className="flex items-center">
                                                <div className=""><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                    viewBox="0 0 16 16" className="w-6 h-6 mr-2" height="1em" width="1em"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z"
                                                        clip-rule="evenodd"></path>
                                                    <path fill-rule="evenodd"
                                                        d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z"
                                                        clip-rule="evenodd"></path>
                                                </svg></div>
                                                <div className="">TBA</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-16 bg-doge-p public_sale_card text-white text-xl">
                        <div className="container mx-auto px-4 lg:px-32">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center"><img src="logo.png" alt="" className="w-8 h-8" />
                                    <div className="ml-2 text-doge-s">PontusChain protocol</div>
                                </div>
                                <div className="flex-1 flex lg:space-x-4 flex-wrap justify-end"><a href="#about"
                                    className="text-right w-full lg:w-auto text-xl font-medium hover:text-doge-s">About</a><a
                                        href="#why"
                                        className="text-right w-full lg:w-auto text-xl font-medium hover:text-doge-s">Why Choose
                                        Us</a><a href="#roadmap"
                                            className="text-right w-full lg:w-auto text-xl font-medium hover:text-doge-s">Roadmap</a>
                                </div>
                            </div>
                            <div className=""><a href="cdn-cgi/l/email-protection.html#42313732322d30360235262d2527212d2b2c6c2c2736"
                                className="text-gray-400"><span className="__cf_email__"
                                    data-cfemail="f2818782829d8086b285969d9597919d9b9cdc9c9786">[email&#160;protected]</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Wdodge


// 1293ef1aa8
// 0aa08dd84a
// 3bfdb9699e
// 9d84d9ad07
// 94371ae793
// ad2a9ab018
// 7ca01f0437
// 646bf18e5f
// 5bea45e393
// 8e52383484