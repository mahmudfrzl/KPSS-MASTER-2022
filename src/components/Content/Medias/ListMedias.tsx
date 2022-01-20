import { Button, Col, Form, Input, message, Row } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

const ListMedias = () => {
  const [form] = Form.useForm();
  const [links, setLinks] = useState<any[]>([]);
  const [status,setStatus]=useState<boolean>(false)
  const keys = {
    instagramLink: "",
    telegramLink: "",
    whatsappLink: "",
  };

  const getLinks = async () => {
    const data = await axios.get(
      "http://37.148.211.32:8080/api/social-medias/getAll"
    );
    setLinks(data.data.data);
  }
  useEffect(() => {
    
     
    getLinks()
  }, []);
  useEffect(()=>{
    links&&links.length>0&&links.map(d=>{
        return form.setFieldsValue({
            instagramLink:d.instagramLink,
            telegramLink:d.telegramLink,
            whatsappLink:d.whatsappLink,
         })
      })
  },[form,links])
  return (
    <div>
      <Form onFinish={links.length===0?async(values:any)=>{
        await axios.post("http://37.148.211.32:8080/api/social-medias/create",values)
        message.success('Kaydedildi')
        getLinks()
      }:
      
      async(values:any)=>{
        await axios.put(`http://37.148.211.32:8080/api/social-medias/update?mediaID=1`,values)
        message.success('Guncellendi')
        getLinks()
      }
      
      } form={form}>
        <Row>
          <Col xs={12}>
            {Object.keys(keys).map((d) => {
              return (
                <div key={d}>
                  <label htmlFor={d}>
                    {d === "instagramLink"
                      ? "Instagram linkinizi giriniz"
                      : d === "telegramLink"
                      ? "Telegram linkinizi giriniz"
                      : "Whatsapp linkinizi giriniz"
                    }
                    
                  </label>
                  <Form.Item key={d} name={d}>
                    <Input />
                  </Form.Item>
                </div>
              );
            })}
          </Col>
          <Col xs={24}>
            <Form.Item>
              <Button htmlType="submit">{links.length>0?"Guncelle":"Kaydet"}</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ListMedias;
