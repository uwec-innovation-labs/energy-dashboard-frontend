import React, { Component } from 'react'
import '../styles/App.css'
import { CSVLink } from 'react-csv'
import { Form, Col, FormGroup, Label, Input, Button } from 'reactstrap'

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
  render() {
    return (
      <div class="export">
        <h2>Energy Dashboard Data Export</h2>
        <p>
          Please specify the building you would like to export data from and a
          date range. Data will export in a .CSV format that can be opened in
          Excel.
        </p>
        <Form action="javascript:void(0);">
          <Col md={4} xs={10}>
            <FormGroup>
              <Label className="formLabel" htmlFor="building">
                Building
              </Label>
              <Input
                type="select"
                name="building"
                id="building"
                placeholder="Davies Student Center"
              >
                <option value="Davies Student Center">
                  Davies Student Center
                </option>
                <option value="McIntyre Library">McIntyre Library</option>
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
            <Button outline block color="primary" type="submit">
              <CSVLink data={csvData} target="_blank">
                Download
              </CSVLink>
            </Button>
          </Col>
        </Form>
      </div>
    )
  }
}

export default Export
