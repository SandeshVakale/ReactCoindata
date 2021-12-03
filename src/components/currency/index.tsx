import {Select, List, Skeleton, Avatar} from 'antd';
import {connect} from "react-redux";
import CurrenciesActions from '../../redux/CurrenciesRedux'
import UuidActions from '../../redux/UuidRedux'
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import React, {useEffect} from "react";
import _ from "lodash";

type CurrencyProps = { currency: any, uuid: any, getCurrencies: any, setUuid: any }


const Currencies: React.FC<CurrencyProps> = (props) => {
    const { Option } = Select;
    const { currency, getCurrencies, setUuid, uuid } = props
    const onClick = (item: any) => {
        setUuid(item)
    };

    useEffect(() => {
        getCurrencies()
    }, [])

    return <Select value={uuid.data.symbol} style={{ width: 200 }}>
        {currency?.payload?.data?.currencies.map((item: any) =>
            <Option value={item.uuid} style={{ flexDirection: 'row', display: 'flex' }}>
                <List.Item
                    onClick={() => onClick(item)}
                >
                    <Skeleton avatar title={false} active loading={false}>
                        <List.Item.Meta
                            avatar={<img src={item.iconUrl} style={{height: 25, width: 25}} />}
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
        currency: state.currency,
        uuid: state.uuid
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getCurrencies: () => dispatch(CurrenciesActions.currenciesRequest()),
        setUuid: (item: any) => dispatch(UuidActions.uuidRequest(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Currencies)
