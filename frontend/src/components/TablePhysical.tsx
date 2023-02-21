import React, { useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { Table,InputRef,Space,Input } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Physical_FitnessInterface } from "../models/IPhysical_Fitness";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import EditPhysical from "./EditPhysical";
import { TeacherReocrdsInterface } from "../models/ITeacherRecord";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";


type DataIndex = keyof Physical_FitnessInterface;

function TablePhysical() {
  const [physical, setPhysical] = React.useState<Physical_FitnessInterface[]>(
    []
  );
  const [TeacherRecord, setTeacherRecord] = React.useState<
  Partial<TeacherReocrdsInterface>
>({});

  const [show, setShow] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [param, setparam] = useState(0);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<Physical_FitnessInterface> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="submit"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  console.log("physical", physical.map((item) => item.Created_date));

  const columns: ColumnsType<Physical_FitnessInterface> = [
    {
      title: 'วันที่',
      dataIndex: 'Created_date',
      render: (text,record) => {
        return <div>{moment(record?.Created_date).format("DD/MM/YYYY")}</div>
      },
      ...getColumnSearchProps("Created_date"),
    },
    {
      title: 'รหัสนักเรียน',
      dataIndex: 'CodeID',
      render: (text,record) => {
        return <div>{record?.Student?.CodeID}</div>
      }
    },
    {
      title: 'ชื่อ',
      dataIndex: 'First_Name',
      render: (text,record) => {
        return <div>{record?.Student?.First_Name} {record?.Student?.Last_Name}</div>
      }
    },
    {
      title: 'การกระโดดไกล',
      dataIndex: 'Longjump',
    },
    {

      title: 'ลุก-นั่ง 30 วินาที',
      dataIndex: 'SitUp',

    },
    {
      title: 'วิ่ง 50 เมตร',
      dataIndex: 'Run50',
    },
    {
      title: 'แรงกดมือ',
      dataIndex: 'GripStrength',
    },
    {
      title: 'ส่วนสูง',
      dataIndex: 'Height',
    },
    {
      title: 'น้ำหนัก',
      dataIndex: 'Wieght',
    },
    {
      title: 'จัดการ',
      dataIndex: 'mangage',
      render: (text,record) => {
        return <div>
           <Button
                    variant="primary"
                    onClick={() => {
                      setShow(true);
                      setparam(record.ID);
                    }}
                  >
                    แก้ไข
                  </Button>
                  <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-custom-modal-styling-title">
                        บันทึกสมรรถนะ
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <EditPhysical param={param} />
                    </Modal.Body>
                  </Modal>
        </div>
    },
    },
  ];



  const apiUrl = "http://localhost:8080";
  const requestOptionsget = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getphysial = async (id:number) => {
    fetch(`${apiUrl}/physicalteacherid/${id}`, requestOptionsget)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setPhysical(res.data);
        } else {

        }
      });
  };

  
  const getteacher = async () => {
    fetch(
      `${apiUrl}/teacherrecord/detail/${localStorage.getItem("uid")}`,
      requestOptionsget
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setTeacherRecord(res.data);
          getphysial(res.data.ID);
          
        } else {

        }
      });
  };

  console.log(TeacherRecord.ID);
  

  useEffect(() => {

    getteacher();
  }, []);

  return (
    <Container>
      <br></br>
      <br></br>

      <Row>
        <Col xs={6}>
          <h4>รายการประวัติของนักเรียน</h4>
        </Col>
      </Row>

      <br></br>
      <br></br>
      <Table  columns={columns} dataSource={physical} />
    </Container>
  );
}

export default TablePhysical;
