import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function View({image, title, description, genres}){
    return (
        <div>
            <img src={image} />
            <h1>{title}</h1>
            <ul>
                {genres.map((genre) => <li>{genre}</li>)}
            </ul>
            <p>{description}</p>
        </div>
    )
}

function Detail(){
    const { id } = useParams();
    const [ detail, setDetail ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const getMovie = async () => {
        const json = await(
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
            ).json();
        setDetail(json.data);
        setLoading(false);
        console.log(detail);
    };

    useEffect(() => {
        getMovie();
    }, []);

    return (
        <div>
            { loading ? <h1> Loading...</h1> : 
            <View 
            image={detail.movie.background_image}
            title={detail.movie.title_long}
            description={detail.movie.description_full}
            genres={detail.movie.genres}
            />}
        </div>
    )
}

export default Detail;