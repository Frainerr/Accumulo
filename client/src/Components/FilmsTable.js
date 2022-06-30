import {Table, Form, Button} from 'react-bootstrap'
import {useState} from 'react'

import { Link } from 'react-router-dom';



function FilmsTable(props){
    return(
      <Table>
        <tbody>
          {
            props.films.map(film => {return (
              <FilmsRow key={film.title} deleteFilm={props.deleteFilm} changeRating={props.changeRating} toggleFavorite={props.toggleFavorite} film={film}/>
            )})
          }
        </tbody>
      </Table>
    );
  }
  
  function FilmsRow(props){
    return(
      <tr>
        <FilmTitle key={props.film.title} film={props.film}/>
        <FilmFavorite key={props.film.favorite} toggleFavorite={props.toggleFavorite} film={props.film}/>
        <FilmDate key={props.film.date} film={props.film}/>
        <FilmRating key={props.film.rating} film={props.film} changeRating={props.changeRating}/>
        <FilmDelete film={props.film} deleteFilm={props.deleteFilm}/>
        <FilmEdit film={props.film}/>
      </tr>
    );
  }
  
  function FilmTitle(props){
    return(
      <td>
        {
          props.film.favorite ? <p className="favorite">{props.film.title}</p> : <p>{props.film.title}</p>
        }
      </td>
    );
  }
  
  function FilmFavorite(props){
    return(
      <td>
        <Form>
          <Form.Check type="checkbox" label="Favorite" defaultChecked={props.film.favorite} onChange={() => props.toggleFavorite(props.film.title)}/>
        </Form>
      </td>
    );
  }
  
  function FilmDate(props){
    return(
      <td>
        {props.film.date ? props.film.date.format('MMMM DD, YYYY') : "unseen"}
      </td>
    );
  }
  
  function FilmRating(props){
    const [hoverRating, setHoverRating] = useState(props.film.rating ? props.film.rating : 0);
  
    return(
      <td>
        {
          [...Array(5)].map((star, index) => {
            if(index < hoverRating){
              return (
                <button className="btn-rating" onClick={() => props.changeRating(props.film.title, index + 1)} onMouseEnter={() => setHoverRating(index + 1)} onMouseLeave={() => setHoverRating(props.film.rating)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                  </svg>
                </button>
              )
            }
            return (
              <button className="btn-rating" onClick={() => props.changeRating(props.film.title, index + 1)} onMouseEnter={() => setHoverRating(index + 1)} onMouseLeave={() => setHoverRating(props.film.rating)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                </svg>
              </button>
            )
          })
        }
      </td>
    );
  }
  
  function FilmDelete(props){
    return (
      <td>
        <Button className="btn btn-sm btn-danger" onClick={() => props.deleteFilm(props.film.title)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </Button>
      </td>
    );
  }
  
  function FilmEdit(props){
    const editableFilm = {...props.film};
    editableFilm.date = editableFilm.date ? editableFilm.date.format("DD-MM-YYYY") : undefined;

    return (
      <td>
        <Link to="/edit-movie" state={editableFilm}>
          <Button className="btn btn-sm btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
            </svg>
          </Button>
        </Link>
      </td>
    );
  }

  export default FilmsTable;