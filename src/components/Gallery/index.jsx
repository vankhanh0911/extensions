import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import './style.css';
import { Modal, Button } from 'antd';

const Gallery = (props) => { 

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        const url = `https://sandbox-media-template.antsomi.com/cdp/api/v1/media-template-type/index?&_token=5474r2x214z26484u2e4y4u5v23474x5x2v2u2c454&_user_id=1600081319&_account_id=1600081319&portalId=33167&languageCode=en`;

        axios.get(url).then((res) => { 
            if (res && res.data && res.data.data) {
                setTypes(res.data.data);
            }
        });
    }, []);

    useEffect(() => {
        setIsModalVisible(props.isModalVisible)
        console.log('run effect');
    }, [props.isModalVisible]);

    return (
        <>
            <Modal title="Select template" visible={isModalVisible} onOk={props.handleOk} onCancel={props.handleCancel}>
                {types && types.length && types.map((type) => {
                    return (<p>{type.template_code}</p>);
                })}
            </Modal>
        </>
    );
}

export default Gallery;

