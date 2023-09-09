import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>

<Navbar className="bg-body-primary">
        <Container>
          <Navbar.Brand href="#home">
        <Link to={'/'} style={{textDecoration:'none'}}>
              <i class="fa-solid fa-layer-group"></i> 
              EMS Application
        </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>

    </div>
  )
}

export default Header