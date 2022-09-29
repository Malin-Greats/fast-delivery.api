import { CANCELLED } from "dns";

export enum RideStatus{
    PENDING="pending",
    ACCEPTED="accepted",
    CANCELLED= "cancelled",
    IN_TRANSIT="in_transit",
    STARTED ="stated",
    STOPPED="stopped",
    FAILED = "failed"
}