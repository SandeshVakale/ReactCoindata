import {Select, List, Skeleton} from 'antd';
import {connect} from "react-redux";

import OrderByActions from '../../redux/OrderByRedux'
import OrderByExchangesActions from '../../redux/OrderByExchangesRedux'
import OrderByMarketsAtions from '../../redux/OrderByMarketsRedux'
import React from "react";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

type OrderProps = { setOrderByMarkets: any, orderByMark: any, orderBy: any, setOrderBy: any, orderByExch: any, setOrderByExchanges: any, type: string }


const Order: React.FC<OrderProps> = (props) => {
    const { Option } = Select;
    const { setOrderByMarkets, orderByMark, orderBy, setOrderBy, orderByExch, setOrderByExchanges, type } = props
    const orderByCoins = [
        {
            name: 'Price',
            value: 'price'
        },
        {
            name: 'Market Cap',
            value: 'marketCap'
        },
        {
            name: 'Change',
            value: 'change'
        }
    ]

    const orderByMarkets = [
        {
            name: 'Price',
            value: 'price'
        },
        {
            name: '24h Volume',
            value: '24hVolume'
        }
    ]

    const orderByExchanges = [
        {
            name: '24h Volume',
            value: '24hVolume'
        },
        {
            name: 'Markets',
            value: 'numberOfMarkets'
        },
        {
            name: 'Last Ticker',
            value: 'lastTickerCreatedAt'
        }
    ]

    const array = type === 'exchanges' ? orderByExchanges : type === 'coin' ? orderByCoins : orderByMarkets

    return <Select value={type === 'exchanges' ? orderByExch.data.name : type === 'coin' ? orderBy.data.name : orderByMark.data.name} style={{ width: 200, justifyContent: 'center' }}>
        {array.map((item: any) =>
            <Option value={item.name} style={{ flexDirection: 'row', display: 'flex' }}>
                <List.Item
                    style={{padding: 5}}
                    onClick={() => type === 'exchanges' ? setOrderByExchanges(item) : type === 'coin' ? setOrderBy(item) : setOrderByMarkets(item)}
                >
                    <Skeleton avatar={false} title active loading={false}>
                        <List.Item.Meta
                            title={item.name}
                        />
                    </Skeleton>
                </List.Item>
            </Option>
        )}
    </Select>

}

const mapStateToProps = (state: any) => {
    return {
        orderBy: state.orderBy,
        orderByExch: state.orderByExchanges,
        orderByMark: state.orderByMarkets
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        setOrderBy: (item: any) => dispatch(OrderByActions.orderByRequest(item)),
        setOrderByExchanges: (item: any) => dispatch(OrderByExchangesActions.orderByExchangesRequest(item)),
        setOrderByMarkets: (item: any) => dispatch(OrderByMarketsAtions.orderByMarketsRequest(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
