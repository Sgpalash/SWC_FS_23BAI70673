import React from "react";
import { Row, Col, Card, Statistic, Table } from "antd";

function Dashboard() {
  const columns = [
    {
      title: "User",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const data = [
    {
      key: "1",
      name: "Palash",
      department: "Engineering",
      status: "Active",
    },
    {
      key: "2",
      name: "Rahul",
      department: "Marketing",
      status: "Inactive",
    },
    {
      key: "3",
      name: "Aman",
      department: "HR",
      status: "Active",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Analytics Dashboard</h1>

      {/* KPI Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Total Users" value={1250} />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Revenue" value={50000} prefix="$" />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Orders" value={320} />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Conversion Rate" value={18.5} suffix="%" />
          </Card>
        </Col>
      </Row>

      {/* Table */}
      <Card
        title="Recent Employees"
        style={{ marginTop: "20px" }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </Card>
    </div>
  );
}

export default Dashboard;