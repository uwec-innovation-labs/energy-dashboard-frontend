import React, { Component } from 'react'
import '../styles/App.scss'
import { Form, Col, FormGroup, Label, Input, Button } from 'reactstrap'
import { getExportData } from '../helpers/APIFrame'

class Export extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: '',
      filename: ''
    }

    this.getData = this.getData.bind(this)
    this.exportData = this.exportData.bind(this)
  }

  exportData(event) {
    var building = event.target.building.value
    var startDate = event.target.startDate.value
    var endDate = event.target.endDate.value

    this.getData(building, startDate, endDate)
    event.preventDefault()
  }

  getData(building, startDate, endDate) {
    getExportData(building, 'electricity', startDate, endDate).then(res => {
      this.setState({
        filename: building + '(' + startDate + '_' + endDate + ').csv',
        data: res
      })
    })
  }

  componentDidUpdate() {
    var csvData = []
    var data = this.state.data.data.query.electricity.data
    csvData[0] = ['electricity', 'timestamp', 'value', '\n']
    var c = 1
    data.forEach(d => {
      csvData[c] = [new Date(+d.timestamp), d.value, '\n']
      c++
    })
    csvData[c] = '\n'

    var filename = this.state.filename
    var blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, filename)
    } else {
      var link = document.createElement('a')
      if (link.download !== undefined) {
        var url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', filename)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  }

  render() {
    return (
      <div className="export">
        <h2>Energy Dashboard Data Export</h2>
        <p>
          Please specify the building you would like to export data from and a
          date range. Data will export in a .CSV format that can be opened in
          Excel.
        </p>
        <Form onSubmit={this.exportData}>
          <Col md={4} xs={10}>
            <FormGroup>
              <Label
                className="formLabel"
                id="building"
                name="building"
                htmlFor="building"
              >
                Building
              </Label>
              <Input
                type="select"
                name="building"
                id="building"
                placeholder="Davies"
              >
                <option value="Davies">Davies Student Center</option>
                <option value="Library">McIntyre Library</option>
                <option value="Bridgman">Bridgman</option>
                <option value="Centennial">Centennial</option>
                <option value="Chancellors">Chancellors</option>
                <option value="Crest">Crest</option>
                <option value="Governors">Governors</option>
                <option value="HeatingPlant">Heating Plant</option>
                <option value="HFANorth">HFANorth</option>
                <option value="HFASouth">HFASouth</option>
                <option value="Hibbard">Hibbard</option>
                <option value="Hilltop">Hilltop</option>
                <option value="Horan">Horan</option>
                <option value="HSS">HSS</option>
                <option value="Hursing">Hursing</option>
                <option value="KV">KV</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Murray">Murray</option>
                <option value="OakRidge">OakRidge</option>
                <option value="PhillipsNorth">PhillipsNorth</option>
                <option value="PhillipsSouth">PhillipsSouth</option>
                <option value="Putnam">Putnam</option>
                <option value="Schneider">Schneider</option>
                <option value="Schofield">Schofield</option>
                <option value="Sutherland">Sutherland</option>
                <option value="Thomas">Thomas</option>
                <option value="TowersSouth">TowersSouth</option>
                <option value="Zorn">Zorn</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label
                className="formLabel"
                id="energyType"
                name="energyType"
                htmlFor="energyType"
              >
                Energy Type
              </Label>
              <Input
                type="select"
                name="energyType"
                id="energyType"
                placeholder="Electricity"
              >
                <option value="electricity">Electricity</option>
                <option value="heat">Heat</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label className="formLabel" htmlFor="startDate">
                {' '}
                Start Date{' '}
              </Label>
              <Input type="date" name="startDate" placeholder="01/01/2019" />
            </FormGroup>
            <FormGroup>
              <Label className="formLabel" htmlFor="endDate">
                {' '}
                End Date{' '}
              </Label>
              <Input type="date" name="endDate" placeholder="01/01/2019" />
            </FormGroup>
            <Button>Download</Button>
          </Col>
        </Form>
      </div>
    )
  }
}

export default Export
