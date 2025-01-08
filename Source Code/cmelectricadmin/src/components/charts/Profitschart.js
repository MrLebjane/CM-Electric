import React,{useEffect,useState} from 'react';
import ApexChart from 'react-apexcharts';
import '../../assets/css/Overview.css';
import axios from 'axios';

const Profitsschart = () => {

  const [customers, setCustomers] = useState([]);
  const [monthToCount, setMonthToCount] = useState('10');
  const [yearToCount, setYearToCount] = useState('2023');
  const [dates,setDate]=useState([]);
  const [revenue,setRevenue]=useState(0);
 
  const gettotalclients=(data,month,year)=>{
    let grandtotal=0;
    const filteredEntries=data.filter(entry => {
      const entryDate = new Date(entry.dateAdded); // Assuming 'dateAdded' is the property in your data
      const entryYear = entryDate.getFullYear();
      console.log(entryYear);
      const entryMonth = (entryDate.getMonth() + 1);
      if(entryMonth == month && entryYear==year){
        if(entry.grandtotal!=null){
          grandtotal+=entry.grandtotal
        }
      }
      // return gar
        
    });
    return grandtotal;
  };

  useEffect(() => {
    let grandTotal=0;
    axios.get('http://localhost:8080/getquotations', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(response => {
    
      // setCustomers(response.data);
      if(response.data!==null){
        const newDates = [...dates];
      const newCustomers = [...customers];
      let startMonth=parseInt(monthToCount)+1
        let startYear=yearToCount-1
        if(monthToCount==12){
          startMonth=1
          startYear=yearToCount
        }
      for (let i = 0; i < 12; i++) {
        
        newDates[i]=startMonth+"-"+startYear
        newCustomers[i]=gettotalclients(response.data,startMonth,startYear)
        grandTotal+=parseFloat(newCustomers[i])
        startMonth++
        if(startMonth>12){
          startMonth=1
          startYear++
        }
        // console.log(gettotalclients(response.data,monthToCount,yearToCount))
      }
      setCustomers(newCustomers)
      setDate(newDates)
      setRevenue(grandTotal)
      console.log(gettotalclients(response.data,monthToCount,yearToCount))
      }
    })
    .catch(error => {
      console.log(error.message);
    });
  }, []);

    const seriesBarChart = [
        {
          name: 'Revenue',
          data: customers,
        },
      ];
    
      const optionsBarChart = {
        chart: {
          type: 'bar',
          height: 360,
          background:'#d2d4d6'
        },
        plotOptions: {
          bar: {
            columnWidth: '25%',
            borderRadius: 5,
            colors: {
              color: '#000',
              backgroundBarColors: ['#F2F4F6', '#F2F4F6', '#F2F4F6', '#F2F4F6'],
              backgroundBarRadius: 5,
            },
          },
        },
        xaxis: {
          categories: dates,
          crosshairs: {
            width: 1,
          },
          title: {
            text: 'Month-Year',
          },
        },
        
        yaxis: {
          title: {
            text: 'Revenue(in Rands)',
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return 'R ' + val + 'k';
            },
          },
          
          style: {
            color: '#000', // Set the text color to black
          },
        },
        theme: {
          mode: 'light',
          palette: 'palette1',
        },
      };
    
      return (
        <div className="graph">
           <br></br>
            <div>
              <b style={{color:'black'}}>Total Gross Revenue: R{revenue.toFixed(2)}</b>
            </div>
            <br></br>
            <ApexChart type="bar" series={seriesBarChart} options={optionsBarChart} height={360} />
        </div>
      );
}
export default Profitsschart