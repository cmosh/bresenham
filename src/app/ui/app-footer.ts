import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    styles:[
     `
                footer {
                     position:fixed;
    height:50px;
    bottom:0px;
    left:0px;
    right:0px;
    margin-bottom:0px;
            background: #00BCD4; 
            }
            footer .copyright-section {
            background: #00BCD4;
          
            }
           
            
            footer .copyright-section .copyright {
            }
            footer .copyright-section .copyright p {
            text-align: center;
            color: white; 
            }
           
    `
    ],
    template:`
          <footer>
        <section class="copyright-section">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="copyright">
                    <p> 
 Copyright &copy; 2016.

 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM0AAAD
 NCAMAAAAsYgRbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5c
 cllPAAAABJQTFRF3NSmzMewPxIG//ncJEJsldTou1jHgAAAARBJREFUeNrs2EEK
 gCAQBVDLuv+V20dENbMY831wKz4Y/VHb/5RGQ0NDQ0NDQ0NDQ0NDQ0NDQ
 0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0PzMWtyaGhoaGhoaGhoaGhoaGhoxtb0QGho
 aGhoaGhoaGhoaGhoaMbRLEvv50VTQ9OTQ5OpyZ01GpM2g0bfmDQaL7S+ofFC6x
 v3ZpxJiywakzbvd9r3RWPS9I2+MWk0+kbf0Hih9Y17U0nTHibrDDQ0NDQ0NDQ0
 NDQ0NDQ0NTXbRSL/AK72o6GhoaGhoRlL8951vwsNDQ0NDQ1NDc0WyHtDTEhD
 Q0NDQ0NTS5MdGhoaGhoaGhoaGhoaGhoaGhoaGhoaGposzSHAAErMwwQ2HwRQ
 AAAAAElFTkSuQmCC" alt="beastie.png" height="10" width="10">
                    </p>
                    </div>
                </div>
            </div>
        </div>
        </section>
        </footer>
`
})

export class AppFooter{};