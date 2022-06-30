import {Col, Button} from 'react-bootstrap'
import FilmsTable from './FilmsTable';

import { Link } from 'react-router-dom';

function DisplayFilms(props){
  /*
  const [showForm, setShowForm] = useState(false);

  const [editableFilm, setEditableFilm] = useState();

  const handleShowForm = (show) => {
    setShowForm(show);
  }

  const selectEditableFilm = (film) => {
    setEditableFilm(film);
  }
*/

  return(
    <Col className="md-9 sm-12 p-3">
      <label className="h1">{props.filter}</label>
      <FilmsTable deleteFilm={props.deleteFilm} changeRating={props.changeRating} toggleFavorite={props.toggleFavorite} films={props.films}/>
      <Link to="/add-movie">
        <Button className="btn btn-lg btn-primary fixed-right-bottom">&#43;</Button>
      </Link>
    </Col>
  );
}

export default DisplayFilms;