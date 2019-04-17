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
      dropdownOpen: false,
      dropdownOpenTwo: false,
      building: 'Davies'
    }

    this.toggle = this.toggle.bind(this)
    this.toggleTwo = this.toggleTwo.bind(this)
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
    this.setState({ building: event.target.value })
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  toggleTwo() {
    this.setState({
      dropdownOpenTwo: !this.state.dropdownOpenTwo
    })
  }

  render() {
    return (
      <div>
        <Container>
          <h1 id="building">
            {' '}
            {this.state.building}
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
                <DropdownToggle caret>Buildings 1</DropdownToggle>
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
                    Library
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="Bridgman"
                  >
                    Bridgman
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="Centennial"
                  >
                    Centennial
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="Chancellors"
                  >
                    Chancellors
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="Crest"
                  >
                    Crest
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="Governors"
                  >
                    Governors
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="HeatingPlant"
                  >
                    HeatingPlant
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="HFANorth"
                  >
                    HFANorth
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="HFASouth"
                  >
                    HFASouth
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="Hibbard"
                  >
                    Hibbard
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="Hilltop"
                  >
                    Hilltop
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="HeatingPlant"
                  >
                    HeatingPlant
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="HSS"
                  >
                    HSS
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <ButtonDropdown
                isOpen={this.state.dropdownOpenTwo}
                toggle={this.toggleTwo}
              >
                <DropdownToggle caret>Buildings 2</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="Nursing"
                  >
                    Nursing
                  </DropdownItem>
                  <DropdownItem onClick={this.handleBuildingButtons} value="KV">
                    KV
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="Maintenance"
                  >
                    Maintenance
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="Murray"
                  >
                    Murray
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="OakRidge"
                  >
                    OakRidge
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="PhillipsNorth"
                  >
                    PhillipsNorth
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="PhillipsSouth"
                  >
                    PhillipsSouth
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="Putnam"
                  >
                    Putnam
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="Schneider"
                  >
                    Schneider
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="Schofield"
                  >
                    Schofield
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="Sutherland"
                  >
                    Sutherland
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="Thomas"
                  >
                    Thomas
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="TowersSouth"
                  >
                    TowersSouth
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="Zorn"
                  >
                    Zorn
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
