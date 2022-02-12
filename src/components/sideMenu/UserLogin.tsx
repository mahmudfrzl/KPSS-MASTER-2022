 import { Form, Input, Button, Checkbox, message } from "antd";
// import { useForm } from "antd/lib/form/Form";
// import axios from "axios";
// import { runInAction } from "mobx";
// import { observer } from "mobx-react-lite";
// import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

// const UserLogin = () => {
//   const history = useHistory();
//   const [form] = useForm();
//   const [admin, setAdmin] = useState({ email: "", password: "" });

//   const updatedData = [{ key: "email", label: "Email" }];

//   const onInputChange = (e: any) => {
//     setAdmin({ email: e.target.value, password: e.target.value });
//   };

//   const login = async (event: any) => {
//     const data = await axios.post(
//       "http://37.148.211.32:8080/api/admins/log-in",
//       event
//     );
//     data.data.success === true
//       ? message.success(data.data.message)
//       : message.error(data.data.message);

//     if (data.data.success === true) {
//       runInAction(() => history.push("/dersler"));
//     }
//   };
//   useEffect(() => {
//     form.setFieldsValue({
//       email: "",
//       password: "",
//     });
//   }, [login]);

//   return (
//     <div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           marginTop: "30px",
//         }}
//         id="login"
//       >
//         <Form
//           form={form}
//           style={{
//             padding: "20px",
//             borderRadius: "10px",
//             boxShadow: "1px 1px 10px 10px rgba(0, 0, 0, 0.2)",
//             width: 370,
//           }}
//           onFinish={login}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               marginTop: 10,
//               marginBottom: 70,
//             }}
//           >
//             <img
//               style={{
//                 backgroundColor: "#241571",
//                 objectFit: "contain",
//                 padding: 30,
//                 borderRadius: 30,
//                 boxShadow: "1px 1px 10px 5px rgba(0,0,0,0.5)",
//                 width: 150,
//                 height: 120,
//               }}
//               src="/logo.PNG"
//               alt=""
//             />
//           </div>
//           {updatedData.map((d, i) => {
//             return (
//               <div key={i}>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <label htmlFor={d.key}>{d.label}:</label>
//                 </div>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Form.Item name={d.key}>
//                     <Input style={{ width: 300 }} />
//                   </Form.Item>
//                 </div>
//               </div>
//             );
//           })}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <label htmlFor="password">Şifre</label>
//           </div>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <Form.Item
//               name="password"
//               rules={[
//                 {
//                   required: true,
//                   message: "Şifrenizi giriniz",
//                 },
//               ]}
//             >
//               <Input.Password style={{ width: 300 }} />
//             </Form.Item>
//           </div>
//           {/* <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <label htmlFor="email">E-mail:</label>
//           </div>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <Form.Item
//               name="email"
//               // rules={[
//               //   {
//               //     required: true,
//               //     message: "Xahiş edirik e-poçt ünvanınızı daxil edin.",
//               //   },
//               // ]}
//             >
//               <Input type="email" style={{ width: 300 }} />
//             </Form.Item>
//           </div> */}

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             {/* <div>
//               <Form.Item name="remember" valuePropName="checked">
//                 <Checkbox>Məni xatırla</Checkbox>
//               </Form.Item>
//             </div> */}

//             <div>
//               <Form.Item>
//                 <Button type="primary" htmlType="submit">
//                   Daxil ol
//                 </Button>
//               </Form.Item>
//             </div>
//           </div>
//           <div>
//             <Form.Item name="sign-up">
//               <a
//                 className="forgot_pass"
//                 onClick={() => {
//                   history.push("/sign-up");
//                 }}
//               >
//                 Sign up
//               </a>
//             </Form.Item>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default observer(UserLogin);
