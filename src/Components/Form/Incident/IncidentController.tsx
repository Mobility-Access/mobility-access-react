import React, { useState } from "react";

import Hidden from "@material-ui/core/Hidden";

import { Coordinate } from "ol/coordinate";

import IncidentDescriptionForm from "./IncidentDescriptionForm";
import IncidentForm from "./IncidentForm";
import { SubmitIncidentReport } from "./IncidentService";
import CancelDialog from "../CancelDialog";
import DemographicForm from "../DemographicForm";
import DisabilityForm from "../DisabilityForm";
import LocationForm from "../LocationForm";
import SuccessForm from "../SuccessForm";
import { BaseFields, ReportType } from "../../../FormTypes";

export interface IncidentFields extends BaseFields {
    incidentSubtype: string;
    incidentType: string;
    injury: string;
    involvement: string;
}

interface IncidentControllerProps {
    addNewFeature: (reportType: ReportType, fields: any) => void;
    cancelOrComplete: () => void;
    handleGeocodeResult: (coords: Coordinate) => void;
    newReportCoords: number[];
    startMapClickListener: () => void;
    stopMapClickListener: () => void;
}

export const initialState: IncidentFields = {
    archived: false,
    birthYear: '',
    date: new Date(),
    description: "",
    disability: "",
    disabilityType: "",
    disabilityTypeOpen: "",
    gender: "",
    genderOpen: "",
    identity: [],
    identityOpen: "",
    incidentSubtype: "",
    incidentType: "",
    injury: "",
    involvement: "",
    mobilityAid: "",
    mobilityAidType: "",
    mobilityAidTypeOpen: "",
    point: [],
    suggestedSolution: "",
    visible: true
};

const IncidentController = (props: IncidentControllerProps) => {
    const { addNewFeature,
        cancelOrComplete,
        handleGeocodeResult,
        newReportCoords,
        startMapClickListener,
        stopMapClickListener } = { ...props };
    const [open, setOpen] = useState(false);

    // If a location for the report was passed in, use that for the intial state
    initialState.point = newReportCoords || [];

    const [formData, setFormData] = useState<IncidentFields>(initialState);
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

    const submitForm = async (data: IncidentFields) => {
        const result = await SubmitIncidentReport(data);

        if (result.serverError) {
            console.log("Server error from controller");
        } else if (result.networkError) {
            console.log("Network error from controller");
        }

        addNewFeature(ReportType.Incident, result);
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
                        handleGeocodeResult={handleGeocodeResult}
                        nextStep={nextStep}
                        newReportCoords={newReportCoords}
                        prevStep={prevStep}
                        setFormData={setFormData}
                        startMapClickListener={startMapClickListener}
                        stopMapClickListener={stopMapClickListener}
                    />
                )
            }
            case 2: {
                return (
                    <IncidentForm
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
                    <IncidentDescriptionForm
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
                    <DemographicForm
                        cancel={handleCancelClick}
                        formData={formData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        setFormData={setMyData}
                    />
                );
            }
            case 5: {
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
        };
    };

    const renderFormStepMobile = () => {
        switch (step) {
            case 1: {
                return (
                    <IncidentForm
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
                    <IncidentDescriptionForm
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
        };
    };

    return (
        <>
            <Hidden smDown>
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
        </>
    );
};

export default IncidentController;
