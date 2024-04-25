import React, { useState } from "react";

import Hidden from "@mui/material/Hidden";

import AmenityForm from "./AmenityForm";
import { SubmitAmenityReport } from "./AmenityService";
import CancelDialog from "../CancelDialog";
import DemographicForm from "../DemographicForm";
import DisabilityForm from "../DisabilityForm";
import LocationForm from "../LocationForm";
import SuccessForm from "../SuccessForm";
import { BaseFields, ReportType } from "../../../FormTypes";

export interface AmenityFields extends BaseFields {
    amenityType: string;
}

interface AmenityControllerProps {
    addNewFeature: (reportType: ReportType, fields: any) => void;
    cancelOrComplete: () => void;
    newReportCoords: number[];
    startMapClickListener: () => void;
    stopMapClickListener: () => void;
    addCenterMarker?: () => void;
    handleMapKeyDown?: (value: boolean) => void;
}

export const initialState: AmenityFields = {
    archived: false,
    amenityType: "",
    birthYear: '',
    date: new Date(),
    description: "",
    disability: "",
    disabilityType: "",
    disabilityTypeOpen: "",
    gender: "",
    genderOpen: "",
    heardAbout: "",
    heardAboutOpen: "",
    identity: [],
    identityOpen: "",
    mobilityAid: "",
    mobilityAidType: "",
    mobilityAidTypeOpen: "",
    point: [],
    suggestedSolution: "",
    visible: true
};

const AmenityController = (props: AmenityControllerProps) => {
    const { addNewFeature,
        cancelOrComplete,
        newReportCoords,
        startMapClickListener,
        stopMapClickListener,
        addCenterMarker,
        handleMapKeyDown } = { ...props };
    const [open, setOpen] = useState(false);

    // If a location for the report was passed in, use that for the intial state
    initialState.point = newReportCoords || [];
    
    const [formData, setFormData] = useState<AmenityFields>(initialState);
    const [step, setStep] = useState(1);

    const handleCancelClick = () => {
        setOpen(true);
    };

    const handleConfirmNo = () => {
        setOpen(false);
    };

    const handleConfirmYes = () => {
        setFormData(initialState);
        setOpen(false);
        cancelOrComplete();
    };
    
    const nextStep = () => {
        setStep(prev => prev + 1);
    };

    const prevStep = () => {
        if (step === 1) {
            setFormData(initialState);
            cancelOrComplete();
            return;
        }
        setStep(prev => prev - 1);
    };

    const submitForm = async (data: AmenityFields) => {
        const result = await SubmitAmenityReport(data);

        if (result.serverError) {
            console.log("Server error from controller");
        } else if (result.networkError) {
            console.log("Network error from controller");
        }
        
        addNewFeature(ReportType.Amenity, result);
        nextStep();
    };

    const setMyData = (value: any) => {
        setFormData(value)
    };

    const renderFormStep = () => {
        switch (step) {
            case 1: {
                return (
                    <LocationForm
                        cancel={handleCancelClick}    
                        formData={formData}
                        nextStep={nextStep}
                        newReportCoords={newReportCoords}
                        prevStep={prevStep}
                        setFormData={setFormData}
                        startMapClickListener={startMapClickListener}
                        stopMapClickListener={stopMapClickListener}
                        addCenterMarker={addCenterMarker}
                        handleMapKeyDown={handleMapKeyDown}
                    />
                );
            }
            case 2: {
                return (
                    <AmenityForm
                        cancel={handleCancelClick}
                        formData={formData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        setFormData={setMyData}
                    />
                );
            }
            case 3: {
                return (
                    <DemographicForm
                        cancel={handleCancelClick}
                        formData={formData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        setFormData={setMyData}
                    />
                );
            }
            case 4: {
                return (
                    <DisabilityForm
                        cancel={handleCancelClick}
                        formData={formData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        setFormData={setMyData}
                        submit={submitForm}
                    />
                );
            }
            default:
                return (
                    <SuccessForm reset={cancelOrComplete} />
                );
        }
    };

    const renderFormStepMobile = () => {
        switch (step) {
            case 1: {
                return (
                    <AmenityForm
                        cancel={handleCancelClick}
                        formData={formData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        setFormData={setMyData}
                    />
                );
            }
            case 2: {
                return (
                    <DemographicForm
                        cancel={handleCancelClick}
                        formData={formData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        setFormData={setMyData}
                    />
                );
            }
            case 3: {
                return (
                    <DisabilityForm
                        cancel={handleCancelClick}
                        formData={formData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        setFormData={setMyData}
                        submit={submitForm}
                    />
                );
            }
            default:
                return (
                    <SuccessForm reset={cancelOrComplete} />
                );
        }
    };

    return <>
        <Hidden mdDown>
            {renderFormStep()}
        </Hidden>
        <Hidden mdUp>
            {renderFormStepMobile()}
        </Hidden>
        <CancelDialog 
            handleConfirmNo={handleConfirmNo}
            handleConfirmYes={handleConfirmYes}
            open={open}
        />
    </>;
};

export default AmenityController;
