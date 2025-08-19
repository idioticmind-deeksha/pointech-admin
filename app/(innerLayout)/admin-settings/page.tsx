"use client";

import Stats from "@/app/components/ui/stats/stats";
import { Col, Row } from "react-bootstrap";
import { useFormik } from "formik";
import FormControl from "@/app/components/formik/formControl";
import CommonButton from "@/app/components/ui/commonButton/CommonButton";
import "./adminSettings.scss";
import React from "react";
import ReceiverSettings from "./receiver";

interface LoginFormValues {
  ownerAddress: string;
  transferOwner: string;
  confirmtransfer: string;
}

export default function AdminSettings() {
  const initialValues: LoginFormValues = {
    ownerAddress: "",
    transferOwner: "",
    confirmtransfer: "",
  };
  const onSubmit = (values: LoginFormValues) => {
    console.log("Form submitted:", values);
  };

  const formik = useFormik<LoginFormValues>({
    initialValues,
    onSubmit,
  });

  return (
    <React.Fragment>
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
                  name="ownerAddress"
                  type="text"
                  placeholder="Current Owner Address"
                  value={formik.values.ownerAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.ownerAddress && formik.errors.ownerAddress
                  }
                  label="Current Ownership Address"
                />
              </Col>
              <Col sm={6} xl={4} className="mb-1 mb-lg-0">
                <FormControl
                  name="transferOwner"
                  type="text"
                  placeholder="Enter new owner address"
                  value={formik.values.transferOwner}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.transferOwner && formik.errors.transferOwner
                  }
                  label="Transfer Ownership"
                />
              </Col>
              <Col sm={6} xl={4} className="mb-1 mb-lg-0">
                <FormControl
                  name="confirmtransfer"
                  type="text"
                  placeholder="Confirm new owner address"
                  value={formik.values.confirmtransfer}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmtransfer &&
                    formik.errors.confirmtransfer
                  }
                  label="Confirm Transfer Ownership"
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
      <ReceiverSettings />
    </React.Fragment>
  );
}
