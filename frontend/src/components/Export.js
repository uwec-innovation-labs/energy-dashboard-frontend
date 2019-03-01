import React, { Component } from 'react'
import '../styles/App.css'
import FooterBar from './FooterBar'
import AppNav from './AppNav'
import "react-datepicker/dist/react-datepicker.css";
import {
  Form,
  Col,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

class Export extends Component {
  render() {
    return (
      <div class="export">
        <AppNav />

              <h2>
                Energy Dashboard Data Export
              </h2>
              <p>
                Please specify the building you would like to export data from and
                a date range. Data will export in a .CSV format that can be opened in Excel.
              </p>
              <Form>
                  <Col md={4} xs={10}>
                    <FormGroup>
                    <Label className="formLabel" htmlFor="building">Building</Label>
                      <Input
                        type="select"
                        name="building"
                        id="building"
                        placeholder="Davies Student Center">
                          <option value="Davies Student Center">Davies Student Center</option>
                          <option value="McIntyre Library">McIntyre Library</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label className="formLabel" htmlFor="startDate"> Start Date </Label>
                        <Input
                          type="date"
                          name="startDate"
                          placeholder="01/01/2019"
                        />
                    </FormGroup>
                    <FormGroup>
                      <Label className="formLabel" htmlFor="endDate"> End Date </Label>
                        <Input
                          type="date"
                          name="endDate"
                          placeholder="01/01/2019"
                        />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleFile">File Destination</Label>
                       <Input type="file" name="file" id="exampleFile" />
                    </FormGroup>
                    <Button outline block color="primary" type="submit">
                      Download
                    </Button>
                  </Col>
              </Form>
        </div>
    )
  }
}

export default Export
