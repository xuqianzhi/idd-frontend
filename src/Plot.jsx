import React, { Component } from 'react';
import './Plot.css'
import axios from 'axios';
import profile from './profile.jpeg';
import tram from './tram.jpeg' ;
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

export default class Plot extends Component {

    constructor(props) {
        super(props);
        this.numData = 10;
        this.intervalInSecond = 2;
        this.plotWidth = 700;
        this.plotHeight = 350;
        this.state = {
            humidity_data: [],
            temperature_data: [],
            chats: []
        }
    }

    componentDidMount() {
        this.fetchHumidityData()
        this.fetchTemperatureData();
        console.log('github test')
    }

    fetchHumidityData() {
        setInterval(() => {
            // axios.get(`http://192.168.99.54:4000/humidity`)
            //     .then(res => {
            const currentData = Math.random() * 20
            // const currentData = res.data.humidity;
            var today = new Date();
            var currentTime = today.getHours() + ":" + today.getMinutes();
            var data_arr = this.state.humidity_data.slice()
            data_arr.push({ time: currentTime, val: currentData });
            if (data_arr.length > this.numData) {
                data_arr.splice(0, 1) // remove the first element
            }
            this.setState({ humidity_data: data_arr })
            // })
        }, 1000 * this.intervalInSecond);
    }

    fetchTemperatureData() {
        setInterval(() => {
            // axios.get(`http://192.168.99.54:4000/temperature`)
            //     .then(res => {
            const currentData = Math.random() * 20;
            // const currentData = res.data.temperature;
            var today = new Date();
            var currentTime = today.getHours() + ":" + today.getMinutes();
            var data_arr = this.state.temperature_data.slice()
            data_arr.push({ time: currentTime, val: currentData });
            if (data_arr.length > this.numData) {
                data_arr.splice(0, 1) // remove the first element
            }
            this.setState({ temperature_data: data_arr })
            // })

        }, 1000 * this.intervalInSecond);
    }

    // fetchChats() {
    //     setInterval(() => {
    //         var now = new Date();
    //         const currentData = Chat("text", "Hello " + Math.random(10, 20), now)
    //         var data_arr = this.state.chats.slice()
    //         data_arr.push(currentData);
    //         if (data_arr.length > this.numData) {
    //             data_arr.splice(0, 1) // remove the first element
    //         }
    //         this.setState({ chats: data_arr })
    //     }, 1000 * this.intervalInSecond);
    // }

    // renderChat(type) {
    //     return (
    //         <div>
                
    //         </div>
    //     )
    // }

    render() {
        const { humidity_data, temperature_data } = this.state;
        const plotWidth = this.plotWidth;
        const plotHeight = this.plotHeight;
        return (
            <div id='center-container'>
                <div id='plot-container'>
                    <h3> Humidity history </h3>
                    <LineChart width={plotWidth} height={plotHeight} data={humidity_data}>
                        <XAxis dataKey="time" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="val" stroke="#8884d8" />
                    </LineChart>

                    <h3> Temperature history </h3>
                    <LineChart width={plotWidth} height={plotHeight} data={temperature_data}>
                        <XAxis dataKey="time" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="val" stroke="#82ca9d" />
                    </LineChart>
                </div>

                <div id='chat-container' style={{
                    width: plotWidth, height: plotHeight * 2 + 150
                }}>
                    <div style={{
                        width: plotWidth, height: plotHeight * 3 + 150, backgroundColor: 'pink'
                    }} >

                    </div>
                </div>
            </div>
        )
    }
}


class Chat {

    constructor(type, content, time) {
        this.type = type;
        this.content = content;
        this.time = time
    }

    getContent() {
        if (this.type == "text") {
            return (
                <div>
                    Hello 
                </div>
            )
        } else {
            return (
                <img width='100px' height='100px' src={tram}></img>
            )
        }
    }
}