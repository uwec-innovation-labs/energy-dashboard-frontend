import React from 'react'
import './Map.css'
import MapImage from '../../../images/UWECMap.png'

export default class Map extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showPopup: false,
      building: '',
      x: 0,
      y: 0,
      selected: ''
    }

    this.mouseOverEffect = this.mouseOverEffect.bind(this)
    this.mouseOutEffect = this.mouseOutEffect.bind(this)
    this.onclickEffect = this.onclickEffect.bind(this)
  }

  componentDidMount () {
    var circles = document.getElementsByTagName('circle')
    console.log(circles)
    for (var i = 0; i < circles.length; i++) {
      circles[i].addEventListener('mouseover', this.mouseOverEffect)
      circles[i].addEventListener('mouseout', this.mouseOutEffect)
      circles[i].addEventListener('onclick', this.onclickEffect)
    }
  }

  mouseOverEffect (event) {
    this.setState({
      building: event.target.id,
      showPopup: true,
      x: event.target.getAttribute('cx'),
      y: event.target.getAttribute('cy') - 13
    })
  }

  mouseOutEffect (event) {
    this.setState({ building: '', showPopup: false })
  }

  onclickEffect (event) {
    if (this.state.selected !== '') {
      document
        .getElementById(this.state.selected)
        .classList.remove('selectedBuilding')
      this.setState({ selected: event.target.id })
      event.target.classList.add('selectedBuilding')
    }

    if (this.state.selected === event.target.id) {
      document
        .getElementById(event.target.id)
        .classList.remove('selectedBuilding')
      this.setState({ selected: '' })
    } else {
      this.setState({ selected: event.target.id })
      event.target.classList.add('selectedBuilding')
    }
  }

  render () {
    return (
      <div className='img-overlay-wrap'>
        <center>
          <img width='800px' src={MapImage} alt='A map of UWEC' />
          <svg viewBox='0 0 150 150'>
            <circle
              id='Chancellors Hall'
              cx='44'
              cy='63'
              r='1.5'
              onClick={this.onclickEffect}
            />
            <circle
              id='Oakridge Hall'
              cx='57'
              cy='59 '
              r='1.5'
              onClick={this.onclickEffect}
            />
            <circle
              id='Bridgman Hall'
              cx='66'
              cy='59'
              r='1.5'
              onClick={this.onclickEffect}
            />
            <circle
              id='Sutherland Hall'
              cx='66'
              cy='52'
              r='1.5'
              onClick={this.onclickEffect}
            />
            <circle
              id='Crest'
              cx='75'
              cy='47'
              r='1.5'
              onClick={this.onclickEffect}
            />
            {/* {this.state.showPopup ? (
              <rect
                className='popup'
                x={this.state.x - 40 / 2.0}
                y={this.state.y - 2}
                width='40'
                height='10'
              />
            ) : null} */}
            {this.state.showPopup ? (
              <polygon
                className='popup'
                points={
                  this.state.x -
                  5 +
                  ',' +
                  (this.state.y + 7.975) + // Top Left Point Triangle
                  ' ' +
                  this.state.x +
                  ',' +
                  (this.state.y + 12) + // Bottom Point Triangle
                  ' ' +
                  (parseInt(this.state.x) + parseInt(5)) +
                  ',' +
                  (this.state.y + 7.975) + // Top Right Point Triangle
                  ' ' +
                  (parseInt(this.state.x) + 20) +
                  ',' +
                  (parseInt(this.state.y) + 7.975) + // Bottom Right
                  ' ' +
                  (parseInt(this.state.x) + 20) +
                  ',' +
                  parseInt(this.state.y) + // Top Right
                  ' ' +
                  (parseInt(this.state.x) - 20) +
                  ',' +
                  parseInt(this.state.y) + // Top Left
                  ' ' +
                  (parseInt(this.state.x) - 20) +
                  ',' +
                  (parseInt(this.state.y) + 7.975)
                }
              />
            ) : null}
            {this.state.showPopup ? (
              <text
                className='popup-text'
                x={this.state.x}
                y={this.state.y + 5.5}
              >
                {this.state.building}
              </text>
            ) : null}
            )}
          </svg>
        </center>
        <h2>
          {this.state.selected !== ''
            ? this.state.selected
            : '[Please select a building on the map]'}
        </h2>
        {this.state.selected !== '' ? (
          <div>
            <button>Electricity</button>
            <button>Chiller</button>
            <button>Solar</button>
            <button>Heat</button>
            <input
              id='start'
              type='datetime-local'
              name='startdate'
              value='2017-06-01T08:30'
            ></input>
            <input
              id='end'
              type='datetime-local'
              name='enddate'
              value='2017-06-01T08:30'
            ></input>
          </div>
        ) : null}
      </div>
    )
  }
}
