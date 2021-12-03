import React, {useEffect, useMemo, useState} from "react";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import { Pagination } from 'antd';
import MarketsActions from '../../redux/MarketsRedux'
import { AgGridReact } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import _ from 'lodash';
import {GoThumbsup, GoThumbsdown} from 'react-icons/go';
import {useViewportHeight, useViewportWidth} from "../../hooks";
import Currencies from "../../components/currency";
import Order from "../../components/order";
type MarketsProps = { getMarkets: any, markets: any, refCurrencyUuid: any, orderDirection: any, orderByMarkets: any }
const Markets: React.FC<MarketsProps> = (props) => {

    const { getMarkets, refCurrencyUuid, orderByMarkets, orderDirection, markets } = props
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const modules = useMemo( ()=> [ClientSideRowModelModule, RangeSelectionModule, RowGroupingModule, RichSelectModule], [])
    const {height} = useViewportHeight()
    const {width} = useViewportWidth()

    function ImageRender(params: any) {
        return (
            <span className="my-renderer">
            <img src={params.value.iconUrl} style={{height: 30, width: 30}}/>
          </span>
        );
    }

    function VolumeRender(params: any) {
        return (
            <span className="my-renderer">
            <div >{refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} {_.ceil(params.value, 2)}</div>
          </span>
        );
    }

    function NameRender(params: any) {
        return (
            <span className="my-renderer">
            <div >{params.value.symbol}</div>
          </span>
        );
    }

    function IconRender(params: any) {
        return (
            params.value ? <GoThumbsup color={'green'}/> : <GoThumbsdown color={'red'}/>
        );
    }
    const columnDefs = [
        { field: 'rank', width: 80 },
        { headerName: 'Logo', width: 100, field: 'exchange', cellRendererFramework: ImageRender },
        { field: 'base', cellRendererFramework: NameRender },
        { field: 'quote', cellRendererFramework: NameRender },
        { field: '24hVolume', cellRendererFramework: VolumeRender },
        { field: 'marketShare' },
        { field: 'price', cellRendererFramework: VolumeRender },
        { field: 'recommended', cellRendererFramework: IconRender },
    ]

    // never changes, so we can use useMemo
    const defaultColDef = {
        resizable: true,
        sortable: false
    }
    useEffect(() => {
        getMarkets(refCurrencyUuid.data.uuid, orderByMarkets.data.value, orderDirection.data.value, pageSize, ((page - 1) * pageSize))
    }, [ refCurrencyUuid, orderByMarkets, orderDirection ])


    let rowData: any[] = [];
    const onChange = (page: number, pageSize: number) => {
        setPage(page)
        setPageSize(pageSize)
        getMarkets(refCurrencyUuid.data.uuid, orderByMarkets.data.value, orderDirection.data.value, pageSize, ((page - 1) * pageSize))
    }
    markets?.payload?.data?.markets && markets?.payload?.data?.markets.map((item: any) => rowData.push(item))
    return <div className="ag-theme-alpine" style={{height: height - 150, width: width - 100}}>
        <h1 className='header-title'>Top crypto exchange markets</h1>
        <h4 className='header-subtitle'>Discover all {markets?.payload?.data?.stats?.total ? markets?.payload?.data?.stats?.total : 23891} cryptocurrency markets and top trading pairs from every exchange, ranked by {orderByMarkets.data.name}.</h4>
        <div className='settings'><Currencies /> <Order type={'markets'} /> <Order type={'direction'} /></div>
        {!markets.fetching && <AgGridReact
            containerStyle={{height: height - 300, width: width - 100}}
            // turn on AG Grid React UI
            reactUi={true}
            // all other properties as normal...
            className="ag-theme-alpine"
            animateRows={true}
            modules={modules}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowData={rowData}
        />}
        {!markets.fetching && <Pagination style={{paddingTop: 20, alignSelf: 'center'}} onChange={onChange} pageSize={pageSize} showSizeChanger defaultCurrent={page} total={markets?.payload?.data?.stats?.total} />}
    </div>
}
const mapStateToProps = (state: any) => {
    return {
        refCurrencyUuid: state.uuid,
        orderByMarkets: state.orderByMarkets,
        orderDirection: state.orderDirection,
        markets: state.markets
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getMarkets: (referenceCurrencyUuid: string, orderBy: string, orderDirection: string, limit: number, offset: number) => dispatch(MarketsActions.marketsRequest(referenceCurrencyUuid, orderBy, orderDirection, limit, offset))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Markets)
