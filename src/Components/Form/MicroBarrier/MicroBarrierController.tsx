import React, { useState } from "react";

import MicroBarrierForm from "./MicrobarrierForm";
import { SubmitMicroBarrierReport } from  "./MicroBarrierService";
import CancelDialog from "../CancelDialog";
import DemographicForm from "../DemographicForm";
import DisabilityForm from "../DisabilityForm";
import LocationForm from "../LocationForm";
import SuccessForm from "../SuccessForm";
import { BaseFields, ReportType } from "../../../FormTypes";

export interface MicroBarrierFields extends BaseFields {
    microBarrierSubtype: string;
    microBarrierSubtypeDetail: string;
    microBarrierType: string;
}

interface MicroBarrierControllerProps {
    addNewFeature: (reportType: ReportType, fields: any) => void;
    cancelOrComplete: () => void;
    newReportCoords: number[];
    startMapClickListener: () => void;
    stopMapClickListener: () => void;
    toggleDialog: () => void;
}

const initialState: MicroBarrierFields = {
    birthYear: -1,
    date: new Date(),
    description: "",
    disability: "",
    disabilityType: "",
    disabilityTypeOpen: "",
    gender: "",
    genderOpen: "",
    identity: [],
    identityOpen: "",
    microBarrierSubtype: "",
    microBarrierSubtypeDetail: "",
    microBarrierType: "",
    mobilityAid: "",
    mobilityAidType: "",
    mobilityAidTypeOpen: "",
    point: [],
    suggestedSolution: "",
};

const MicroBarrierController = (props: MicroBarrierControllerProps) => {
    const { addNewFeature,
        cancelOrComplete,
        newReportCoords,
        startMapClickListener,
        stopMapClickListener,
        toggleDialog } = { ...props };
    const [open, setOpen] = useState(false);

    // If a location for the report was passed in, use that for the intial state
    initialState.point = newReportCoords || [];

    const [formData, setFormData] = useState<MicroBarrierFields>(initialState);
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
        setStep(prev => prev - 1);
    };

    const submitForm = async (data: MicroBarrierFields) => {
        const result = await SubmitMicroBarrierReport(data);

        if (result.serverError) {
            console.log("Server error from controller");
        } else if (result.networkError) {
            console.log("Network error from controller");
        }
        
        addNewFeature(ReportType.MicroBarrier, result);
        nextStep();
    };

    const setMyData = (value: any) => {
        setFormData(value)
    };

    const renderFormStep = () => {
        if (step === 1 && newReportCoords) {
            setStep(2);
        }
        
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
                        toggleDialog={toggleDialog}
                    />
                )
            }
            case 2: {
                return (
                    <MicroBarrierForm
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
            {renderFormStep()}
            <CancelDialog 
                handleConfirmNo={handleConfirmNo}
                handleConfirmYes={handleConfirmYes}
                open={open}
            />
        </>
    );
};

export default MicroBarrierController;
