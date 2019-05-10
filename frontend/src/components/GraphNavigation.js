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
      sendEnergyType: this.props.functionEnergyType,
      dropdownOpen: false,
      dropdownOpenTwo: false,
      building: 'Davies',
      increment: '15m',
      sendDownloadData: this.props.functionDownloadData
    }

    this.toggle = this.toggle.bind(this)
    this.toggleTwo = this.toggleTwo.bind(this)
    this.handleGraphButtons = this.handleGraphButtons.bind(this)
    this.handleBuildingButtons = this.handleBuildingButtons.bind(this)
    this.handleDownloadDataButtons = this.handleDownloadDataButtons.bind(this)
  }

  handleDownloadDataButtons(event) {
    event.preventDefault()
    this.state.sendDownloadData()
  }

  handleEnergyTypeButtons(event) {
    event.preventDefault()
    this.state.sendEnergyType(event.target.value)
  }

  handleGraphButtons(event) {
    event.preventDefault()
    if (event.target.value === 'year') {
      this.setState({ increment: '1day' })
    } else {
      this.setState({ increment: '15m' })
    }
    this.state.sendFilter(event.target.value)
  }

  handleBuildingButtons(event) {
    event.preventDefault()
    this.state.sendBuilding(event.target.value)
    this.state.sendEnergyType()
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
              <Badge color="secondary">Non-Academic</Badge>{' '}
              <Badge color="secondary">{this.state.increment}</Badge>
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
              </ButtonGroup>{' '}
              <ButtonDropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
              >
                <DropdownToggle caret>Buildings Set 1</DropdownToggle>
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
                    value="Horan"
                  >
                    Horan
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.handleBuildingButtons}
                    value="HSS"
                  >
                    HSS
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>{' '}
              <ButtonGroup>
                <ButtonDropdown
                  isOpen={this.state.dropdownOpenTwo}
                  toggle={this.toggleTwo}
                >
                  <DropdownToggle caret>Buildings Set 2</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={this.handleBuildingButtons}
                      value="Nursing"
                    >
                      Nursing
                    </DropdownItem>
                    <DropdownItem
                      onClick={this.handleBuildingButtons}
                      value="KV"
                    >
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
              </ButtonGroup>{' '}
              <ButtonGroup>
                <Button
                  color="primary"
                  onClick={this.handleDownloadDataButtons}
                >
                  Download Current Data
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default GraphNavigation
