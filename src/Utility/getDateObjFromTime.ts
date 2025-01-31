type TgetDteObjFromTime=(time:string)=>Date

const getDateObjFromTime:TgetDteObjFromTime=(time)=>{
const[H,M]=time.split(":")
const dateObj=new Date()
dateObj.setHours(parseInt(H))
dateObj.setMinutes(parseInt(M))
dateObj.setSeconds(0)
// const dateString= dateObj.toString 
return dateObj
}

export default getDateObjFromTime