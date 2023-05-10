import React from 'react'
import loader from '../../Img/preloader.gif'
import './PreLoader.css'
function PreLoader() {
    window.onload = () => {
        document.getElementById("preloader").setAttribute("style", "display:none");
    }
    return (
        <div className="PreLoader" id='preloader'>
            <img src={loader} alt="Preloader" />
        </div>
    )
}

export default PreLoader