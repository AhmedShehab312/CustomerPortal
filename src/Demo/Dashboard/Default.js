import React from 'react';
import { Row, Col, Table, Tabs, Tab } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import { connect } from 'react-redux';
import { InputWithText, DropDown } from '../../App/components/ComponentModule'
import {
    CardBody,
    FormGroup,
    Button
} from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Dashboard.scss';
import Card from "../../App/components/MainCard";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import Chart from "react-apexcharts";
import { HtttpPutDefult, HtttpGetDefult, HtttpPostDefult } from '../../actions/httpClient';
import moment from 'moment'
import GaugeChart from 'react-gauge-chart'

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Branches: null,
            errorMsg: null,
            selectedBranchBandwidth: null,
            startDateBandwidth: new Date(),
            EndDateBandwidth: new Date(),
            selectedBranchQuota: null,
            startDateQuota: new Date(),
            EndDateQuota: new Date(),
            BandwidthLineChartData: null,
            BandwidthSpeedMeterChartData: null,
            QuotaLineChartData: null,
            series: [],
            options: {
                chart: {
                    height: 300,
                    type: 'radialBar',
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: '70%',
                        }
                    },
                },
                labels: ['Consumed Quota'],
            },

        }
    }

    filterBandwidth = () => {
        const { OwnerProfile } = this.props;
        const { selectedBranchBandwidth, startDateBandwidth, EndDateBandwidth } = this.state;
        let filtrationBy = moment(startDateBandwidth).format("YYYY-MM-DD HH:mm:ss") == moment(EndDateBandwidth).format("YYYY-MM-DD HH:mm:ss") ? 'hour' : 'day';

        // console.log('@@@@@', moment(startDateBandwidth).format("YYYY-MM-DD HH:mm:ss"));
        // console.log('OwnerProfile', OwnerProfile._id);
        // console.log('selectedBranchBandwidth', selectedBranchBandwidth._id);
        // console.log('EndDateBandwidth', moment(EndDateBandwidth).format("YYYY-MM-DD HH:mm:ss"));

        HtttpGetDefult(`analytics/bandwidth?branchId=${'6076e32e64c18af95251e195'}&brandId=${'6076e31bbe150b4c4ca08b75'}&from=${'2021-04-01T12:00:00-06:30'}&to=${'2021-05-15T12:00:00-06:30'}&filtrationBy=${filtrationBy}`, true, false, false, false).then((res) => {
            if (res) {
                this.setState({
                    BandwidthLineChartData: this.reformatBandwidthLineChartData(res.data[0].lineChartData, filtrationBy),
                    BandwidthSpeedMeterChartData: res.data[0].speedMeterChartData[0]
                })
            }
        })
    }


    filterQuota = () => {
        const { OwnerProfile } = this.props;
        const { selectedBranchQuota, startDateQuota, EndDateQuota } = this.state;
        // let filtrationBy = moment(startDateQuota).format("YYYY-MM-DD HH:mm:ss") == moment(EndDateQuota).format("YYYY-MM-DD HH:mm:ss") ? 'hour' : 'day';

        HtttpGetDefult(`analytics/quota?branchId=${'6076e32e64c18af95251e195'}&brandId=${'6076e31bbe150b4c4ca08b75'}&from=${'2021-04-01T12:00:00-06:30'}&to=${'2021-05-15T12:00:00-06:30'}&filtrationBy=${'day'}`, true, false, false, false).then((res) => {
            if (res) {
                this.setState({
                    QuotaLineChartData: this.reformatQuotaLineChartData(res.data[0].lineChartData),
                    series: [res.data[0].totalConsumedQuota[0].total / (res.data[0].totalConsumedQuota[0].total + 2300)]
                })
            }
        })
    }


    reformatBandwidthLineChartData = (data, type) => {
        let BandwidthLineChartData = [];
        data.map((Item) => {
            BandwidthLineChartData.push({
                name: type == 'day' ? `${Item.day}/${Item.month}/${Item.year}` : `${Item.hour}H`,
                Up: Item.maxBandwidthUp,
                Down: Item.maxBandwidthDown
            })
        })
        return BandwidthLineChartData
    }

    reformatQuotaLineChartData = (data) => {
        let QuotaLineChartData = [];
        data.map((Item) => {
            QuotaLineChartData.push({
                name: `${Item.day}/${Item.month}/${Item.year}`,
                used: Item.totalQuotaByDay,
            })
        })

        return QuotaLineChartData
    }



    render() {
        const { selectedBranchQuota, errorMsg, startDateQuota, EndDateQuota, EndDateBandwidth, startDateBandwidth, selectedBranchBandwidth, BandwidthLineChartData, series, options, QuotaLineChartData, BandwidthSpeedMeterChartData } = this.state;
        const { Branches } = this.props;

        return (
            <Aux >
                <div className="Dashboard" >
                    <Row>
                        <Col>
                            <Card title={"Bandwidth"}>
                                <CardBody>
                                    <Row>
                                        <Col md={6} style={{ margin: 'auto' }}>
                                            <FormGroup className="dropDownContainer">
                                                <label className="title">Branches</label>
                                                <DropDown label={"Branches"} items={Branches} onClick={(val) => { this.setState({ selectedBranchBandwidth: val }) }} selctedItem={selectedBranchBandwidth} />
                                                {errorMsg && <label style={{ color: '#ea6464', marginLeft: '10px', fontSize: '12px' }}>{errorMsg}</label>}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4} className="text-center" style={{ margin: 'auto' }}>
                                            <label className="dateTxt">From Date:</label>
                                            <DatePicker selected={startDateBandwidth} onChange={date => this.setState({ startDateBandwidth: date })} />
                                        </Col>
                                        <Col md={4} className="text-center">
                                            <Button variant="primary" className="filterBtn" onClick={() => { this.filterBandwidth() }}>Filter</Button>
                                        </Col>
                                        <Col md={4} className="text-center" style={{ margin: 'auto' }}>
                                            <label className="dateTxt">To Date:</label>
                                            <DatePicker selected={EndDateBandwidth} onChange={date => this.setState({ EndDateBandwidth: date })} />
                                        </Col>
                                    </Row>
                                    <Row className="chartContainer">
                                        {
                                            BandwidthLineChartData &&
                                            <Col md={4}>

                                                <LineChart width={400} height={300} data={BandwidthLineChartData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Line type="monotone" dataKey="Down" stroke="#8884d8" activeDot={{ r: 8 }} />
                                                    <Line type="monotone" dataKey="Up" stroke="#82ca9d" />
                                                </LineChart>
                                            </Col>
                                        }

                                        {
                                            BandwidthSpeedMeterChartData &&
                                            <Col md={4} style={{ alignSelf: 'center' }} className="text-center">
                                                <div >
                                                    <GaugeChart id="gauge-chart3"
                                                        nrOfLevels={30}
                                                        colors={["#FF5F6D", "#FFC371"]}
                                                        textColor={'#000'}
                                                        arcWidth={0.3}
                                                        percent={BandwidthSpeedMeterChartData.lastBandwidthUp / 200}
                                                        formatTextValue={value => value + 'Mbit/S'}
                                                    />
                                                    <label className="dateTxt">Max Bandwidth Up</label>
                                                </div>
                                            </Col>
                                        }
                                        {
                                            BandwidthSpeedMeterChartData &&
                                            <Col md={4} style={{ alignSelf: 'center' }} className="text-center">
                                                <div >
                                                    <GaugeChart id="gauge-chart3"
                                                        nrOfLevels={30}
                                                        colors={["#FF5F6D", "#FFC371"]}
                                                        textColor={'#000'}
                                                        arcWidth={0.3}
                                                        percent={BandwidthSpeedMeterChartData.lastBandwidthDown / 200}
                                                        formatTextValue={value => value + 'Mbit/S'}
                                                    />
                                                    <label className="dateTxt">Max Bandwidth Down</label>

                                                </div>
                                            </Col>
                                        }

                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card title={"Quota"}>
                                <CardBody>
                                    <Row>
                                        <Col md={6} style={{ margin: 'auto' }}>
                                            <FormGroup className="dropDownContainer">
                                                <label className="title">Branches</label>
                                                <DropDown label={"Branches"} items={Branches} onClick={(val) => { this.setState({ selectedBranchQuota: val }) }} selctedItem={selectedBranchQuota} />
                                                {errorMsg && <label style={{ color: '#ea6464', marginLeft: '10px', fontSize: '12px' }}>{errorMsg}</label>}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4} className="text-center" style={{ margin: 'auto' }}>
                                            <label className="dateTxt">From Date:</label>
                                            <DatePicker selected={startDateQuota} onChange={date => this.setState({ startDateQuota: date })} />
                                        </Col>
                                        <Col md={4} className="text-center" style={{ margin: 'auto' }}>
                                            <Button variant="primary" className="filterBtn" onClick={() => { this.filterQuota() }}>Filter</Button>
                                        </Col>
                                        <Col md={4} className="text-center" style={{ margin: 'auto' }}>
                                            <label className="dateTxt">To Date:</label>
                                            <DatePicker selected={EndDateQuota} onChange={date => this.setState({ EndDateQuota: date })} />
                                        </Col>
                                    </Row>

                                    <Row className="chartContainer">
                                        {
                                            series.length > 0 &&
                                            <Col md={6}>
                                                <div id="chart">
                                                    <Chart options={options} series={series} type="radialBar" height={350} />
                                                </div>
                                            </Col>
                                        }
                                        {
                                            QuotaLineChartData &&
                                            <Col md={6}>
                                                <div >
                                                    <LineChart width={500} height={300} data={QuotaLineChartData}>
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Line type="monotone" dataKey="used" stroke="#8884d8" activeDot={{ r: 8 }} />
                                                    </LineChart>
                                                </div>
                                            </Col>
                                        }

                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Aux>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        OwnerProfile: state.storage.ProfileState.OwnerProfile,
        Branches: state.storage.BranchesState.Branches,
    };
};



export default connect(mapStateToProps, null)(Dashboard);

