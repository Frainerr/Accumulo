import { Tab, ListGroup, Row, Col} from 'react-bootstrap'
import OpenState from "./OpenState"
import CloseState from "./CloseState"
function DisplayRiddles(props) {
    return (
        <Tab.Container id="list-group-tabs-example" >
            <Row>
                <Col sm={4}>
                    <ListGroup>
                        <h3>Indovinelli disponibili</h3>
                        {props.riddles.filter(riddle =>riddle.state===1).map((riddle) => {
                            return (
                                <ListGroup.Item action href={"#" + riddle.id}>
                                    <p> {riddle.question}   </p>
                                    <p>
                                        difficoltà: {riddle.difficulty}
                                    </p>
                                </ListGroup.Item>
                            )
                        })}
                        <h3>Indovinelli completati</h3>
                        {props.riddles.filter(riddle =>riddle.state===0).map((riddle) => {
                            return (
                                <ListGroup.Item action href={"#" + riddle.id}>
                                    <p> {riddle.question}   </p>
                                    <p>
                                        difficoltà: {riddle.difficulty}
                                    </p>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </Col>
                {props.loggedIn?
                <Col sm={8}>
                    <Tab.Content>
                        {props.riddles.map((riddle) => {
                            return (
                                <Tab.Pane eventKey={"#" + riddle.id}>
                                    {!riddle.state ?
                                        <CloseState riddle = {riddle} answers = {props.answers} loggedIn = {props.loggedIn} user = {props.user}></CloseState>
                                        : <OpenState riddle={riddle} answers={props.answers} loggedIn = {props.loggedIn} 
                                        editRiddle = {props.editRiddle} addAnswer = {props.addAnswer} user = {props.user} editScore = {props.editScore}
                                         updateCounter = {props.updateCounter}/>}
                                </Tab.Pane>
                            )
                        })}


                    </Tab.Content>
                </Col> : <p></p>}
            </Row>
        </Tab.Container>
    );
}


export default DisplayRiddles;
