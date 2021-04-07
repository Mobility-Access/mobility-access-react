import acart_img from "../../images/supporters/acart.png";
import phac_img from "../../images/supporters/phac.png";
import ucsb_img from "../../images/supporters/ucsb.png";
import uvic_img from "../../images/supporters/uvic.jpg";

const acart  = {
    name: "acart",
    alt: "Acart logo",
    img: acart_img,
    url: "https://acart.com/"
};

const phac  = {
    name: "phac",
    alt: "Public Health Agency of Canada logo",
    img: phac_img,
    url: "https://www.phac-aspc.gc.ca/"
};

const ucsb = {
    alt: "University of California, Santa Barbara logo",
    name: "ucsb",
    img: ucsb_img,
    url: "https://www.ucsb.edu/"
};

const uvic = {
    alt: "University of Victoria logo",
    name: "uvic",
    img: uvic_img,
    url: "https://www.uvic.ca/"
};

const Supporters = [phac, ucsb, uvic, acart];

export default Supporters;
