import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getMultimedias } from '../actions/multimedia'
import { EyeOutlined } from '@ant-design/icons';
import { Table, Modal, Spin } from 'antd';
import Alert from '../components/Alert'

const Multimedia = ({multimedias, getMultimedias, loading}) => {
    // useEffect(() => {
    //     console.log(multimedias)
    // }, [multimedias])
    const { id } = useParams();
    useEffect(() => {
        console.log('id', id)
        getMultimedias(id)
    }, [getMultimedias, id])

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
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                        <a onClick={() => setModalData(record)}><EyeOutlined style={{ fontSize: '20px' }} /> </a>
                </span>
            ),
        },
    ]

    return (
        (!loading) ? 
        <div className="container">
            <Alert />
            <h1>All Public Multimedia</h1>
            <Table dataSource={multimedias} columns={columns} />
            <Modal visible={modalData ? true : false} onCancel={() => setModalData(null)} footer={null} width={'100%'} height={'100%'}  bodyStyle={{ height: '100%' }}>
                <iframe style={{ width: '100%', height: '100%', padding: '30px' }} src={modalData ? modalData.link : ''} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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