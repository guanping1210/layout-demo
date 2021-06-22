import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react'

const UploadList = () => {
  const [fileList, setFileList] = useState([])
  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    customRequest: () => {},
    beforeUpload: (file, files) => {
      // console.log(5555, files)

      setFileList(files)

      return Promise.resolve()
    }
  }

  const onSubmit = async() => {
    const formData = new FormData()
    console.log('5555', fileList)

    fileList.forEach(item => {
      formData.append('files', item)
    })
    console.log('=====', formData.getAll('files')) // 获取到文件列表
    console.log('444444', formData.get('files'))  // 只能获取到一个文件

    const res = await fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', { method: 'POST', body: formData }).then(res => res.json)

    console.log('-----', formData)
  }

  return <><Upload {...props} directory>
  <Button icon={<UploadOutlined />}>Upload Directory</Button>
</Upload>

  <Button onClick={() => onSubmit()}>点我上传</Button></>
}
 
export default UploadList