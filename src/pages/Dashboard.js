import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { myMultimedia, createMultimedia, deleteMultimedia } from '../actions/multimedia'
import { UserOutlined, InboxOutlined, UploadOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Modal, Upload, Spin, Checkbox, Badge } from 'antd'
import { loadUser } from '../actions/auth'
import { setAlert } from '../actions/alert'
import './Dashboard.css'
import Alert from '../components/Alert'

const Dashboard = ({ multimedia: { multimedia }, myMultimedia, auth, createMultimedia, setAlert, deleteMultimedia }) => {
    const [modalData, setModalData] = useState(null);
    const [createModal, setCreateModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        file: '',
        type: '',
        public: true,
    })

    const [fileList, setFileList] = useState([])
    
    const { title, description, file, type } = formData

    useEffect(() => {
        console.log(multimedia)
        if (!auth.loading && auth.user) {
            // <Spin />
            loadUser()
        }
        console.log(auth)
        if(auth.user)
            myMultimedia(auth.user.id)
    }, [myMultimedia, auth])
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (text, record) => (
                <span>
                    {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                </span>
            ),
            filters: [
                {
                    text: 'Image',
                    value: 'image',
                },
                {
                    text: 'Video',
                    value: 'video',
                },
                {
                    text: 'Audio',
                    value: 'audio',
                },
                {
                    text: 'Document',
                    value: 'document',
                }
            ],
            onFilter: (value, record) => record.type.indexOf(value) === 0,
        },
        {
            title: 'Privacy',
            dataIndex: 'public',
            key: 'public',
            render: (text, record) => (
                <span>
                    {console.log('record.public', record.public == 1)}
                    <Badge count={record.public ? 'Public' : 'Private'} color={record.public === 1 ? 'green' : 'red'} />
                </span>
            ),
            filters: [
                {
                    text: 'Public',
                    value: 1,
                },
                {
                    text: 'Private',
                    value: 0,
                }
            ],
            onFilter: (value, record) => record.public == value,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <span>
                        <a onClick={() => setModalData(record)}><EyeOutlined style={{ fontSize: '20px' }} /> </a>
                    </span>
                    <span>
                        <a onClick={()=> deleteMultimedia(record.id)}><DeleteOutlined style={{ fontSize: '20px', color: 'red' }} /> </a>
                    </span>
                </>
            ),
        },
    ]
    const handleFileChange = (info) => {
        setFileList(info.fileList.slice(-1)); // Limit to the last file uploaded
        setFormData({ ...formData, file: info.fileList[0].originFileObj })
    };
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = async e => {
        e.preventDefault()
        // setFormData({ ...formData, file: fileList[0].originFileObj })
        console.log(formData)
        if(!formData.title || !formData.description || !formData.file || formData.type === '0')
            setAlert('Please fill all the fields', 'danger')
        else {
            createMultimedia(formData)
            setCreateModal(false)
            setFormData({
                title: '',
                description: '',
                file: '',
                type: '',
                public: true,
            })
        }
        setFileList([])
    }

    const handleBeforeUpload = () => {
        return false
    }
    const handleRemove = () => {
        setFileList([]);
    };
    if (!auth.isAuthenticated && !auth.loading) {
        return <Navigate to='/login' />
    }
    return (
        (auth.isAuthenticated && !auth.loading && auth.user) ? (
        <div className='container'>
            <Alert />
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <UserOutlined /> Welcome to your dashboard
            </p>
            <div className="dash-buttons">
                <Link to="#" className="btn btn-light" onClick={() => setCreateModal(true)}>
                    <i className="fas fa-user-circle text-primary"></i> Create Multimedia
                </Link>
            </div>
            <h2 className="my-2">My Multimedia</h2>
            {multimedia.length > 0 ? (
                <Table dataSource={multimedia} columns={columns} />
            ) : (
                <h4>No multimedia found...</h4>
            )}
            <Modal visible={modalData ? true : false} onCancel={() => setModalData(null)} footer={null} width={'100%'} height={'100%'}  bodyStyle={{ height: '100%' }}>
                <iframe style={{ width: '100%', height: '100%', padding: '30px' }} src={modalData ? modalData.link : ''} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </Modal>
            <Modal visible={createModal} onCancel={() => setCreateModal(false)} footer={null}>
                <h1>Add Multimedia</h1>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input type="text" placeholder="Title"  name="title" value={title} onChange={e => onChange(e)} />
                    </div>
                    <div className="form-group">
                        <textarea placeholder="Description" name="description" onChange={e => onChange(e)} rows="4" cols="50" value={description}></textarea>
                    </div>
                    <div className="form-group">
                        <select name="type" value={type} onChange={e => onChange(e)}>
                            <option value="0">* Select Multimedia Type</option>
                            <option value="video">Video</option>
                            <option value="audio">Audio</option>
                            <option value="image">Image</option>
                            <option value="document">Document</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <Upload.Dragger multiple={false} beforeUpload={handleBeforeUpload} onChange={handleFileChange} fileList={fileList} onRemove={handleRemove}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single file upload.
                            </p>
                        </Upload.Dragger>
                    </div>
                    <div className="form-group">
                        {/* checkbox button for public or private */}
                        <Checkbox name="public" onChange={e => setFormData({ ...formData, public: !e.target.checked })} checked={!formData.public}>Private</Checkbox>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Create" />
                </form>
            </Modal>
        </div>)
        : <div className='container'>
            <Alert />
            <h1 className="large text-primary">Dashboard</h1>
            <Spin />
        </div>
    )
}

Dashboard.propTypes = {
    multimedia: PropTypes.array.isRequired,
    myMultimedia: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    createMultimedia: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    multimedia: state.multimedia,
    auth: state.auth
})


export default connect(mapStateToProps, { myMultimedia, createMultimedia, setAlert, deleteMultimedia })(Dashboard)