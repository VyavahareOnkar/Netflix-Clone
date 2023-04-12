import React, { useState, useEffect } from 'react'
import "../App.scss"
import axios from "axios"
import { Link } from 'react-router-dom';
import banner from "../banner.jpg"
import{BiPlay} from "react-icons/bi";
import{AiOutlinePlus} from "react-icons/ai";
const apiKey = "d784426d7ac8027bda0a0b5ca52de33d";
const url = "https://api.themoviedb.org/3";
const upcoming = "upcoming";
const imgUrl = "https://image.tmdb.org/t/p/original";
const nowPlaying = "now_playing";
const rated = "top_rated";
const Card = ({ img }) => {
    return (
        <div >
            <img className="card" src={img} alt="cardcover" />

        </div>
    )
}

const Row = ({ title, arr = [] }) => {
    return (

        <div className='row'>
            <h2>{title}</h2>
            <div>
                {
                    arr.map((item, index) => (
                        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
                    ))
                }

            </div>

        </div>
    )
}
const Home = () => {

    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [nows, setNow] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [populars, setPopular] = useState([]);
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        const upcomingData = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
            // console.log(results);
            setUpcomingMovies(results);
        }
        upcomingData();


        const nowPlay = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
            // console.log(results);
            setNow(results);
        }
        nowPlay();


        const rating = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${rated}?api_key=${apiKey}`);
            // console.log(results);
            setTopRated(results);
        }
        rating();

        const popular = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/popular?api_key=${apiKey}`);
            // console.log(results);
            setPopular(results);
        }
        popular();

        const genres = async () => {
            const { data: { genres } } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
            // console.log(results);
            setGenre(genres);
        }
        genres();

    }, [])



    return (
        <section className='home'>

            <div className="banner" style={{
                backgroundImage: `url(${banner})`
            }}>
                {
                    populars[0] && <h1>{populars[0].original_title}</h1>
                }
                {
                    populars[0] && <p>{populars[0].overview}</p>
                }
                <div>
                <button> <BiPlay/> Play </button>
                <button>My List <AiOutlinePlus/> </button>
                </div>
               
            </div >

            <Row title={"Upcomings"} arr={upcomingMovies} />
            <Row title={"Now Playing"} arr={nows} />
            <Row title={"Top Rated"} arr={topRated} />
            <Row title={"Popular"} arr={populars} />


            <div className="genreSection">
                {
                    genre.map((item) => (
                        <Link key={item.id} to={`/genre/${item.id}`} >{item.name}</Link>
                    ))
                }
            </div>
        </section >
    )
}

export default Home




