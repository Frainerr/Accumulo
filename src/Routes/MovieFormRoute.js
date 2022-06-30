import NavigationBar from "../Components/NavigationBar";
import FilmForm from "../Components/FilmForm";
import dayjs from "dayjs";


import { useLocation } from "react-router-dom";


function MovieFormRoute(props){
    const location = useLocation();

    const film = location.state ? location.state : undefined;
    
    if(film){
        film.date = film.date ? dayjs(film.date) : undefined;
    }

    return (
        <div>
            <header>
                <NavigationBar />
            </header>
            <main>
                <label className="h1">{props.label}</label>
                <FilmForm addFilm={props.addFilm} editFilm={props.editFilm} editableFilm={film}/>
            </main>
        </div>
    );
}

export default MovieFormRoute;