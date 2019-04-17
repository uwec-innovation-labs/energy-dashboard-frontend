import React, { Component } from 'react'
import { Row, Col, Container, Button, ButtonGroup, Badge } from 'reactstrap'

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

            <Container>
              <h1 id="building"> Davies Student Center
                <h5 id="building"> <Badge color="secondary">Size: 175,000 ft<sup>2</sup></Badge> <Badge color="secondary">Built: 2012</Badge> <Badge color="secondary">Non-Academic</Badge></h5>
              </h1>
              <Row>
                <Col>
                  <br></br>
                  <ButtonGroup>
                    <Button color="primary" onClick={this.handleButtons} value="day">Day</Button>
                    <Button color="primary" onClick={this.handleButtons} value="week">Week</Button>
                    <Button color="primary" onClick={this.handleButtons} value="month">Month</Button>
                    <Button color="primary" onClick={this.handleButtons} value="year">Year</Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button color="success" onClick={this.handleButtons} value="week">Electricity</Button>
                    <Button color="success" onClick={this.handleButtons} value="week">Heat</Button>
                    <Button color="success" onClick={this.handleButtons} value="week">Solar</Button>
                    <Button color="success" onClick={this.handleButtons} value="week">Chiller</Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </Container>
          </div>
        )
      }
    }

export default GraphNavigation
