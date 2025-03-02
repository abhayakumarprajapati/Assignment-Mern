import React from 'react';
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";

import "./Footer.css"

const Footer = () => {
    return (
        <footer id='footer'>
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt="" />
                <img src={appStore} alt="" />

            </div>
            <div className="midFooter">
                <h1>Sample Website</h1>
                <p>Copyrights 2023 &copy; company</p>

            </div>
            <div className="rightFooter">
                <a href="">Instagram</a>
                <a href="">Youtube</a>
                <a href="">Facebook</a>

            </div>


        </footer>
    )
}

export default Footer