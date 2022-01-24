import {useState} from 'react';
import {Button, Form, Input, Select} from 'antd';

const CryptoJS = require("crypto-js")
export default function () {
  const [form] = Form.useForm();

  const [inputText, setText] = useState('');

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  /**
   *
   * AES 解密
   */
  const decrypt = () => {
  };

  /**
   *
   * AES 加密
   */
  const encrypt = () => {
    console.log(form.getFieldValue(''));
    console.log(inputText);

    const formData = form.getFieldValue('');

    const model = `${formData.model.toLowerCase()}-${formData.dataModule}`;
    const key = formData.password;
    const output = formData.output;
    const charset = formData.charset;
    const iv = formData.offset;
    const padding = formData.fillContent

    // CryptoJS.enc.Hex

    let encrypted = CryptoJS.AES.encrypt(inputText, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
  };


  interface Model {
    name: string
    value: string
  }


  const onChange = (e: any) => {
    console.log(e.target.value);

    setText(e.target.value);
  };

  const models: Array<Model> = [
    {name: 'ECB', value: 'CryptoJS.mode.ECB'},
    {name: 'CBC', value: 'CryptoJS.mode.CBC'},
    {name: 'CTR', value: 'CryptoJS.mode.CTR'},
    {name: 'CFB', value: 'CryptoJS.mode.CFB'},
    {name: 'OFB', value: 'CryptoJS.mode.OFB'},
  ];

  const fillContents = [
    'zeropadding',
    'pkcs5padding',
    'pkcs7pading',
    'isoi0126',
    'ansix923',
    'nopadding',
  ];

  const dataModules = ['128', '192', '256'];

  const outputs = ['base64', 'hex'];

  const chartList = ['gb2312', 'gbk', 'gb19030', 'utf8', 'iso8859-1'];

  return (
    <div>
      <div>
        <Form
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
          //   onFinish={onFinish}
          layout="inline"
          initialValues={{
            model: 'CBC',
            fillContent: 'zeropadding',
            dataModule: '128',
            output: 'base64',
            password: '',
            offset: '',
            charset: 'gb2312',
          }}
        >
          <Form.Item label="AES加密模式：" name="model">
            <Select style={{width: 100}}>
              {models.map((item, index) =>
                <Select.Option key={item.name} value={item.value}>
                  {item.name}
                </Select.Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item label="填充：" name="fillContent">
            <Select style={{width: 140}}>
              {fillContents.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="数据块：" name="dataModule">
            <Select style={{width: 100}}>
              {dataModules.map((item) => (
                <Select.Option
                  key={item}
                  value={item}
                >{`${item}位`}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="密码：" name="password">
            <Input placeholder="请输入密码"/>
          </Form.Item>
          <Form.Item label="偏移量：" name="offset">
            <Input placeholder="请输入偏移量"/>
          </Form.Item>
          <Form.Item label="输出：" name="output">
            <Select style={{width: 100}}>
              {outputs.map((item) => (
                <Select.Option
                  key={item}
                  value={item}
                >{`${item}`}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="字符集：" name="charset">
            <Select style={{width: 150}}>
              {chartList.map((item) => (
                <Select.Option
                  key={item}
                  value={item}
                >{`${item}`}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </div>
      <div>
        <div style={{paddingTop: 10, paddingLeft: 0, paddingRight: 0}}>
          <span>待加密、解密的文本</span>
          <div style={{paddingTop: 10}}>
            <Input.TextArea rows={10} onChange={onChange}/>
          </div>
        </div>
        <div
          style={{
            marginTop: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Button type="primary" onClick={encrypt}>
            AES加密
          </Button>
          <div style={{width: 20}}></div>
          <Button type="primary" onClick={decrypt}>
            AES解密
          </Button>
        </div>
        <div style={{paddingTop: 20, paddingLeft: 0, paddingRight: 0}}>
          <span>AES加密、解密转换结果(base64了)</span>
          <div style={{paddingTop: 10}}>
            <Input.TextArea rows={10}/>
          </div>
        </div>
      </div>
    </div>
  );
}
