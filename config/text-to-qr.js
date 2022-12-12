apiDomain + "/qr/custom?download=true&file=" + e + "&data=" + encodeURIComponent(r.getTypeData(r.tempQrcode.type)) + "&size=" + r.tempQrcode.size + "&config=" + encodeURIComponent(JSON.stringify(r.tempQrcode.config))
   
 method: "post",
    url: apiDomain + "/qr/transparent",
    data: {
        data: r.getTypeData(r.qrcode.type),
        image: r.qrcode.image,
        x: r.qrcode.x,
        y: r.qrcode.y,
        size: r.qrcode.size,
        download: "imageUrl",
        file: "jpg",
        crop: r.qrcode.crop
    }
}).then(function(e) {
    r.qrcodePreview = e.data.imageUrl + "?" + (new Date).getTime(), r.isLoading = !1
}



 this.getDefaultFrameRotation = function(e) {
        var t = {};
        switch (e) {
            case "frame1":
                t.erf1 = ["fh"], t.erf2 = [], t.erf3 = ["fh", "fv"];
                break;
            case "frame2":
                t.erf1 = ["fv"], t.erf2 = [], t.erf3 = [];
                break;
            case "frame3":
                t.erf1 = ["fv"], t.erf2 = ["fv", "fh"], t.erf3 = [];
                break;
            case "frame5":
                t.erf1 = ["fh"], t.erf2 = [], t.erf3 = ["fh", "fv"];
                break;
            case "frame6":
                t.erf1 = ["fv"], t.erf2 = [], t.erf3 = [];
                break;
            case "frame8":
                t.erf1 = ["fv"], t.erf2 = ["fh", "fv"], t.erf3 = [];
                break;
            case "frame14":
            case "frame16":
                t.erf1 = [], t.erf2 = ["fh"], t.erf3 = ["fv"];
                break;
            case "frame0":
            case "frame4":
            case "frame7":
            case "frame9":
            case "frame10":
            case "frame11":
            case "frame12":
            case "frame13":
                t.erf1 = [], t.erf2 = [], t.erf3 = []
        }
        return t
    }, this.getDefaultBallRotation = function(e) {
        var t = {};
        switch (e) {
            case "ball1":
                t.brf1 = ["fh"], t.brf2 = [], t.brf3 = ["fh", "fv"];
                break;
            case "ball2":
                t.brf1 = ["fv"], t.brf2 = [], t.brf3 = [];
                break;
            case "ball3":
                t.brf1 = ["fv"], t.brf2 = ["fv", "fh"], t.brf3 = [];
                break;
            case "ball6":
            case "ball8":
                t.brf1 = ["fv"], t.brf2 = [], t.brf3 = [];
                break;
            case "ball11":
                t.brf1 = ["fh"], t.brf2 = [], t.brf3 = ["fh", "fv"];
                break;
            case "ball16":
            case "ball17":
            case "ball19":
                t.brf1 = [], t.brf2 = ["fh"], t.brf3 = ["fv"];
                break;
            case "ball0":
            case "ball4":
            case "ball5":
            case "ball7":
            case "ball9":
            case "ball10":
            case "ball12":
            case "ball13":
            case "ball14":
            case "ball15":
            case "ball18":
                t.brf1 = [], t.brf2 = [], t.brf3 = []
        }
        return t
    }, this
})



            case "url":
                return "fa-globe";
            case "text":
                return "fa-file-text";
            case "email":
                return "fa-envelope";
            case "phone":
                return "fa-phone";
            case "sms":
                return "fa-commenting";
            case "vcard":
                return "fa-address-card";
            case "mecard":
                return "fa-address-book";
            case "maps":
                return "fa-map-marker";
            case "facebook":
                return "fa-facebook-official";
            case "twitter":
                return "fa-twitter";
            case "youtube":
                return "fa-youtube";
            case "wifi":
                return "fa-wifi";
            case "event":
                return "fa-calendar";
            case "banking":
                return "fa-credit-card";
            default:
                return "fa-globe"




{
    "data": "https://maps.google.com/local?q=56.33870104587186,28.68800599609375",
    "config": {
        "body": "square",
        "eye": "frame3",
        "eyeBall": "ball0",
        "erf1": [
            "fv"
        ],
        "erf2": [
            "fv",
            "fh"
        ],
        "erf3": [],
        "brf1": [],
        "brf2": [],
        "brf3": [],
        "bodyColor": "#000000",
        "bgColor": "#FFFFFF",
        "eye1Color": "#000000",
        "eye2Color": "#000000",
        "eye3Color": "#000000",
        "eyeBall1Color": "#000000",
        "eyeBall2Color": "#000000",
        "eyeBall3Color": "#000000",
        "gradientColor1": "",
        "gradientColor2": "",
        "gradientType": "linear",
        "gradientOnEyes": "true",
        "logo": "#vimeo-circle",
        "logoMode": "default"
    },
    "size": 1150,
    "download": "imageUrl",
    "file": "svg"
}




