import React ,{useState} from 'react'
import { Typography, Button, Form, message, Input } from 'antd';
import Icon from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions =[
    {value : 0, label: "Private"}, 
    {value : 1, label: "Public"},
]

const CategoryOptions=[
    {value: 0, label: "Film & Animation"},
    {value: 1, label: "Autos & Vehicles"},
    {value: 2, label: "Music"},
    {value: 3, label: "Pets & Animals"},

]

function VideoUploadPage(props) {
    
    //* redux state스토어에 가서 user의 정보를 가져옴
    const user = useSelector(state => state.user);

    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")

    //* 비디오, 썸네일 정보 
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [ThumbnailPath, setThumbnailPath] = useState("")
 
    const onTitleChange = (event) =>{
        // console.log(event); //이벤트 발생
        setVideoTitle(event.currentTarget.value)
    }
    const onDescriptionChange = (event) =>{
        setDescription(event.currentTarget.value)
    }

    const onPrivateChange = (e) =>{
        setPrivate(e.currentTarget.value)        
    }
    const onCategoryChange= (e) =>{
        setPrivate(e.currentTarget.value)        
    }
    //* 비디오 업로드 & 썸네일 생성
    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header : {'content-type': 'multipart/form-data'}
        }

        formData.append("file", files[0])

        console.log(files);

        Axios.post('/api/video/uploadfiles', formData, config)
            .then(res =>{
                if(res.data.success){
                    console.log(res.data)

                    //* 서버에서 받은 데이터
                    let variable ={
                        url: res.data.url,
                        fileName: res.data.fileName
                    }

                    setFilePath(res.data.url)

                    Axios.post('/api/video/thumbnail', variable)
                        .then(res => {
                            if(res.data.success){
                                console.log(res.data)

                                setDuration(res.data.fileDuration)
                                setThumbnailPath(res.data.url)
                            }else{
                                alert('썸네일 생성에 실패 했습니다.')
                            }
                        })
                
                    
                }else{
                    alert('비디오 업로드를 실패하였습니다.')
                }
            })

    }

    //* 비디오 업로드 DB 저장 & 랜딩페이지에 보여주기
    const onSubmit = (e) =>{
        //* 원래 클릭하면 동작하려고 했던 이벤트 방지 
        e.preventDefault();

        //* 이벤트 커스터마이징
        //* 비디오 컬렉션에 넣을 내용
        const variables = {
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            duration: Duration,
            thumbnail: ThumbnailPath,

        }

        Axios.post('/api/video/uploadVideo', variables)
            .then(res => {
                if(res.data.success){
                    console.log(res.data);
                    message.success('성공적으로 업로드를 했습니다.')

                    // 업로드 후 3초 뒤에 랜딩페이지로 이동
                    setTimeout(() =>{
                        props.history.push('/')    
                    },3000);
                    
                    
                }else{
                    alert('비디오 업로드에 실패하였습니다.')
                }
            })
    }

    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    {/* Drop zone */}
                    <Dropzone
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={1000000000}>
                    {({ getRootProps, getInputProps}) =>(
                        <div style={{ width: '300px', height: '240px', border:'1px solid lightgray', display:'flex',
                        alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                            <input {...getInputProps()}/>
                            <Icon type="plus" style={{ fontSize:'3rem'}}/>

                        </div>
                    )}

                    </Dropzone>
                    {/* Thumbnail */
                    // ThumbnailPath가 있을 때만 렌더링됨
                    }
                    {ThumbnailPath &&
                        <div>
                            <img src={`http://localhost:5000/${ThumbnailPath}`} art="thumbnail" />
                        </div>
                    }
                    
                    

                </div>
                

        <br />
        <br />
        <label>Title</label>
        <Input
            onChange={onTitleChange}
            value={VideoTitle}
        />
        <br />
        <br />
        <label>Description</label>
        <TextArea
            onChange={onDescriptionChange}
            value={Description}
        />
        <br />
        <br />

        <select onChange={onPrivateChange}>
                 {PrivateOptions.map((item,index) =>(
                    <option key={index} value={item.value}>{item.label}</option>   
                ))}       
        </select>  
        <br />
        <br />

        <select onChange={onCategoryChange}>
                 {CategoryOptions.map((item,index) =>(
                    <option key={index} value={item.value}>{item.label}</option>   
                ))}       
        </select> 
        <br />
        <br />


        <Button type="primary" size="large" onClick={onSubmit}> 
            Submit
        </Button>
            </Form>
            
        </div>
    )
}

export default VideoUploadPage
