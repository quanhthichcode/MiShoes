import {v4 as uuid} from 'uuid';

const initState={
    hoaDons:[
        {label: `Hóa đơn 1`,
              children: `New Tab 1`,id:uuid(),ma:"HD1",trangThai:0,key:1,
    sanPham:[
        {id:uuid(),tenSP:"giày adidas",giaBan:100000,soLuong:1,kichThuoc:35,Mau:"#fafafa"}
    ]
    }
],

    sanPhamLists:[],
    sanPhamobj:{},
}
const rootReducer=(state =initState,action) =>{
    
    switch(action.type){
        case 'CREATE_INVOICE':
        return{
            ...state,
            hoaDons:[
                ...state.hoaDons,
                action.payload
            ]
        }
        case 'REMOVE_INVOICE':
            console.log("key",action.payload.key);
        return{
            
            ...state,hoaDons:[
                ...state.hoaDons.filter((item)=>item.key!==action.payload.key)
            ]
            
        }
        case'GET_SanPham_LIST':
        return {
            
            sanPhamLists:action.payload,
            sanPhamobj:{}
        }
        default:
            return state;
    }
}
export default rootReducer;