data: "tel:1234455"
data: "SMSTO:1233:hr;;o"
data: "MECARD:N:Singh,Bharat;NICKNAME:Singh;TEL:01234567891;EMAIL:jhondoe@gmail.com;BDAY:1212121;NOTE:2121;ADR:,,2121,2121,2121,2121,212;;"












[{
        name: "Classic",
        thumb: "classic.svg",
        config: {
            body: "square",
            eye: "frame0",
            eyeBall: "ball0",
            erf1: [],
            erf2: [],
            erf3: [],
            brf1: [],
            brf2: [],
            brf3: [],
            bodyColor: "#000000",
            bgColor: "#FFFFFF",
            eye1Color: "#000000",
            eye2Color: "#000000",
            eye3Color: "#000000",
            eyeBall1Color: "#000000",
            eyeBall2Color: "#000000",
            eyeBall3Color: "#000000",
            gradientColor1: null,
            gradientColor2: null,
            gradientType: "linear",
            gradientOnEyes: !0,
            logo: ""
        }
    }, {
        name: "Easy",
        thumb: "easy.svg",
        config: {
            body: "circular",
            eye: "frame13",
            eyeBall: "ball15",
            erf1: [],
            erf2: [],
            erf3: [],
            brf1: [],
            brf2: [],
            brf3: [],
            bodyColor: "#113151",
            bgColor: "#FFFFFF",
            eye1Color: "#000000",
            eye2Color: "#000000",
            eye3Color: "#000000",
            eyeBall1Color: "#000000",
            eyeBall2Color: "#000000",
            eyeBall3Color: "#000000",
            gradientColor1: null,
            gradientColor2: null,
            gradientType: "linear",
            gradientOnEyes: !0,
            logo: ""
        }
    }, {
        name: "Facebook",
        thumb: "facebook.svg",
        config: {
            body: "pointed-smooth",
            eye: "frame2",
            eyeBall: "ball2",
            erf1: ["fv"],
            erf2: [],
            erf3: [],
            brf1: ["fv"],
            brf2: [],
            brf3: [],
            bodyColor: "#3b5998",
            bgColor: "#FFFFFF",
            eye1Color: "#3B5998",
            eye2Color: "#3b5998",
            eye3Color: "#3b5998",
            eyeBall1Color: "#3b5998",
            eyeBall2Color: "#3b5998",
            eyeBall3Color: "#3b5998",
            gradientColor1: "#2C4270",
            gradientColor2: "#476CB9",
            gradientType: "linear",
            gradientOnEyes: !1,
            logo: "#facebook"
        }
    }, {
        name: "Twitter",
        thumb: "twitter.svg",
        config: {
            body: "circular",
            eye: "frame5",
            eyeBall: "ball11",
            erf1: ["fh"],
            erf2: [],
            erf3: ["fh", "fv"],
            brf1: ["fh"],
            brf2: [],
            brf3: ["fh", "fv"],
            bodyColor: "#55ACEE",
            bgColor: "#FFFFFF",
            eye1Color: "#55acee",
            eye2Color: "#55acee",
            eye3Color: "#55acee",
            eyeBall1Color: "#55ACEE",
            eyeBall2Color: "#55acee",
            eyeBall3Color: "#55acee",
            gradientColor1: null,
            gradientColor2: null,
            gradientType: "radial",
            gradientOnEyes: !1,
            logo: "#twitter-circle"
        }
    }, {
        name: "Youtube",
        thumb: "youtube.svg",
        config: {
            body: "circle",
            eye: "frame13",
            eyeBall: "ball14",
            erf1: [],
            erf2: [],
            erf3: [],
            brf1: [],
            brf2: [],
            brf3: [],
            bodyColor: "#EE0F0F",
            bgColor: "#FFFFFF",
            eye1Color: "#BF2626",
            eye2Color: "#BF2626",
            eye3Color: "#BF2626",
            eyeBall1Color: "#EE0F0F",
            eyeBall2Color: "#EE0F0F",
            eyeBall3Color: "#EE0F0F",
            gradientColor1: null,
            gradientColor2: null,
            gradientType: "linear",
            gradientOnEyes: !1,
            logo: "#youtube"
        }
    }, {
        name: "Monkey",
        thumb: "monkey.svg",
        config: {
            body: "mosaic",
            eye: "frame13",
            eyeBall: "ball15",
            erf1: [],
            erf2: [],
            erf3: [],
            brf1: [],
            brf2: [],
            brf3: [],
            bodyColor: "#0277BD",
            bgColor: "#FFFFFF",
            eye1Color: "#303236",
            eye2Color: "#303236",
            eye3Color: "#303236",
            eyeBall1Color: "#303236",
            eyeBall2Color: "#303236",
            eyeBall3Color: "#303236",
            gradientColor1: "#0277BD",
            gradientColor2: "309195",
            gradientType: "linear",
            gradientOnEyes: !0,
            logo: "#qrcodemonkey"
        }
    }, {
        name: "Rain",
        thumb: "rain.svg",
        config: {
            body: "circle-zebra-vertical",
            eye: "frame13",
            eyeBall: "ball15",
            erf1: [],
            erf2: [],
            erf3: [],
            brf1: [],
            brf2: [],
            brf3: [],
            bodyColor: "#0277BD",
            bgColor: "#FFFFFF",
            eye1Color: "#075685",
            eye2Color: "#075685",
            eye3Color: "#075685",
            eyeBall1Color: "#0277BD",
            eyeBall2Color: "#0277BD",
            eyeBall3Color: "#0277BD",
            gradientColor1: "#075685",
            gradientColor2: "#0277BD",
            gradientType: "linear",
            gradientOnEyes: !1,
            logo: ""
        }
    }, {
        name: "Jungle",
        thumb: "jungle.svg",
        config: {
            body: "rounded-pointed",
            eye: "frame14",
            eyeBall: "ball16",
            erf1: [],
            erf2: ["fh"],
            erf3: ["fv"],
            brf1: [],
            brf2: ["fh"],
            brf3: ["fv"],
            bodyColor: "#5C8B29",
            bgColor: "#FFFFFF",
            eye1Color: "#3F6B2B",
            eye2Color: "#3F6B2B",
            eye3Color: "#3F6B2B",
            eyeBall1Color: "#60A541",
            eyeBall2Color: "#60A541",
            eyeBall3Color: "#60A541",
            gradientColor1: "#5C8B29",
            gradientColor2: "#25492F",
            gradientType: "radial",
            gradientOnEyes: !1,
            logo: ""
        }
    }, {
        name: "Mosaic",
        thumb: "mosaic.svg",
        config: {
            body: "mosaic",
            eye: "frame16",
            eyeBall: "ball8",
            erf1: [],
            erf2: [],
            erf3: [],
            brf1: ["fv"],
            brf2: [],
            brf3: [],
            bodyColor: "#000000",
            bgColor: "#FFFFFF",
            eye1Color: "#000000",
            eye2Color: "#000000",
            eye3Color: "#000000",
            eyeBall1Color: "#000000",
            eyeBall2Color: "#000000",
            eyeBall3Color: "#000000",
            gradientColor1: "#A13535",
            gradientColor2: "#0277bd",
            gradientType: "linear",
            gradientOnEyes: "true",
            logo: ""
        }
    }, {
        name: "Dot",
        thumb: "dot.svg",
        config: {
            body: "dot",
            eye: "frame0",
            eyeBall: "ball14",
            erf1: [],
            erf2: [],
            erf3: [],
            brf1: [],
            brf2: [],
            brf3: [],
            bodyColor: "#0277bd",
            bgColor: "#FFFFFF",
            eye1Color: "#0277bd",
            eye2Color: "#0277bd",
            eye3Color: "#0277bd",
            eyeBall1Color: "#0277bd",
            eyeBall2Color: "#0277bd",
            eyeBall3Color: "#0277bd",
            gradientColor1: null,
            gradientColor2: null,
            gradientType: "linear",
            gradientOnEyes: !0,
            logo: ""
        }
    }, {
        name: "Coffee",
        thumb: "coffee.svg",
        config: {
            body: "mosaic",
            eye: "frame8",
            eyeBall: "ball19",
            erf1: ["fv"],
            erf2: [],
            erf3: [],
            bodyColor: "#0F8EAA",
            bgColor: "#FAEDE7",
            eye1Color: "#303236",
            eye2Color: "#303236",
            eye3Color: "#303236",
            eyeBall1Color: "#303236",
            eyeBall2Color: "#303236",
            eyeBall3Color: "#303236",
            gradientColor1: "#754D32",
            gradientColor2: "#57503B",
            gradientType: "linear",
            gradientOnEyes: !0,
            logo: ""
        }
    }, {
        name: "Ninja",
        thumb: "ninja.svg",
        config: {
            body: "japnese",
            eye: "frame12",
            eyeBall: "ball14",
            erf1: [],
            erf2: [],
            erf3: [],
            brf1: [],
            brf2: [],
            brf3: [],
            bodyColor: "#0F8EAA",
            bgColor: "#FFFFFF",
            eye1Color: "#303236",
            eye2Color: "#303236",
            eye3Color: "#303236",
            eyeBall1Color: "#303236",
            eyeBall2Color: "#303236",
            eyeBall3Color: "#303236",
            gradientColor1: "#BD1D2B",
            gradientColor2: "#96207E",
            gradientType: "linear",
            gradientOnEyes: !1,
            logo: ""
        }
    }, {
        name: "Bitcoin",
        thumb: "bitcoin.svg",
        config: {
            body: "circle",
            eye: "frame1",
            eyeBall: "ball1",
            erf1: ["fh"],
            erf2: [],
            erf3: ["fh", "fv"],
            brf1: ["fh"],
            brf2: [],
            brf3: ["fh", "fv"],
            bodyColor: "#4D4D4D",
            bgColor: "#FFFFFF",
            eye1Color: "#4D4D4D",
            eye2Color: "#4D4D4D",
            eye3Color: "#4D4D4D",
            eyeBall1Color: "#F38E14",
            eyeBall2Color: "#F38E14",
            eyeBall3Color: "#F38E14",
            gradientColor1: "",
            gradientColor2: "",
            gradientType: "linear",
            gradientOnEyes: !1,
            logo: "#bitcoin"
        }
    }]