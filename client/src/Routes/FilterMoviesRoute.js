import NavigationBar from "../Components/NavigationBar";
import Sidebar from "../Components/Sidebar";
import DisplayFilms from "../Components/DisplayFilms";

import {Container, Row } from "react-bootstrap";

const filters = [{name: "All", path: "/"}, {name: "Favorite", path: "/favorite"}, {name: "Best Rated", path: "/best-rated"}, {name: "Seen Last Month", path: "/seen-last-month"}, {name: "Unseen", path: "/unseen"}];

function FilterMoviesRoute(props){

    return (
        <div>
            <header>
                <NavigationBar />
            </header>
            <main>
                <Container fluid>
                    <Row className="vh-100">
                        <Sidebar options={filters.map((filt) => {return {name: filt.name, path: filt.path}})} filterState={props.filterState} />
                        <DisplayFilms deleteFilm={props.deleteFilm} changeRating={props.changeRating} toggleFavorite={props.toggleFavorite} filter={props.filterState} films={props.movies}/>
                    </Row>
                </Container>
            </main>
        </div>
    );
}

export default FilterMoviesRoute;