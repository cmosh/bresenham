import {Component} from '@angular/core';
import {Data} from '../interfaces';
import * as d3 from 'd3';
(window as any).d3 = d3;
var functionPlot = require('function-plot');

@Component({
    selector: 'graph-container',
    styles: [`.graph {
  padding-top: 50px;
}
.creator {
  margin-bottom: 40px; 
}
 .graph-creator {
      padding: 20px;
      margin-top: 10px;
      background-color: white;
      border-radius: 3px;
    }
    .title {
      font-weight: bold;
      color: rgba(0,0,0,0.8);
    }
    .btn-center {
       text-align: center;
    }

`],
    template: `
    <div class="row center-xs graph">
      <div class="col-xs-6 creator">
      
        <div class="graph-creator shadow-2">
      <form class="row" (submit)="onPlotGraph()">
        <input
            [(ngModel)]="coord.x0"
            name="coordx0"
            type="text"
            placeholder="X&#8320;"
            class="col-xs-2 title"
        >
       <input
           [(ngModel)]="coord.y0"
           name="coordy0"
          type="text"
          placeholder="Y&#8320;"
          class="col-xs-2 title"
       >
       
       <label class="col-xs-1" >TO&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
       
       <input
            [(ngModel)]="coord.xn"
            name="coordxn"
            type="text"
          placeholder="X&#8345;"
          class="col-xs-2 title"
       >
       <input
            [(ngModel)]="coord.yn"
            name="coordyn"
            type="text"
          placeholder="Y&#8345;"
          class="col-xs-2 title"
       >
       
       <div class="actions col-xs-2 row between-xs">
          <button
            type="submit"
            class="btn-light btn-center"
           >
            PLOT
          </button>
        </div>
      </form>
    </div>

     
      
        <div class="graph-creator shadow-2">
   <span id="plotarea"></span>
     
             
    </div>

      </div>

    
    </div>
`
})

export class Graph  {    
      
  

    coord = {
        x0: <number> null,
        y0: <number> null,
        xn: <number> null,
        yn: <number> null 
    };
       

   
     genColor() {
        function c() { return (Math.round(Math.random() * 255)); }
        var rgb = [c(), c(), c()];
        return '#' + ((rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16);
    }

    genPoints(x0, y0, xn, yn): Array<Array<number>> {
        var dx: number = Math.abs(xn - x0);
        var dy: number = Math.abs(yn - y0);
        var sx: number = x0 < xn ? 1 : -1;
        var sy: number = y0 < yn ? 1 : -1;
        var err = dx - dy;
        var xi: number = parseInt(x0, 10);
        var yi: number = parseInt(y0, 10);
        var points:  Array<Array<number>> = [];

        while (true) {
           points.push([xi, yi]);
          if ((xi === parseInt(xn, 10)) && (yi === parseInt(yn, 10))) { break; }
          var e2: number = 2 * err;
          console.log(dy);
          if (e2 > - dy) { err = err - dy; xi  = xi + sx; }
          if (e2 < dx) { err = err + dx; yi  = yi + sy; }        
        }
       
        return points;
    }

     genBlocks(points: Array<Array<number>>): Data[] {

      var data: Data[] = [];
      var fnType: string = 'points';
      var graphType: string = 'polyline';

      var line: Data = {
        fnType: fnType,
        graphType: graphType,
        color: this.genColor(),
        points: [
          [this.coord.x0, this.coord.y0],
          [this.coord.xn, this.coord.yn]
        ]
     
      };
       data.push(line);

        var pointsbottom: Array<Array<number>> = [];
        var pointstop: Array<Array<number>> = [];
       
       for (let point of points){
          pointsbottom.push(point);
          pointsbottom.push([point[0] + 1, point[1]]);
          pointsbottom.push([point[0] + 1, point[1] + 1]);
          pointstop.push(point);
          pointstop.push([point[0], point[1] + 1]);
          pointstop.push([point[0] + 1, point[1] + 1]);         
       }

         var datapointbottom: Data = {points: pointsbottom, color: this.genColor(), fnType: fnType, graphType: graphType};
         var datapointtop: Data = {points: pointstop, color: this.genColor(), fnType: fnType, graphType: graphType};

         data.push(datapointtop);
         data.push(datapointbottom);

      return data;

     }

     getdomain(origin, end): Array<number> {

       if (origin < end ) {
        return [parseInt(origin, 10) - 2, parseInt(end, 10) + 2];
       }else if (origin > end) {
        return [parseInt(end, 10) - 2, parseInt(origin, 10) + 2];
       }else {
        return [parseInt(origin, 10) - 2, parseInt(end, 10) + 2];
       }

     }
     onPlotGraph() {


       const {x0, y0, xn, yn} = this.coord;
        if (x0 && y0 && xn && yn ) {

          // let points: Point[] = this.genPoints();
            // let gradient: number = (yn-y0)/(xn-x0);
           var points = this.genPoints(x0, y0, xn, yn);
           var data = this.genBlocks(points);
           var domainx = this.getdomain(x0, xn);
           var domainy = this.getdomain(y0, yn);
           console.log("domain x:" + domainx);
           console.log("domain y:" + domainy);
            functionPlot({
              target: '#plotarea',
                xAxis: {
                  label: 'x - axis',
                  domain: domainx
                },
                yAxis: {
                  label: 'y - axis',
                  domain: domainy
                },
              grid: true,
              data: data,
              
            });

              

          
        }   
    }
};
