
import { Navbar, Container, Nav} from 'react-bootstrap'


function NavigationBar(props) {
    return (
        <Navbar bg="dark" variant="dark">
            <Container fluid>
                {props.option ? <Navbar.Brand href="/">Riddles</Navbar.Brand> :
                    <Navbar.Brand href="/ranking">TopRanking</Navbar.Brand>}

                {props.option ? <Nav className="me-auto">
                    <Nav.Link href="/ranking">TopRanking</Nav.Link>
                </Nav>
                    :
                    <Nav className="me-auto">
                        <Nav.Link href="/">Riddles</Nav.Link>
                    </Nav>}



                {!props.loggedIn ? <Navbar.Brand href="/login">Login </Navbar.Brand> :
                    <Nav>
                        <Navbar.Brand>
                            User: {props.user.name}
                        </Navbar.Brand>
                        {props.option ? <Nav.Link href='addRiddle'>AddRiddle</Nav.Link> : <p></p>}
                        <Nav.Link onClick={props.logOut}>Logout</Nav.Link>
                    </Nav>
                }

            </Container>
        </Navbar>
    )
}

export default NavigationBar;

