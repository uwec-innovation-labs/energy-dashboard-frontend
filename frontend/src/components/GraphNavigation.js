import React, { Component } from 'react'
import {
  Row,
  Col,
  Container,
  Button,
  ButtonGroup,
  Badge,
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from 'reactstrap'

class GraphNavigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sendFilter: this.props.functionFilter,
      sendBuilding: this.props.functionBuilding,
      dropdownOpen: false
    }

    this.toggle = this.toggle.bind(this)
    this.handleGraphButtons = this.handleGraphButtons.bind(this)
    this.handleBuildingButtons = this.handleBuildingButtons.bind(this)
  }

  handleGraphButtons(event) {
    event.preventDefault()
    this.state.sendFilter(event.target.value)
  }

  handleBuildingButtons(event) {
    event.preventDefault()
    this.state.sendBuilding(event.target.value)
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  render() {
    return (
      <div>
        <Container>
          <h1 id="building">
            {' '}
            Davies Student Center
            <span id="building-badges">
              {' '}
              <Badge color="secondary">
                Size: 175,000 ft<sup>2</sup>
              </Badge>{' '}
              <Badge color="secondary">Built: 2012</Badge>{' '}
              <Badge color="secondary">Non-Academic</Badge>
            </span>
          </h1>
          <Row>
            <Col>
              <br />
              <ButtonGroup>
                <Button
                  color="primary"
                  onClick={this.handleGraphButtons}
                  value="day"
                >
                  Day
                </Button>
                <Button
                  color="primary"
                  onClick={this.handleGraphButtons}
                  value="week"
                >
                  Week
                </Button>
                <Button
                  color="primary"
                  onClick={this.handleGraphButtons}
                  value="month"
                >
                  Month
                </Button>
                <Button
                  color="primary"
                  onClick={this.handleGraphButtons}
                  value="year"
                >
                  Year
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button
                  color="success"
                  onClick={this.handleGraphButtons}
                  value="week"
                >
                  Electricity
                </Button>
                <Button
                  color="success"
                  onClick={this.handleGraphButtons}
                  value="week"
                >
                  Heat
                </Button>
                <Button
                  color="success"
                  onClick={this.handleGraphButtons}
                  value="week"
                >
                  Solar
                </Button>
                <Button
                  color="success"
                  onClick={this.handleGraphButtons}
                  value="week"
                >
                  Chiller
                </Button>
              </ButtonGroup>
              <ButtonDropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
              >
                <DropdownToggle caret>Buildings</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="Davies"
                  >
                    Davies
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="Library"
                  >
                    McIntyre Library
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default GraphNavigation
