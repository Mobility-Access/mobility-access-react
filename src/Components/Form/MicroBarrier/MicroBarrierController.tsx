import React, { useState } from "react";

import MicroBarrierForm from "./MicrobarrierForm";
import CancelDialog from "../CancelDialog";
import DemographicForm from "../DemographicForm";
import DisabilityForm from "../DisabilityForm";
import LocationForm from "../LocationForm";
import SuccessForm from "../SuccessForm";
import { BaseFields } from "../../../FormTypes";

export interface MicroBarrierFields extends BaseFields {
    microBarrierSubtype: string;
    microBarrierSubtypeDetail: string;
    microBarrierType: string;
}

interface MicroBarrierControllerProps {
    cancelOrComplete: () => void;
    geolocateHandler: (position: any) => void;
    newReportCoords: number[];
    startMapClickListener: () => void;
    stopMapClickListener: () => void;
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
};

const MicroBarrierController = (props: MicroBarrierControllerProps) => {
    const { cancelOrComplete, geolocateHandler, newReportCoords, startMapClickListener, stopMapClickListener } = { ...props };
    const [open, setOpen] = useState(false);
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

    const submitForm = (data: any) => {
        console.log(data);
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
                        geolocateHandler={geolocateHandler}
                        nextStep={nextStep}
                        newReportCoords={newReportCoords}
                        setFormData={setFormData}
                        startMapClickListener={startMapClickListener}
                        stopMapClickListener={stopMapClickListener}
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
