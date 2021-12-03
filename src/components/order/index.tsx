import {Select, List, Skeleton} from 'antd';
import {connect} from "react-redux";

import OrderByActions from '../../redux/OrderByRedux'
import OrderByExchangesActions from '../../redux/OrderByExchangesRedux'
import OrderByMarketsActions from '../../redux/OrderByMarketsRedux'
import TimePeriodActions from '../../redux/TimePeriodRedux'
import OrderDirectionRedux from '../../redux/OrderDirectionRedux'
import React from "react";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

type OrderProps = { setOrderByMarkets: any, orderByMark: any, orderBy: any, setOrderBy: any, orderByExch: any, setOrderByExchanges: any, type: string, orderDirection: any, timePeriod: any, setTimePeriod: any, setOrderDirection: any }


const Order: React.FC<OrderProps> = (props) => {
    const { Option } = Select;
    const { setOrderByMarkets, orderByMark, orderBy, setOrderBy, orderByExch, setOrderByExchanges, type, orderDirection, timePeriod, setTimePeriod, setOrderDirection } = props
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

    const orderDirectionData = [
        {
            name: 'Descending',
            value: 'desc'
        },
        {
            name: 'Ascending',
            value: 'asc'
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

    const timePeriodData = [
        {
            name: 'Day',
            value: '24h'
        },
        {
            name: 'Week',
            value: '7d'
        },
        {
            name: 'Month',
            value: '30d'
        },
        {
            name: 'Year',
            value: '1y'
        },
        {
            name: 'All',
            value: '5y'
        }
    ]
    const array = type === 'exchanges' ? orderByExchanges : type === 'coins' ? orderByCoins : type === 'markets' ? orderByMarkets : type === 'direction' ? orderDirectionData : timePeriodData

    return <Select value={type === 'exchanges' ? orderByExch.data.name : type === 'coins' ? orderBy.data.name : type === 'markets' ? orderByMark.data.name : type === 'direction' ? orderDirection.data.name : timePeriod.data.name} style={{ width: 200, justifyContent: 'center' }}>
        {array.map((item: any) =>
            <Option value={item.name} style={{ flexDirection: 'row', display: 'flex' }}>
                <List.Item
                    style={{padding: 5}}
                    onClick={() => type === 'exchanges' ? setOrderByExchanges(item) : type === 'coins' ? setOrderBy(item) : type === 'markets' ? setOrderByMarkets(item) : type === 'direction' ? setOrderDirection(item) : setTimePeriod(item)}
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
        orderByMark: state.orderByMarkets,
        timePeriod: state.timePeriod,
        orderDirection: state.orderDirection
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        setOrderBy: (item: any) => dispatch(OrderByActions.orderByRequest(item)),
        setOrderByExchanges: (item: any) => dispatch(OrderByExchangesActions.orderByExchangesRequest(item)),
        setOrderByMarkets: (item: any) => dispatch(OrderByMarketsActions.orderByMarketsRequest(item)),
        setTimePeriod: (item: any) => dispatch(TimePeriodActions.timePeriodRequest(item)),
        setOrderDirection: (item: any) => dispatch(OrderDirectionRedux.orderDirectionRequest(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
