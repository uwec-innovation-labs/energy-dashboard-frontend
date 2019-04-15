import React, { Component } from 'react'
import { Row, Col, Container, Button } from 'reactstrap'

class GraphNavigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sendFilter: this.props.function
    }
    this.handleButtons = this.handleButtons.bind(this)
  }

  handleButtons(event) {
    event.preventDefault();
    this.state.sendFilter(event.target.value)
  }

  render() {
      return (
          <div>
            <center>
            <Container>
              <Row>
                <Col>
                  <Button onClick={this.handleButtons} size="lg" block value="day">Day</Button>
                </Col>
                <Col>
                  <Button onClick={this.handleButtons} size="lg" block value="week">Week</Button>
                </Col>
                <Col>
                  <Button onClick={this.handleButtons} size="lg" block value="month">Month</Button>
                </Col>
                <Col>
                  <Button onClick={this.handleButtons} size="lg" block value="year">Year</Button>
                </Col>
              </Row>
              <Row>
              <Col>
                <Button onClick={this.handleButtons} size="lg" block value="day">Electricity</Button>
              </Col>
              <Col>
                <Button onClick={this.handleButtons} size="lg" block value="week">Condensate</Button>
              </Col>
              </Row>
            </Container>
            </center>
          </div>
        )
      }
    }

    export default GraphNavigation
