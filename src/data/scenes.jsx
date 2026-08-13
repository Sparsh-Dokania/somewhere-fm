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
    id: "taxi-radio",
    title: "टैक्सी रेडियो",
    location: "दिल्ली",
    description: "शहर के बीचों-बीच, कुछ गाने आपके नाम।",

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
    id: "safarnama",
    title: "सफ़रनामा",
    location: "रास्ते में कहीं",
    description: "मंज़िल से ज़्यादा रास्ता याद रहता है।",

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
    id: "baarish-safar",
    title: "बारिश में सफ़र",
    location: "कहीं एनसीआर में",
    description: "बारिश हो, रास्ता हो और कुछ अच्छे गाने।",

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
    id: "chai-ki-tapri",
    title: "चाय की टपरी",
    location: "सुबह ६:४३",
    description: "शहर जागने से पहले की वो पहली चाय।",

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
    id: "truck-driver-radio",
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
    id: "deluxe-salon",
    title: "डीलक्स सैलून",
    location: "किसी पुराने मोहल्ले में",
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
    id: "mai-wo-aur-yeh-gaane",
    title: "मैं, वो और ये गाने",
    location: "कहीं यादों में",
    description: "कुछ गाने लोगों से ज़्यादा याद रहते हैं।",

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
    id: "akeli-raat",
    title: "अकेली रात",
    location: "२:०० AM",
    description: "2 AM special playlist",

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
    id: "zindagi",
    title: "ज़िंदगी",
    location: "चलते-चलते",
    description: "कभी-कभी बस चलते रहना होता है।",

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
    id: "khayalon-mein",
    title: "ख़यालों में",
    location: "कहीं और",
    description: "जहाँ ख़याल आपको ले जाएँ।",

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