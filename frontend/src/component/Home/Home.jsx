import React, { useEffect } from 'react'
import "./Home.css"
import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux"
import Loader from '../layout/Loader/Loader';
import { useAlert } from "react-alert"
import shopvector from "../../images/shopvector.png"
import shopbackg from "../../images/shopbackg.jpg"
import { Link } from 'react-router-dom';



//only for testing purpose
// const product = {
//     name: "tshirt",
//     images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
//     price: "3999",
//     _id: "abhay",
// };


const Home = () => {

    const alert = useAlert()
    const dispatch = useDispatch();









    return (
        <>
            <>
                <MetaData title="Ecommerce" />

                <div className="container">
                   
                    <div className="row align-items-center my-5 bg-primary text-white py-5" style={{borderRadius:"20px"}}>
                        <div className="col-md-6 text-center text-md-start">
                            <h1 className="display-4 fw-bold">Welcome to Our Website</h1>
                            <p className="lead">Discover amazing content and explore our services.</p>
                            {/* <button className="btn btn-light btn-lg">Get Started</button> */}
                        </div>
                        <div className="col-md-6 text-center">
                            <img
                                src="https://source.unsplash.com/500x300/?nature,water"
                                alt="Hero"
                                className="img-fluid rounded"
                            />
                        </div>
                    </div>

                  
                </div>
            </>
        </>

    )
}

export default Home