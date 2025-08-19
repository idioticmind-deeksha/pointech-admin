"use client";

import Stats from "@/app/components/ui/stats/stats";
import { Col, Row } from "react-bootstrap";
import { useFormik } from "formik";
import FormControl from "@/app/components/formik/formControl";
import CommonButton from "@/app/components/ui/commonButton/CommonButton";
import "./adminSettings.scss";
import React from "react";

interface LoginFormValues {
  oldReceiverAddress: string;
  receiverAddress: string;
  confirmAddress: string;
}

export default function ReceiverSettings() {
  const initialValues: LoginFormValues = {
    oldReceiverAddress: "",
    receiverAddress: "",
    confirmAddress: "",
  };
  const onSubmit = (values: LoginFormValues) => {
    console.log("Form submitted:", values);
  };

  const formik = useFormik<LoginFormValues>({
    initialValues,
    onSubmit,
  });

  return (
    <section className="admin_settings">
      <form onSubmit={formik.handleSubmit}>
        <Stats
          sm={12}
          lg={12}
          className="stats_card mb-0 mt-3 admin_settings_stats"
        >
          <Row>
            <Col sm={6} xl={4} className="mb-1 mb-lg-0">
              <FormControl
                name="oldReceiverAddress"
                type="text"
                placeholder="Current Receiver Address"
                value={formik.values.oldReceiverAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.oldReceiverAddress &&
                  formik.errors.oldReceiverAddress
                }
                label="Current Receiver Address"
              />
            </Col>
            <Col sm={6} xl={4} className="mb-1 mb-lg-0">
              <FormControl
                name="receiverAddress"
                type="text"
                placeholder="Enter new owner address"
                value={formik.values.receiverAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.receiverAddress &&
                  formik.errors.receiverAddress
                }
                label="Receiver Address"
              />
            </Col>
            <Col sm={6} xl={4} className="mb-1 mb-lg-0">
              <FormControl
                name="confirmAddress"
                type="text"
                placeholder="Confirm new owner address"
                value={formik.values.confirmAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmAddress && formik.errors.confirmAddress
                }
                label="Confirm Receiver Address"
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={4} xl={2} className="mb-0">
              <CommonButton title="Submit" type="submit" fluid />
            </Col>
          </Row>
        </Stats>
      </form>
    </section>
  );
}
