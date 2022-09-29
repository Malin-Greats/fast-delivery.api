export enum RideRequestStatus{
    TIMED_OUT="timed_out",
    ACCEPTED="accepted",
    PENDING="pending",
    FAILED="failed",
    CANCELLED="cancelled"
}

export interface IRideRequestStatus{
    request_status:RideRequestStatus
}