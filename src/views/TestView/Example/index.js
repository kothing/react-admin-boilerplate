import Example1 from "./Example1.jsx";

const Example = () => {
  return (
    <Layout>
      <div>
        <WebBreadcrumb arr={["示例"]} />
      </div>
      <div className="base-style">
        <h3>示例</h3>
        <Example1/>
      </div>
    </Layout>
  );
};

export default Example;
