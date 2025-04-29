// DateOfBirthSelect.js
import React, { useState } from "react";
import { FloatingLabel, Form, Row, Col } from "react-bootstrap";
import { useEffect } from "react";

const DateOfBirthSelect = ({ onChange }) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1950; year--) {
    years.push(year);
  }

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Local state to hold the selected day, month, and year
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (day && month && year) {
      onChange(`${year}-${month}-${day}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, month, year]);

  return (
    <Row className="g-2 mt-4">
      <Col md>
        <FloatingLabel controlId="floatingDay" label="Day">
          <Form.Select
            aria-label="Day select"
            value={day}
            onChange={(e) => {
              setDay(e.target.value);
            }}
          >
            <option></option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
      </Col>

      <Col md>
        <FloatingLabel controlId="floatingMonth" label="Month">
          <Form.Select
            aria-label="Month select"
            value={month}
            onChange={(e) => {
              setMonth(e.target.value);
            }}
          >
            <option></option>
            {months.map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
      </Col>

      <Col md>
        <FloatingLabel controlId="floatingYear" label="Year">
          <Form.Select
            aria-label="Year select"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
            }}
          >
            <option></option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
      </Col>
    </Row>
  );
};

export default DateOfBirthSelect;
