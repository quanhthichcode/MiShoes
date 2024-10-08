
import React, { useState, useEffect } from "react";

import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";
import { IoFastFood } from "react-icons/io5";
import { HoaDonAPI } from "../../pages/censor/api/hoaDon/hoaDon.api";
import HoaDon from "../../pages/censor/hoaDon-management/HoaDon2";




function SocketConnectGuiThongBao(){
      
    
      
    }

function AdThongBaoDatHang(){ //đây là chạy websocket và đồng thời có thể load lại 1 bảng nào đó
    var stomp =null;
    const socket = new SockJS("http://localhost:8080/ws");
    stomp =Stomp.over(socket);

useEffect(() => {
    stomp.connect({},()=>{
      
        // console.log("connect websocket");

        stomp.subscribe('/topic/admin/hoa-don',(mes)=>{
                try{
                    const pare = JSON.parse(mes.body);
                    // console.log(pare);
                   // ví du: bạn muốn khi khách hàng bấm đặt hàng mà load lại hóa đơn màn admin thì hãy gọi hàm load all hóa đơn ở đây
                   // thí dụ: đây là hàm laod hóa đơn: loadHoaDon(); allThongBao(); CountThongBao();
            
                }catch(e){
                    // console.log('lỗi mẹ ròi xem code di: ',e)
                }
        })
    });

    return ()=>{
        stomp.disconnect();
    };
   
  }, []);
    
}


let bien = null;
function KHThongBao(){//đây là chạy websocket cho khách hàng và đồng thời có thể load lại 1 bảng nào đó
    var stomp =null;
    const socket = new SockJS("http://localhost:8080/ws");
    stomp =Stomp.over(socket);

useEffect(() => {
    stomp.connect({},()=>{
      
        // console.log("connect websocket");
        bien = stomp;
       
        stomp.subscribe('/topic/KH/hoa-don',(mes)=>{
                try{
                    const pare = JSON.parse(mes.body);
                    // console.log(pare);
       
        //  ví du: bạn muốn khi khách hàng bấm đặt hàng mà load lại khuyễn mại khi admin thêm nhanh thì hãy gọi hàm load all khuyễn mại ở đây
        //            thí dụ: đây là hàm laod khuyến mại: loadKhuyễn mại(); allThongBao(); CountThongBao();

                }catch(e){
                    // console.log('lỗi mẹ tk kh ròi xem code di: ',e)
                }
        })
    });

   
    return ()=>{
        stomp.disconnect();
    };
     
  }, []);

  
}

function KHGuiThongBaoDatHang(){
    if(bien){
        bien.send('/app/admin/hoa-don',{},'');
    }
}
function AdminGuiThongBaoXacNhanDatHang() {
  if (bien) {
    bien.send("/app/KH/hoa-don", {}, "");
  }
}

export {
  AdThongBaoDatHang,
  SocketConnectGuiThongBao,
  KHGuiThongBaoDatHang,
  AdminGuiThongBaoXacNhanDatHang,
  KHThongBao,
};