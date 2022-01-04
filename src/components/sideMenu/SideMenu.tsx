import { useState } from "react";
import { Layout, Menu, Breadcrumb, Button, Popconfirm } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Router from "./Router";
import MenuContents from "./MenuContent";
import { useHistory } from "react-router-dom";

import "../../styles/Menu.scss";
import { observer } from "mobx-react-lite";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { runInAction } from "mobx";
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const SideMenu = () => {
  const history = useHistory();
  const [state, setState] = useState<boolean>(false);
  const [key, setKey] = useState<any>();

  return (
    <>
        <Layout id="layout">
          <Sider
            collapsed={state}
            width={250}
            className="site-layout-background"
          >
            <div>
              <div
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  display: state ? "none" : "block",
                }}
              ></div>
              <div
                style={{
                  display: state ? "none" : "flex",
                  justifyContent: "center",
                }}
              ></div>
            </div>
            <div className="fix" style={{ width: state ? 80 : 250 }}>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  paddingBottom: 30,
                }}
                className="close"
              >
                <Button
                  onClick={() => setState(!state)}
                  style={{ width: "100%" }}
                >
                  {state ? (
                    <RightOutlined style={{ fontSize: 20 }} />
                  ) : (
                    <LeftOutlined style={{ fontSize: 20 }} />
                  )}
                </Button>
              </div>
             
              <div
                style={{
                  backgroundColor: "#ffffff",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  onClick={() => history.push("/")}
                  style={{
                    objectFit: "cover",
                    width: 180,
                    height: 50,
                    display: state ? "none" : "block",
                    marginBottom: 20,
                    cursor: "pointer",
                  }}
                  src="/titan_group.jpg"
                  alt=""
                />
              </div>

              <Menu
                style={{ width: 256 }}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
              >
                 <Menu.Item style={{marginLeft:25}} >
              </Menu.Item>
                {MenuContents.menus.map((d) => {
                  return (
                    <SubMenu
                      onTitleClick={() =>
                        history.push(`/${d.name.toLowerCase()}`)
                      }
                      key={d.name}
                      icon={<MailOutlined />}
                      title={d.name}
                    >
                      {d.subMenus.map((s, i) => {
                        return (
                          <Menu.Item
                            key={i + 1}
                            onClick={() =>
                              history.push(`/${s.name.toLowerCase()}`)
                            }
                          >
                            {s.name}
                          </Menu.Item>
                        );
                      })}
                    </SubMenu>
                  );
                })}
              </Menu>
            </div>
          </Sider>
          <Layout
            style={{ padding: "0 24px 24px", width: "150%", height: "100%" }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
                fontSize: 24,
                fontWeight: "bold",
                color: "#575757",
                fontFamily: "serif",
                letterSpacing: 0.5,
                opacity: 0.9,
              }}
            >
              <Breadcrumb.Item></Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Router />
            </Content>
          </Layout>
        </Layout>
    </>
  );
};

export default observer(SideMenu);
