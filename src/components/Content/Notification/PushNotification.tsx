import React, { useEffect, useState } from "react";
import { Input, Button, Popconfirm, message, Form } from "antd";
import { observer } from "mobx-react-lite";
import axios from "axios";
interface Props {}

const PushNotification = () => {

  const { TextArea } = Input;

  const keys = {
    body: "",
  };

  return (
    <div>
      <Form
        onFinish={async (values: any) => {
          await axios.post(
            `http://37.148.211.32:8080/api/notification/push-notification`,
            values
          );
          message.success("Bildirim gönderildi");
        }}

      >
        {Object.keys(keys).map((d) => {
          return (
            <div key={d}>
              <Form.Item key={d} name={d}>
              <TextArea  rows={8} placeholder="Bir şeyler yaz..." />
              </Form.Item>
            </div>
          );
        })}

        <div style={{ justifyContent: "center", display: "flex" }}>
          <Button
            style={{
              marginTop: 40,
              height: 40,
              width: 150,
              fontFamily: "Helvetica",
              fontSize: 17,
            }}
            type="primary"
            block
            htmlType="submit"
          >
            Gönder
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default observer(PushNotification);
