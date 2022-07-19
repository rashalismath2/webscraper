export function getTimeDefferent(start,end){
    var resolution
    var EndTime = end.getTime()
    var StartTime = start.getTime()
    resolution = EndTime - StartTime
    var resolutionTime = (((resolution / 1000) / 60)/ 60)
    var timeInHour=Math.abs(resolutionTime);

    if(timeInHour<0.0166667){
        return ' a while ago'
    }
    else if(timeInHour<1){
        return (timeInHour*60).toFixed(0) + ' minutes ago'
    }
    return timeInHour.toFixed(0)+ ' hours ago'
}