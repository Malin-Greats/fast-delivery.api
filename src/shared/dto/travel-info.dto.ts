

interface ITextValue{
    text:string,
    value:string
}
 interface TravelInformation{
distance:ITextValue
duration:ITextValue
}
export {TravelInformation as TravelInfo}