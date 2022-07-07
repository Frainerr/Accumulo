
import {ListGroup,} from 'react-bootstrap'

function CloseState(props) {

    return (
        <ListGroup>
            <h2> Risposte </h2>
            {props.answers.filter(answer => answer.question === props.riddle.question).map(answer => {
                return (
                    <ListGroup.Item>
                        <p>{answer.answer}</p>
                    </ListGroup.Item>
                )
            })}

            <h2>Risposta corretta</h2>

            <ListGroup.Item>
                <p>{props.riddle.solution}</p>
            </ListGroup.Item>

            {props.riddle.winner ? (
                <table>
                    <tbody>
                        <tr>Vincitore</tr>
                        <tr>

                            <ListGroup.Item variant="primary">
                                {props.riddle.winner}
                            </ListGroup.Item>

                        </tr>
                    </tbody>
                </table>) : <p></p>
            }
        </ListGroup>
    );
}


export default CloseState;