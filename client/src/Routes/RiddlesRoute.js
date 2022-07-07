import { Container, Row, Col, Alert } from "react-bootstrap";
import NavigationBar from "../Components/NavigationBar"
import DisplayRiddles from "../Components/DisplayRiddles";
import DisplayRanking from "../Components/DisplayRanking";
function RiddlesRoutes(props) {

    return (
        <div>
            <header>
                <NavigationBar option={props.option} loggedIn={props.loggedIn} user={props.user} logOut={props.logOut} />

            </header>
            <main>
                <Container fluid>
                    <Row>
                        <Col>
                            {props.message !== '' ? <Alert variant='danger' onClose={() => props.resetMessage()} dismissible>{props.message}</Alert> : false}
                        </Col>
                    </Row>
                    <Row className="vh-100">
                        <Col>
                            {props.option ?
                                <DisplayRiddles riddles={props.riddles} answers={props.answers} editScore={props.editScore}
                                    loggedIn={props.loggedIn} user={props.user} editRiddle={props.editRiddle} addAnswer={props.addAnswer}
                                    updateCounter={props.updateCounter} /> :
                                <DisplayRanking topScores={props.topScores} loggedIn={props.loggedIn} user={props.user} />}
                        </Col>
                    </Row>
                </Container>
            </main>
        </div>
    )

}

export default RiddlesRoutes;