import React, {useEffect, useMemo, useState} from "react";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import { Pagination } from 'antd';
import ExchangesActions from '../../redux/ExchangesRedux'
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
type ExchangesProps = { getExchanges: any, exchanges: any, refCurrencyUuid: any, orderDirection: any, orderByExchanges: any }
const Exchanges: React.FC<ExchangesProps> = (props) => {

    const { getExchanges, exchanges, refCurrencyUuid, orderDirection, orderByExchanges } = props
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const modules = useMemo( ()=> [ClientSideRowModelModule, RangeSelectionModule, RowGroupingModule, RichSelectModule], [])
    const {height} = useViewportHeight()
    const {width} = useViewportWidth()

    function ImageRender(params: any) {
        return (
            <span className="my-renderer">
            <img src={params.value} style={{height: 30, width: 30}}/>
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

    function IconRender(params: any) {
        return (
            params.value ? <GoThumbsup color={'green'}/> : <GoThumbsdown color={'red'}/>
        );
    }
    const columnDefs = [
        { field: 'rank', width: 80 },
        { headerName: 'Logo', width: 100, field: 'iconUrl', cellRendererFramework: ImageRender },
        { field: 'name' },
        { field: '24hVolume', cellRendererFramework: VolumeRender },
        { field: 'marketShare' },
        { field: 'numberOfCoins' },
        { field: 'numberOfMarkets' },
        { field: 'recommended', cellRendererFramework: IconRender },
    ]

    // never changes, so we can use useMemo
    const defaultColDef = {
        resizable: true,
        sortable: false
    }
    useEffect(() => {
        getExchanges(refCurrencyUuid.data.uuid, orderByExchanges.data.value, orderDirection.data.value, 10, 0)
    }, [ refCurrencyUuid, orderByExchanges, orderDirection ])


    let rowData: any[] = [];
    const onChange = (page: number, pageSize: number) => {
        setPage(page)
        setPageSize(pageSize)
        getExchanges(refCurrencyUuid.data.uuid, orderByExchanges.data.value, orderDirection.data.value, pageSize, ((page - 1) * pageSize))
    }
    exchanges?.payload?.data?.exchanges && exchanges?.payload?.data?.exchanges.map((item: any) => rowData.push(item))
    return <div className="ag-theme-alpine" style={{height: height - 150, width: width - 100}}>
        <h1 className='header-title'>Top crypto exchanges</h1>
        <h4 className='header-subtitle'>Compare all {exchanges?.payload?.data?.stats?.total ? exchanges?.payload?.data?.stats?.total : 170} top crypto exchanges. The list is ranked by {orderByExchanges.data.name}.</h4>
        <Currencies />
        {!exchanges.fetching && <AgGridReact
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
        {!exchanges.fetching && <Pagination style={{paddingTop: 20, alignSelf: 'center'}} onChange={onChange} pageSize={pageSize} showSizeChanger defaultCurrent={page} total={exchanges?.payload?.data?.stats?.total} />}
    </div>
}
const mapStateToProps = (state: any) => {
    return {
        refCurrencyUuid: state.uuid,
        exchanges: state.exchanges,
        orderDirection: state.orderDirection,
        orderByExchanges: state.orderByExchanges
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getExchanges: (referenceCurrencyUuid: string, orderBy: string, orderDirection: string, limit: number, offset: number) => dispatch(ExchangesActions.exchangesRequest(referenceCurrencyUuid, orderBy, orderDirection, limit, offset))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Exchanges)
