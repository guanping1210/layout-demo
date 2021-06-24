import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react'

// 资料 https://blog.csdn.net/weixin_43249665/article/details/100084637

const UploadList = () => {
  const [fileList, setFileList] = useState([])
  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    customRequest: (options) => {
      Promise.resolve(res => {
        options.onProgress({ percent: 100})
        options.onSuccess(res, options.file)
      })
    },
    beforeUpload: (file, files) => {
      // console.log(5555, files)

      setFileList(files)

      return false
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
    console.log('-----', formData.entries('key'))


    const res = await fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', { method: 'POST', body: formData }).then(res => res.json)
  }

  return <><Upload {...props}>
  <Button icon={<UploadOutlined />}>Upload Directory</Button>
</Upload>

  <Button onClick={() => onSubmit()}>点我上传</Button></>
}
 
export default UploadList