import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getMultimedias } from '../actions/multimedia'
import { EyeOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import { Table, Modal, Spin, Input } from 'antd';
import Alert from '../components/Alert'

const Search = Input.Search;

const Multimedia = ({multimedias, getMultimedias, loading}) => {
    const { id } = useParams();
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        // console.log('id', id)
        getMultimedias(id)
    }, [getMultimedias, id])

    useEffect(() => {
        if (multimedias) {
            setTableData(multimedias)
        }
    }, [multimedias])

    const [modalData, setModalData] = useState(null);

    const columns = [
        {
            title: 'Author',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <span>
                    <Link to={`/multimedia/${record.id}`}>{record.name}</Link>
                </span>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
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
                    text: 'Video',
                    value: 'video',
                },
                {
                    text: 'Audio',
                    value: 'audio',
                },
                {
                    text: 'Image',
                    value: 'image',
                },
                {
                    text: 'Document',
                    value: 'document',
                }
            ],
            onFilter: (value, record) => record.type.indexOf(value) === 0,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>
                            <a onClick={() => setModalData(record)}><EyeOutlined style={{ fontSize: '20px' }} /> </a>
                    </span>
                </div>
            ),
        },
    ]
    const onSearchTitle = value => {
        console.log(value)
        if(value === '')
            setTableData(multimedias)
        else {
            let filteredData = multimedias.filter((data) => {
                return data.title.toLowerCase().includes(value.toLowerCase())
            })
            setTableData(filteredData)
        }
    }

    const onSearchDescription = value => {
        console.log(value)
        if(value === '')
            setTableData(multimedias)
        else {
            let filteredData = multimedias.filter((data) => {
                return data.description.toLowerCase().includes(value.toLowerCase())
            })
            setTableData(filteredData)
        }
    }

    const onSearchAuthor = value => {
        console.log(value)
        if(value === '')
            setTableData(multimedias)
        else {
            let filteredData = multimedias.filter((data) => {
                return data.name.toLowerCase().includes(value.toLowerCase())
            })
            setTableData(filteredData)
        }
    }

    return (
        (!loading) ? 
        <div className="container">
            <Alert />
            <h1>All Public Multimedia</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Search
                    placeholder="Enter Author"
                    onSearch={onSearchAuthor}
                    style={{ width: 300 }}
                />

                <Search
                    placeholder="Enter Title"
                    onSearch={onSearchTitle}
                    style={{ width: 300 }}
                />

                <Search
                    placeholder="Enter Description"
                    onSearch={onSearchDescription}
                    style={{ width: 300 }}
                />
                
            </div>
            
            <Table dataSource={tableData} columns={columns} />
            <Modal visible={modalData ? true : false} onCancel={() => setModalData(null)} footer={null} width={'100%'} height={'100%'}  bodyStyle={{ height: '100%' }}>
                <iframe style={{ width: '100%', height: '100%', padding: '30px' }} src={modalData ? modalData.link : ''} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <div style={{ position: 'absolute', top: '0px', right: '50px' }}>
                    <a href={modalData ? modalData.link.replace('upload/', 'upload/fl_attachment:' + modalData.title + '/') : ''} target="_blank" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <CloudDownloadOutlined style={{ fontSize: '40px' }} />
                    </a>
                </div>
            </Modal>
        </div> : <div className="container text-center">
            <Spin size='large' />
        </div>
    )
}

Multimedia.propTypes = {
    multimedias: PropTypes.array.isRequired,
    getMultimedias: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    multimedias: state.multimedia.multimedias,
    loading: state.multimedia.loading
})

export default connect(mapStateToProps, { getMultimedias })(Multimedia)