// import { Form, Input, Button, Checkbox, message } from "antd";
// import "../styles/Login.scss";
// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import { observer } from "mobx-react-lite";
// import { runInAction } from "mobx";
// import { useCookies } from "react-cookie";
// const UserLogin = () => {
//   const history = useHistory();
//   const [cookies, setcookies] = useCookies(["token", "email"]);

//   const onFinish = async (values: any) => {
//     const data = await axios.post(
//       "https://control.titan.az/admin/login",
//       values
//     );
//     if (
//       data.data.message === "Password is wrong" ||
//       data.data.message === "İstifadəçi tapılmadı"
//     ) {
//       message.error("Şifrə və ya e-mail səhvdir!");
//     } else {
//       runInAction(() => {
//         GeneralStore.token = data.data;
//         GeneralStore.email = values.email;
//       });
//       setcookies("token", data, { secure: true, path: "/" });
//       setcookies("email", values.email, { secure: true, path: "/" });
//     }
//   };

//   return (
//     <div id="login">
//       <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             marginBottom: 100,
//           }}
//         >
//           <img
//             style={{
//               backgroundColor: "#241571",
//               objectFit: "contain",
//               padding: 30,
//               borderRadius: 30,
//               boxShadow: "1px 1px 10px 5px rgba(0,0,0,0.5)",
              
//             }}
//             src="/logo-titan.png"
//             alt=""
//           />
//         </div>
//         <label htmlFor="email">E-mail:</label>
//         <Form.Item
//           name="email"
//           rules={[
//             {
//               required: true,
//               message: "Xahiş edirik e-poçt ünvanınızı daxil edin.",
//             },
//           ]}
//         >
//           <Input type="email" style={{ width: 300 }} />
//         </Form.Item>
//         <label htmlFor="password">Şifrə:</label>
//         <Form.Item
//           name="password"
//           rules={[
//             { required: true, message: "Xahiş edirik şifrənizi daxil edin." },
//           ]}
//         >
//           <Input.Password style={{ width: 300 }} />
//         </Form.Item>
//         <div
//           style={{
//             display: "flex",
//             justifyContent:
//               window.innerWidth < 450 ? "center" : "space-between",
//             width: "50%",
//             flexWrap: "wrap",
//           }}
//         >
//           <Form.Item name="remember" valuePropName="checked">
//             <Checkbox>Məni xatırla</Checkbox>
//           </Form.Item>

//           <Form.Item name="remember" valuePropName="checked">
//             <a
//               className="forgot_pass"
//               onClick={() => {
//                 history.push("/reset-password");
//               }}
//             >
//               Şifrəmi unutdum
//             </a>
//           </Form.Item>
//         </div>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Daxil ol
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default observer(UserLogin);
import React from 'react'

const UserLogin = () => {
    return (
        <div>
            
        </div>
    )
}

export default UserLogin
