import React from 'react'
import PropTypes from 'prop-types'
import { List, Button, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST} from '../reducers/user';
import { useDispatch } from 'react-redux';

const FollowList = ({ header, data }) => {
    const dispatch = useDispatch();
    const onCancel = (id) => () => {  // 반복문 (renderItem)에서만 유효한 것인데, 고차함수를 이용해서 데이터(item.id)를 첫번째 ()에 넣을 수 있음 
        if(header === '팔로잉'){
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: id,
            });
        }
        dispatch({
            type: REMOVE_FOLLOWER_REQUEST,
            data: id,
        });
    };

    return (
        <List
            style={{ marginBottom: 20}}
            grid={{gutter: 4, xs: 2,md: 3}}
            size="small"
            header={<div>{header}</div>}
            loadMore={<div style={{ textAlign: 'center', margin: '10px 0'}}><Button>더보기</Button></div>}
            bordered
            dataSource={data}
            renderItem={(item)=>(
                <List.Item style={{ marginTop: 20 }}>
                    <Card actions={[ <StopOutlined key="stop" onClick={onCancel(item.id)} />]}> 
                        <Card.Meta description={item.nickname} />
                    </Card>
                </List.Item>
            )}

        >
        
        </List>
    )
}

FollowList.propTypes = {
    header: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
};

export default FollowList
