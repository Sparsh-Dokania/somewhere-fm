// src/data/scenes.jsx

import backseatDesktop from "../assets/images/desktop/backseat.png";
import backseatMobile from "../assets/images/mobile/backseat.png";

import lastTrainDesktop from "../assets/images/desktop/last-train.png";
import lastTrainMobile from "../assets/images/mobile/last-train.png";

import rainyAutoDesktop from "../assets/images/desktop/rainy-auto.png";
import rainyAutoMobile from "../assets/images/mobile/rainy-auto.png";

import chaiDesktop from "../assets/images/desktop/chai.png";
import chaiMobile from "../assets/images/mobile/chai.png";

import truckDesktop from "../assets/images/desktop/truck.png";
import truckMobile from "../assets/images/mobile/truck.png";

import salonDesktop from "../assets/images/desktop/salon.png";
import salonMobile from "../assets/images/mobile/salon.png";

import room207Desktop from "../assets/images/desktop/room-207.png";
import room207Mobile from "../assets/images/mobile/room-207.png";

import twoSeventeenDesktop from "../assets/images/desktop/2-17.png";
import twoSeventeenMobile from "../assets/images/mobile/2-17.png";

import lastDeliveryDesktop from "../assets/images/desktop/last-delivery.png";
import lastDeliveryMobile from "../assets/images/mobile/last-delivery.png";

import somewhereElseDesktop from "../assets/images/desktop/somewhere-else.png";
import somewhereElseMobile from "../assets/images/mobile/somewhere-else.png";


const defaultTracks = [
  {
    title: "Something About Tonight",
    artist: "SOMEWHERE.FM",
    duration: 248,
  },
  {
    title: "City Lights",
    artist: "SOMEWHERE.FM",
    duration: 221,
  },
  {
    title: "After Midnight",
    artist: "SOMEWHERE.FM",
    duration: 267,
  },
];


export const scenes = [
  {
    id: "backseat",
    title: "Backseat Radio",
    time: "11:47 PM",
    location: "Delhi",
    description: "Long day?",
    desktopImage: backseatDesktop,
    mobileImage: backseatMobile,
    accent: "#D89B63",
    playlist: defaultTracks,
  },

  {
    id: "last-train",
    title: "Last Train",
    time: "12:18 AM",
    location: "Platform 4",
    description: "Last one home.",
    desktopImage: lastTrainDesktop,
    mobileImage: lastTrainMobile,
    accent: "#C6A56B",
    playlist: defaultTracks,
  },

  {
    id: "rainy-auto",
    title: "Rainy Auto",
    time: "08:32 PM",
    location: "Somewhere in NCR",
    description: "Let it rain.",
    desktopImage: rainyAutoDesktop,
    mobileImage: rainyAutoMobile,
    accent: "#B9C7A4",
    playlist: defaultTracks,
  },

  {
    id: "chai",
    title: "6:43 AM Chai",
    time: "06:43 AM",
    location: "The city waking up",
    description: "Before the noise.",
    desktopImage: chaiDesktop,
    mobileImage: chaiMobile,
    accent: "#D6A85F",
    playlist: defaultTracks,
  },

  {
    id: "truck",
    title: "Truck Driver Radio",
    time: "02:04 AM",
    location: "NH 44",
    description: "Horn OK Please.",
    desktopImage: truckDesktop,
    mobileImage: truckMobile,
    accent: "#D58B4A",
    playlist: defaultTracks,
  },

  {
    id: "salon",
    title: "Salon 2007",
    time: "05:16 PM",
    location: "Some neighbourhood",
    description: "Your turn next.",
    desktopImage: salonDesktop,
    mobileImage: salonMobile,
    accent: "#B57B63",
    playlist: defaultTracks,
  },

  {
    id: "room-207",
    title: "Room 207",
    time: "11:06 PM",
    location: "Check-in",
    description: "Nobody knows you're here.",
    desktopImage: room207Desktop,
    mobileImage: room207Mobile,
    accent: "#C69B6B",
    playlist: defaultTracks,
  },

  {
    id: "two-seventeen",
    title: "2:17 AM",
    time: "02:17 AM",
    location: "Still awake",
    description: "You should probably sleep.",
    desktopImage: twoSeventeenDesktop,
    mobileImage: twoSeventeenMobile,
    accent: "#8A9DB5",
    playlist: defaultTracks,
  },

  {
    id: "last-delivery",
    title: "Last Delivery",
    time: "11:32 PM",
    location: "Sector 18",
    description: "One more and we're done.",
    desktopImage: lastDeliveryDesktop,
    mobileImage: lastDeliveryMobile,
    accent: "#C47D54",
    playlist: defaultTracks,
  },

  {
    id: "somewhere-else",
    title: "Somewhere Else",
    time: "03:03 AM",
    location: "Unknown",
    description: "You weren't supposed to find this.",
    desktopImage: somewhereElseDesktop,
    mobileImage: somewhereElseMobile,
    accent: "#A66A69",
    playlist: defaultTracks,
  },
];