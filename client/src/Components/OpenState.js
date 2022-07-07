import { Form, Container, Button, ListGroup, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";

function OpenState(props) {

    const [risposta, setRisposta] = useState("");
    const [counter, setCounter] = useState(props.riddle.duration);
    const [startCounter, setStartCounter] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        
            if (startCounter) {
                counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
                props.updateCounter(props.riddle.id, counter);
                if (props.riddle.counter === 1) {
                    const newRiddle = { user: props.riddle.user, question: props.riddle.question, difficulty: props.riddle.difficulty, duration: props.riddle.duration, solution: props.riddle.solution, advice1: props.riddle.advice1, advice2: props.riddle.advice2, state: 0, winner: 0, counter: props.riddle.duration };
                    props.editRiddle(newRiddle);
                }
            }
        
    }, [startCounter, counter]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (props.answers.filter(answer => answer.user === props.user.id).filter(answer => answer.question === props.riddle.question).length === 1) {
            setMessage("Hai già inserito una risposta");
        }
        else {
            const answer = { user: props.user.id, question: props.riddle.question, answer: risposta };
            props.addAnswer(answer);
            if (risposta.includes(props.riddle.solution)) {
                var addScore = 1;
                if (props.riddle.difficulty === "medio")
                    addScore = 2;
                else if (props.riddle.difficulty === "difficile")
                    addScore = 3;
                props.editScore(addScore, props.user.id);
                const newRiddle = { user: props.riddle.user, question: props.riddle.question, difficulty: props.riddle.difficulty, duration: props.riddle.duration, solution: props.riddle.solution, advice1: props.riddle.advice1, advice2: props.riddle.advice2, state: 0, winner: props.user.id, counter: props.riddle.duration };
                props.editRiddle(newRiddle);
            } else {
                if (props.riddle.duration === props.riddle.counter) {
                    
                    setStartCounter(true);
                   
                }
            }
        }
    }


    return (
        <Container className="p-3">
            {message ? <Alert variant='danger' onClose={() => setMessage('')} dismissible>{message}</Alert> : false}
            <h2>Indovinello</h2>
            <ListGroup>
                <ListGroup.Item>{props.riddle.question} {props.answers.filter(answer => answer.question === props.riddle.question).filter(answer => answer.user === props.user.id).user}</ListGroup.Item>
            </ListGroup>
            {props.riddle.user !== props.user.id ?
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label><br></br>Risposta</Form.Label>
                        <Form.Control type="text" required={true} value={risposta} onChange={event => setRisposta(event.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="me-3">Conferma</Button>
                </Form>
                :
                <ListGroup>

                    <h2> Risposte </h2>
                    {props.answers.filter(answer => answer.question === props.riddle.question).map(answer => {
                        return (
                            <ListGroup.Item>
                                {answer.answer}
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            }
            {props.riddle.counter !== props.riddle.duration ? <p>Tempo rimasto: {props.riddle.counter}</p> : <p></p>}
            <br></br>
            {props.riddle.counter <= (props.riddle.duration / 2) ? <ListGroup>Suggerimento1:
                <ListGroup.Item> {props.riddle.advice1}</ListGroup.Item>
            </ListGroup> : <p></p>}
            <br></br>
            {props.riddle.counter <= (props.riddle.duration / 4) ? <listGroup>Suggerimento2:
                <ListGroup.Item>{props.riddle.advice2}</ListGroup.Item>
            </listGroup> : <p></p>}

        </Container>
    )

}

export default OpenState;