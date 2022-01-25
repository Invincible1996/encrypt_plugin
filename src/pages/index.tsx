import {Form} from 'antd';
import {useState} from 'react';
// @ts-ignore
import TopForm2 from './TopForm2';
import TopForm from "@/pages/TopForm";

export default function IndexPage() {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();

  return (
    <div style={{padding: 20}}>
      <h1>在线AES加密解密、AES在线加密解密、AES encryption and decryption</h1>
      {/*<TopForm/>*/}
      <TopForm2/>
    </div>
  );
}
