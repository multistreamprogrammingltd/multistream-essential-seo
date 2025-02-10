import React, { useState } from "react";
import { AgCharts } from "ag-charts-react";
import { AgDonutSeriesOptions, AgChartOptions } from "ag-charts-community";
import './App.css';

interface DashboardData {
    url: string;
    rating: number;
    html: string;
    report: JSX.Element[];
}

var init = false;
function App() {
    const [showAnalysis, setShowChart] = useState(false);
    const [passFail, setPassFailReal] = useState(
        ["red", "red", "red", "red", "red"]
    )
    const [options, setOptions] = useState<AgChartOptions>({
        // Data: Data to be displayed in the chart
        data: [
            { seoRequirement: "Speed", percentage: 20, pass: "< 200 ms" },
            { seoRequirement: "Header", percentage: 20, pass: "header present" },
            { seoRequirement: "Desc", percentage: 20, pass: "description present" },
            { seoRequirement: "Title", percentage: 20, pass: "title present" },
            { seoRequirement: "Favicon", percentage: 20, pass: "favicon present" },
        ] as object[],
        // Series: Defines which chart type and data to use
        series: [
            {
                type: "donut",
                calloutLabelKey: "pass",
                angleKey: "percentage",
                innerRadiusRatio: 0.6,
                fills: passFail,
            } as AgDonutSeriesOptions,
        ],
    });
    const [dashboardData, setDashboardData] = React.useState<DashboardData>({ url: window.location.origin, rating: 0, html: '', report: [] });
    const showReport = () => {
        return (
            <div className="content"><>{dashboardData.report}</></div>
        );
    }
    const setUrl = (url: string) => {
        dashboardData.url = url;
        setDashboardData({ ...dashboardData, url: dashboardData.url });
    }
    const setPassFail = (data: string[]) => {
        setPassFailReal(data);
        setOptions({
            // Data: Data to be displayed in the chart
            data: [
                { seoRequirement: "Speed", percentage: 20, pass: "< 200 ms" },
                { seoRequirement: "Header", percentage: 20, pass: "header present" },
                { seoRequirement: "Desc", percentage: 20, pass: "description present" },
                { seoRequirement: "Title", percentage: 20, pass: "title present" },
                { seoRequirement: "Favicon", percentage: 20, pass: "favicon present" },
            ] as object[],
            // Series: Defines which chart type and data to use
            series: [
                {
                    type: "donut",
                    calloutLabelKey: "pass",
                    angleKey: "percentage",
                    innerRadiusRatio: 0.6,
                    fills: passFail,
                } as AgDonutSeriesOptions,
            ],
        });
    }
    function analyseUrl() {
        console.log("analyse button pressed...");
        try {
            dashboardData.report = [];
            dashboardData.rating = 0
            setPassFail(["red", "red", "red", "red", "red"]);
            var xhr = new XMLHttpRequest();
            var startTime = new Date().getMilliseconds();
            xhr.open("GET", dashboardData.url, true);
            xhr.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        var endTime = new Date().getMilliseconds();
                        var loadTime = endTime - startTime;
                        if (loadTime < 200) {
                            passFail[0] = "green";
                            dashboardData.report.push(<p key="0"><i className="App-tick" /> Webpage load in &lt; 200ms</p>);
                            dashboardData.rating++;
                        } else {
                            passFail[0] = "red";
                            dashboardData.report.push(<p key="0"><i className="App-cross" /> Webpage load in &lt; 200ms</p>);
                        }
                        dashboardData.html = xhr.responseText;
                        var h1TagRegEx = RegExp('<h1[^>]*>[^<]*?</h1>', 'gi');
                        var h1TagCount = dashboardData.html.match(h1TagRegEx)?.length ?? 0;
                        if (h1TagCount === 1) {
                            passFail[1] = "green";
                            dashboardData.report.push(<p key="1"><i className="App-tick" /> H1 tag found</p>);
                            dashboardData.rating++;
                        } else {
                            if (h1TagCount > 1) {
                                passFail[1] = "yellow";
                                dashboardData.report.push(<p key="1"><i className="App-cross" /> More than one H1 tag found</p>);
                            } else {
                                passFail[1] = "red";
                                dashboardData.report.push(<p key="1"><i className="App-cross" /> H1 tag not found</p>);
                            }
                        }
                        var metaDescTagRegEx = RegExp("<\\s*meta\\s+(property|name)=\"(og:|twitter:|)description\"\\s+content=\"([^\"]*)\"", 'gi');
                        var metaDescTagCount = dashboardData.html.match(metaDescTagRegEx)?.length ?? 0;
                        //dashboardData.html += '<meta name="description" content="At FCN Commercial Contract Advisory we advise on commercial contract and vendor management. United Kingdom | Leeds, Manchester, London | +44 7891587257."/>'; //test
                        if (metaDescTagCount === 1) {
                            if (metaDescTagRegEx.exec(dashboardData.html) ? [3].length > 160 : false) {
                                passFail[2] = "green";
                                dashboardData.report.push(<p key="2"><i className="App-cross" /> META description over 160 characters</p>);
                            } else {
                                passFail[2] = "red";
                                dashboardData.rating++;
                                dashboardData.report.push(<p key="2"><i className="App-tick" /> META description tag found and lt; 161 chars</p>);
                            }
                        } else {
                            if (metaDescTagCount > 1) {
                                passFail[2] = "yellow";
                                dashboardData.report.push(<p key="2"><i className="App-cross" /> More than one META description tag found</p>);
                            } else {
                                passFail[2] = "red";
                                dashboardData.report.push(<p key="2"><i className="App-cross" /> META description tag not found</p>);
                            }
                        }
                        //dashboardData.html += "<title>TEST TITLE</title>";
                        var titleTagRegEx = RegExp("<title>([^<]+)<\/title>", "gi");
                        var titleTagCount = dashboardData.html.match(titleTagRegEx)?.length ?? 0;
                        if (titleTagCount === 1) {
                            if (titleTagRegEx.exec(dashboardData.html) ? [0].length > 65 : false) {
                                passFail[3] = "yellow";
                                dashboardData.report.push(<p key="3"><i className="App-cross" /> TITLE over 65 characters</p>);
                            } else {
                                passFail[3] = "green";
                                dashboardData.rating++;
                                dashboardData.report.push(<p key="3"><i className="App-tick" /> TITLE tag found and &lt; 66 chars</p>);
                            }
                        } else {
                            if (titleTagCount > 1) {
                                passFail[3] = "yellow";
                                dashboardData.report.push(<p key="3"><i className="App-cross" /> More than one TITLE tag found</p>);
                            } else {
                                passFail[3] = "red";
                                dashboardData.report.push(<p key="3"><i className="App-cross" /> TITLE tag not found</p>);
                            }
                        }

                        var xhr2 = new XMLHttpRequest();
                        xhr2.open("GET", 'http://localhost:3000/favicon.ico', true);
                        xhr2.onreadystatechange = function () {
                            if (this.readyState === XMLHttpRequest.DONE) {
                                if (this.status === 200) {
                                    dashboardData.rating++;
                                    passFail[4] = "green";
                                    dashboardData.report.push(<p key="4"><i className="App-tick" /> Favicon found</p>);
                                } else {
                                    passFail[4] = "red";
                                    dashboardData.report.push(<p key="4"><i className="App-cross" /> Favicon not found</p>);
                                }
                                setPassFail({ ...passFail });
                                setDashboardData({ ...dashboardData, report: dashboardData.report });
                            }
                        }
                        xhr2.send();
                        setPassFail(["red", "red", "red", "red", "red"]);
                        setDashboardData({ ...dashboardData, report: dashboardData.report });
                    } else {
                        dashboardData.report.push(<p key="error"><i className="App-cross" /> HTTP status not 200 ({xhr.status})</p>);
                    }
                }
            }
            xhr.onerror = function () {
                dashboardData.rating = 0;
                dashboardData.report.push(<p key="error">Ajax error with HTTP call - see error in developer console log.</p>);
                console.log(dashboardData.report);
                setPassFail(["red", "red", "red", "red", "red"]);
                setDashboardData({ ...dashboardData, report: dashboardData.report });
            }
            xhr.send();
        }
        catch (err) {
            dashboardData.rating = 0;
            dashboardData.report.push(<p><i className="App-cross" /> Error thrown with HTTP call - see error in developer console log</p>);
            console.log(dashboardData.report);
            setPassFail(["red", "red", "red", "red", "red"]);
            setDashboardData({ ...dashboardData, report: dashboardData.report });
        }
        setPassFail({ ...passFail });
        setDashboardData({ ...dashboardData, rating: dashboardData.rating, report: dashboardData.report });
        setShowChart(true);
    }

    if (!init) {
        analyseUrl();
        init = true;
    }

    return (
        <div className="App">
            <header className="App-header">
                <h2>
                    Multistream SEO Essentials Analyser
                </h2>
            </header>
            <div className="App-description">
                <p>This plugin analyses essential SEO for a web page.</p>
            </div>
            <div className="App-form">
                <label>URL:
                    <input
                        value={dashboardData.url}
                        onChange={e => setUrl(e.target.value)}
                    />
                </label>
                <button onClick={analyseUrl}>Analyse</button>
            </div>
            {showAnalysis ? <div className="App-chart">
                <h2>SEO essentials rating: {dashboardData.rating} out of 5</h2>
                <AgCharts options={options} /> </div>: null }
            
            <div className="App-summary">
                {showAnalysis ? <h2>
                    Summary
                </h2> : null }
                {showReport()}
            </div>
        </div>
    );
}

export default App;
