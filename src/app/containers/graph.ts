import {Component} from '@angular/core';
import {Data} from '../interfaces';
import * as d3 from 'd3';
(window as any).d3 = d3;
var functionPlot = require('function-plot');

@Component({
    selector:'graph-container',
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
    template:`
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

    genPoints(x0,y0,xn,yn): Array<Array<number>> {
   var dx: number = Math.abs(xn-x0);
   var dy:number = Math.abs(yn-y0);
   var sx: number = x0 < xn ? 1 : -1;
   var sy:number = y0 < yn ? 1 : -1;
   var err = dx-dy;
   var xi: number = parseInt(x0);
   var yi: number = parseInt(y0);
   var points:  Array<Array<number>> = [];
  //  var i: number = 0;
   while(true){
     points.push([xi,yi]);
    //  console.log([xi,yi]);  // Do what you need to for this
    //  i++;
     if ((xi==xn) && (yi==yn)) break;
     var e2: number = 2*err;
     if (e2 >-dy){ err = err - dy; xi  = xi + sx; }
     if (e2 < dx){ err = err + dx; yi  = yi + sy; }
   }

   return points;

    }

     genBlocks(points: Array<Array<number>>): Data[] {

      var data: Data[] = [];


      var line: Data = {
        fnType:'points',
        graphType:'polyline',
        points:[
          [this.coord.x0,this.coord.y0],
          [this.coord.xn,this.coord.yn]
        ]
     
      }
       data.push(line);

      for (let point of points) {
        // console.log(point);
        var x: number = point[0];
        var y: number = point[1];
        console.log([x,y]);
     
        var fnType = 'points';
        var graphType = 'polyline';
        var points = [
                        [x, y],
                        [x+1, y],
                        [x+1, y+1],
                        [x, y+1],
                        [x, y],
        ]

        var datapoint: Data = {points:points,fnType:fnType,graphType:graphType}
        data.push(datapoint);
      }
      console.log(data);
      return data;

     }

     getdomain(origin,end): Array<number>{

       return [parseInt(origin)-1,parseInt(end)+1];

     }
     onPlotGraph(){


       const {x0,y0,xn,yn} = this.coord;
        if (x0 && y0 && xn && yn ){

          // let points: Point[] = this.genPoints();
            // let gradient: number = (yn-y0)/(xn-x0);
           var points = this.genPoints(x0,y0,xn,yn);
           var data = this.genBlocks(points);
           var domainx = this.getdomain(x0,xn);
           var domainy = this.getdomain(y0,yn);

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
              data: data,
              
            })

              

          
        }


        
            
      
        
    }

};