import React, {useEffect, useMemo, useState} from "react";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import CoinsActions from '../../redux/CoinsRedux';
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
import {RangeSelectionModule} from "@ag-grid-enterprise/range-selection";
import {RowGroupingModule} from "@ag-grid-enterprise/row-grouping";
import {RichSelectModule} from "@ag-grid-enterprise/rich-select";
import {useViewportHeight, useViewportWidth} from "../../hooks";
import _ from "lodash";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import Currencies from "../../components/currency";
import Order from "../../components/order";
import {AgGridReact} from "@ag-grid-community/react";
import {Pagination} from "antd";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

type CryptoProps = { getCoins: any, coins: any, refCurrencyUuid: any, orderDirection: any, orderBy: any, timePeriod: any }
const Cryptocurrencies: React.FC<CryptoProps> = (props) => {
    const { getCoins, refCurrencyUuid, timePeriod, orderBy, orderDirection, coins } = props
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [gridApi, setGridApi] = useState(null);
    const modules = useMemo( ()=> [ClientSideRowModelModule, RangeSelectionModule, RowGroupingModule, RichSelectModule], [])
    const {height} = useViewportHeight()
    const {width} = useViewportWidth()

    const onGridReady = (params: any) => {
        setGridApi(params.api);
    };

    const onSelectionChanged = () => {
        // @ts-ignore
        const selectedRows = gridApi.getSelectedRows();
        console.log(selectedRows);
    };

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

    function NameRender(params: any) {
        return (
            <span className="my-renderer">
            <div >{params.value}%</div>
          </span>
        );
    }
    const LineChart = (params: any) => {
        const options = {
            elements: {
                point:{
                    radius: 0
                }
            },
            legend: {
                display: false
            },
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                paddingBottom: 15
            },
            scales:
                {
                    yAxes: {
                        display: false,
                    },
                    xAxes: {
                        display: false,
                    },
                },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    enabled: false
                }
            },
        };


        const data = {
            labels: params.data.sparkline.filter((item: any, index: number) => item !== null && index),
            datasets: [
                {
                    data: params.data.sparkline.filter((item: any) => item !== null),
                    borderColor: Math.sign(params.data.change) === -1 ? 'red' : 'green',
                    backgroundColor: Math.sign(params.data.change) === -1 ? 'lightRed' : 'lightGreen',
                    borderWidth: 1.5
                },
            ],
        };
        return (
            <div style={{height: 40, width: 150}}>
            <Chart
                    style={{height: 40, width: 150}}
                    type={'line'}
                    options={options}
                    data={data}
                />
            </div>
        );
    };
    const columnDefs = [
        { field: 'rank', width: 80 },
        { headerName: 'Logo', width: 100, field: 'iconUrl', cellRendererFramework: ImageRender },
        { field: 'name' },
        { field: 'price', cellRendererFramework: VolumeRender },
        { headerName: 'Sparkline', colId: 'sparkline&color', cellRendererFramework: LineChart },
        { headerName: timePeriod.data.name + ' Change', field: 'change', cellRendererFramework: NameRender },
        { field: '24hVolume', cellRendererFramework: VolumeRender },
        { field: 'marketCap' },
    ]

    // never changes, so we can use useMemo
    const defaultColDef = {
        resizable: true,
        sortable: false
    }
    useEffect(() => {
        getCoins(refCurrencyUuid.data.uuid, timePeriod.data.value, orderBy.data.value, orderDirection.data.value, pageSize, ((page - 1) * pageSize))
    }, [ refCurrencyUuid, timePeriod, orderBy, orderDirection ])


    let rowData: any[] = [];
    const onChange = (page: number, pageSize: number) => {
        setPage(page)
        setPageSize(pageSize)
        getCoins(refCurrencyUuid.data.uuid, timePeriod.data.value, orderBy.data.value, orderDirection.data.value, pageSize, ((page - 1) * pageSize))
    }
    coins?.payload?.data?.coins && coins?.payload?.data?.coins.map((item: any) => rowData.push(item))
    return <div className="ag-theme-alpine" style={{height: height - 150, width: width - 100}}>
        <h1 className='header-title'>All cryptocurrency prices</h1>
        <h4 className='header-subtitle'>Discover all {coins?.payload?.data?.stats?.total ? coins?.payload?.data?.stats?.total : 23891} cryptocurrency, ranked by {orderBy.data.name}.</h4>
        <div className='settings'><Currencies /> <Order type={''} /> <Order type={'coins'} /> <Order type={'direction'} /></div>
        {!coins.fetching && <AgGridReact
            containerStyle={{height: height - 300, width: width - 100}}
            // turn on AG Grid React UI
            reactUi={true}
            // all other properties as normal...
            className="ag-theme-alpine"
            animateRows={true}
            rowSelection='single'
            onGridReady={onGridReady}
            onSelectionChanged={onSelectionChanged}
            modules={modules}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowData={rowData}
        />}
        {!coins.fetching && <Pagination style={{paddingTop: 20, alignSelf: 'center'}} onChange={onChange} pageSize={pageSize} showSizeChanger defaultCurrent={page} total={coins?.payload?.data?.stats?.total} />}
    </div>
}

const mapStateToProps = (state: any) => {
    return {
        refCurrencyUuid: state.uuid,
        timePeriod: state.timePeriod,
        orderBy: state.orderBy,
        orderDirection: state.orderDirection,
        coins: state.coins
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getCoins: (referenceCurrencyUuid: any, timePeriod: any, orderBy: any, orderDirection: any, limit: number, offset: number) => dispatch(CoinsActions.coinsRequest(referenceCurrencyUuid, timePeriod, orderBy, orderDirection, limit, offset))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cryptocurrencies)
