import { observer } from "mobx-react-lite";
import React from "react";
import { Menu, message, Popconfirm } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
const Navbar = () => {
  const history = useHistory();
  const { SubMenu } = Menu;
  function confirm(e:any) {
    console.log(e);
    history.push("/log-in");
    message.success('Çıkış yaptınız');
  }
  
  function cancel(e:any) {
    console.log(e);
    message.error('Hayır');
  }
  
  return (
    <div style={{ marginLeft: 1000 }}>
      <Menu mode="horizontal">
        <Menu.Item icon={<LogoutOutlined />} key="alipay">
          <Popconfirm 
          title="Cikmak istediyinizden eminmisiniz"
          onCancel={cancel}
          onConfirm={confirm}
          okText="Evet"
          cancelText="Hayır"
          >

              Çıkış yap
       
          </Popconfirm>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default observer(Navbar);
