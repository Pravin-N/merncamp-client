import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import {CameraOutlined, LoadingOutlined} from '@ant-design/icons'
import {Avatar} from 'antd';
// import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';


const PostForm = ({content, setContent, postSubmit, handleImage, uploading, image}) => {

    return (
        <div className="card">
            <div className="card-body pb-3">
                <form className="form-group" >
                    <ReactQuill theme='snow' className="form-control" placeholder="Write something..." value={content} onChange={ (e) => setContent(e)}/>
                    
                    <div className="card-footer d-flex justify-content-between text-muted">

                        <button disabled={!content} className="btn btn-primary btn-sm mt-1" onClick={postSubmit}>Post</button>
                        <label>
                        {
                            image && image.url ? (
                                <Avatar size={30} src={image.url} className='mt-1'/>
                            ) : uploading ? (<LoadingOutlined className='mt-2'/>): (<CameraOutlined className='mt-2'/>)
                        }
                             <input type="file" accept="images/*" hidden onChange={handleImage}/>
                             </label>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default PostForm;