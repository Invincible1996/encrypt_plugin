import {useState} from 'react';
import {Button, Form, Input, message, Select} from 'antd';

const CryptoJS = require("crypto-js")
export default function () {
  const [form] = Form.useForm();
  const [inputText, setText] = useState('');

  const [outputValue, setOutputValue] = useState('')


//解密方法
  function Decrypt(word: string, password: string, offset: string, index: number, paddingIndex: number): string {
    const key = CryptoJS.enc.Utf8.parse(password); //十六位十六进制数作为秘钥
    const iv = CryptoJS.enc.Utf8.parse(offset); //十六位十六进制数作为秘钥偏移量
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, {
      iv: iv,
      mode: models[index].value,
      padding: CryptoJS.pad.ZeroPadding,
      // padding: paddingTypeList[paddingIndex].value
    });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }

//加密方法
  function Encrypt(word: string, password: string, offset: string, index: number, paddingIndex: number): string {

    console.log('sssssss', models[0].value)
    console.log('sssssss', paddingTypeList[0].value)
    // console.log(getModelByName(model))

    const key = CryptoJS.enc.Utf8.parse(password); //十六位十六进制数作为秘钥
    const iv = CryptoJS.enc.Utf8.parse(offset);
    let src = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(src, key, {
      iv: iv,
      mode: models[index].value,
      padding: CryptoJS.pad.ZeroPadding,
    });
    return encrypted.ciphertext.toString().toUpperCase();
  }

  /**
   *
   * AES 加密
   */
  const encrypt = (type: number) => {
    console.log(form.getFieldsValue());
    // console.log(inputText);
    const formData = form.getFieldsValue();
    if (!formData.password) {
      message.error('密码必填')
      return
    }
    const model = formData.model;
    const password = formData.password;    // 密钥
    const output = formData.output;   // 输出 base64 or hex
    const charset = formData.charset; // 字符集
    const offset = formData.offset; // 偏移量
    const padding = formData.fillContent // 填充

    if (type === 0) {
      let str = Encrypt(inputText, password, offset, model, padding)
      setOutputValue(str)
    } else {
      let result = Decrypt(inputText, password, offset, model, padding)
      setOutputValue(result)
    }

  };

  /**
   *
   * @param name
   */
  function getPaddingByName(name: string): any {
    switch (name) {
      case 'zeropadding':
        return CryptoJS.pad.ZeroPadding
      case 'pkcs5padding':
        return CryptoJS.pad.Pkcs5
      case 'pkcs7padding':
        return CryptoJS.pad.Pkcs7
      case 'iso10126':
        return CryptoJS.pad.Iso10126
      case 'ansix923':
        return CryptoJS.pad.AnsiX923
      case 'nopadding':
        return CryptoJS.pad.NoPadding
    }
  }

  /**
   *
   *
   */
  interface Model {
    name: string
    value: string
  }

  interface PaddingType {
    name: string
    value: object
  }

  const paddingTypeList: Array<PaddingType> = [
    {name: 'zeropadding', value: CryptoJS.pad.ZeroPadding},
    {name: 'pkcs5padding', value: CryptoJS.pad.Pkcs5},
    {name: 'pkcs7padding', value: CryptoJS.pad.Pkcs7},
    {name: 'iso10126', value: CryptoJS.pad.Iso10126},
    {name: 'ansix923', value: CryptoJS.pad.AnsiX923},
    {name: 'nopadding', value: CryptoJS.pad.NoPadding}
  ]


  /**
   *
   *
   * @param e
   */
  const onChange = (e: any) => {
    setText(e.target.value);
  };

  const models: Array<Model> = [
    {name: 'ECB', value: CryptoJS.mode.ECB},
    {name: 'CBC', value: CryptoJS.mode.CBC},
    {name: 'CTR', value: CryptoJS.mode.CTR},
    {name: 'CFB', value: CryptoJS.mode.CFB},
    {name: 'OFB', value: CryptoJS.mode.OFB},
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
            model: 0,
            padding: 0,
            dataModule: '256',
            output: 'hex',
            password: '',
            offset: '',
            charset: 'utf8',
          }}
        >
          <Form.Item label="AES加密模式：" name="model">
            <Select style={{width: 100}}>
              {models.map((item, index) =>
                <Select.Option key={item.name} value={index}>
                  {item.name}
                </Select.Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item label="填充：" name="padding">
            <Select style={{width: 140}}>
              {paddingTypeList.map((item, index) => (
                <Select.Option key={item.name} value={index}>
                  {item.name}
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
            <Input placeholder="iv偏移量,ebc模式不需要"/>
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
          <Button type="primary" onClick={() => encrypt(0)}>
            AES加密
          </Button>
          <div style={{width: 20}}></div>
          <Button type="primary" onClick={() => encrypt(1)}>
            AES解密
          </Button>
        </div>
        <div style={{paddingTop: 20, paddingLeft: 0, paddingRight: 0}}>
          <span>AES加密、解密转换结果(base64了)</span>
          <div style={{paddingTop: 10}}>
            <Input.TextArea rows={10} value={outputValue}/>
          </div>
        </div>
      </div>
    </div>
  );
}
