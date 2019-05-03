import React, { Component } from 'react'
import '../styles/App.scss'
import { CSVLink } from 'react-csv'
import { Form, Col, FormGroup, Label, Input, Button } from 'reactstrap'
import { getExportData } from '../helpers/APIFrame'

const csvData = [
  ['Timestamp', 'Value (BTU)'],
  ['31-Aug-16 1:00:00 PM CDT', '512849984.00 BTU'],
  ['31-Aug-16 1:15:04 PM CDT', '512849984.00 BTU'],
  ['31-Aug-16 1:30:04 PM CDT', '512849984.00 BTU'],
  ['31-Aug-16 1:45:04 PM CDT', '512849984.00 BTU'],
  ['31-Aug-16 2:00:04 PM CDT', '512889984.00 BTU'],
  ['31-Aug-16 2:15:04 PM CDT', '512889984.00 BTU'],
  ['31-Aug-16 2:30:04 PM CDT', '512889984.00 BTU'],
  ['31-Aug-16 2:45:04 PM CDT', '512900000.00 BTU'],
  ['31-Aug-16 3:00:04 PM CDT', '512960000.00 BTU'],
  ['31-Aug-16 3:15:04 PM CDT', '512990016.00 BTU']
]

class Export extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: ''
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
      this.setState({ data: res })
    })
  }

  componentDidUpdate() {
    console.log(this.state.data)
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
            <Button className="btn btn-outline-primary">Download</Button>
          </Col>
        </Form>
      </div>
    )
  }
}

export default Export
