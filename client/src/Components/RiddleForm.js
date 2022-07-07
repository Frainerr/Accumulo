import { Button, Alert, Form, Container, Row, Col} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';



function RiddleForm(props) {

    const [question, setQuestion] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [duration, setDuration] = useState();
    const [solution, setSolution] = useState('');
    const [advice1, setAdvice1] = useState('');
    const [advice2, setAdvice2] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {

        event.preventDefault();
        if(!difficulty){
            setErrorMsg('Inserire la difficoltà')
        }
        else if(!Number.isInteger(duration)){
            setErrorMsg('La durata deve essere un numero intero')
        }
        else if(props.riddles.filter(riddle => riddle.question.includes(question) || question.includes(riddle.question)).length===1){
            setErrorMsg('Indovinello già presente')
        }
        else{
            if(duration<30)
                setDuration(30);
            if(duration>600)
                setDuration(600);
            const newRiddle = {user: props.user.id,question: question,difficulty: difficulty,duration: duration, solution: solution, advice1: advice1, advice2: advice2, state: 1, winner: null, counter: duration};
            props.addRiddle(newRiddle);
            navigate('/');
        }
        
    }

    return (
        <>
            <Container className="p-3" fluid>
                <Row>
                    <Col>
                        <h1>Crea un nuovo indovinello</h1>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        {errorMsg ? <Alert variant='danger' onClose={() => setErrorMsg('')} dismissible>{errorMsg}</Alert> : false}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Indovinello</Form.Label>
                                <Form.Control type="text" required={true} value={question} onChange={event => setQuestion(event.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Difficoltà</Form.Label>
                                <Form.Control as="select" value={difficulty} onChange={event => setDifficulty(event.target.value)}>
                                    <option disabled hidden value=''>seleziona difficoltà</option>
                                    <option value='facile'>facile</option>
                                    <option value='medio'>medio</option>
                                    <option value='difficile'>difficile</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Durata</Form.Label>
                                <Form.Control type="text" placeholder='Inserisci un valore in secondi compreso tra 30 e 600' required={true} value={duration} onChange={event => setDuration(parseInt(event.target.value))} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Soluzione</Form.Label>
                                <Form.Control type="text" required={true} value={solution} onChange={event => setSolution(event.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Primo suggerimento</Form.Label>
                                <Form.Control type="text" required={true} value={advice1} onChange={event => setAdvice1(event.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Secondo suggerimento</Form.Label>
                                <Form.Control type="text" required={true} value={advice2} onChange={event => setAdvice2(event.target.value)} />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="me-3">Conferma</Button>
                            <Link to="/">
                                <Button variant="danger" className="ms-3">
                                    Cancella
                                </Button>
                            </Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )

}

export default RiddleForm;