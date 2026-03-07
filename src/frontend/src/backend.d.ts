import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContentBlock {
    value: string;
    page: string;
    section: string;
}
export interface ProductListing {
    features: Array<string>;
    tagline: string;
    name: string;
    description: string;
    isActive: boolean;
}
export type Time = bigint;
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone?: string;
}
export interface JobListing {
    title: string;
    jobType: JobType;
    description: string;
    isActive: boolean;
    department: string;
    requirements: Array<string>;
    location: string;
}
export enum JobType {
    contract = "contract",
    partTime = "partTime",
    fullTime = "fullTime"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createJobListing(title: string, department: string, location: string, jobType: JobType, description: string, requirements: Array<string>): Promise<void>;
    createProductListing(name: string, tagline: string, description: string, features: Array<string>): Promise<void>;
    getActiveJobListings(): Promise<Array<JobListing>>;
    getActiveProductListings(): Promise<Array<ProductListing>>;
    getAllContentBlocks(): Promise<Array<ContentBlock>>;
    getAllJobListings(): Promise<Array<JobListing>>;
    getAllProductListings(): Promise<Array<ProductListing>>;
    getCallerUserRole(): Promise<UserRole>;
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    getContentBlock(page: string, section: string): Promise<ContentBlock | null>;
    isCallerAdmin(): Promise<boolean>;
    seedDefaultContent(): Promise<void>;
    submitContactForm(name: string, email: string, phone: string | null, message: string): Promise<void>;
    updateContentBlock(page: string, section: string, value: string): Promise<void>;
    updateJobListing(title: string, department: string, location: string, jobType: JobType, description: string, requirements: Array<string>, isActive: boolean): Promise<void>;
    updateProductListing(name: string, tagline: string, description: string, features: Array<string>, isActive: boolean): Promise<void>;
}
