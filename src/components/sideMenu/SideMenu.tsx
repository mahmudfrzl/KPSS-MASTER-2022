import React, { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb, Button, Tooltip, Popconfirm } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Router from "./Router";
import MenuContents from "./MenuContent";
import { useHistory, useLocation } from "react-router-dom";
import { runInAction, toJS } from "mobx";
import "../../styles/Menu.scss"
import { observer } from "mobx-react-lite";
// import UserLogin from "../UserLogin";
import { useCookies } from "react-cookie";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const SideMenu = () => {
    const history=useHistory()
  return (
    <Layout id="layout">
    
          <Sider
            // collapsed={state}
            width={250}
            className="site-layout-background"
          >
            <div>
              <div
            //    style={{ fontWeight: "bold", textAlign: "center", display: state ? "none" : "block", }}
               >
               
              </div>
              <div 
            //   style={{ display:  state ? "none" : "flex", justifyContent: "center"}}
              >
             
              </div>
            </div>
            <div className="fix" 
            // style={{ width: state ? 80 : 250 }}
            >
              <div
                style={{
                  backgroundColor: "#ffffff",
                  paddingBottom: 30,
                }}
                className="close"
              >
                <Button
                //   onClick={() => setState(!state)}
                  style={{ width: "100%" }}
                >
                  {/* {state ? (
                    <RightOutlined style={{ fontSize: 20 }} />
                  ) : (
                    <LeftOutlined style={{ fontSize: 20 }} />
                  )} */}
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
                //   onClick={() => history.push("/")}
                  style={{
                    objectFit: "cover",
                    width: 180,
                    height: 50,
                    // display: state ? "none" : "block",
                    marginBottom: 20,
                    cursor: "pointer",
                  }}
                  src="/titan_group.jpg"
                  alt=""
                />
              </div>

              <Menu
                className="menu"
                // openKeys={!state ? [key] : []}
                // selectedKeys={[type]}
                mode="inline"
                // onSelect={(e) =>
                //   runInAction(() => (AboutStore.menuKey = e.key))
                // }

                style={{ borderRight: 0, height: "100%" }}
              >
                {MenuContents.menus.map((name, i) => {
                  return (
                    <SubMenu
                      onTitleClick={(e) => {
                        // setKey(e.key);
                        
                        history.push(name.name)
                        window.sessionStorage.setItem("menuKey", e.key);
                      }}
                      style={{ fontSize: 14 }}
                      key={i}
                      icon={
                        <i style={{ fontSize: 14 }} className={name.icon}></i>
                      }
                      title={name.name}
                    >
                      {name.subMenus.map((d,i) => {
                        return (
                          <Menu.Item
                            onClick={() => {
                              if (d.name === "Online Chat") {
                                runInAction(() => {
                                //   GeneralStore.chat = true;
                                });
                              }
                            //   setMenuName(d.name);
                            //   window.localStorage.setItem("menuName", d.name);
                              history.push(`/${d.name}`);
                            }}
                            key={i}
                            style={{
                              fontSize: 14,
                            //   color: d.name === menuName ? "#6290FF" : "black",
                            }}
                          >
                            <Tooltip title={d.name}>
                              <i
                                style={{ marginRight: 15, fontSize: 16 }}
                                className={d.icon}
                              ></i>

                              {d.name}
                            </Tooltip>
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
  );
};

export default observer(SideMenu);
