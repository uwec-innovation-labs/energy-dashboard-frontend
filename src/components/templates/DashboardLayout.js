import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Navigation from '../organisms/Navigation'

export default class DashboardLayout extends Component {
  render () {
    return (
      <div>
        <div>
          <Navigation />
        </div>
        <div style={{ padding: '20px' }}>
          <Row>
            <Col sm={12} style={{ backgroundColor: 'darkgray' }}>
              <Container>
                <Row>
                  <Col sm={4} style={{ backgroundColor: 'blue' }}>
                    Building
                  </Col>
                  <Col sm={4} style={{ backgroundColor: 'red' }}>
                    Type
                  </Col>
                  <Col sm={4} style={{ backgroundColor: 'green' }}>
                    Time
                  </Col>
                </Row>
                <Row>
                  <Col sm={4} style={{ backgroundColor: 'yellow' }}>
                    Graph Navigation
                  </Col>
                  <Col sm={8} style={{ backgroundColor: 'orange' }}>
                    Graph
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
