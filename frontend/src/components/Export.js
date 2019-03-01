import React, { Component } from 'react'
import '../styles/App.css'
import FooterBar from './FooterBar'
import AppNav from './AppNav'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Icon } from 'react-icons-kit'
import {exportIcon} from 'react-icons-kit/entypo/exportIcon'
import {
  Container,
  Button,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class Export extends Component {
  render() {
    return (
      <div class="export">
        <AppNav />
          <Form>
              <h2>
                Energy Dashboard Data Export
              </h2>
              <p>
                Please specify the building you would like to export data from and
                a date range. Data will export in a .CSV format that can be opened in Excel.
              </p>
                <Label htmlFor="building">Building</Label>
                  <Col md={3}>
                    <FormGroup>
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
                      <Label htmlFor="startDate"> Start Date </Label>
                        <Input
                          type="date"
                          name="startDate"
                          placeholder="01/01/2019"
                        />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="endDate"> End Date </Label>
                        <Input
                          type="date"
                          name="endDate"
                          placeholder="01/01/2019"
                        />
                    </FormGroup>


                  </Col>
              </Form>

            <center>
              <FooterBar />
            </center>
        </div>
    )
  }
}

export default Export
