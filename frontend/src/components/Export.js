import React, { Component } from 'react'
import '../styles/App.css'
import FooterBar from './FooterBar'
import AppNav from './AppNav'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
      <div>
        <AppNav />
          <div className="container">
              <h2>
                Energy Dashboard Data Export
              </h2>
              <p>
                Data will export in a .CSV format that can be opened in Excel.
              </p>
            <Form>
              <Row>
                <Label htmlFor="frmNameA">Building</Label>
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
                  </Col>
                </Row>
              </Form>
            </div>
            <center>
              <FooterBar />
            </center>
        </div>
    )
  }
}

export default Export
