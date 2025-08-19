"use client";

import { Fragment, ReactNode } from "react";
import { Col, Row } from "react-bootstrap";
import CommonButton from "../../ui/commonButton/CommonButton";
import Link from "next/link";
import "./stats.scss";

interface StatItem {
  title?: string;
  icon?: ReactNode;
  subtitle?: string;
  heading?: string;
  subHeading?: string;
  rightElement?: ReactNode;
  className?: string;
  badgeTitle?: ReactNode;
  badgeClassName?: string;
  badgeIcon?: ReactNode;
  linktitle?: string;
  linkpath?: string;
  labelTitle?: string;
  labelClassName?: string;
  btnTitle?: string;
  btnClick?: () => void;
  btnLink?: string;
  repeatContent?: {
    title?: string;
    subtitle?: string;
  }[];
}

interface StatsProps {
  statsdata?: StatItem[];
  className?: string;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  children?: ReactNode;
}

export default function Stats({
  statsdata = [],
  className = "",
  sm = 6,
  md,
  lg = 3,
  xl,
  children,
}: StatsProps) {
  const hasStatsData = Array.isArray(statsdata) && statsdata.length > 0;
  const hasChildren = !!children;

  return (
    <div className={`stats ${className}`}>
      <Row>
        {hasStatsData &&
          statsdata.map((item, index) => (
            <Col key={index} sm={sm} md={md} lg={lg} xl={xl}>
              <div className={`stats_card ${item.repeatContent ? "repeated" : ""}`}>
                <div className="stats_card_icon">
                  <span>{item.icon}</span>
                </div>

                <div className="stats_card_content">
                  {item.title && <strong>{item.title}</strong>}

                  {item.labelTitle && (
                    <div className={`stats_card_content_label ${item.labelClassName}`}>
                      {item.labelTitle}
                    </div>
                  )}

                  {item.subtitle && <h4>{item.subtitle}</h4>}

                  {item.repeatContent?.map((content, contentIndex) => (
                    <Fragment key={contentIndex}>
                      {content.title && (
                        <h6>
                          <strong>{content.title}</strong>
                        </h6>
                      )}
                      {content.subtitle && (
                        <span className="repeat_subtitle">{content.subtitle}</span>
                      )}
                    </Fragment>
                  ))}

                  {item.subHeading && (
                    <h6>
                      <strong>{item.subHeading}</strong>
                    </h6>
                  )}
                  {item.heading && <span className="repeat_subtitle">{item.heading}</span>}

                  {item.linktitle && item.linkpath && (
                    <Link href={item.linkpath}>
                      {item.linktitle}
                    </Link>
                  )}
                </div>

                {item.btnTitle && item.btnLink && (
                  <CommonButton
                    title={item.btnTitle}
                    className="stats_card_content_right"
                    role="link"
                    to={item.btnLink}
                    target="_blank"
                  />
                )}

                {item.rightElement && (
                  <div className="stats_card_content_right">{item.rightElement}</div>
                )}

                {item.badgeTitle && (
                  <span className={`stats_card_badge ${item.badgeClassName}`}>
                    {item.badgeIcon} {item.badgeTitle}
                  </span>
                )}
              </div>
            </Col>
          ))}

        {hasChildren && (
         
            <div className="stats_card_custom_children mb-lg-1">
              {children}
            </div>
    
        )}
      </Row>
    </div>
  );
}
