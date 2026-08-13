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


export const scenes = [
  {
    id: "backseat",
    title: "बैकसीट रेडियो",
    location: "दिल्ली",
    description: "लंबा दिन था?",
    desktopImage: backseatDesktop,
    mobileImage: backseatMobile,
    accent: "#D89B63",

    playlist: {
      provider: "youtube",
      playlistId:
        "PLeatb7hupNV_AWUl_7ttbsKeCQh8tF5N4",
    },
  },

  {
    id: "last-train",
    title: "आख़िरी ट्रेन",
    location: "प्लेटफ़ॉर्म ४",
    description: "आज की आख़िरी सवारी।",
    desktopImage: lastTrainDesktop,
    mobileImage: lastTrainMobile,
    accent: "#C6A56B",

    playlist: {
      provider: "youtube",
      playlistId:
        "OLAK5uy_kjlEqEEYEY6_yRfbCKF34GwPmjOaHzbOw",
    },
  },

  {
    id: "rainy-auto",
    title: "बारिश वाला ऑटो",
    location: "कहीं एनसीआर में",
    description: "बारिश को अपना काम करने दो।",
    desktopImage: rainyAutoDesktop,
    mobileImage: rainyAutoMobile,
    accent: "#B9C7A4",

    playlist: {
      provider: "youtube",
      playlistId:
        "OLAK5uy_n-GQb1476QnhCAOQuJTL7vxu0aoZZoZu4",
    },
  },

  {
    id: "chai",
    title: "सुबह ६:४३ की चाय",
    location: "शहर जाग रहा है",
    description: "शोर शुरू होने से पहले।",
    desktopImage: chaiDesktop,
    mobileImage: chaiMobile,
    accent: "#D6A85F",

    playlist: {
      provider: "youtube",
      playlistId:
        "PL7KYHPKrfi5wJtnGJaIK3RvCOwDlB8C6X",
    },
  },

  {
    id: "truck",
    title: "ट्रक ड्राइवर रेडियो",
    location: "एनएच ४४",
    description: "रास्ते लंबे हैं। रातें उससे भी लंबी।",
    desktopImage: truckDesktop,
    mobileImage: truckMobile,
    accent: "#D58B4A",

    playlist: {
      provider: "youtube",
      playlistId:
        "PLeatb7hupNV_AWUl_7ttbsKeCQh8tF5N4",
    },

    quotes: [
      "हॉर्न ओके प्लीज़",
      "बुरी नज़र वाले तेरा मुँह काला",
      "मालिक की गाड़ी, ड्राइवर का पसीना",
      "धीरे चल प्यारे, ज़िंदगी अनमोल है",
      "लटक मत बेटा, पटक देगा",
      "दम है तो क्रॉस कर, नहीं तो बर्दाश्त कर",
    ],
  },

  {
    id: "salon",
    title: "सैलून २००७",
    location: "किसी मोहल्ले में",
    description: "आपका नंबर अगला है।",
    desktopImage: salonDesktop,
    mobileImage: salonMobile,
    accent: "#B57B63",

    playlist: {
      provider: "youtube",
      playlistId:
        "PLq-bT4s33RYADNkcClDkLPovaKJx0HTDM",
    },
  },

  {
    id: "room-207",
    title: "कमरा २०७",
    location: "चेक-इन",
    description: "किसी को पता नहीं तुम यहाँ हो।",
    desktopImage: room207Desktop,
    mobileImage: room207Mobile,
    accent: "#C69B6B",

    playlist: {
      provider: "youtube",
      playlistId:
        "RDCLAK5uy_kWKAcJROkxDk9mOVmfDSv9cycK_-Ci2yA",
    },
  },

  {
    id: "two-seventeen",
    title: "रात २:१७",
    location: "अभी भी जाग रहे हो",
    description: "सो जाना चाहिए था।",
    desktopImage: twoSeventeenDesktop,
    mobileImage: twoSeventeenMobile,
    accent: "#8A9DB5",

    playlist: {
      provider: "youtube",
      playlistId:
        "PLjlt1WnHboa6pohWVH3UJRMU2qrSD6MwX",
    },
  },

  {
    id: "last-delivery",
    title: "आख़िरी डिलीवरी",
    location: "सेक्टर १८",
    description: "बस एक और। फिर घर।",
    desktopImage: lastDeliveryDesktop,
    mobileImage: lastDeliveryMobile,
    accent: "#C47D54",

    playlist: {
      provider: "youtube",
      playlistId:
        "RDCLAK5uy_mxqgyPRK9n6mflkAhpQAXpebl2Y9E4atM",
    },
  },

  {
    id: "somewhere-else",
    title: "कहीं और",
    location: "अज्ञात",
    description: "तुम्हें यह जगह नहीं मिलनी चाहिए थी।",
    desktopImage: somewhereElseDesktop,
    mobileImage: somewhereElseMobile,
    accent: "#A66A69",

    playlist: {
      provider: "youtube",
      playlistId:
        "OLAK5uy_nkHY6d0_mX01SIifTVliGsIjdVWGcX6Pw",
    },
  },
];