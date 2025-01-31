type TgetHourMinutFromMiliSec=(time:number)=>string
const getHourMinutFromMiliSec:TgetHourMinutFromMiliSec=(time)=>{
    const dateObj=new Date(time)
    const H=dateObj.getHours()?.toString().padStart(2, '0')
    const M=dateObj.getMinutes()?.toString().padStart(2, '0')
    return `${H}:${M}`
}

export default getHourMinutFromMiliSec

