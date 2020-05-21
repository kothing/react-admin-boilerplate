import React from "react";
import { Layout, Divider } from "antd";
import WebBreadcrumb from "@/components/WebBreadcrumb";
import "./style.less";
import Example1 from "./Example1.jsx";
import Example2 from "./Example2.jsx";

const Example = () => {
  return (
    <Layout>
      <div>
        <WebBreadcrumb arr={["示例"]} />
      </div>
      <div className="base-style">
        <h3>示例</h3>
        <Example1/>
        <Divider />
        <Example2/>
      </div>
    </Layout>
  );
};

export default Example;
