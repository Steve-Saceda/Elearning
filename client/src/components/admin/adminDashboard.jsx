import * as React from 'react';
import "../../css/admin/admin.css"
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { VictoryPie, VictoryChart, VictoryTheme, VictoryArea, VictoryHistogram } from 'victory';
import { motion } from "framer-motion"



export default function AdminDashboard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (data) {
            const getResult = () => {
                Axios.get("http://localhost:5000/api/admin/pie_data").then((response) => {
                    if (response) {
                        setData(response.data.result);
                    }
                });
            }
            getResult();
        }
    }, [!data]);

    const piedata = data.map((datum) => ({ x: datum.kindofuser, y: datum.student_count }));

    const sampledata = [
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 5, y: 6 }
    ];

    return (
        <div className="adminContent-container">
            <div className="attrib-container">
                {/** DASHBOARD SECTION **/}
                <div className='dashboard-container'>
                    <div className='title-dashboard'>
                        <Typography variant="h3" color="initial" align='center'>
                            Dashboard Section
                        </Typography>
                    </div>
                    <div className='dashboard-attrib'>
                        {/** DASHBOARD HERE **/}
                        <div>
                            <motion.div
                                className="dashboard-charts"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    delay: .9,
                                    duration: 0.3,
                                    ease: [0, 0.71, 0.2, 1.01],
                                    scale: {
                                        type: "spring",
                                        damping: 5,
                                        stiffness: 100,
                                        restDelta: 0.001
                                    }
                                }}
                            >
                                <div className='chart-title'>
                                    <h3>User Overall</h3>
                                </div>
                                <div>
                                    <VictoryPie
                                        style={{
                                            data: {
                                                fillOpacity: 0.9, stroke: "black", strokeWidth: 1
                                            },
                                            labels: {
                                                fontSize: 15, fill: "black"
                                            }
                                        }}
                                        colorScale={["tomato", "orange"]}
                                        data={piedata}
                                        labels={({ datum }) => `${datum.x}: ${(datum.y / piedata.reduce((sum, d) => sum + d.y, 0) * 100).toFixed(0)}%`}
                                        labelRadius={({ innerRadius }) => innerRadius + 40}

                                    />
                                </div>
                            </motion.div>
                        </div>
                        <div>
                            <motion.div
                                className="dashboard-charts"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    delay: 1.1,
                                    duration: 0.3,
                                    ease: [0, 0.71, 0.2, 1.01],
                                    scale: {
                                        type: "spring",
                                        damping: 5,
                                        stiffness: 100,
                                        restDelta: 0.001
                                    }
                                }}
                            >
                                <div className='chart-title'>
                                    <h3>User Overall</h3>
                                </div>
                                <div>
                                    {/* <VictoryPie
                                    style={{
                                        data: {
                                            fillOpacity: 0.9, stroke: "black", strokeWidth: 1
                                        },
                                        labels: {
                                            fontSize: 15, fill: "black"
                                        }
                                    }}
                                    colorScale={["tomato", "orange"]}
                                    data={[
                                        { y: 20, label: "Student" },
                                        { y: 40, label: "Teacher" },
                                    ]}
                                    /> */}

                                    <VictoryChart
                                        theme={VictoryTheme.material}
                                    >
                                        <VictoryArea
                                            style={{ data: { fill: "#c43a31" } }}
                                            data={sampledata}
                                        />
                                    </VictoryChart>
                                </div>
                            </motion.div>
                        </div>
                        <div>
                            <motion.div
                                className="dashboard-charts"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    delay: 1.3,
                                    duration: 0.3,
                                    ease: [0, 0.71, 0.2, 1.01],
                                    scale: {
                                        type: "spring",
                                        damping: 5,
                                        stiffness: 100,
                                        restDelta: 0.001
                                    }
                                }}
                            >
                                <div className='chart-title'>
                                    <h3>User Overall</h3>
                                </div>
                                <div>
                                    <VictoryChart
                                        domainPadding={10}
                                    >
                                        <VictoryHistogram
                                            style={{ data: { fill: "#c43a31" } }}
                                            data={sampledata}
                                        />
                                    </VictoryChart>

                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}