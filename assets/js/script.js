const options = {
    series: [
      {
        name: "CLP",
        data: []
      }
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false
      }
    },
    // title: {
    //   text: "Últimos 10 registros por día",
    //   align: "left"
    // },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "straight"
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    },
    xaxis: {
      categories: []
    }
  };
  
  const getData = async (indicador) => {
    try {
      const response = await fetch(`https://mindicador.cl/api/${indicador}`);
      const json = await response.json();
  
      return json;
    } catch (e) {
      console.log(e);
    }
  };
  
  const renderChart = (serie) => {
    const ultimos10 = serie.slice(0, 10); // Tambien funciona para Strings
    ultimos10.reverse();
  
    options.series[0].data = [];
    options.xaxis.categories = [];
  
    ultimos10.forEach((dia) => {
      options.series[0].data.push(dia.valor);
      options.xaxis.categories.push(dia.fecha.split("T")[0]);
    });
  
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  };
  
  const btn = document.getElementById("btn");
  btn.addEventListener("click", async () => {
    const clp = document.getElementById("clp").value;
    const moneda = document.getElementById("moneda").value;
  
    const data = await getData(moneda);
  
    let conversion = clp / data.serie[0].valor;
  
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `Resultado: $${conversion.toFixed(4)}`;
  
    renderChart(data.serie);
  });