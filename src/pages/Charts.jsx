import { useEffect, useState } from 'react'
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import axios from 'axios';
import LineChart from '../components/LineChart';
import TestBar from '../components/TestBarChart';
import TestLIneChart from '../components/TestLIneChart';
import TestPieChart from '../components/TestPieChart';
import { useParams } from 'react-router';

const Charts = () => {
  const { chart } = useParams();
  const [BarData , SetBarData] = useState([]);
  const [PieChartData , SetPieChartData] = useState([]);
  const [LineChartData , SetLineChartData] = useState([]);
  const [TestBarChartData , SetTestBarChartData] = useState([]);
  const [TestLineChartData , SetTestLineChartData] = useState([]);
  const [TestPieChartData , SetTestPieChartData] = useState([]);

  useEffect(() => {
    axios.get('/json/barChart.json')
    .then((res) => {
      SetBarData(res.data);
    })
    .catch((error) => {
      console.error(error);
    })
   
    axios.get('/json/PieChart.json')
    .then((res) => {
      SetPieChartData(res.data);
    })
    .catch((error) => {
      console.error(error);
    })
   
    axios.get('/json/lineChart.json')
    .then((res) => {
      SetLineChartData(res.data);
    })
    .catch((error) => {
      console.error(error);
    })

    axios.get('/json/testBarChart.json')
    .then((res) => {
      SetTestBarChartData(res.data);
    })
    .catch((error) => {
      console.error(error);
    })

    axios.get('/json/testLineChart.json')
    .then((res) => {
      SetTestLineChartData(res.data);
    })
    .catch((error) => {
      console.error(error);
    })

    axios.get('/json/testPieChart.json')
    .then((res) => {
      SetTestPieChartData(res.data);
    })
    .catch((error) => {
      console.error(error);
    })
  } , [])

  const chartMap = {
    bar: <BarChart data={BarData} height={500} />,
    pie: <PieChart data={PieChartData} height={500} />,
    line: <LineChart data={LineChartData} height={500} />,
    testbar : <TestBar data={TestBarChartData} height={500} width={700} />,
    testline : <TestLIneChart data={TestLineChartData} height={500} />,
    testpie : <TestPieChart data={TestPieChartData} height={500} width={500} />
  };

  return (
    <div className='max-w-7xl mx-auto flex justify-center pt-10'>
      {chartMap[chart] || <p>Chart type not found!</p>}
    </div>
  )
}

export default Charts;
