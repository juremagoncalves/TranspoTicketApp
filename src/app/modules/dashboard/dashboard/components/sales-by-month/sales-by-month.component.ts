import { Component, Input } from '@angular/core';
// import { Highcharts } from 'highcharts/modules/map';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts'

@Component({
  selector: 'app-sales-by-month',
  templateUrl: './sales-by-month.component.html',
  styleUrls: ['./sales-by-month.component.css']
})
export class SalesByMonthComponent {

    Highcharts: typeof Highcharts = Highcharts;
  // highcharts = Highcharts;

  chartOptions: Highcharts.Options= {
    chart: {
      type: 'column',
      width: 1000,
      height: 250
    },
    title: {
      text: 'Vendas mensais de bilhetes'
    },
    xAxis: {
      categories: [
        'janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
      ]
    },
    yAxis: {
      title: {
        text: 'Receita em kz'
      }
    },
    plotOptions: {
      column: {
        color: '#0E1B6B' // Cor das colunas
      }
    },

    series: [
      {
        type:'column',
        name: 'Total',
        data: [50000, 30000,2000,9000,3000, 6000, 20000,2300, 4300, 2879, 9465, 27364]
      }
    ]
  }

  // @Input() chart: Chart= '';

  // Highcharts: typeof Highcharts = Highcharts;
 
  // chart = new Chart(
  //   {
  //     chart: {
  //       type: 'column'
  //     },
  //     title: {
  //       text: 'Vendas mensais de bilhetes'
  //     },
  //     xAxis: {
  //       categories: [
  //         'janeiro',
  //         'Fevereiro',
  //         'Março',
  //         'Abril',
  //         'Maio',
  //         'Junho',
  //         'Julho',
  //         'Agosto',
  //         'Setembro',
  //         'Outubro',
  //         'Novembro',
  //         'Dezembro'
  //       ]
  //     },
  //     yAxis: {
  //       title: {
  //         text: 'Receita em kz'
  //       }
  //     },

  //     series: [
  //       {
  //         type:'line',
  //         name: 'm',
  //         data: [50000, 30000,2000,9000,3000]
  //       }
  //     ]
    
  //   }
  // );

  

}
