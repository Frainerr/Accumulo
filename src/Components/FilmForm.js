import {Form, Button, Container} from 'react-bootstrap'
import dayjs from 'dayjs';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



function FilmForm(props){
    const [title, setTitle] = useState(props.editableFilm ? props.editableFilm.title : "");
    const [favorite, setFavorite] = useState(props.editableFilm ? props.editableFilm.favorite : false);
    const [date, setDate] = useState(props.editableFilm ? props.editableFilm.date : undefined);
    const [rating, setRating] = useState(props.editableFilm ? props.editableFilm.rating : 0);

    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const newFilm = {title:title, favorite:favorite, date:date, rating:rating}
      
      if(props.editableFilm){
        props.editFilm(newFilm, props.editableFilm.title);
      }else{
        props.addFilm(newFilm);
      }
      navigate("/");
    }
  
    const changeTitle = (title) => {
      setTitle(title);
    }
  
    const changeFavorite = (favorite) => {
      setFavorite(favorite);
    }
  
    const changeDate = (date) => {
      setDate(date);
    }
  
    const changeRating = (rating) => {
      setRating(rating);
    }
  
    return (
      <Container className="p-3">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" required={true} value={title} onChange={event => changeTitle(event.target.value)}/>
          </Form.Group>
    
          <Form.Group className="mb-3">
            <Form.Label>Favorite</Form.Label>
            <Form.Check type="checkbox" label="Mark as favorite" defaultChecked={favorite} onChange={(event) => changeFavorite(event.target.checked)}/>
          </Form.Group>
    
          <Form.Group className="mb-3">
            <Form.Label>Watch date</Form.Label>
            <Form.Control type="date" value={date ? date.format("YYYY-MM-DD") : undefined} onChange={event => changeDate(dayjs(event.target.value))}/>
          </Form.Group>
    
          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Select value={rating} onChange={event => changeRating(parseInt(event.target.value))}>
              <option value="0" disabled>Not defined</option>
              <option value="1">1 star</option>
              <option value="2">2 stars</option>
              <option value="3">3 stars</option>
              <option value="4">4 stars</option>
              <option value="5">5 stars</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit" className="me-3">Submit</Button>
                  
          <Link to="/">
            <Button variant="danger" className="ms-3">Cancel</Button>
          </Link>
        </Form>
      </Container>
    );
  }

  export default FilmForm;