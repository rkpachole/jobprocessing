import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap';

const Header = () => {
    return (
        <>
            <>
                <Navbar className='nav-main'>
                    <Container>
                        <Navbar.Brand href="#home">LOGO</Navbar.Brand>
                        {/* <Nav className="ms-auto">
                            <Nav.Link href="#">Menu Group 1</Nav.Link>
                            <Nav.Link href="#">Menu Group 2</Nav.Link>
                            <Nav.Link href="#">Menu Group 3</Nav.Link>
                            <Nav.Link href="#">Menu Group 4</Nav.Link>
                        </Nav> */}
                    </Container>
                </Navbar>
            </>


        </>
    )
}

export default Header