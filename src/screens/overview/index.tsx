import React, {useEffect} from 'react';
import { List, Avatar, Skeleton, Card, Divider } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash'
import './styles.less'
import OverviewActions from '../../redux/OverviewRedux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from "redux-thunk";
import {RiCoinsLine, RiHandCoinFill} from 'react-icons/ri';
import {FaHandHoldingWater} from 'react-icons/fa';
import {BsCurrencyExchange} from 'react-icons/bs';
import {SiMarketo} from 'react-icons/si';
import {useViewportWidth} from "../../hooks";
type OverviewProps = {
    overview: any,
    refCurrencyUuid: any;
    getOverview: any;
}
const Overview: React.FC<OverviewProps> = (props) => {
    const {overview, refCurrencyUuid, getOverview} = props

    const {width} = useViewportWidth();
    useEffect(() => {
        getOverview(refCurrencyUuid?.data?.value)
    }, [refCurrencyUuid]);
    return (
        <div >
            <h1 className='header-title'>Crypto market overview & total market cap</h1>
            <h4 className='header-subtitle'>An overview of the cryptocurrency market, including the total market cap, trading volume and number of coins.</h4>
        <Card >
                <List.Item
                >
                    <Skeleton avatar title={false} active loading={overview.fetching}>
                        <List.Item.Meta
                            avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon={<RiHandCoinFill />} />}
                            title={<h1 className='title'>Crypto market cap</h1>}
                            description={width < 620 &&
                            <h4 className='content'>{`${refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} ${_.ceil(_.get(overview, 'payload.data.totalMarketCap'), 5)}`}</h4>}
                        />
                        {width > 620 && <h2 className='content'>{`${refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} ${_.ceil(_.get(overview, 'payload.data.totalMarketCap'), 5)}`}</h2>}
                    </Skeleton>
                </List.Item>
            <Divider/>
                <List.Item
                >
                    <Skeleton avatar title={false} active loading={overview.fetching}>
                        <List.Item.Meta
                            avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon={<FaHandHoldingWater />} />}
                            title={<h1 className='title'>24h volume</h1>}
                            description={width < 620 &&
                            <h4 className='content'>{`${refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} ${_.ceil(_.get(overview, 'payload.data.total24hVolume'), 5)}`}</h4>}
                        />
                        {width > 620 && <h2 className='content'>{`${refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} ${_.ceil(_.get(overview, 'payload.data.total24hVolume'), 5)}`}</h2>}
                    </Skeleton>
                </List.Item>
            <Divider/>
                <List.Item
                >
                    <Skeleton avatar title={false} active loading={overview.fetching}>
                        <List.Item.Meta
                            avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon={<RiCoinsLine />} />}
                            title={<h1 className='title'>Cryptocurrencies</h1>}
                            description={width < 620 && <h4 className='content'>{_.get(overview, 'payload.data.totalCoins')}</h4>}
                        />
                        {width > 620 && <h2 className='content'>{_.get(overview, 'payload.data.totalCoins')}</h2>}
                    </Skeleton>
                </List.Item>
            <Divider/>
                <List.Item
                >
                    <Skeleton avatar title={false} active loading={overview.fetching}>
                        <List.Item.Meta
                            avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon={<BsCurrencyExchange />} />}
                            title={<h1 className='title'>Exchanges</h1>}
                            description={width < 620 && <h4 className='content'>{_.get(overview, 'payload.data.totalExchanges')}</h4>}
                        />
                        {width > 620 && <h2 className='content'>{_.get(overview, 'payload.data.totalExchanges')}</h2>}
                    </Skeleton>
                </List.Item>
            <Divider/>
                <List.Item
                >
                    <Skeleton avatar title={false} active loading={overview.fetching}>
                        <List.Item.Meta
                            avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon={<SiMarketo />} />}
                            title={<h1 className='title'>Markets</h1>}
                            description={width < 620 && <h4 className='content'>{_.get(overview, 'payload.data.totalMarkets')}</h4>}
                        />
                        {width > 620 && <h2 className='content'>{_.get(overview, 'payload.data.totalMarkets')}</h2>}
                    </Skeleton>
                </List.Item>
                </Card>
        </div>
    );

}

const mapStateToProps = (state: any) => {
    return {
        overview: state.overview,
        refCurrencyUuid: state.uuid
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getOverview: (refCurrencyUuid: string) => dispatch(OverviewActions.overviewRequest(refCurrencyUuid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
